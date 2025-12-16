import { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import FeedbackModal from "../components/FeedbackModal";
import { submitFeedback } from "../api/feedback.api";
import { generateSessionId } from "../utils/session";
import { VIDEO } from "../utils/constants";

export default function CoursePage() {
  const [showModal, setShowModal] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [shownAt95, setShownAt95] = useState(false);

  const sessionId = generateSessionId(VIDEO.ID);

  /* ---------- 95% ---------- */
  const handle95 = () => {
    if (hasSubmitted || shownAt95) return;
    setShownAt95(true);
    setShowModal(true);
  };

  /* ---------- 99% ---------- */
  const handle99 = () => {
    if (hasSubmitted || !shownAt95) return;
    setShowModal(true);
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async ({ rating, comment }) => {
    if (!rating) return;

    await submitFeedback({
      rating,
      comment,
      video_id: VIDEO.ID,
      session_id: sessionId,
    });

    setHasSubmitted(true);
  };

  return (
    <div className="course-root">
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="container">
          <p className="breadcrumb">Courses / Web Development</p>
          <h1 className="title">React Developer Fundamentals</h1>
          <p className="subtitle">
            Build production-ready applications using modern frontend frameworks,
            scalable backend systems, and clean architecture principles.
          </p>

          <div className="meta">
            <MetaItem icon={<StarIcon />} text="4.8 Rating" />
            <MetaItem icon={<ClockIcon />} text="7 mins" />
            <MetaItem icon={<LevelIcon />} text="Beginner → Advanced" />
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="container content">
        {/* ---------- Tabs ---------- */}
        <div className="tabs">
          {["Overview", "Curriculum", "Resources"].map((tab, i) => (
            <button key={tab} className={`tab ${i === 0 ? "active" : ""}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid">
          {/* ---------- Left ---------- */}
          <div>
            <p className="section-label">Lesson 1</p>

            <div className="video-card">
              <VideoPlayer on95={handle95} on99={handle99} />
            </div>

            {/* ---------- What you'll learn ---------- */}
            <section className="content-card">
              <h3>What you’ll learn</h3>
              <ul className="learn-list">
                <li><CheckIcon /> Build full-stack apps using React & Node.js</li>
                <li><CheckIcon /> Design REST APIs and secure authentication</li>
                <li><CheckIcon /> Work with databases and deployment</li>
                <li><CheckIcon /> Apply clean architecture patterns</li>
              </ul>
            </section>

            {/* ---------- Curriculum Preview ---------- */}
            <section className="content-card">
              <h3>Curriculum preview</h3>
              <ul className="curriculum">
                <li><PlayIcon /> Introduction & Setup</li>
                <li><PlayIcon /> Frontend Fundamentals</li>
                <li><PlayIcon /> Backend APIs</li>
                <li><PlayIcon /> Authentication & Security</li>
                <li><PlayIcon /> Deployment & Scaling</li>
              </ul>
            </section>
          </div>

          {/* ---------- Right ---------- */}
          <aside className="side-card">
            <button className="primary-btn">Continue Learning</button>

            <ul className="info-list">
              <li><InfinityIcon /> Lifetime access</li>
              <li><CertificateIcon /> Certificate of completion</li>
              <li><ProjectIcon /> Real-world projects</li>
              <li><BriefcaseIcon /> Interview-ready skills</li>
            </ul>

            <div className="instructor">
              <h4>Instructor</h4>
              <p className="name">Senior Full-Stack Engineer</p>
              <p className="desc">
                8+ years experience building scalable production systems.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* ================= FEEDBACK ================= */}
      {showModal && (
        <FeedbackModal
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* ================= STYLES ================= */}
      <style>{`
        .course-root {
          --bg: #f9fafb;
          --card: #ffffff;
          --text: #0f172a;
          --muted: #64748b;
          --border: #e5e7eb;
          --accent: #5b6bc3;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px;
        }

        .hero {
          background:
            radial-gradient(600px 300px at 15% -10%, #dbeafe, transparent),
            radial-gradient(600px 300px at 90% -20%, #fde2f3, transparent);
          border-bottom: 1px solid var(--border);
        }

        .breadcrumb {
          font-size: 13px;
          color: var(--muted);
        }

        .title {
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 800;
        }

        .subtitle {
          max-width: 720px;
          font-size: 15px;
          color: #475569;
        }

        .meta {
          display: flex;
          gap: 18px;
          margin-top: 14px;
          font-size: 14px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tabs {
          display: flex;
          gap: 10px;
          margin: 28px 0 20px;
        }

        .tab {
          padding: 10px 16px;
          border-radius: 999px;
          background: #fff;
          font-weight: 500;
        }

        .tab.active {
          background: var(--accent);
          color: #fff;
        }

        .grid {
          display: grid;
          gap: 24px;
        }

        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: 2fr 1fr;
          }
        }

        .section-label {
          font-size: 12px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 6px;
        }

        .video-card {
          padding: 14px;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 40px 80px rgba(15,23,42,0.12);
        }

        .content-card {
          background: #fff;
          border-radius: 16px;
          padding: 20px;
          margin-top: 24px;
          border: 1px solid var(--border);
        }

        .learn-list li,
        .curriculum li,
        .info-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .side-card {
          background: var(--card);
          border-radius: 18px;
          padding: 22px;
          border: 1px solid var(--border);
          height: fit-content;
        }

        .primary-btn {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(180deg, #5868bf, #5d73cd);
          color: #fff;
          font-weight: 600;
        }

        .instructor {
          margin-top: 22px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
        }
          html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}
      `}</style>
    </div>
  );
}

/* ================= ICONS ================= */

const MetaItem = ({ icon, text }) => (
  <div className="meta-item">{icon}{text}</div>
);

const StarIcon = () => <svg viewBox="0 0 24 24"><polygon points="12 2 15 9 22 9 17 14 19 22 12 18 5 22 7 14 2 9 9 9" /></svg>;
const ClockIcon = () => <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="6" x2="12" y2="12" /><line x1="12" y1="12" x2="16" y2="14" /></svg>;
const LevelIcon = () => <svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h6" /></svg>;
const CheckIcon = () => <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>;
const PlayIcon = () => <svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4" /></svg>;
const InfinityIcon = () => <svg viewBox="0 0 24 24"><path d="M18 8c-2 0-4 4-6 4s-4-4-6-4-4 2-4 4 2 4 4 4 4-4 6-4 4 4 6 4 4-2 4-4-2-4-4-4z" /></svg>;
const CertificateIcon = () => <svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="14" /><path d="M8 21l4-3 4 3" /></svg>;
const ProjectIcon = () => <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="14" /><path d="M3 10h18" /></svg>;
const BriefcaseIcon = () => <svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" /><path d="M9 7V5h6v2" /></svg>;
