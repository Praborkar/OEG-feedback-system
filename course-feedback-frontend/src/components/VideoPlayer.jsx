import { useEffect, useRef } from "react";

export default function VideoPlayer({ on95, on99 }) {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const fired95 = useRef(false);
  const fired99 = useRef(false);

  useEffect(() => {
    let interval;

    function initPlayer() {
      playerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: () => {
            interval = setInterval(() => {
              const player = playerRef.current;
              if (!player || !player.getDuration) return;

              const duration = player.getDuration();
              const current = player.getCurrentTime();
              if (!duration) return;

              const percent = (current / duration) * 100;

              // 🔥 95%
              if (percent >= 95 && !fired95.current) {
                fired95.current = true;
                on95();
              }

              // 🔥 99% fallback
              if (percent >= 98 && !fired99.current) {
                fired99.current = true;
                on99();
              }
            }, 1000);
          },

          // ✅ Guaranteed 99%
          onStateChange: (e) => {
            if (
              e.data === window.YT.PlayerState.ENDED &&
              !fired99.current
            ) {
              fired99.current = true;
              on99();
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => clearInterval(interval);
  }, [on95, on99]);

  return (
    <div className="vp-root">
      <div className="vp-frame">
        <div className="vp-badge">Lesson Video</div>

        <iframe
          ref={iframeRef}
          title="Course Video"
          src="https://www.youtube.com/embed/HKLnBv3wxUg?enablejsapi=1"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* ================= STYLES (SCOPED) ================= */}
      <style>{`
        .vp-root {
          width: 100%;
        }

        .vp-frame {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          background: #000;
          border-radius: 18px;
          overflow: hidden;
          box-shadow:
            0 30px 60px rgba(15,23,42,0.18),
            inset 0 0 0 1px rgba(255,255,255,0.04);
        }

        .vp-frame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* ---------- Badge ---------- */
        .vp-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          background: rgba(15,23,42,0.85);
          color: #ffffff;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 999px;
          backdrop-filter: blur(6px);
          box-shadow: 0 6px 18px rgba(15,23,42,0.35);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
