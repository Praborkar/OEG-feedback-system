import { useState, useEffect } from "react";

export default function FeedbackModal({ onSubmit, onClose }) {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating || loading) return;

    try {
      setLoading(true);
      await onSubmit({ rating, comment });
      setStep("success");
    } catch {
      alert("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step !== "success") return;
    const t = setTimeout(() => onClose("submitted"), 1400);
    return () => clearTimeout(t);
  }, [step, onClose]);

  return (
    <div className="ff-overlay">
      {step === "form" ? (
        <div className="ff-modal" onClick={(e) => e.stopPropagation()}>
          <button className="ff-close" onClick={() => onClose("skipped")}>
            ×
          </button>

          <h2 className="ff-title">Lesson Feedback</h2>
          <p className="ff-subtitle">Rate & share feedback</p>

          {/* Rating */}
          <div className="ff-rating-row">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={`rating-btn ${rating === n ? "active" : ""}`}
                onClick={() => setRating(n)}
              >
                {n}
              </button>
            ))}
          </div>

          <p className="ff-helper">Rating required</p>

          {/* Comment */}
          <div className="ff-comment">
            <label className="ff-label">
              Comments <span className="ff-optional">(optional)</span>
            </label>

            <textarea
              className="ff-textarea"
              rows={2}
              placeholder="Share feedback…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="ff-actions">
            <button
              className="btn secondary"
              onClick={() => onClose("skipped")}
              disabled={loading}
            >
              Skip
            </button>

            <button
              className={`btn primary ${!rating ? "disabled" : ""}`}
              onClick={handleSubmit}
              disabled={!rating || loading}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        /* ✅ OLD BIG CONFIRMATION BOX */
        <div className="ff-confirm-box">
          <div className="ff-check">✓</div>
          <h3>Feedback submitted</h3>
          <p>Thanks for helping us improve.</p>
        </div>
      )}

      {/* ================= STYLES ================= */}
      <style>{`
        .ff-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }

        /* 🔥 ULTRA COMPACT FORM MODAL */
        .ff-modal {
          width: 100%;
          max-width: 360px;
          background: #f3f9ff;
          border-radius: 14px;
          padding: 14px 14px 16px;
          box-shadow: 0 18px 40px rgba(15,23,42,0.25);
          position: relative;
        }

        .ff-close {
          position: absolute;
          top: 8px;
          right: 10px;
          font-size: 18px;
          background: none;
          border: none;
          cursor: pointer;
          color: #475569;
        }

        .ff-title {
          text-align: center;
          font-size: 1.1rem;
          margin-bottom: 2px;
        }

        .ff-subtitle {
          text-align: center;
          font-size: 0.8rem;
          margin-bottom: 10px;
          color: #64748b;
        }

        .ff-rating-row {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 2px;
        }

        .rating-btn {
          width: 34px;
          height: 34px;
          font-size: 13px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          background: #fff;
          font-weight: 600;
        }

        .rating-btn.active {
          background: #0f172a;
          color: #fff;
        }

        .ff-helper {
          font-size: 0.7rem;
          text-align: center;
          margin-bottom: 8px;
          color: #64748b;
        }

        .ff-comment {
          margin-bottom: 10px;
        }

        .ff-label {
          font-size: 11.5px;
          margin-bottom: 4px;
          display: block;
        }

        .ff-optional {
          font-weight: 400;
          color: #94a3b8;
        }

        .ff-textarea {
          width: 95%;
          border-radius: 10px;
          padding: 8px;
          font-size: 13px;
          border: 1px solid #e5e7eb;
          resize: none;
        }

        .ff-actions {
          display: flex;
          gap: 8px;
        }

        .btn {
          flex: 1;
          padding: 9px;
          font-size: 13px;
          border-radius: 10px;
          border: none;
          font-weight: 600;
        }

        .btn.primary {
          background: #22c55e;
          color: #fff;
        }

        .btn.secondary {
          background: #fff;
          border: 1px solid #e5e7eb;
        }

        .btn.primary.disabled {
          opacity: 0.6;
        }

        /* ✅ OLD BIG CONFIRMATION BOX STYLES */
        .ff-confirm-box {
          background: #fff;
          padding: 36px 28px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 30px 70px rgba(15,23,42,.25);
        }

        .ff-check {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #22c55e;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          margin: 0 auto 14px;
        }

        /* Mobile extra shrink */
        @media (max-width: 380px) {
          .ff-modal {
            max-width: 320px;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}
