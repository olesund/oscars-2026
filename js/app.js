// Main application utilities

// DOM Ready helper
function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Get current page name from URL
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return page.replace('.html', '');
}

// Get URL parameter
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Navigate to page
function navigateTo(page, params = {}) {
  let url = page;
  const paramStr = Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');
  if (paramStr) {
    url += '?' + paramStr;
  }
  window.location.href = url;
}

// Generate poster placeholder using canvas (works offline)
function generatePosterDataUrl(title) {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 450;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, 300, 450);

  // Border
  ctx.strokeStyle = '#b8960c';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, 280, 430);

  // Title text
  ctx.fillStyle = '#b8960c';
  ctx.font = 'bold 24px Courier New, monospace';
  ctx.textAlign = 'center';

  // Word wrap the title
  const words = title.split(' ');
  let lines = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    if (ctx.measureText(testLine).width < 260) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);

  // Draw centered text
  const lineHeight = 32;
  const startY = (450 - lines.length * lineHeight) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line.toUpperCase(), 150, startY + i * lineHeight);
  });

  return canvas.toDataURL('image/png');
}

// Get poster URL with fallback
function getPosterUrl(movie) {
  // Always use generated poster for reliability
  return generatePosterDataUrl(movie.title);
}

// Render header navigation
function renderHeader() {
  const currentPage = getCurrentPage();
  const user = getLocalUser();

  const header = document.getElementById('header');
  if (!header) return;

  const navItems = [
    { page: 'index', label: 'Home', href: 'index.html' },
    { page: 'movies', label: 'Movies', href: 'movies.html' },
    { page: 'categories', label: 'Categories', href: 'categories.html' },
    { page: 'my-list', label: 'My List', href: 'my-list.html' },
    { page: 'ballot', label: 'Ballot', href: 'ballot.html' },
    { page: 'ballots', label: 'All Ballots', href: 'ballots.html' },
    { page: 'results', label: 'Results', href: 'results.html' }
  ];

  header.innerHTML = `
    <div class="container">
      <a href="index.html" class="header__logo">* OSCARS 2026 *</a>
      <nav class="nav">
        ${navItems.map(item => `
          <a href="${item.href}"
             class="nav__link ${currentPage === item.page ? 'nav__link--active' : ''}">
            ${item.label}
          </a>
        `).join('')}
      </nav>
      ${user ? `
        <a href="profile.html" class="user-badge">[${user.username}]</a>
      ` : `
        <a href="profile.html" class="btn btn--sm">Sign In</a>
      `}
    </div>
  `;
}

// Create movie card with inline actions
function createMovieCard(movie, options = {}) {
  const inWatchlist = isInWatchlist(movie.id);
  const watched = isWatched(movie.id);
  const watchedInfo = getWatchedInfo(movie.id);

  const card = document.createElement('div');
  card.className = 'movie-card';

  const posterUrl = getPosterUrl(movie);

  card.innerHTML = `
    <img class="movie-card__poster" src="${posterUrl}" alt="${movie.title}">
    <div class="movie-card__badges">
      ${inWatchlist ? '<span class="movie-card__badge movie-card__badge--watchlist">+</span>' : ''}
      ${watched ? '<span class="movie-card__badge movie-card__badge--watched">OK</span>' : ''}
    </div>
    ${movie.nominations > 1 ? `<span class="movie-card__nominations">${movie.nominations}</span>` : ''}
    <div class="movie-card__info">
      <div class="movie-card__title">${movie.title}</div>
      <div class="movie-card__meta">
        ${watched && watchedInfo?.rating ? '[' + '*'.repeat(watchedInfo.rating) + '-'.repeat(5 - watchedInfo.rating) + ']' : movie.nominations + ' nom' + (movie.nominations > 1 ? 's' : '')}
      </div>
    </div>
    <div class="movie-card__actions">
      <button class="movie-card__action ${inWatchlist ? 'movie-card__action--active' : ''}" data-action="watchlist">
        ${inWatchlist ? '- List' : '+ List'}
      </button>
      <button class="movie-card__action ${watched ? 'movie-card__action--watched' : ''}" data-action="watched">
        ${watched ? 'Seen' : 'Watched?'}
      </button>
    </div>
  `;

  // Click on poster/title goes to movie details
  card.querySelector('.movie-card__poster').addEventListener('click', () => {
    navigateTo('movie.html', { id: movie.id });
  });
  card.querySelector('.movie-card__title').addEventListener('click', () => {
    navigateTo('movie.html', { id: movie.id });
  });

  // Watchlist action
  card.querySelector('[data-action="watchlist"]').addEventListener('click', async (e) => {
    e.stopPropagation();
    if (!isLoggedIn()) {
      showLoginPrompt();
      return;
    }
    if (watched) {
      showToast('Already in watched list');
      return;
    }
    const added = await toggleWatchlist(movie.id);
    showToast(added ? 'Added to list' : 'Removed from list', 'success');
    refreshMovieCard(card, movie);
  });

  // Watched action
  card.querySelector('[data-action="watched"]').addEventListener('click', (e) => {
    e.stopPropagation();
    if (!isLoggedIn()) {
      showLoginPrompt();
      return;
    }
    if (watched) {
      // Already watched, go to movie page to edit
      navigateTo('movie.html', { id: movie.id });
    } else {
      // Show rating modal
      showRatingModal(movie, () => {
        refreshMovieCard(card, movie);
      });
    }
  });

  return card;
}

// Refresh movie card state
function refreshMovieCard(card, movie) {
  const newCard = createMovieCard(movie);
  card.replaceWith(newCard);
}

// Show rating modal
function showRatingModal(movie, onSave) {
  if (!isLoggedIn()) {
    showLoginPrompt();
    return;
  }

  let selectedRating = 0;

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal__content">
      <h3 class="mb-md">Rate: ${movie.title}</h3>
      <div class="form-group">
        <label class="form-label">Rating</label>
        <div class="star-rating mb-md" id="modal-stars"></div>
      </div>
      <div class="form-group">
        <label class="form-label">Note (optional)</label>
        <textarea class="form-textarea" id="modal-note" placeholder="Your thoughts..."></textarea>
      </div>
      <div class="flex gap-sm">
        <button class="btn btn--secondary" id="modal-cancel">Cancel</button>
        <button class="btn btn--primary" id="modal-save">Save</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Setup stars
  const starsContainer = modal.querySelector('#modal-stars');
  function renderStars() {
    starsContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = `star-rating__star ${i <= selectedRating ? 'star-rating__star--active' : ''}`;
      star.textContent = i <= selectedRating ? '*' : '-';
      star.style.cursor = 'pointer';
      star.addEventListener('click', () => {
        selectedRating = i;
        renderStars();
      });
      starsContainer.appendChild(star);
    }
  }
  renderStars();

  // Cancel
  modal.querySelector('#modal-cancel').addEventListener('click', () => {
    modal.remove();
  });

  // Save
  modal.querySelector('#modal-save').addEventListener('click', async () => {
    const note = modal.querySelector('#modal-note').value.trim();
    await markAsWatched(movie.id, selectedRating, note);
    showToast('Marked as watched!', 'success');
    modal.remove();
    if (onSave) onSave();
  });

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Show toast notification
function showToast(message, type = 'info') {
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 8px 16px;
    background: ${type === 'success' ? '#228b22' : type === 'error' ? '#b22222' : '#222'};
    color: #f5f5f0;
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
    border: 1px solid #111;
    z-index: 1000;
  `;
  toast.textContent = '> ' + message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Create confetti effect
function createConfetti() {
  const chars = ['*', '+', 'o', '.'];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.textContent = chars[Math.floor(Math.random() * chars.length)];
    confetti.style.cssText = `
      left: ${Math.random() * 100}vw;
      color: #b8960c;
      font-family: 'Courier New', monospace;
      font-size: ${12 + Math.random() * 12}px;
      animation-delay: ${Math.random() * 3}s;
      animation-duration: ${3 + Math.random() * 2}s;
    `;
    document.body.appendChild(confetti);
  }

  setTimeout(() => {
    document.querySelectorAll('.confetti').forEach(c => c.remove());
  }, 6000);
}

// Show winner celebration
function showCelebration(winnerName, score, total) {
  const celebration = document.createElement('div');
  celebration.className = 'celebration';
  celebration.innerHTML = `
    <div class="celebration__content">
      <div class="celebration__trophy">***</div>
      <h1 class="celebration__title">WINNER!</h1>
      <p class="celebration__winner">${winnerName}</p>
      <p class="celebration__score">${score} / ${total} correct</p>
      <button class="btn btn--primary mt-lg" onclick="this.closest('.celebration').remove()">
        [Close]
      </button>
    </div>
  `;

  document.body.appendChild(celebration);
  createConfetti();
}

// Require login
function requireLogin() {
  if (!isLoggedIn()) {
    showToast('Please sign in', 'error');
    setTimeout(() => navigateTo('profile.html'), 1000);
    return false;
  }
  return true;
}

// Show login prompt modal
function showLoginPrompt() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal__content" style="text-align: center;">
      <h3 class="mb-md">Sign In Required</h3>
      <p class="text-muted mb-lg">Pick a username to track movies and submit ballots. No password needed.</p>
      <div class="flex gap-sm" style="justify-content: center;">
        <button class="btn btn--secondary" id="prompt-cancel">Cancel</button>
        <a href="profile.html" class="btn btn--primary">Sign In</a>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#prompt-cancel').addEventListener('click', () => {
    modal.remove();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Initialize page
function initPage() {
  renderHeader();
}

onReady(initPage);
