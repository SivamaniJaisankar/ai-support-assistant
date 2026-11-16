import json
from pathlib import Path

import chromadb

#Locate the project and support documents
BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data" / "support_documents.json"

#Store chromadb data persistently inside the project
CHROMA_DIR = BASE_DIR / "chroma_data"

def load_documents():
    """Load support documents from json file"""
    with open(DATA_FILE,"r",encoding="utf-8") as file:
        documents = json.load(file)
    return documents

def initialize_knowledge_base():
    "Load documents into chromadb"
    documents = load_documents()

    client = chromadb.PersistentClient(path=str(CHROMA_DIR))

    collection = client.get_or_create_collection(
        name="support_documents"
    )

    collection.upsert(
        ids=[doc["id"] for doc in documents],
        documents=[
            f'{doc["title"]}: {doc["content"]}'
            for doc in documents
        ],
        metadatas=[
            {"title": doc["title"]}
            for doc in documents
        ]
    )

    print(f"Knowledge base initialized with {len(documents)} documents")

    return collection

if __name__ == "__main__":
    initialize_knowledge_base()