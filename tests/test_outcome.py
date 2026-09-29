from memory.hindsight_memory import retain_outcome


def main():
    result = retain_outcome(
        decision_id="DEC-001",
        vendor="Vendor A",
        actual_outcome=(
            "Vendor A delivered after 14 days instead of the promised "
            "7 days and had quality issues."
        ),
        consequences=(
            "The project was delayed and the team spent additional time "
            "resolving quality problems."
        ),
        lesson=(
            "For time-sensitive projects, delivery promises should be "
            "validated against stronger evidence rather than relying "
            "only on the lowest-cost offer."
        ),
    )

    print("Outcome and lesson retained successfully!")
    print(result)


if __name__ == "__main__":
    main()