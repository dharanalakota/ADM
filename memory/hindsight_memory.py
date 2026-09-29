import os

from dotenv import load_dotenv
from hindsight_client import Hindsight

load_dotenv()

HINDSIGHT_API_KEY = os.getenv("HINDSIGHT_API_KEY")
HINDSIGHT_BASE_URL = os.getenv(
    "HINDSIGHT_BASE_URL",
    "https://api.hindsight.vectorize.io",
)
BANK_ID = os.getenv("HINDSIGHT_BANK_ID")

if not HINDSIGHT_API_KEY:
    raise ValueError("HINDSIGHT_API_KEY is not configured")

if not BANK_ID:
    raise ValueError("HINDSIGHT_BANK_ID is not configured")


def get_hindsight_client():
    return Hindsight(
        base_url=HINDSIGHT_BASE_URL,
        api_key=HINDSIGHT_API_KEY,
    )


def retain_memory(
    content: str,
    context: str = "ADM organizational memory",
    metadata: dict | None = None,
):
    client = get_hindsight_client()

    try:
        return client.retain(
            bank_id=BANK_ID,
            content=content,
            context=context,
            metadata=metadata,
        )
    finally:
        client.close()


def recall_memory(query: str):
    client = get_hindsight_client()

    try:
        return client.recall(
            bank_id=BANK_ID,
            query=query,
        )
    finally:
        client.close()

def retain_outcome(
    decision_id: str,
    vendor: str,
    actual_outcome: str,
    consequences: str,
    lesson: str,
):
    outcome = f"""
    Vendor decision outcome:

    Decision ID: {decision_id}
    Vendor: {vendor}

    Actual outcome:
    {actual_outcome}

    Consequences:
    {consequences}

    Lesson learned:
    {lesson}
    """

    return retain_memory(
        content=outcome,
        context="ADM vendor decision outcome and lesson",
        metadata={
            "decision_id": decision_id,
            "vendor": vendor,
            "workflow": "vendor-selection",
            "memory_type": "outcome",
        },
    )
def retain_decision(
    decision_id: str,
    vendor: str,
    situation: str,
    requirements: str,
    options_considered: str,
    reason_for_selection: str,
    expected_outcome: str,
):
    decision = f"""
    Historical vendor-selection decision:

    Decision ID: {decision_id}
    Vendor selected: {vendor}

    Situation:
    {situation}

    Requirements:
    {requirements}

    Options considered:
    {options_considered}

    Reason for selecting {vendor}:
    {reason_for_selection}

    Expected outcome:
    {expected_outcome}
    """

    return retain_memory(
        content=decision,
        context="ADM historical vendor-selection decision",
        metadata={
            "decision_id": decision_id,
            "vendor": vendor,
            "workflow": "vendor-selection",
            "memory_type": "decision",
        },
    )