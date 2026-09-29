from memory.decision_support import get_historical_context


query = """
We are selecting a vendor for an underwater satellite
manufacturing project with a completely unique requirement.
"""


result = get_historical_context(query)

print("=== NO MEMORY TEST ===")
print(result)