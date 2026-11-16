from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag import answer_question 

app = FastAPI(title="AI Support Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    question: str
    answer: str

@app.get("/health")
def health_check():
    return {"status":"healthy"}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try: 
        answer = answer_question(request.question)

        return ChatResponse(
            question=request.question,
            answer=answer
        )
    except Exception as error:
        print(f"Error while generating answer:", error)

        raise HTTPException(
            status_code=503,
            detail="AI Service is currently unavailable. Please try again later."
        ) 