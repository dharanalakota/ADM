from backend.adm_service import ask_adm


def main():
    question = """
    We need to select a software vendor for another time-sensitive
    project that requires delivery within 7 days and acceptable quality.
    What should we consider based on our previous organizational
    experience?
    """

    result = ask_adm(question)

    print("\n=== ADM SERVICE RESPONSE ===\n")
    print(result)


if __name__ == "__main__":
    main()
from memory.decision_support import generate_decision_support
from memory.hindsight_memory import retain_decision, retain_outcome
def record_decision(
    decision_id: str,
    vendor: str,
    situation: str,
    requirements: str,
    options_considered: str,
    reason_for_selection: str,
    expected_outcome: str,
):
    """
    Store a vendor-selection decision in Hindsight.
    """

    return retain_decision(
        decision_id=decision_id,
        vendor=vendor,
        situation=situation,
        requirements=requirements,
        options_considered=options_considered,
        reason_for_selection=reason_for_selection,
        expected_outcome=expected_outcome,
    )
from memory.hindsight_memory import retain_outcome


def record_outcome(
    decision_id: str,
    vendor: str,
    actual_outcome: str,
    consequences: str,
    lesson: str,
):
    """
    Store the actual outcome and lesson from a vendor decision in Hindsight.
    """

    return retain_outcome(
        decision_id=decision_id,
        vendor=vendor,
        actual_outcome=actual_outcome,
        consequences=consequences,
        lesson=lesson,
    )