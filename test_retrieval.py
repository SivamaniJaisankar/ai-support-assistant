from knowledge_base import initialize_knowledge_base

def test_retrieval():
    collection = initialize_knowledge_base()

    question = "How to reset my password"

    result = collection.query(
        query_texts = [question],
        n_results= 2
    )

    print("User question:", question)

    print("Retrieved Documents:")
    for document in result["documents"][0]: 
        print("\n", document) 

if __name__ == "__main__":
    test_retrieval()        