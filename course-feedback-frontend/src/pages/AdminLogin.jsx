import { useState } from "react";
import { adminLogin } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await adminLogin({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-root">
      <div className="admin-bg" />

      <form className="admin-card" onSubmit={handleLogin}>
        <div className="header">
          <h2>Admin Portal</h2>
          <p>Sign in to manage course feedback & analytics</p>
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button
          type="submit"
          className={`login-btn ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="footer">
          <span>Authorized admins only</span>
        </div>
      </form>

      {/* ================= STYLES (SCOPED) ================= */}
      <style>{`
        .admin-login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
          background: #f9fafb;
        }

        /* Background glow */
        .admin-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(600px 300px at 20% 10%, #dbeafe, transparent),
            radial-gradient(600px 300px at 80% 90%, #fde2f3, transparent);
          z-index: 0;
        }

        .admin-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 380px;
          background: #ffffff;
          border-radius: 16px;
          padding: 28px 26px 26px;
          box-shadow: 0 30px 70px rgba(15,23,42,0.15);
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: fadeUp 0.25s ease-out;
        }

        @keyframes fadeUp {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .header {
          text-align: center;
          margin-bottom: 4px;
        }

        .header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 6px;
          color: #0f172a;
        }

        .header p {
          font-size: 0.9rem;
          color: #64748b;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field label {
          font-size: 13px;
          color: #334155;
          font-weight: 500;
        }

        .field input {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          font-size: 14px;
          outline: none;
          transition: border 0.15s ease, box-shadow 0.15s ease;
        }

        .field input:focus {
          border-color: #2d4bff;
          box-shadow: 0 0 0 3px rgba(45,75,255,0.15);
        }

        .error {
          font-size: 0.85rem;
          color: #dc2626;
          background: #fee2e2;
          padding: 8px 10px;
          border-radius: 8px;
          text-align: center;
        }

        .login-btn {
          margin-top: 6px;
          padding: 13px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(180deg, #2d4bff, #0b1b5a);
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 12px 30px rgba(45,75,255,0.25);
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 16px 40px rgba(45,75,255,0.35);
        }

        .login-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .footer {
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
          margin-top: 6px;
        }
      `}</style>
    </div>
  );
}
