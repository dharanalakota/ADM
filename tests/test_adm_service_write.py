from backend.adm_service import record_decision, record_outcome


def main():
    decision_result = record_decision(
        decision_id="DEC-003",
        vendor="Vendor C",
        situation=(
            "The project needs a software vendor for a time-sensitive "
            "implementation."
        ),
        requirements=(
            "Acceptable quality and delivery within 7 days."
        ),
        options_considered="Vendor A, Vendor B, Vendor C",
        reason_for_selection=(
            "Vendor C provided the strongest combination of delivery "
            "evidence and quality controls for this project."
        ),
        expected_outcome=(
            "The software should be delivered within 7 days and meet "
            "the agreed quality requirements."
        ),
    )

    print("Decision recorded through ADM service!")
    print(decision_result)

    outcome_result = record_outcome(
        decision_id="DEC-003",
        vendor="Vendor C",
        actual_outcome=(
            "Vendor C delivered within 7 days and the software met "
            "the agreed quality requirements."
        ),
        consequences=(
            "The project stayed on schedule and no significant rework "
            "was required."
        ),
        lesson=(
            "Documented delivery evidence and clear quality controls "
            "provided useful information when evaluating a time-sensitive "
            "vendor decision."
        ),
    )

    print("\nOutcome recorded through ADM service!")
    print(outcome_result)


if __name__ == "__main__":
    main()