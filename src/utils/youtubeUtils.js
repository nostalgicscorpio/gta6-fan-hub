/**
 * Normalizes any supported YouTube URL or raw ID into just the video ID.
 * Supported inputs:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - VIDEO_ID only
 *
 * @param {string} urlOrId
 * @returns {string|null} The normalized video ID, or null if invalid
 */
export const normalizeYouTubeId = (urlOrId) => {
  if (!urlOrId || typeof urlOrId !== 'string') return null;
  const id = urlOrId.trim();

  // match watch?v=VIDEO_ID
  const watchMatch = id.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];

  // match youtu.be/VIDEO_ID
  const shortMatch = id.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return shortMatch[1];

  // match embed/VIDEO_ID
  const embedMatch = id.match(/embed\/([^?]+)/);
  if (embedMatch) return embedMatch[1];

  // assume it's an ID if no slash
  if (!id.includes('/')) {
    return id;
  }

  return null;
};
