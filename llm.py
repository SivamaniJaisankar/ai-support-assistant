import requests

OLLAMA_URL = 'http://localhost:11434/api/generate'
MODEL_NAME = 'llama3.2:1b'

def generate_answer(question, context):
    print('Context:', context)
    "Generate an answer using ollam and retrieved context"

    prompt = f"""
    Role: You are an application support assistant.
    Task: Analyze the provided context and the user's question, then determine whether the context contains sufficient information to answer the question.
    Rules:
    1. Only If the context exists but does not contain sufficient information to answer the user's question:
            Output exactly:
            Support documents do not contain enough information.
    2. Only If the context contains information that directly answers the user's question:
        - Use only the provided context.
        - Do not use external knowledge, assumptions, or inferred information.
        - Provide clear step-by-step instructions.
        Output Format:
        Steps to Follow:
        1. <Step 1>
        2. <Step 2>
        3. <Step 3>

Context:
{context}
    
Answer:
"""


    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False,
        "options":{
            "temperature": 0
        }
    }

    response = requests.post(OLLAMA_URL, json=payload, timeout=120)
    response.raise_for_status()
    result = response.json()

    return result["response"].strip()

