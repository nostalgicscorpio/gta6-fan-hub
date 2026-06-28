/**
 * GTA VI Fan Hub — Lightweight localStorage Analytics
 * Completely free, no external services, no cookies, privacy-friendly.
 */

const STORAGE_KEY = 'gta6_analytics';

function getToday() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore corrupted data
  }
  return null;
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable
  }
}

function getDefaultData() {
  return {
    totalVisitors: 0,
    dailyVisitors: {},
    buttonClicks: {},
    trailerClicks: {},
    articleClicks: {},
    sessionId: null,
    lastVisitDate: null,
  };
}

function initAnalytics() {
  let data = loadData() || getDefaultData();
  const today = getToday();
  const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // Count as a new visit
  data.totalVisitors = (data.totalVisitors || 0) + 1;
  data.dailyVisitors = data.dailyVisitors || {};
  data.dailyVisitors[today] = (data.dailyVisitors[today] || 0) + 1;
  data.sessionId = sessionId;
  data.lastVisitDate = today;

  // Prune daily data older than 30 days
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  for (const key of Object.keys(data.dailyVisitors)) {
    if (key < cutoffStr) delete data.dailyVisitors[key];
  }

  saveData(data);
  return data;
}

function trackEvent(category, label) {
  const data = loadData() || getDefaultData();
  const key = `${category}Clicks`;
  if (!data[key]) data[key] = {};
  data[key][label] = (data[key][label] || 0) + 1;
  saveData(data);
}

export function trackButtonClick(buttonName) {
  trackEvent('button', buttonName);
}

export function trackTrailerClick(trailerName) {
  trackEvent('trailer', trailerName);
}

export function trackArticleClick(articleTitle) {
  trackEvent('article', articleTitle);
}

export function getAnalyticsData() {
  return loadData() || getDefaultData();
}

export function getAnalyticsSummary() {
  const data = getAnalyticsData();
  const today = getToday();
  const todayVisitors = data.dailyVisitors?.[today] || 0;

  // Get total button clicks
  const totalButtonClicks = Object.values(data.buttonClicks || {}).reduce((a, b) => a + b, 0);
  const totalTrailerClicks = Object.values(data.trailerClicks || {}).reduce((a, b) => a + b, 0);
  const totalArticleClicks = Object.values(data.articleClicks || {}).reduce((a, b) => a + b, 0);

  // Get the last 7 days of visitor data
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    last7Days.push({
      date: dateStr,
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      visitors: data.dailyVisitors?.[dateStr] || 0,
    });
  }

  return {
    totalVisitors: data.totalVisitors || 0,
    todayVisitors,
    totalButtonClicks,
    totalTrailerClicks,
    totalArticleClicks,
    last7Days,
    topButtons: Object.entries(data.buttonClicks || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5),
    topTrailers: Object.entries(data.trailerClicks || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5),
    topArticles: Object.entries(data.articleClicks || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5),
  };
}

// Initialize on import
initAnalytics();

export default { trackButtonClick, trackTrailerClick, trackArticleClick, getAnalyticsSummary, getAnalyticsData };
