
import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../data/navLinks";

const SOCIAL_LINKS = {
  x: "https://x.com/quant_zen",
  linkedin: "https://www.linkedin.com/company/quantzen009/",
};

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#2563eb"
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 382 382" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        fill="#0077B7"
        d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
	C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056
	H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806
	c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
	s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73
	c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079
	c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426
	c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472
	L341.91,330.654L341.91,330.654z"
      />
    </svg>
  );
}

function SocialLinks({ className = "" }) {
  return (
    <div className={`qz-socials ${className}`}>
      <a
        href={SOCIAL_LINKS.x}
        target="_blank"
        rel="noopener noreferrer"
        className="qz-social-btn"
        aria-label="Follow us on X"
      >
        <XIcon />
      </a>
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="qz-social-btn qz-social-btn--linkedin"
        aria-label="Follow us on LinkedIn"
      >
        <LinkedInIcon />
      </a>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const location = useLocation();

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const activeLink = navLinks.find((l) => {
      if (l.path === "/") return location.pathname === "/";
      return location.pathname.startsWith(l.path);
    });
    if (!activeLink) {
      setPillStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const el = itemRefs.current[activeLink.path];
    const nav = navRef.current;
    if (!el || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPillStyle({ left: elRect.left - navRect.left, width: elRect.width, opacity: 1 });
  }, [location.pathname]);

  useEffect(() => {
    const handle = () => {
      const activeLink = navLinks.find((l) => {
        if (l.path === "/") return location.pathname === "/";
        return location.pathname.startsWith(l.path);
      });
      if (!activeLink) return;
      const el = itemRefs.current[activeLink.path];
      const nav = navRef.current;
      if (!el || !nav) return;
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setPillStyle({ left: elRect.left - navRect.left, width: elRect.width, opacity: 1 });
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [location.pathname]);

  return (
    <>
      <style>{`
        /* ── Header shell — WHITE bg ── */
        .qz-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 12px rgba(99,102,241,0.08);
        }

        .qz-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          height: 68px;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* ── Logo ── */
        .qz-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
          cursor: pointer;
        }
        .qz-logo img {
          width: 40px;
          height: 40px;
          object-fit: contain;
          border-radius: 10px;
        }
        .qz-logo-name {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111827;
          white-space: nowrap;
        }
        /* ™ — bold indigo, clearly visible on white */
        .qz-logo-name sup {
          font-size: 14px;
          font-weight: 800;
          color: #4f46e5;
          vertical-align: baseline; 
          letter-spacing: 0;
          text-shadow: 0 0 8px rgba(99,102,241,0.3);
        }

        /* ── Desktop nav ── */
        .qz-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          position: relative;
        }
        @media (max-width: 860px) { .qz-nav { display: none; } }

        /* Pill — soft indigo fill with border, looks great on white */
        .qz-pill {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 34px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(99,102,241,0.10), rgba(14,165,233,0.10));
          border: 1px solid rgba(99,102,241,0.28);
          pointer-events: none;
          transition: left 0.28s cubic-bezier(0.34,1.26,0.64,1),
                      width 0.28s cubic-bezier(0.34,1.26,0.64,1),
                      opacity 0.18s ease;
          box-shadow: 0 2px 12px rgba(99,102,241,0.14);
        }

        /* Nav links */
        .qz-nav a {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #6b7280;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.18s ease;
          cursor: pointer;
        }
        .qz-nav a:hover { color: #111827; }
        /* Active link — indigo, matches pill */
        .qz-nav a.active {
          color: #6366f1;
          font-weight: 600;
        }

        /* CTA button — gradient stays, looks great on white */
        .qz-cta {
          display: inline-flex;
          align-items: center;
          padding: 9px 18px;
          border-radius: 9px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          color: #fff !important;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(99,102,241,0.30), inset 0 1px 0 rgba(255,255,255,0.14);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          margin-left: 8px;
        }
        .qz-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(99,102,241,0.42), inset 0 1px 0 rgba(255,255,255,0.18);
        }

        /* ── Social icon buttons ── */
        .qz-socials {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .qz-nav .qz-socials {
          margin-left: 10px;
        }
        .qz-social-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          border-radius: 999px;
          border: 1px solid rgba(99,102,241,0.28);
          background: #ffffff;
          color: #2563eb;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
        }
        .qz-social-btn svg { width: 26px; height: 26px; }
        .qz-social-btn:hover {
          border-color: #6366f1;
          background: rgba(99,102,241,0.06);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(99,102,241,0.16);
        }
        .qz-social-btn--linkedin {
          border-radius: 11px;
          background: #ffffff;
          border-color: #e5e7eb;
        }
        .qz-social-btn--linkedin svg {
          width: 32px;
          height: 32px;
          border-radius: 7px;
        }
        .qz-social-btn--linkedin:hover {
          border-color: #0a66c2;
          box-shadow: 0 4px 14px rgba(10,102,194,0.20);
        }

        /* Header-bar socials shown only at/under the nav collapse breakpoint,
           so they stay visible next to the hamburger once the full nav hides. */
        .qz-socials--bar { display: none; }
        @media (max-width: 860px) {
          .qz-socials--bar { display: flex; }
        }

        /* ── Hamburger — dark lines on white bg ── */
        .qz-burger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 38px;
          border-radius: 9px;
          border: 1px solid #e5e7eb;
          background: transparent;
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
          padding: 0;
          flex-shrink: 0;
          transition: border-color 0.18s ease, background 0.18s ease;
        }
        .qz-burger:hover {
          border-color: #6366f1;
          background: rgba(99,102,241,0.05);
        }
        @media (max-width: 860px) { .qz-burger { display: flex; } }
        .qz-burger span {
          display: block;
          width: 18px;
          height: 1.8px;
          background: #374151;
          border-radius: 2px;
          transition: transform 0.22s ease, opacity 0.22s ease, width 0.22s ease;
          transform-origin: center;
        }
        .qz-burger.open span { background: #6366f1; }
        .qz-burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .qz-burger.open span:nth-child(2) { opacity: 0; width: 0; }
        .qz-burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile menu — white bg ── */
        .qz-mobile-menu {
          display: none;
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease;
          opacity: 0;
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(99,102,241,0.08);
        }
        .qz-mobile-menu.open {
          max-height: 400px;
          opacity: 1;
        }
        @media (max-width: 860px) { .qz-mobile-menu { display: block; } }
        .qz-mobile-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .qz-mobile-menu a {
          display: block;
          padding: 11px 14px;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .qz-mobile-menu a:hover {
          background: rgba(99,102,241,0.07);
          color: #6366f1;
        }
        .qz-mobile-menu a.active {
          background: rgba(99,102,241,0.09);
          color: #6366f1;
          font-weight: 600;
        }
        .qz-mobile-cta {
          margin-top: 8px;
          display: block;
          padding: 12px 18px;
          border-radius: 10px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          color: #fff !important;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(99,102,241,0.28);
        }
      `}</style>

      <header className="qz-header">
        <div className="qz-wrap">

          {/* Logo */}
          <Link to="/" className="qz-logo" onClick={closeMenu}>
            <img src="../../Logo.png" alt="QuantZen logo" />
            <span className="qz-logo-name">
              QuantZen<sup>™</sup>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="qz-nav" ref={navRef} aria-label="Main navigation">
            <span
              className="qz-pill"
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
                opacity: pillStyle.opacity,
              }}
              aria-hidden="true"
            />

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                ref={(el) => { itemRefs.current[link.path] = el; }}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.label}
              </NavLink>
            ))}

            <SocialLinks />

            <Link to="/contact" className="qz-cta" onClick={closeMenu}>
              Technical Paper
            </Link>
            <Link to="/contact" className="qz-cta" onClick={closeMenu}>
              Request a demo
            </Link>
          </nav>

          {/* Socials shown in the header bar once the nav collapses (mobile/tablet) */}
          <SocialLinks className="qz-socials--bar" />

          {/* Hamburger */}
          <button
            className={`qz-burger${open ? " open" : ""}`}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`qz-mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="qz-mobile-inner">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className="qz-mobile-cta" onClick={closeMenu}>
              Technical Paper
            </Link>
          <Link to="/contact" className="qz-mobile-cta" onClick={closeMenu}>
            Request a demo
          </Link>
        </div>
      </div>
    </>
  );
}