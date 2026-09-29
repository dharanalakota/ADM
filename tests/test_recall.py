from memory.hindsight_memory import recall_memory


def main():
    query = """
    We need to select a software vendor for another time-sensitive project
    with a 7-day delivery requirement.

    What can we learn from our previous vendor-selection decisions,
    including both successful and unsuccessful experiences?
    Include the decisions, what happened afterward, and the lessons learned.
    """

    results = recall_memory(query)

    print("Historical vendor experience recall completed!")

    for index, result in enumerate(results, start=1):
        print(f"\n--- Memory {index} ---")
        print(result)


if __name__ == "__main__":
    main()