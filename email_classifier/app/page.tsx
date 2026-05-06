"use client";

import { useState } from "react";

type Prediction = "Spam" | "Not Spam" | "";

export default function SpamCheckerPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Prediction>("");
  const [loading, setLoading] = useState(false);

  const checkSpam = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResult(data.prediction);
    } catch (err) {
      console.error(err);
      setResult("Not Spam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="page">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="logoSection">
            <div className="logoPulse" />
            <h1 className="logoText">VOIDSCAN</h1>
          </div>

          <div className="navLinks">
            <span>Detection</span>
            <span>Threat Logs</span>
            <span>Security</span>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="heroLeft">
            <p className="miniText">AI SECURITY ANALYZER</p>

            <h1 className="mainHeading">
              Detect <span>Spam</span>
              <br />
              Email Before It Hits
            </h1>

            <p className="description">
              Analyze suspicious Email messages using machine learning. Built
              with FastAPI, NLP, and Next.js.
            </p>
          </div>

          {/* ANALYZER PANEL */}
          <div className="panel">
            <div className="panelGlow" />

            <div className="panelHeader">
              <div className="statusDot" />
              <span>LIVE ANALYSIS</span>
            </div>

            <textarea
              className="input"
              placeholder="Paste suspicious email message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button className="btn" onClick={checkSpam}>
              {loading ? "Analyzing..." : "Run Threat Scan"}
            </button>

            <div
              className={`result ${
                result === "Spam" ? "spam" : result === "Not Spam" ? "safe" : ""
              }`}
            >
              {loading && (
                <div className="loadingWrapper">
                  <span className="pulse" />
                  <span>SCANNING</span>
                </div>
              )}

              {!loading && result && (
                <div className="resultText">
                  {result === "Spam" ? "⚠ SPAM DETECTED" : "✓ SAFE MESSAGE"}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BACKGROUND GRID */}
        <div className="gridOverlay" />
      </main>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Audiowide&family=IBM+Plex+Mono:wght@300;400;500;600&display=swap");

        .page {
          min-height: 100vh;
          background: #050505;
          overflow: hidden;
          color: white;
          position: relative;
          font-family: "IBM Plex Mono", monospace;
        }

        .gridOverlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px
            );

          background-size: 40px 40px;
          z-index: 0;
          pointer-events: none;
        }

        .navbar {
          position: relative;
          z-index: 10;
          padding: 24px 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
        }

        .logoSection {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logoPulse {
          width: 14px;
          height: 14px;
          background: #00ff9f;
          border-radius: 50%;
          box-shadow: 0 0 20px #00ff9f;
          animation: blink 1.5s infinite;
        }

        .logoText {
          font-family: "Audiowide", cursive;
          font-size: 24px;
          letter-spacing: 3px;
          color: #00ff9f;
        }

        .navLinks {
          display: flex;
          gap: 30px;
          color: #8b8b8b;
          font-size: 14px;
        }

        .navLinks span {
          cursor: pointer;
          transition: 0.3s;
        }

        .navLinks span:hover {
          color: white;
        }

        .hero {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 80px 60px;
          gap: 50px;
        }

        .heroLeft {
          flex: 1;
        }

        .miniText {
          color: #00ff9f;
          margin-bottom: 20px;
          letter-spacing: 3px;
          font-size: 13px;
        }

        .mainHeading {
          font-size: 82px;
          line-height: 0.95;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .mainHeading span {
          color: #00ff9f;
          text-shadow: 0 0 20px rgba(0, 255, 159, 0.5);
        }

        .description {
          max-width: 520px;
          color: #888;
          line-height: 1.8;
          margin-bottom: 40px;
        }

        .stats {
          display: flex;
          gap: 20px;
        }

        .statCard {
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 20px;
          width: 180px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
        }

        .statCard h2 {
          color: #00ff9f;
          margin-bottom: 10px;
          font-size: 32px;
        }

        .statCard p {
          color: #888;
          font-size: 14px;
        }

        .panel {
          width: 480px;
          position: relative;
          border: 1px solid rgba(0, 255, 159, 0.2);
          background: rgba(10, 10, 10, 0.9);
          padding: 30px;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 0 0 80px rgba(0, 255, 159, 0.08);
        }

        .panelGlow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(0, 255, 159, 0.08);
          filter: blur(100px);
          top: -120px;
          right: -120px;
        }

        .panelHeader {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: #00ff9f;
          letter-spacing: 2px;
          font-size: 13px;
        }

        .statusDot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #00ff9f;
          box-shadow: 0 0 10px #00ff9f;
        }

        .input {
          width: 100%;
          height: 180px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 18px;
          color: white;
          resize: none;
          outline: none;
          font-size: 14px;
          margin-bottom: 20px;
          transition: 0.3s;
        }

        .input:focus {
          border-color: #00ff9f;
          box-shadow: 0 0 20px rgba(0, 255, 159, 0.15);
        }

        .btn {
          width: 100%;
          padding: 16px;
          border: none;
          background: #00ff9f;
          color: black;
          font-weight: bold;
          cursor: pointer;
          letter-spacing: 2px;
          transition: 0.3s;
          position: relative;
          overflow: hidden;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 255, 159, 0.2);
        }

        .result {
          margin-top: 24px;
          min-height: 70px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          letter-spacing: 2px;
          background: rgba(255, 255, 255, 0.02);
        }

        .spam {
          border-color: rgba(255, 59, 59, 0.4);
          color: #ff4d4d;
          box-shadow: 0 0 25px rgba(255, 59, 59, 0.15);
        }

        .safe {
          border-color: rgba(0, 255, 159, 0.4);
          color: #00ff9f;
          box-shadow: 0 0 25px rgba(0, 255, 159, 0.15);
        }

        .loadingWrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pulse {
          width: 12px;
          height: 12px;
          background: #00ff9f;
          border-radius: 50%;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.8);
            opacity: 0.4;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 1;
          }
        }

        @media (max-width: 1100px) {
          .hero {
            flex-direction: column;
          }

          .mainHeading {
            font-size: 58px;
          }

          .panel {
            width: 100%;
            max-width: 600px;
          }
        }

        @media (max-width: 700px) {
          .navbar {
            padding: 20px;
          }

          .hero {
            padding: 40px 20px;
          }

          .mainHeading {
            font-size: 44px;
          }

          .navLinks {
            display: none;
          }

          .stats {
            flex-direction: column;
          }

          .statCard {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
