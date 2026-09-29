from memory.decision_support import generate_decision_support
from memory.hindsight_memory import retain_decision, retain_outcome


def ask_adm(current_decision: str) -> str:
    """
    Generate decision support using ADM's historical organizational memory.

    The human decision-maker remains responsible for the final decision.
    """

    if not current_decision.strip():
        raise ValueError("Current decision cannot be empty.")

    return generate_decision_support(current_decision)


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