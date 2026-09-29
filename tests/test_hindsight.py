from memory.hindsight_memory import retain_memory


def main():
    decision = """
    Historical vendor-selection decision:

    Decision ID: DEC-001
    Vendor selected: Vendor A
    Situation: The project needed a software vendor for an upcoming implementation.
    Requirements: Low cost, acceptable quality, and delivery within 7 days.
    Options considered: Vendor A, Vendor B, Vendor C.
    Reason for selecting Vendor A: Vendor A offered the lowest cost and promised delivery within 7 days.
    Expected outcome: The project team expected the software to arrive within 7 days at the lowest available cost.
    """

    result = retain_memory(
        content=decision,
        context="ADM historical vendor-selection decision",
        metadata={
            "decision_id": "DEC-001",
            "vendor": "Vendor A",
            "workflow": "vendor-selection",
        },
    )

    print("Memory retained successfully!")
    print(result)


if __name__ == "__main__":
    main()