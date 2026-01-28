// Supabase client for shared data (users, ballots, results)
// You need to replace these with your actual Supabase project credentials

const SUPABASE_URL = 'https://xclndtlabshengcspymn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjbG5kdGxhYnNoZW5nY3NweW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NzkwNTYsImV4cCI6MjA4NTA1NTA1Nn0.r5a1IcYrmAia4FQJtCLV7CcO16fnPTgmW4VU8_d7pGQ';

// Check if Supabase is configured
function isSupabaseConfigured() {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';
}

// Initialize Supabase client
let supabaseClient = null;

function initSupabase() {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Please update SUPABASE_URL and SUPABASE_ANON_KEY in js/supabase.js');
    return null;
  }

  if (!supabaseClient && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClient;
}

// ============ USERS ============

async function createUser(username) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  // First check if user already exists
  const existingUser = await getUserByUsername(username);
  if (existingUser.data) {
    return existingUser;
  }

  // User doesn't exist, create new one
  const { data, error } = await client
    .from('users')
    .insert([{ username: username.trim() }])
    .select()
    .single();

  if (error) {
    // Handle race condition - duplicate username created between check and insert
    if (error.code === '23505' || error.code === 'PGRST409' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
      return await getUserByUsername(username);
    }
    return { error: error.message };
  }

  return { data };
}

async function getUserByUsername(username) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('users')
    .select('*')
    .eq('username', username.trim())
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data };
}

async function getAllUsers() {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('users')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

// ============ WATCHLIST ============

async function getWatchlistFromDb(userId) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('watchlist')
    .select('movie_id')
    .eq('user_id', userId);

  if (error) {
    return { error: error.message };
  }

  return { data: (data || []).map(w => w.movie_id) };
}

async function addToWatchlistDb(userId, movieId) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('watchlist')
    .insert([{ user_id: userId, movie_id: movieId }])
    .select()
    .single();

  if (error && error.code !== '23505') { // Ignore duplicate key errors
    return { error: error.message };
  }

  return { data };
}

async function removeFromWatchlistDb(userId, movieId) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { error } = await client
    .from('watchlist')
    .delete()
    .eq('user_id', userId)
    .eq('movie_id', movieId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

// ============ WATCHED ============

async function getWatchedFromDb(userId) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('watched')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    return { error: error.message };
  }

  // Convert to object keyed by movie_id
  const watchedObj = {};
  (data || []).forEach(w => {
    watchedObj[w.movie_id] = {
      rating: w.rating,
      note: w.note,
      watchedAt: w.watched_at,
      updatedAt: w.updated_at
    };
  });

  return { data: watchedObj };
}

async function markAsWatchedDb(userId, movieId, rating = 0, note = '') {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  // Upsert (insert or update)
  const { data, error } = await client
    .from('watched')
    .upsert([{
      user_id: userId,
      movie_id: movieId,
      rating: rating,
      note: note,
      watched_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }], {
      onConflict: 'user_id,movie_id'
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Also remove from watchlist
  await removeFromWatchlistDb(userId, movieId);

  return { data };
}

async function updateWatchedDb(userId, movieId, rating, note) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('watched')
    .update({
      rating: rating,
      note: note,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .eq('movie_id', movieId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data };
}

async function removeFromWatchedDb(userId, movieId) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { error } = await client
    .from('watched')
    .delete()
    .eq('user_id', userId)
    .eq('movie_id', movieId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

// ============ BALLOTS ============

async function getBallot(userId) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('ballots')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    return { error: error.message };
  }

  return { data };
}

async function saveBallot(userId, picks) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  // Check if ballot exists
  const existing = await getBallot(userId);

  if (existing.data) {
    // Update existing ballot
    const { data, error } = await client
      .from('ballots')
      .update({
        picks: picks,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) return { error: error.message };
    return { data };
  } else {
    // Insert new ballot
    const { data, error } = await client
      .from('ballots')
      .insert([{
        user_id: userId,
        picks: picks
      }])
      .select()
      .single();

    if (error) return { error: error.message };
    return { data };
  }
}

async function getAllBallots() {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('ballots')
    .select(`
      *,
      users (
        id,
        username
      )
    `)
    .order('submitted_at', { ascending: true });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

// ============ RESULTS ============

async function getResults() {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('results')
    .select('*');

  if (error) {
    return { error: error.message };
  }

  // Convert to object keyed by category_id
  const resultsObj = {};
  (data || []).forEach(r => {
    resultsObj[r.category_id] = r.winner_id;
  });

  return { data: resultsObj };
}

async function setResult(categoryId, winnerId) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  // Upsert (insert or update)
  const { data, error } = await client
    .from('results')
    .upsert([{
      category_id: categoryId,
      winner_id: winnerId,
      entered_at: new Date().toISOString()
    }], {
      onConflict: 'category_id'
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data };
}

async function clearResult(categoryId) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { error } = await client
    .from('results')
    .delete()
    .eq('category_id', categoryId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

// ============ SCORING ============

function calculateScore(ballot, results) {
  if (!ballot || !ballot.picks || !results) return 0;

  let score = 0;
  for (const [categoryId, pick] of Object.entries(ballot.picks)) {
    if (results[categoryId] && results[categoryId] === pick) {
      score++;
    }
  }
  return score;
}

function calculateAllScores(ballots, results) {
  return ballots.map(ballot => ({
    ...ballot,
    score: calculateScore(ballot, results)
  })).sort((a, b) => b.score - a.score);
}

// ============ REAL-TIME SUBSCRIPTIONS ============

function subscribeToBallots(callback) {
  const client = initSupabase();
  if (!client) return null;

  return client
    .channel('ballots-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'ballots' }, callback)
    .subscribe();
}

function subscribeToResults(callback) {
  const client = initSupabase();
  if (!client) return null;

  return client
    .channel('results-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'results' }, callback)
    .subscribe();
}

function unsubscribe(subscription) {
  if (subscription) {
    subscription.unsubscribe();
  }
}

// ============ MOCK DATA (for when Supabase is not configured) ============

const MOCK_DATA = {
  users: [],
  watchlist: {}, // { [userId]: [movieId, ...] }
  watched: {},   // { [userId]: { [movieId]: { rating, note, watchedAt } } }
  ballots: [],
  results: {}
};

// Mock implementations for offline/demo mode
function useMockData() {
  return !isSupabaseConfigured();
}

async function mockCreateUser(username) {
  // Check if user exists
  const existing = MOCK_DATA.users.find(u => u.username === username.trim());
  if (existing) {
    return { data: existing };
  }

  const user = {
    id: 'mock-' + Date.now(),
    username: username.trim(),
    created_at: new Date().toISOString()
  };
  MOCK_DATA.users.push(user);
  MOCK_DATA.watchlist[user.id] = [];
  MOCK_DATA.watched[user.id] = {};
  return { data: user };
}

// Mock watchlist functions
async function mockGetWatchlist(userId) {
  return { data: MOCK_DATA.watchlist[userId] || [] };
}

async function mockAddToWatchlist(userId, movieId) {
  if (!MOCK_DATA.watchlist[userId]) {
    MOCK_DATA.watchlist[userId] = [];
  }
  if (!MOCK_DATA.watchlist[userId].includes(movieId)) {
    MOCK_DATA.watchlist[userId].push(movieId);
  }
  return { data: { movie_id: movieId } };
}

async function mockRemoveFromWatchlist(userId, movieId) {
  if (MOCK_DATA.watchlist[userId]) {
    MOCK_DATA.watchlist[userId] = MOCK_DATA.watchlist[userId].filter(id => id !== movieId);
  }
  return { success: true };
}

// Mock watched functions
async function mockGetWatched(userId) {
  return { data: MOCK_DATA.watched[userId] || {} };
}

async function mockMarkAsWatched(userId, movieId, rating = 0, note = '') {
  if (!MOCK_DATA.watched[userId]) {
    MOCK_DATA.watched[userId] = {};
  }
  MOCK_DATA.watched[userId][movieId] = {
    rating,
    note,
    watchedAt: new Date().toISOString()
  };
  // Remove from watchlist
  await mockRemoveFromWatchlist(userId, movieId);
  return { data: MOCK_DATA.watched[userId][movieId] };
}

async function mockUpdateWatched(userId, movieId, rating, note) {
  if (MOCK_DATA.watched[userId] && MOCK_DATA.watched[userId][movieId]) {
    MOCK_DATA.watched[userId][movieId].rating = rating;
    MOCK_DATA.watched[userId][movieId].note = note;
    MOCK_DATA.watched[userId][movieId].updatedAt = new Date().toISOString();
  }
  return { data: MOCK_DATA.watched[userId]?.[movieId] };
}

async function mockRemoveFromWatched(userId, movieId) {
  if (MOCK_DATA.watched[userId]) {
    delete MOCK_DATA.watched[userId][movieId];
  }
  return { success: true };
}

async function mockGetAllBallots() {
  return {
    data: MOCK_DATA.ballots.map(b => ({
      ...b,
      users: MOCK_DATA.users.find(u => u.id === b.user_id)
    }))
  };
}

async function mockSaveBallot(userId, picks) {
  const existing = MOCK_DATA.ballots.findIndex(b => b.user_id === userId);
  const ballot = {
    id: existing >= 0 ? MOCK_DATA.ballots[existing].id : 'ballot-' + Date.now(),
    user_id: userId,
    picks: picks,
    submitted_at: existing >= 0 ? MOCK_DATA.ballots[existing].submitted_at : new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (existing >= 0) {
    MOCK_DATA.ballots[existing] = ballot;
  } else {
    MOCK_DATA.ballots.push(ballot);
  }

  return { data: ballot };
}

async function mockGetResults() {
  return { data: MOCK_DATA.results };
}

async function mockSetResult(categoryId, winnerId) {
  MOCK_DATA.results[categoryId] = winnerId;
  return { data: { category_id: categoryId, winner_id: winnerId } };
}

// Wrapper functions that use mock or real based on configuration
async function api_createUser(username) {
  return useMockData() ? mockCreateUser(username) : createUser(username);
}

async function api_getAllUsers() {
  return useMockData() ? { data: MOCK_DATA.users } : getAllUsers();
}

async function api_saveBallot(userId, picks) {
  return useMockData() ? mockSaveBallot(userId, picks) : saveBallot(userId, picks);
}

async function api_getAllBallots() {
  return useMockData() ? mockGetAllBallots() : getAllBallots();
}

async function api_getResults() {
  return useMockData() ? mockGetResults() : getResults();
}

async function api_setResult(categoryId, winnerId) {
  return useMockData() ? mockSetResult(categoryId, winnerId) : setResult(categoryId, winnerId);
}

// Watchlist API wrappers
async function api_getWatchlist(userId) {
  return useMockData() ? mockGetWatchlist(userId) : getWatchlistFromDb(userId);
}

async function api_addToWatchlist(userId, movieId) {
  return useMockData() ? mockAddToWatchlist(userId, movieId) : addToWatchlistDb(userId, movieId);
}

async function api_removeFromWatchlist(userId, movieId) {
  return useMockData() ? mockRemoveFromWatchlist(userId, movieId) : removeFromWatchlistDb(userId, movieId);
}

// Watched API wrappers
async function api_getWatched(userId) {
  return useMockData() ? mockGetWatched(userId) : getWatchedFromDb(userId);
}

async function api_markAsWatched(userId, movieId, rating, note) {
  return useMockData() ? mockMarkAsWatched(userId, movieId, rating, note) : markAsWatchedDb(userId, movieId, rating, note);
}

async function api_updateWatched(userId, movieId, rating, note) {
  return useMockData() ? mockUpdateWatched(userId, movieId, rating, note) : updateWatchedDb(userId, movieId, rating, note);
}

async function api_removeFromWatched(userId, movieId) {
  return useMockData() ? mockRemoveFromWatched(userId, movieId) : removeFromWatchedDb(userId, movieId);
}

// ============ PUBLIC COMMUNITY DATA ============

// Get all watched entries from all users (for community page)
async function getAllWatchedFromDb() {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('watched')
    .select(`
      *,
      users (
        id,
        username
      )
    `)
    .order('watched_at', { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return { data: data || [] };
}

// Get all reviews for a specific movie
async function getMovieReviewsFromDb(movieId) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('watched')
    .select(`
      rating,
      note,
      watched_at,
      users (
        id,
        username
      )
    `)
    .eq('movie_id', movieId)
    .order('watched_at', { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return { data: data || [] };
}

// Get a specific user's watched list (public profile)
async function getUserWatchedFromDb(username) {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  // First get the user
  const userResult = await getUserByUsername(username);
  if (userResult.error || !userResult.data) {
    return { error: userResult.error || 'User not found' };
  }

  const { data, error } = await client
    .from('watched')
    .select('*')
    .eq('user_id', userResult.data.id)
    .order('watched_at', { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return {
    data: data || [],
    user: userResult.data
  };
}

// Mock implementations for community data
async function mockGetAllWatched() {
  const allWatched = [];
  for (const userId of Object.keys(MOCK_DATA.watched)) {
    const user = MOCK_DATA.users.find(u => u.id === userId);
    for (const [movieId, info] of Object.entries(MOCK_DATA.watched[userId])) {
      allWatched.push({
        movie_id: movieId,
        rating: info.rating,
        note: info.note,
        watched_at: info.watchedAt,
        users: user
      });
    }
  }
  return { data: allWatched.sort((a, b) => new Date(b.watched_at) - new Date(a.watched_at)) };
}

async function mockGetMovieReviews(movieId) {
  const reviews = [];
  for (const userId of Object.keys(MOCK_DATA.watched)) {
    const user = MOCK_DATA.users.find(u => u.id === userId);
    const movieData = MOCK_DATA.watched[userId][movieId];
    if (movieData) {
      reviews.push({
        rating: movieData.rating,
        note: movieData.note,
        watched_at: movieData.watchedAt,
        users: user
      });
    }
  }
  return { data: reviews.sort((a, b) => new Date(b.watched_at) - new Date(a.watched_at)) };
}

async function mockGetUserWatched(username) {
  const user = MOCK_DATA.users.find(u => u.username === username);
  if (!user) return { error: 'User not found' };

  const watched = [];
  const userWatched = MOCK_DATA.watched[user.id] || {};
  for (const [movieId, info] of Object.entries(userWatched)) {
    watched.push({
      movie_id: movieId,
      rating: info.rating,
      note: info.note,
      watched_at: info.watchedAt
    });
  }
  return {
    data: watched.sort((a, b) => new Date(b.watched_at) - new Date(a.watched_at)),
    user: user
  };
}

// Get all watchlist entries from all users (for community page)
async function getAllWatchlistsFromDb() {
  const client = initSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('watchlist')
    .select(`
      *,
      users (
        id,
        username
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return { data: data || [] };
}

// Mock implementation for all watchlists
async function mockGetAllWatchlists() {
  const allWatchlists = [];
  for (const userId of Object.keys(MOCK_DATA.watchlist)) {
    const user = MOCK_DATA.users.find(u => u.id === userId);
    for (const movieId of MOCK_DATA.watchlist[userId]) {
      allWatchlists.push({
        movie_id: movieId,
        users: user
      });
    }
  }
  return { data: allWatchlists };
}

// API wrappers for community data
async function api_getAllWatchlists() {
  return useMockData() ? mockGetAllWatchlists() : getAllWatchlistsFromDb();
}

async function api_getAllWatched() {
  return useMockData() ? mockGetAllWatched() : getAllWatchedFromDb();
}

async function api_getMovieReviews(movieId) {
  return useMockData() ? mockGetMovieReviews(movieId) : getMovieReviewsFromDb(movieId);
}

async function api_getUserWatched(username) {
  return useMockData() ? mockGetUserWatched(username) : getUserWatchedFromDb(username);
}

// Subscribe to watched changes (for real-time updates)
function subscribeToWatched(callback) {
  const client = initSupabase();
  if (!client) return null;

  return client
    .channel('watched-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'watched' }, callback)
    .subscribe();
}
