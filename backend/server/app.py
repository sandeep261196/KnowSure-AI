import os
from openai import OpenAI
from fastapi import FastAPI, Body
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Load API key safely from environment
api_key = os.getenv("OPENROUTER_API_KEY")
if not api_key:
    raise ValueError("OPENROUTER_API_KEY not set. Run: export OPENROUTER_API_KEY=your_key")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key,
)

app = FastAPI(title="Clear Answers AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from typing import List, Optional

class Message(BaseModel):
    role: str
    content: str

class AskRequest(BaseModel):
    question: str
    history: Optional[List[Message]] = None

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/ask")
def ask(req: AskRequest = Body(...)):
    try:
        # Use history if provided, else just the current question
        messages = req.history if req.history else [{"role": "user", "content": req.question}]
        completion = client.chat.completions.create(
            model="openai/gpt-oss-20b:free",
            messages=messages
        )
        answer = completion.choices[0].message.content
        return {
            "question": req.question,
            "answer": answer.strip()
        }
    except Exception as e:
        return {"error": str(e)}