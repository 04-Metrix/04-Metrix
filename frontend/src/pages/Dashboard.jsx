import { useState, useRef, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

function Card({ title, desc, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-5 flex flex-col items-start gap-3 border hover:shadow-md transition"
    >
      <div className="text-3xl">{icon}</div>
      <div className="text-left">
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="text-sm text-slate-500">{desc}</div>
      </div>
    </button>
  );
}

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [linkInput, setLinkInput] = useState("");
  const [pasteInput, setPasteInput] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (inputValue.trim() === "" || isTyping) return;

    const userMessage = inputValue.trim();

    const userMsg = {
      sender: "user",
      text: userMessage,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message: userMessage,
      });

      const botMsg = {
        sender: "bot",
        text:
          response.data.reply ||
          response.data.response ||
          "No response returned from backend",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const botMsg = {
        sender: "bot",
        text: "Backend chat route is not connected yet.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBackendUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const response = await axios.post(
        `${API_BASE_URL}/api/ingest`,
        formData
      );

      setUploadResult(response.data);

      const newActivity = {
        id: Date.now(),
        type: "Upload",
        description: response.data.filename || file.name,
        date: "Just now",
      };

      setRecentActivity((prev) => [newActivity, ...prev]);
      setShowUploadModal(false);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleLinkSubmit = async (e) => {
    e?.preventDefault();
    if (!linkInput) return;
    console.log("handleLinkSubmit called", linkInput);
    setUploading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ingest-link`, {
        url: linkInput,
      });
      console.log("ingest-link response", response?.data);

      if (response.data.error) {
        alert("Failed to process link: " + response.data.error);
      } else {
        setUploadResult(response.data);

        const newActivity = {
          id: Date.now(),
          type: "Link",
          description: linkInput,
          date: "Just now",
        };

        setRecentActivity((prev) => [newActivity, ...prev]);
      }
    } catch (err) {
      console.error("Link ingest failed:", err);
      alert("Failed to process link. Check console for details.");
    } finally {
      setLinkInput("");
      setShowLinkModal(false);
      setUploading(false);
    }
  };

  const handlePasteSubmit = async (e) => {
    e?.preventDefault();
    if (!pasteInput) return;

    const result = { filename: "Pasted Text", transcript: pasteInput };
    setUploadResult(result);

    const newActivity = {
      id: Date.now(),
      type: "Paste",
      description: pasteInput.slice(0, 60) + (pasteInput.length > 60 ? "..." : ""),
      date: "Just now",
    };

    setRecentActivity((prev) => [newActivity, ...prev]);
    setPasteInput("");
    setShowPasteModal(false);
  };

  const closeAllModals = () => {
    setShowUploadModal(false);
    setShowLinkModal(false);
    setShowPasteModal(false);
    setShowRecordModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
            Brain Mode On.
          </h1>
          <p className="text-slate-500 text-lg">
            Your workspace has {recentActivity.length} indexed documents.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Card
            title="Upload"
            desc="PDF/Audio"
            icon="📁"
            onClick={() => setShowUploadModal(true)}
          />
          <Card
            title="Link"
            desc="YouTube/Web"
            icon="🔗"
            onClick={() => setShowLinkModal(true)}
          />
          <Card
            title="Paste"
            desc="Text Fragments"
            icon="📋"
            onClick={() => setShowPasteModal(true)}
          />
          <Card
            title="Record"
            desc="Live Embedding"
            icon="🎤"
            onClick={() => setShowRecordModal(true)}
          />
        </div>

        {uploading && (
          <div className="mb-8 bg-blue-50 border border-blue-100 text-blue-700 px-6 py-4 rounded-3xl text-sm font-semibold animate-pulse">
            Processing your file...
          </div>
        )}

        {/* Upload modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md">
              <h3 className="text-lg font-semibold mb-4">Upload file</h3>
              <input
                type="file"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleBackendUpload(f);
                }}
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-slate-200"
                  onClick={closeAllModals}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Link modal */}
        {showLinkModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form
              onSubmit={handleLinkSubmit}
              className="bg-white rounded-2xl p-6 w-[90%] max-w-md"
            >
              <h3 className="text-lg font-semibold mb-4">Add link</h3>
              <input
                type="text"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full border rounded px-3 py-2"
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-slate-200"
                  onClick={closeAllModals}
                >
                  Cancel
                </button>
                {/* REMOVED onClick={handleLinkSubmit} below */}
                <button type="submit" className="px-4 py-2 rounded bg-slate-800 text-white">
                  Add
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Paste modal */}
        {showPasteModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form
              onSubmit={handlePasteSubmit}
              className="bg-white rounded-2xl p-6 w-[90%] max-w-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Paste text</h3>
              <textarea
                value={pasteInput}
                onChange={(e) => setPasteInput(e.target.value)}
                className="w-full border rounded px-3 py-2 h-40"
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-slate-200"
                  onClick={closeAllModals}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded bg-slate-800 text-white">
                  Add
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Record modal (placeholder) */}
        {showRecordModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md">
              <h3 className="text-lg font-semibold mb-4">Record (not implemented)</h3>
              <p className="text-sm text-slate-500">Live recording is not supported yet.</p>
              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 rounded bg-slate-200"
                  onClick={closeAllModals}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {uploadResult && (
          <div className="mb-8 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Latest Ingestion
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Preview, transcript, and extracted content
                </p>
              </div>

              <span className="bg-green-100 text-green-700 text-xs font-semibold px-4 py-2 rounded-full">
                Success
              </span>
            </div>

            <div className="space-y-6 text-sm text-slate-700">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                    Filename
                  </p>
                  <p className="font-semibold text-slate-900 break-words">
                    {uploadResult.filename || "Unknown"}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                    Source
                  </p>
                  <p className="font-semibold text-slate-900 break-words">
                    {uploadResult.file_path || "No path available"}
                  </p>
                </div>
              </div>

              {uploadResult.file_path &&
                (uploadResult.file_path.includes("youtube.com") ||
                  uploadResult.file_path.includes("youtu.be")) && (
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4">
                      Video Preview
                    </h4>

                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm bg-black">
                      <iframe
                        className="w-full h-[420px]"
                        src={`https://www.youtube.com/embed/${
                          uploadResult.file_path.includes("youtu.be/")
                            ? uploadResult.file_path
                                .split("youtu.be/")[1]
                                .split("?")[0]
                            : new URL(uploadResult.file_path).searchParams.get("v")
                        }`}
                        title="YouTube video preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4">
                  Transcript
                </h4>

                <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 text-slate-700 leading-8 whitespace-pre-wrap max-h-[350px] overflow-y-auto text-[15px]">
                  {uploadResult.transcript ||
                    uploadResult.message ||
                    "No transcript returned from backend"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}