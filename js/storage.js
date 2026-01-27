// Storage utilities - syncs with Supabase, caches locally for performance

const STORAGE_KEYS = {
  USER: 'oscar_user',
  WATCHLIST: 'oscar_watchlist',
  WATCHED: 'oscar_watched',
  DATA_LOADED: 'oscar_data_loaded'
};

// Generic storage helpers
function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultValue;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error saving to localStorage:', e);
    return false;
  }
}

function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('Error removing from localStorage:', e);
    return false;
  }
}

// User (local session info - links to Supabase user)
function getLocalUser() {
  return getFromStorage(STORAGE_KEYS.USER, null);
}

function setLocalUser(user) {
  return saveToStorage(STORAGE_KEYS.USER, user);
}

function clearLocalUser() {
  return removeFromStorage(STORAGE_KEYS.USER);
}

function isLoggedIn() {
  const user = getLocalUser();
  return user && user.id && user.username;
}

// ============ DATA LOADING ============
// Load user's data from database on login

async function loadUserData() {
  const user = getLocalUser();
  if (!user) return;

  try {
    // Load watchlist and watched from database
    const [watchlistResult, watchedResult] = await Promise.all([
      api_getWatchlist(user.id),
      api_getWatched(user.id)
    ]);

    if (watchlistResult.data) {
      saveToStorage(STORAGE_KEYS.WATCHLIST, watchlistResult.data);
    }
    if (watchedResult.data) {
      saveToStorage(STORAGE_KEYS.WATCHED, watchedResult.data);
    }

    saveToStorage(STORAGE_KEYS.DATA_LOADED, true);
  } catch (e) {
    console.error('Error loading user data:', e);
  }
}

function isDataLoaded() {
  return getFromStorage(STORAGE_KEYS.DATA_LOADED, false);
}

// ============ WATCHLIST ============

function getWatchlist() {
  return getFromStorage(STORAGE_KEYS.WATCHLIST, []);
}

async function addToWatchlist(movieId) {
  const user = getLocalUser();
  if (!user) return [];

  const watchlist = getWatchlist();
  if (!watchlist.includes(movieId)) {
    watchlist.push(movieId);
    saveToStorage(STORAGE_KEYS.WATCHLIST, watchlist);

    // Sync to database
    await api_addToWatchlist(user.id, movieId);
  }
  return watchlist;
}

async function removeFromWatchlist(movieId) {
  const user = getLocalUser();
  if (!user) return [];

  let watchlist = getWatchlist();
  watchlist = watchlist.filter(id => id !== movieId);
  saveToStorage(STORAGE_KEYS.WATCHLIST, watchlist);

  // Sync to database
  await api_removeFromWatchlist(user.id, movieId);

  return watchlist;
}

function isInWatchlist(movieId) {
  return getWatchlist().includes(movieId);
}

async function toggleWatchlist(movieId) {
  if (isInWatchlist(movieId)) {
    await removeFromWatchlist(movieId);
    return false;
  } else {
    await addToWatchlist(movieId);
    return true;
  }
}

// ============ WATCHED ============

function getWatched() {
  return getFromStorage(STORAGE_KEYS.WATCHED, {});
}

async function markAsWatched(movieId, rating = 0, note = '') {
  const user = getLocalUser();
  if (!user) return {};

  const watched = getWatched();
  watched[movieId] = {
    rating: rating,
    note: note,
    watchedAt: new Date().toISOString()
  };
  saveToStorage(STORAGE_KEYS.WATCHED, watched);

  // Remove from watchlist locally
  let watchlist = getWatchlist();
  watchlist = watchlist.filter(id => id !== movieId);
  saveToStorage(STORAGE_KEYS.WATCHLIST, watchlist);

  // Sync to database
  await api_markAsWatched(user.id, movieId, rating, note);

  return watched;
}

async function updateWatched(movieId, rating, note) {
  const user = getLocalUser();
  if (!user) return {};

  const watched = getWatched();
  if (watched[movieId]) {
    watched[movieId].rating = rating;
    watched[movieId].note = note;
    watched[movieId].updatedAt = new Date().toISOString();
    saveToStorage(STORAGE_KEYS.WATCHED, watched);

    // Sync to database
    await api_updateWatched(user.id, movieId, rating, note);
  }
  return watched;
}

async function removeFromWatched(movieId) {
  const user = getLocalUser();
  if (!user) return {};

  const watched = getWatched();
  delete watched[movieId];
  saveToStorage(STORAGE_KEYS.WATCHED, watched);

  // Sync to database
  await api_removeFromWatched(user.id, movieId);

  return watched;
}

function isWatched(movieId) {
  return movieId in getWatched();
}

function getWatchedInfo(movieId) {
  return getWatched()[movieId] || null;
}

function getWatchedCount() {
  return Object.keys(getWatched()).length;
}

// ============ STATS ============

function getStats() {
  const watchlist = getWatchlist();
  const watched = getWatched();
  const watchedList = Object.values(watched);

  const totalRating = watchedList.reduce((sum, w) => sum + (w.rating || 0), 0);
  const avgRating = watchedList.length > 0 ? (totalRating / watchedList.length).toFixed(1) : 0;

  return {
    watchlistCount: watchlist.length,
    watchedCount: Object.keys(watched).length,
    averageRating: parseFloat(avgRating),
    totalMovies: Object.keys(OSCAR_DATA?.movies || {}).length
  };
}

// ============ DATA MANAGEMENT ============

function exportAllData() {
  return {
    user: getLocalUser(),
    watchlist: getWatchlist(),
    watched: getWatched(),
    exportedAt: new Date().toISOString()
  };
}

function clearAllData() {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeFromStorage(key);
  });
}

function clearLocalCache() {
  removeFromStorage(STORAGE_KEYS.WATCHLIST);
  removeFromStorage(STORAGE_KEYS.WATCHED);
  removeFromStorage(STORAGE_KEYS.DATA_LOADED);
}
