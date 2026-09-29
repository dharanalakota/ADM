from memory.hindsight_memory import retain_outcome


def main():
    result = retain_outcome(
        decision_id="DEC-002",
        vendor="Vendor B",
        actual_outcome=(
            "Vendor B delivered within 7 days and the delivered software "
            "met the agreed quality requirements."
        ),
        consequences=(
            "The project stayed on schedule and the team did not need "
            "significant rework to address quality problems."
        ),
        lesson=(
            "For time-sensitive projects, stronger evidence of delivery "
            "reliability and quality assurance can reduce project risk "
            "even when the selected vendor is not the lowest-cost option."
        ),
    )

    print("Vendor B outcome and lesson retained successfully!")
    print(result)


if __name__ == "__main__":
    main()