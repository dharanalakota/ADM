from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.adm_service import (
    ask_adm,
    record_decision,
    record_outcome,
)


app = FastAPI(title="ADM API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://localhost:3001",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AskRequest(BaseModel):
    current_decision: str


class DecisionRequest(BaseModel):
    decision_id: str
    vendor: str
    situation: str
    requirements: str
    options_considered: str
    reason_for_selection: str
    expected_outcome: str


class OutcomeRequest(BaseModel):
    decision_id: str
    vendor: str
    actual_outcome: str
    consequences: str
    lesson: str


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "ADM API",
    }


@app.post("/api/ask")
def ask(request: AskRequest):
    result = ask_adm(request.current_decision)

    return {
        "result": result,
        "human_decision_required": True,
    }


@app.post("/api/decisions")
def create_decision(request: DecisionRequest):
    result = record_decision(
        decision_id=request.decision_id,
        vendor=request.vendor,
        situation=request.situation,
        requirements=request.requirements,
        options_considered=request.options_considered,
        reason_for_selection=request.reason_for_selection,
        expected_outcome=request.expected_outcome,
    )

    return {
        "success": True,
        "result": result,
    }


@app.post("/api/outcomes")
def create_outcome(request: OutcomeRequest):
    result = record_outcome(
        decision_id=request.decision_id,
        vendor=request.vendor,
        actual_outcome=request.actual_outcome,
        consequences=request.consequences,
        lesson=request.lesson,
    )

    return {
        "success": True,
        "result": result,
    }