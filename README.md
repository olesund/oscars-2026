# Oscar 2026 Tracker

A web app to track Oscar nominations, manage your watchlist, rate movies, and compete with friends to predict the winners!

## Features

- **Browse Nominations**: View all 2026 Oscar nominated movies and categories
- **Watchlist**: Keep track of movies you want to see
- **Watched + Ratings**: Rate movies you've seen and leave notes
- **Ballot Predictions**: Submit your picks for who will win each category
- **Leaderboard**: See who's ahead as results come in
- **Live Results**: Enter winners during the ceremony and watch scores update

## Quick Start (Demo Mode)

Just open `index.html` in your browser! The site works immediately in demo mode with all data stored locally.

**Note:** Users must sign in with a username (no password required) to use interactive features like watchlist, ratings, and ballots.

**Demo mode limitations:**
- All user data is stored in your browser only (not shared between devices/users)
- To share data with friends, you'll need to set up Supabase (see below)

## Full Setup with Supabase (Multi-user)

To enable ballot sharing across devices and users:

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project
3. Wait for it to initialize (~2 minutes)

### 2. Create Database Tables

Go to **SQL Editor** in your Supabase dashboard and run this SQL:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Watchlist table (movies user wants to see)
CREATE TABLE watchlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  movie_id TEXT NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, movie_id)
);

-- Watched table (movies user has seen with ratings)
CREATE TABLE watched (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  movie_id TEXT NOT NULL,
  rating INTEGER DEFAULT 0,
  note TEXT DEFAULT '',
  watched_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, movie_id)
);

-- Ballots table
CREATE TABLE ballots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  picks JSONB DEFAULT '{}',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Results table
CREATE TABLE results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id TEXT UNIQUE NOT NULL,
  winner_id TEXT NOT NULL,
  entered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE watched ENABLE ROW LEVEL SECURITY;
ALTER TABLE ballots ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Policies: Everyone can read, insert, and update (trust-based for friend group)
CREATE POLICY "Anyone can read users" ON users FOR SELECT USING (true);
CREATE POLICY "Anyone can insert users" ON users FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read watchlist" ON watchlist FOR SELECT USING (true);
CREATE POLICY "Anyone can insert watchlist" ON watchlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete watchlist" ON watchlist FOR DELETE USING (true);

CREATE POLICY "Anyone can read watched" ON watched FOR SELECT USING (true);
CREATE POLICY "Anyone can insert watched" ON watched FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update watched" ON watched FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete watched" ON watched FOR DELETE USING (true);

CREATE POLICY "Anyone can read ballots" ON ballots FOR SELECT USING (true);
CREATE POLICY "Anyone can insert ballots" ON ballots FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update ballots" ON ballots FOR UPDATE USING (true);

CREATE POLICY "Anyone can read results" ON results FOR SELECT USING (true);
CREATE POLICY "Anyone can insert results" ON results FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update results" ON results FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete results" ON results FOR DELETE USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE ballots;
ALTER PUBLICATION supabase_realtime ADD TABLE results;
```

### 3. Get Your API Keys

1. Go to **Settings** > **API** in your Supabase dashboard
2. Copy the **Project URL** and **anon public** key

### 4. Update the Code

Edit `js/supabase.js` and replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### 5. Add Supabase Client Library

Add this script tag to each HTML file, **before** the other script tags:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

Or download it locally and reference it from your `js/` folder.

## Hosting on GitHub Pages

1. Create a new GitHub repository
2. Push all files to the repository
3. Go to **Settings** > **Pages**
4. Select **Deploy from a branch** > **main** > **/ (root)**
5. Your site will be live at `https://yourusername.github.io/repo-name/`

## Project Structure

```
/
├── index.html          # Homepage
├── movies.html         # All movies grid
├── movie.html          # Single movie detail
├── categories.html     # All categories (inline expand)
├── my-list.html        # Your watchlist & watched movies
├── ballot.html         # Submit predictions
├── ballots.html        # View all ballots + leaderboard
├── results.html        # Enter winners
├── profile.html        # User profile
├── css/
│   └── style.css       # Low-tech terminal styles
├── js/
│   ├── data.js         # Oscar nominations data
│   ├── storage.js      # localStorage utilities
│   ├── supabase.js     # Supabase client
│   └── app.js          # Main app utilities
└── README.md
```

## Data Storage

| Data | Storage | Shared? |
|------|---------|---------|
| Nominations | Static JS file | N/A |
| User profile | Supabase + localStorage | Yes |
| Watchlist | Supabase | Yes |
| Watched/ratings | Supabase | Yes |
| Ballots | Supabase | Yes |
| Results | Supabase | Yes |

## Ceremony Night Guide

1. Have everyone submit their ballots before the ceremony starts
2. Open `results.html` on one device (can be projected/shared)
3. As each winner is announced, select them from the dropdown
4. Everyone watching `ballots.html` will see scores update in real-time
5. When all 24 categories have winners, the celebration triggers!

## Credits

- Oscar nomination data from the Academy of Motion Picture Arts and Sciences
- Built for the 98th Academy Awards (March 15, 2026)
- Hosted by Conan O'Brien

Enjoy the show! 🏆
