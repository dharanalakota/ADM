from memory.decision_support import generate_decision_support


def main():
    query = """
    We need to select a software vendor for a time-sensitive project.
    The project needs acceptable quality and delivery within 7 days.
    What should the project manager consider based on our previous
    vendor-selection experience?
    """

    result = generate_decision_support(query)

    print("\n=== ADM DECISION SUPPORT ===\n")
    print(result)


if __name__ == "__main__":
    main()