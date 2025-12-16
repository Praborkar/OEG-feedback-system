// src/utils/session.js

/**
 * Generates and persists a unique session_id
 * per user per video.
 */
export function generateSessionId(videoId) {
  if (!videoId) {
    throw new Error("videoId is required");
  }

  const storageKey = `feedback_session_${videoId}`;

  // Reuse session if already created
  const existing = localStorage.getItem(storageKey);
  if (existing) return existing;

  const random = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now();

  const sessionId = `session_${videoId}_${random}_${timestamp}`;

  localStorage.setItem(storageKey, sessionId);

  return sessionId;
}

/**
 * Optional helper (for testing)
 */
export function clearSession(videoId) {
  if (!videoId) return;
  localStorage.removeItem(`feedback_session_${videoId}`);
}
