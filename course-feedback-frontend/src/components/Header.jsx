import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    "Our Services",
    "Training",
    "Instances",
    "Books",
    "Know More",
  ];

  return (
    <header className="oeg-header">
      <div className="oeg-container">
        {/* ---------- LEFT ---------- */}
        <div className="oeg-left">
          <div className="logo">OEG</div>

          {/* Desktop search */}
          <div className="search-box desktop-only">
            <input type="text" placeholder="Search here..." />
            <SearchIcon />
          </div>
        </div>

        {/* ---------- NAV (DESKTOP) ---------- */}
        <nav className="oeg-nav desktop-only">
          {navItems.map((item) => (
            <div key={item} className="nav-item">
              {item}
              <ChevronDown />
            </div>
          ))}
        </nav>

        {/* ---------- RIGHT ---------- */}
        <div className="oeg-right">
          <div className="notif">
            <BellIcon />
            <span className="badge">0</span>
          </div>

          <div className="avatar">
            <UserIcon />
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="hamburger mobile-only"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      {open && (
        <div className="mobile-menu">
          <div className="mobile-search">
            <input type="text" placeholder="Search here..." />
            <SearchIcon />
          </div>

          {navItems.map((item) => (
            <div key={item} className="mobile-item">
              {item}
              <ChevronDown />
            </div>
          ))}
        </div>
      )}

      {/* ================= STYLES ================= */}
      <style>{`
        .oeg-header {
          background: linear-gradient(180deg, #1c1c1c, #111);
          color: #fff;
          position: sticky;
          top: 0;
          z-index: 60;
          box-shadow: 0 4px 14px rgba(0,0,0,0.4);
        }

        .oeg-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 16px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .oeg-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .logo {
          background: linear-gradient(135deg, #ff3c00, #ff6a00);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 18px;
          font-weight: 800;
        }

        .search-box,
        .mobile-search {
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 999px;
          padding: 4px 10px;
          gap: 6px;
        }

        .search-box input,
        .mobile-search input {
          border: none;
          outline: none;
          font-size: 14px;
          padding: 6px;
          width: 100%;
        }

        .oeg-nav {
          display: flex;
          gap: 22px;
          font-size: 14px;
          font-weight: 600;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          opacity: 0.9;
        }

        .nav-item:hover { opacity: 1; }

        .oeg-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .notif {
          position: relative;
          cursor: pointer;
        }

        .badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background: #ef4444;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 999px;
          font-weight: 700;
        }

        .avatar {
          width: 34px;
          height: 34px;
          background: #2a2a2a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .hamburger {
          background: none;
          border: none;
          cursor: pointer;
          color: #fff;
        }

        /* ---------- MOBILE ---------- */
        .mobile-menu {
          background: #111;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: slideDown 0.2s ease-out;
        }

        .mobile-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 4px;
          font-weight: 600;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .desktop-only { display: flex; }
        .mobile-only { display: none; }

        @media (max-width: 900px) {
          .desktop-only { display: none; }
          .mobile-only { display: block; }
        }

        svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }
      `}</style>
    </header>
  );
}

/* ================= ICONS ================= */

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.65" y1="16.65" x2="21" y2="21" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0113 0" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
