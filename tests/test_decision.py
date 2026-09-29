from memory.hindsight_memory import retain_decision


def main():
    result = retain_decision(
        decision_id="DEC-002",
        vendor="Vendor B",
        situation=(
            "The project needs a software vendor for a time-sensitive "
            "implementation."
        ),
        requirements=(
            "Acceptable quality and delivery within 7 days."
        ),
        options_considered="Vendor A, Vendor B, Vendor C",
        reason_for_selection=(
            "Vendor B provided stronger evidence of reliable delivery "
            "and a clearer quality-assurance process."
        ),
        expected_outcome=(
            "The team expects the software to arrive within 7 days "
            "with acceptable quality."
        ),
    )

    print("Decision retained successfully!")
    print(result)


if __name__ == "__main__":
    main()