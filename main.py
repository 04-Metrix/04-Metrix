from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.ingest import router as ingest_router
from routes.ingest_link import router as ingest_link_router
from routes.summary import router as summary_router
from routes.quiz import router as quiz_router
from routes.flashcards import router as flashcards_router
from routes.chat import router as chat_router

app = FastAPI(
    title="Lecture AI Tool Backend",
    description="Backend for AI-powered lecture video processing",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingest_router, prefix="/api", tags=["Ingest"])
app.include_router(ingest_link_router, prefix="/api", tags=["Ingest Link"])
app.include_router(summary_router, prefix="/api", tags=["Summary"])
app.include_router(quiz_router, prefix="/api", tags=["Quiz"])
app.include_router(flashcards_router, prefix="/api", tags=["Flashcards"])
app.include_router(chat_router, prefix="/api", tags=["Chat"])


@app.get("/")
def home():
    return {
        "message": "Lecture AI Tool Backend Running Successfully"
    }