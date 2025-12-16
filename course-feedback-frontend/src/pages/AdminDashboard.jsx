import { useEffect, useMemo, useState } from "react";
import { getAllFeedback, getAdminStats } from "../api/admin.api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState({
    total_feedback: 0,
    average_rating: 0,
    median_rating: 0,
  });

  /* ---------- Filters ---------- */
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await getAdminStats();
      const feedbackRes = await getAllFeedback();

      if (statsRes.data?.data) setStats(statsRes.data.data);
      if (feedbackRes.data?.data) setFeedback(feedbackRes.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/admin/login");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  /* ---------- FILTERED DATA ---------- */
  const filteredFeedback = useMemo(() => {
    let data = [...feedback];

    // 🔍 Search
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (f) =>
          f.feedback?.toLowerCase().includes(q) ||
          f.video_id?.toLowerCase().includes(q) ||
          f.session_id?.toLowerCase().includes(q)
      );
    }

    // ⭐ Rating filter
    if (ratingFilter !== "all") {
      data = data.filter((f) => String(f.rating) === ratingFilter);
    }

    // ⏱ Date sort
    data.sort((a, b) => {
      const da = new Date(a.created_at);
      const db = new Date(b.created_at);
      return sortOrder === "newest" ? db - da : da - db;
    });

    return data;
  }, [feedback, search, ratingFilter, sortOrder]);

  return (
    <div className="admin-root">
      {/* ================= HEADER ================= */}
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Course feedback analytics</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      {/* ================= STATS ================= */}
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Feedback</span>
          <strong>{stats.total_feedback}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Average Rating</span>
          <strong>⭐ {stats.average_rating}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Median Rating</span>
          <strong>📈 {stats.median_rating}</strong>
        </div>
      </section>

      {/* ================= FILTER BAR ================= */}
      <section className="filter-bar">
        <input
          type="text"
          placeholder="Search feedback, video, session…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="all">All ratings</option>
          <option value="5">5 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="1">1 ⭐</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </section>

      {/* ================= TABLE ================= */}
      <section className="table-section">
        <h3>All Feedback</h3>

        <div className="table-wrap">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Rating</th>
                <th>Feedback</th>
                <th>Video</th>
                <th>Session</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedback.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty">
                    No matching feedback found
                  </td>
                </tr>
              ) : (
                filteredFeedback.map((f, i) => (
                  <tr key={i}>
                    <td className="rating">{f.rating}</td>
                    <td>{f.feedback || "-"}</td>
                    <td>{f.video_id}</td>
                    <td>{f.session_id}</td>
                    <td>{new Date(f.created_at).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= STYLES ================= */}
      <style>{`
        .admin-root {
          min-height: 100vh;
          padding: 24px;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
          background: #f9fafb;
          color: #0f172a;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .logout-btn {
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          background: #fff;
          cursor: pointer;
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .stat-card {
          background: #fff;
          padding: 18px;
          border-radius: 14px;
          box-shadow: 0 12px 30px rgba(15,23,42,0.08);
        }

        /* ---------- FILTER BAR ---------- */
        .filter-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .filter-bar input,
        .filter-bar select {
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          font-size: 14px;
        }

        .filter-bar input {
          flex: 1;
          min-width: 220px;
        }

        /* ---------- TABLE ---------- */
        .table-wrap {
          background: #fff;
          border-radius: 14px;
          overflow-x: auto;
          box-shadow: 0 12px 30px rgba(15,23,42,0.08);
        }

        .feedback-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 720px;
        }

        .feedback-table th,
        .feedback-table td {
          padding: 12px 14px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 0.9rem;
        }

        .feedback-table th {
          background: #f8fafc;
          font-weight: 600;
        }

        .rating {
          font-weight: 700;
        }

        .empty {
          text-align: center;
          padding: 24px;
          color: #94a3b8;
        }

        html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}


        @media (max-width: 640px) {
          .admin-root {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}
