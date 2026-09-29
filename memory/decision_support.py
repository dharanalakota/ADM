import os

from dotenv import load_dotenv
from groq import Groq

from memory.hindsight_memory import recall_memory


load_dotenv()




def get_historical_context(query: str) -> dict:
    """
    Retrieve candidate historical memories from Hindsight.

    Hindsight is responsible for retrieving and ranking candidate
    memories. Relevance to the exact current decision is determined
    later by the AI decision-support layer.
    """

    memories = recall_memory(query)

    if not memories:
        return {
            "memory_status": "no_memories_retrieved",
            "memories": [],
            "conflicts": [],
        }

    # Hindsight has already ranked the retrieved memories.
    # Keep only the strongest candidates to control context size.
    memories = [
        memory
        for memory in memories
        if memory.scores is not None
        and memory.scores.final is not None
    ]

    memories.sort(
        key=lambda memory: memory.scores.final,
        reverse=True,
    )

    candidate_memories = memories[:10]

    if not candidate_memories:
        return {
            "memory_status": "no_memories_retrieved",
            "memories": [],
            "conflicts": [],
        }

    grouped = {}

    for memory in candidate_memories:
        metadata = memory.metadata or {}

        decision_id = metadata.get("decision_id")
        vendor = metadata.get("vendor")
        memory_type = metadata.get("memory_type")

        # Ignore memories that cannot be connected to a vendor decision.
        if not decision_id and not vendor:
            continue

        key = decision_id or vendor

        if key not in grouped:
            grouped[key] = {
                "decision_id": decision_id,
                "vendor": vendor or "Unknown vendor",
                "memories": [],
                "memory_types": set(),
                "scores": [],
            }

        memory_text = memory.text

        if memory_text not in grouped[key]["memories"]:
            grouped[key]["memories"].append(memory_text)

        if memory_type:
            grouped[key]["memory_types"].add(memory_type)

        grouped[key]["scores"].append(memory.scores.final)

    if not grouped:
        return {
            "memory_status": "no_memories_retrieved",
            "memories": [],
            "conflicts": [],
        }

    organized_memories = []

    for data in grouped.values():
        organized_memories.append(
            {
                "decision_id": data["decision_id"],
                "vendor": data["vendor"],
                "memory_types": sorted(data["memory_types"]),
                "content": data["memories"],
                "retrieval_scores": data["scores"],
            }
        )

    return {
        "memory_status": "candidate_memories_retrieved",
        "memories": organized_memories,
        "conflicts": [],
    }

def generate_decision_support(query: str) -> dict:
    historical_context = get_historical_context(query)

    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    prompt = f"""
You are ADM, an AI decision-support assistant.

Your job is to help a project manager evaluate a vendor-selection
decision using organizational memory retrieved from Hindsight.

The historical memories below are CANDIDATE memories.

A candidate memory is not automatically relevant merely because it
contains words such as vendor, software, delivery, quality, cost,
deadline, or project.

Determine whether each candidate genuinely applies to the CURRENT
DECISION based on the situation, requirements, vendor-selection
context, and expected outcome.

RULES:

1. Historical facts may ONLY come from relevant Hindsight memories.
2. Ignore candidate memories that are not genuinely relevant.
3. Never invent historical experience.
4. Never turn a general consideration into a historical fact.
5. Clearly distinguish historical experience from general considerations.
6. If no candidate memories are genuinely relevant, state that no
   relevant historical organizational experience was found.
7. If relevant memories conflict, preserve both experiences and say
   that the historical evidence is mixed.
8. Do not invent dates, percentages, measurements, performance
   statistics, or other facts.
9. Do not rank vendors.
10. Do not make the final vendor decision.
11. The human decision-maker remains responsible for the final
    vendor selection.

HINDSIGHT MEMORY STATUS:
{historical_context["memory_status"]}

CANDIDATE HISTORICAL MEMORIES:
{historical_context["memories"]}

CURRENT DECISION:
{query}

Return ONLY the structured JSON requested by the response schema.
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "adm_decision_support",
                "strict": True,
                "schema": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string"
                        },
                        "historical_experience": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "what_happened_previously": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "lessons_from_memory": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "considerations": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "memory_status": {
                            "type": "string"
                        },
                        "conflicts": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "human_decision_required": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "query",
                        "historical_experience",
                        "what_happened_previously",
                        "lessons_from_memory",
                        "considerations",
                        "memory_status",
                        "conflicts",
                        "human_decision_required"
                    ],
                    "additionalProperties": False
                }
            }
        }
    )

    import json

    content = response.choices[0].message.content

    if not content:
        raise RuntimeError("Groq returned an empty decision-support response.")

    result = json.loads(content)

    return result