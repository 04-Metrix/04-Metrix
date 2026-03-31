# Lecture AI Tool

## 1. Solution Overview

Lecture AI Tool is an AI-powered learning assistant designed to help users understand long lecture videos, uploaded files, and YouTube content more effectively.

The platform allows users to:

* Upload video or audio files
* Paste YouTube links
* Extract transcripts automatically
* Store lecture content for future retrieval
* Chat with an AI assistant about uploaded content
* Generate summaries, quizzes, and flashcards

The goal of the system is to make lecture consumption faster, smarter, and more interactive.

---

## 2. Features of the System

### Core Features

* Upload lecture videos and audio files
* Upload supported file formats such as MP4, MOV, AVI, and MKV
* Process YouTube video links
* Generate transcripts from uploaded media using Whisper
* Generate transcripts from YouTube videos using youtube-transcript-api
* Store transcripts in a local vector database
* Chatbot support for asking questions related to uploaded content
* Recent activity tracking
* Clean dashboard UI with cards for Upload, Link, Paste, and Record
* YouTube video preview for pasted links

### Planned Features

* AI-generated summaries
* Flashcards generation
* Quiz generation
* Flowchart visualization
* PDF upload support
* Voice recording and live transcription

---

## 3. Tech Stack Used

### Frontend

* React + Vite
* Tailwind CSS
* Axios
* React Router DOM
* Zustand
* Mermaid.js

### Backend

* Python
* FastAPI
* Uvicorn
* Whisper
* youtube-transcript-api
* ChromaDB
* LangChain
* Ollama
* sentence-transformers

### Database / Storage

* ChromaDB for transcript embeddings and chatbot retrieval
* Local file storage for uploaded videos

---

## 4. Setup and Installation Steps

### Clone the Project

```bash
git clone <your-repository-url>
cd lecture-ai-tool
```

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
pip install youtube-transcript-api
uvicorn main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

## 5. Usage Instructions

### Uploading a File

1. Open the dashboard
2. Click the Upload card
3. Select a supported video or audio file
4. Wait for the transcript to be generated
5. View transcript and interact with the chatbot

### Using a YouTube Link

1. Click the Link card
2. Paste a valid YouTube video URL
3. Click Add
4. Wait for the transcript to be generated
5. View the embedded video preview and transcript

### Using the Chatbot

1. Upload a file or paste a YouTube link
2. Scroll to the chatbot section
3. Ask questions related to the uploaded content
4. Receive AI-generated responses based on the stored transcript

---

## 6. Team Details

### Team Members

* S. Vinodkumar
* Akshith Anilkumar
* Shashank Chowdary
* Venkata Siva Kumar
