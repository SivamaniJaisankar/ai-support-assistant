from knowledge_base import initialize_knowledge_base
from llm import generate_answer

# Step 1: Initialize knowledge base
collection = initialize_knowledge_base()

def answer_question(question):
    "Retrieve relevant documents and generate an answer"

    # Step 2: Retrieve relevant documents
    results = collection.query(
        query_texts = [question],
        n_results = 2
    )

    # Step 3: Extract the retrieved document text
    retrieved_documents = []
    print("Retrieved Documents:")
    for document, distance in zip(
        results["documents"][0],
        results["distances"][0]
    ):
        print("Document:", document)
        print("Distance:", distance)

        if distance < 1.0:
            retrieved_documents.append(document)

    # Step 4: Build the context 
    context = "\n\n".join(retrieved_documents)

    # Step 5: Generate the answer using Ollama
    answer = generate_answer(question, context)

    return answer

if __name__ == "__main__":
    question = input("Ask a support question: ")

    answer = answer_question(question)

    print("\nAI Assistant:", answer)