// 2026 Oscar Nominations Data
// 98th Academy Awards - March 15, 2026

const OSCAR_DATA = {
  ceremony: {
    year: 2026,
    number: 98,
    date: '2026-03-15',
    host: 'Conan O\'Brien',
    venue: 'Dolby Theatre',
    airTime: '7:00 PM ET / 4:00 PM PT',
    network: 'ABC'
  },

  // All nominated movies with metadata
  movies: {
    'sinners': {
      id: 'sinners',
      title: 'Sinners',
      year: 2025,
      director: 'Ryan Coogler',
      nominations: 16,
      poster: 'https://image.tmdb.org/t/p/w500/cFxcdKqOlTD61reXv9S7mX7kJSU.jpg'
    },
    'one-battle-after-another': {
      id: 'one-battle-after-another',
      title: 'One Battle After Another',
      year: 2025,
      director: 'Paul Thomas Anderson',
      nominations: 13,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=One+Battle+After+Another'
    },
    'frankenstein': {
      id: 'frankenstein',
      title: 'Frankenstein',
      year: 2025,
      director: 'Guillermo del Toro',
      nominations: 9,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Frankenstein'
    },
    'sentimental-value': {
      id: 'sentimental-value',
      title: 'Sentimental Value',
      year: 2025,
      director: 'Joachim Trier',
      nominations: 9,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Sentimental+Value'
    },
    'marty-supreme': {
      id: 'marty-supreme',
      title: 'Marty Supreme',
      year: 2025,
      director: 'Josh Safdie',
      nominations: 7,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Marty+Supreme'
    },
    'hamnet': {
      id: 'hamnet',
      title: 'Hamnet',
      year: 2025,
      director: 'Chloé Zhao',
      nominations: 6,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Hamnet'
    },
    'bugonia': {
      id: 'bugonia',
      title: 'Bugonia',
      year: 2025,
      director: 'Yorgos Lanthimos',
      nominations: 4,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Bugonia'
    },
    'the-secret-agent': {
      id: 'the-secret-agent',
      title: 'The Secret Agent',
      year: 2025,
      director: 'Walter Salles',
      nominations: 4,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=The+Secret+Agent'
    },
    'train-dreams': {
      id: 'train-dreams',
      title: 'Train Dreams',
      year: 2025,
      director: 'Clint Bentley',
      nominations: 4,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Train+Dreams'
    },
    'f1': {
      id: 'f1',
      title: 'F1',
      year: 2025,
      director: 'Joseph Kosinski',
      nominations: 4,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=F1'
    },
    'blue-moon': {
      id: 'blue-moon',
      title: 'Blue Moon',
      year: 2025,
      director: 'Richard Linklater',
      nominations: 2,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Blue+Moon'
    },
    'if-i-had-legs': {
      id: 'if-i-had-legs',
      title: 'If I Had Legs I\'d Kick You',
      year: 2025,
      director: 'Mary Bronstein',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=If+I+Had+Legs'
    },
    'song-sung-blue': {
      id: 'song-sung-blue',
      title: 'Song Sung Blue',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Song+Sung+Blue'
    },
    'weapons': {
      id: 'weapons',
      title: 'Weapons',
      year: 2025,
      director: 'Zach Cregger',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Weapons'
    },
    'it-was-just-an-accident': {
      id: 'it-was-just-an-accident',
      title: 'It Was Just an Accident',
      year: 2025,
      director: 'Jafar Panahi',
      nominations: 2,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=It+Was+Just+An+Accident'
    },
    'avatar-fire-and-ash': {
      id: 'avatar-fire-and-ash',
      title: 'Avatar: Fire and Ash',
      year: 2025,
      director: 'James Cameron',
      nominations: 2,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Avatar+3'
    },
    'sirat': {
      id: 'sirat',
      title: 'Sirât',
      year: 2025,
      director: 'Unknown',
      nominations: 2,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Sirat'
    },
    'the-voice-of-hind-rajab': {
      id: 'the-voice-of-hind-rajab',
      title: 'The Voice of Hind Rajab',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Voice+of+Hind+Rajab'
    },
    'kokuho': {
      id: 'kokuho',
      title: 'Kokuho',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Kokuho'
    },
    'the-smashing-machine': {
      id: 'the-smashing-machine',
      title: 'The Smashing Machine',
      year: 2025,
      director: 'Benny Safdie',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Smashing+Machine'
    },
    'the-ugly-stepsister': {
      id: 'the-ugly-stepsister',
      title: 'The Ugly Stepsister',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Ugly+Stepsister'
    },
    'jurassic-world-rebirth': {
      id: 'jurassic-world-rebirth',
      title: 'Jurassic World Rebirth',
      year: 2025,
      director: 'Gareth Edwards',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Jurassic+World'
    },
    'the-lost-bus': {
      id: 'the-lost-bus',
      title: 'The Lost Bus',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=The+Lost+Bus'
    },
    'diane-warren-relentless': {
      id: 'diane-warren-relentless',
      title: 'Diane Warren: Relentless',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Diane+Warren'
    },
    'viva-verdi': {
      id: 'viva-verdi',
      title: 'Viva Verdi!',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Viva+Verdi'
    },
    // Animated features
    'arco': {
      id: 'arco',
      title: 'Arco',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Arco'
    },
    'elio': {
      id: 'elio',
      title: 'Elio',
      year: 2025,
      director: 'Pixar',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Elio'
    },
    'kpop-demon-hunters': {
      id: 'kpop-demon-hunters',
      title: 'KPop Demon Hunters',
      year: 2025,
      director: 'Unknown',
      nominations: 2,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=KPop+Demon+Hunters'
    },
    'little-amelie': {
      id: 'little-amelie',
      title: 'Little Amélie or the Character of Rain',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Little+Amelie'
    },
    'zootopia-2': {
      id: 'zootopia-2',
      title: 'Zootopia 2',
      year: 2025,
      director: 'Disney',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Zootopia+2'
    },
    // Documentary features
    'the-alabama-solution': {
      id: 'the-alabama-solution',
      title: 'The Alabama Solution',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Alabama+Solution'
    },
    'come-see-me-in-the-good-light': {
      id: 'come-see-me-in-the-good-light',
      title: 'Come See Me in the Good Light',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Good+Light'
    },
    'cutting-through-rocks': {
      id: 'cutting-through-rocks',
      title: 'Cutting Through Rocks',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Cutting+Through+Rocks'
    },
    'mr-nobody-against-putin': {
      id: 'mr-nobody-against-putin',
      title: 'Mr. Nobody Against Putin',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Mr+Nobody'
    },
    'the-perfect-neighbor': {
      id: 'the-perfect-neighbor',
      title: 'The Perfect Neighbor',
      year: 2025,
      director: 'Unknown',
      nominations: 1,
      poster: 'https://placehold.co/300x450/1a1a2e/d4af37?text=Perfect+Neighbor'
    },
    // Documentary Short Films
    'all-empty-rooms': {
      id: 'all-empty-rooms',
      title: 'All the Empty Rooms',
      year: 2025,
      director: 'Joshua Seftel',
      nominations: 1,
      type: 'documentary-short'
    },
    'armed-only': {
      id: 'armed-only',
      title: 'Armed Only with a Camera: The Life and Death of Brent Renaud',
      year: 2025,
      director: 'Craig Renaud & Brent Renaud',
      nominations: 1,
      type: 'documentary-short'
    },
    'children-no-more': {
      id: 'children-no-more',
      title: 'Children No More: "Were and Are Gone"',
      year: 2025,
      director: 'Hilla Medalia',
      nominations: 1,
      type: 'documentary-short'
    },
    'devil-busy': {
      id: 'devil-busy',
      title: 'The Devil Is Busy',
      year: 2025,
      director: 'Geeta Gandbhir & Christalyn Hampton',
      nominations: 1,
      type: 'documentary-short'
    },
    'perfectly-strangeness': {
      id: 'perfectly-strangeness',
      title: 'Perfectly a Strangeness',
      year: 2025,
      director: 'Alison McAlpine',
      nominations: 1,
      type: 'documentary-short'
    },
    // Animated Short Films
    'butterfly-short': {
      id: 'butterfly-short',
      title: 'Papillon (Butterfly)',
      year: 2025,
      director: 'Florence Miailhe',
      nominations: 1,
      type: 'animated-short'
    },
    'forevergreen': {
      id: 'forevergreen',
      title: 'Forevergreen',
      year: 2025,
      director: 'Nathan Engelhardt & Jeremy Spears',
      nominations: 1,
      type: 'animated-short'
    },
    'girl-pearls': {
      id: 'girl-pearls',
      title: 'The Girl Who Cried Pearls',
      year: 2025,
      director: 'Chris Lavis & Maciek Szczerbowski',
      nominations: 1,
      type: 'animated-short'
    },
    'retirement-plan': {
      id: 'retirement-plan',
      title: 'Retirement Plan',
      year: 2025,
      director: 'John Kelly',
      nominations: 1,
      type: 'animated-short'
    },
    'three-sisters': {
      id: 'three-sisters',
      title: 'The Three Sisters',
      year: 2025,
      director: 'Timur Kognov',
      nominations: 1,
      type: 'animated-short'
    },
    // Live Action Short Films
    'butchers-stain': {
      id: 'butchers-stain',
      title: "Butcher's Stain",
      year: 2025,
      director: 'Meyer Levinson-Blount',
      nominations: 1,
      type: 'live-action-short'
    },
    'friend-dorothy': {
      id: 'friend-dorothy',
      title: 'A Friend of Dorothy',
      year: 2025,
      director: 'Lee Knight',
      nominations: 1,
      type: 'live-action-short'
    },
    'jane-austen': {
      id: 'jane-austen',
      title: "Jane Austen's Period Drama",
      year: 2025,
      director: 'Steve Pinder & Julia Aks',
      nominations: 1,
      type: 'live-action-short'
    },
    'the-singers': {
      id: 'the-singers',
      title: 'The Singers',
      year: 2025,
      director: 'Sam Davis',
      nominations: 1,
      type: 'live-action-short'
    },
    'two-people': {
      id: 'two-people',
      title: 'Two People Exchanging Saliva',
      year: 2025,
      director: 'Alexandre Singh & Natalie Musteata',
      nominations: 1,
      type: 'live-action-short'
    }
  },

  // All categories with nominees
  categories: {
    'best-picture': {
      id: 'best-picture',
      name: 'Best Picture',
      nominees: [
        { movieId: 'bugonia' },
        { movieId: 'f1' },
        { movieId: 'frankenstein' },
        { movieId: 'hamnet' },
        { movieId: 'marty-supreme' },
        { movieId: 'one-battle-after-another' },
        { movieId: 'the-secret-agent' },
        { movieId: 'sentimental-value' },
        { movieId: 'sinners' },
        { movieId: 'train-dreams' }
      ]
    },
    'best-director': {
      id: 'best-director',
      name: 'Best Director',
      nominees: [
        { id: 'chloe-zhao-hamnet', name: 'Chloé Zhao', movieId: 'hamnet' },
        { id: 'josh-safdie-marty', name: 'Josh Safdie', movieId: 'marty-supreme' },
        { id: 'pta-obaa', name: 'Paul Thomas Anderson', movieId: 'one-battle-after-another' },
        { id: 'joachim-trier-sv', name: 'Joachim Trier', movieId: 'sentimental-value' },
        { id: 'ryan-coogler-sinners', name: 'Ryan Coogler', movieId: 'sinners' }
      ]
    },
    'best-actor': {
      id: 'best-actor',
      name: 'Best Actor',
      nominees: [
        { id: 'timothee-marty', name: 'Timothée Chalamet', movieId: 'marty-supreme' },
        { id: 'leo-obaa', name: 'Leonardo DiCaprio', movieId: 'one-battle-after-another' },
        { id: 'ethan-blue-moon', name: 'Ethan Hawke', movieId: 'blue-moon' },
        { id: 'mbj-sinners', name: 'Michael B. Jordan', movieId: 'sinners' },
        { id: 'wagner-secret', name: 'Wagner Moura', movieId: 'the-secret-agent' }
      ]
    },
    'best-actress': {
      id: 'best-actress',
      name: 'Best Actress',
      nominees: [
        { id: 'jessie-hamnet', name: 'Jessie Buckley', movieId: 'hamnet' },
        { id: 'rose-legs', name: 'Rose Byrne', movieId: 'if-i-had-legs' },
        { id: 'kate-song', name: 'Kate Hudson', movieId: 'song-sung-blue' },
        { id: 'renate-sv', name: 'Renate Reinsve', movieId: 'sentimental-value' },
        { id: 'emma-bugonia', name: 'Emma Stone', movieId: 'bugonia' }
      ]
    },
    'best-supporting-actor': {
      id: 'best-supporting-actor',
      name: 'Best Supporting Actor',
      nominees: [
        { id: 'benicio-obaa', name: 'Benicio Del Toro', movieId: 'one-battle-after-another' },
        { id: 'jacob-frank', name: 'Jacob Elordi', movieId: 'frankenstein' },
        { id: 'delroy-sinners', name: 'Delroy Lindo', movieId: 'sinners' },
        { id: 'sean-obaa', name: 'Sean Penn', movieId: 'one-battle-after-another' },
        { id: 'stellan-sv', name: 'Stellan Skarsgård', movieId: 'sentimental-value' }
      ]
    },
    'best-supporting-actress': {
      id: 'best-supporting-actress',
      name: 'Best Supporting Actress',
      nominees: [
        { id: 'elle-sv', name: 'Elle Fanning', movieId: 'sentimental-value' },
        { id: 'inga-sv', name: 'Inga Ibsdotter Lilleaas', movieId: 'sentimental-value' },
        { id: 'amy-weapons', name: 'Amy Madigan', movieId: 'weapons' },
        { id: 'wunmi-sinners', name: 'Wunmi Mosaku', movieId: 'sinners' },
        { id: 'teyana-obaa', name: 'Teyana Taylor', movieId: 'one-battle-after-another' }
      ]
    },
    'best-adapted-screenplay': {
      id: 'best-adapted-screenplay',
      name: 'Best Adapted Screenplay',
      nominees: [
        { id: 'will-bugonia', name: 'Will Tracy', movieId: 'bugonia' },
        { id: 'gdt-frank', name: 'Guillermo del Toro', movieId: 'frankenstein' },
        { id: 'maggie-chloe-hamnet', name: 'Maggie O\'Farrell & Chloé Zhao', movieId: 'hamnet' },
        { id: 'pta-obaa-sp', name: 'Paul Thomas Anderson', movieId: 'one-battle-after-another' },
        { id: 'clint-greg-train', name: 'Clint Bentley & Greg Kwedar', movieId: 'train-dreams' }
      ]
    },
    'best-original-screenplay': {
      id: 'best-original-screenplay',
      name: 'Best Original Screenplay',
      nominees: [
        { id: 'robert-blue', name: 'Robert Kaplow', movieId: 'blue-moon' },
        { id: 'jafar-accident', name: 'Jafar Panahi', movieId: 'it-was-just-an-accident' },
        { id: 'safdies-marty', name: 'Ronald Bronstein & Josh Safdie', movieId: 'marty-supreme' },
        { id: 'joachim-eskil-sv', name: 'Joachim Trier & Eskil Vogt', movieId: 'sentimental-value' },
        { id: 'ryan-sinners', name: 'Ryan Coogler', movieId: 'sinners' }
      ]
    },
    'best-animated-feature': {
      id: 'best-animated-feature',
      name: 'Best Animated Feature Film',
      nominees: [
        { movieId: 'arco' },
        { movieId: 'elio' },
        { movieId: 'kpop-demon-hunters' },
        { movieId: 'little-amelie' },
        { movieId: 'zootopia-2' }
      ]
    },
    'best-international-feature': {
      id: 'best-international-feature',
      name: 'Best International Feature Film',
      nominees: [
        { movieId: 'the-secret-agent', country: 'Brazil' },
        { movieId: 'it-was-just-an-accident', country: 'France' },
        { movieId: 'sentimental-value', country: 'Norway' },
        { movieId: 'sirat', country: 'Spain' },
        { movieId: 'the-voice-of-hind-rajab', country: 'Tunisia' }
      ]
    },
    'best-documentary-feature': {
      id: 'best-documentary-feature',
      name: 'Best Documentary Feature Film',
      nominees: [
        { movieId: 'the-alabama-solution' },
        { movieId: 'come-see-me-in-the-good-light' },
        { movieId: 'cutting-through-rocks' },
        { movieId: 'mr-nobody-against-putin' },
        { movieId: 'the-perfect-neighbor' }
      ]
    },
    'best-documentary-short': {
      id: 'best-documentary-short',
      name: 'Best Documentary Short Film',
      nominees: [
        { movieId: 'all-empty-rooms' },
        { movieId: 'armed-only' },
        { movieId: 'children-no-more' },
        { movieId: 'devil-busy' },
        { movieId: 'perfectly-strangeness' }
      ]
    },
    'best-animated-short': {
      id: 'best-animated-short',
      name: 'Best Animated Short Film',
      nominees: [
        { movieId: 'butterfly-short' },
        { movieId: 'forevergreen' },
        { movieId: 'girl-pearls' },
        { movieId: 'retirement-plan' },
        { movieId: 'three-sisters' }
      ]
    },
    'best-live-action-short': {
      id: 'best-live-action-short',
      name: 'Best Live Action Short Film',
      nominees: [
        { movieId: 'butchers-stain' },
        { movieId: 'jane-austen' },
        { movieId: 'friend-dorothy' },
        { movieId: 'the-singers' },
        { movieId: 'two-people' }
      ]
    },
    'best-original-score': {
      id: 'best-original-score',
      name: 'Best Original Score',
      nominees: [
        { id: 'jerskin-bugonia', name: 'Jerskin Fendrix', movieId: 'bugonia' },
        { id: 'desplat-frank', name: 'Alexandre Desplat', movieId: 'frankenstein' },
        { id: 'richter-hamnet', name: 'Max Richter', movieId: 'hamnet' },
        { id: 'jonny-obaa', name: 'Jonny Greenwood', movieId: 'one-battle-after-another' },
        { id: 'ludwig-sinners', name: 'Ludwig Göransson', movieId: 'sinners' }
      ]
    },
    'best-original-song': {
      id: 'best-original-song',
      name: 'Best Original Song',
      nominees: [
        { id: 'dear-me', title: 'Dear Me', movieId: 'diane-warren-relentless' },
        { id: 'golden', title: 'Golden', movieId: 'kpop-demon-hunters' },
        { id: 'i-lied', title: 'I Lied to You', movieId: 'sinners' },
        { id: 'sweet-dreams', title: 'Sweet Dreams of Joy', movieId: 'viva-verdi' },
        { id: 'train-dreams-song', title: 'Train Dreams', movieId: 'train-dreams' }
      ]
    },
    'best-cinematography': {
      id: 'best-cinematography',
      name: 'Best Cinematography',
      nominees: [
        { movieId: 'frankenstein' },
        { movieId: 'marty-supreme' },
        { movieId: 'one-battle-after-another' },
        { movieId: 'sinners' },
        { movieId: 'train-dreams' }
      ]
    },
    'best-film-editing': {
      id: 'best-film-editing',
      name: 'Best Film Editing',
      nominees: [
        { id: 'stephen-f1', name: 'Stephen Mirrione', movieId: 'f1' },
        { id: 'safdies-marty-edit', name: 'Ronald Bronstein & Josh Safdie', movieId: 'marty-supreme' },
        { id: 'andy-obaa', name: 'Andy Jurgensen', movieId: 'one-battle-after-another' },
        { id: 'olivier-sv', name: 'Olivier Bugge Coutté', movieId: 'sentimental-value' },
        { id: 'michael-sinners', name: 'Michael P. Shawver', movieId: 'sinners' }
      ]
    },
    'best-production-design': {
      id: 'best-production-design',
      name: 'Best Production Design',
      nominees: [
        { movieId: 'frankenstein' },
        { movieId: 'hamnet' },
        { movieId: 'marty-supreme' },
        { movieId: 'one-battle-after-another' },
        { movieId: 'sinners' }
      ]
    },
    'best-costume-design': {
      id: 'best-costume-design',
      name: 'Best Costume Design',
      nominees: [
        { id: 'deborah-avatar', name: 'Deborah L. Scott', movieId: 'avatar-fire-and-ash' },
        { id: 'kate-frank', name: 'Kate Hawley', movieId: 'frankenstein' },
        { id: 'malgosia-hamnet', name: 'Malgosia Turzanska', movieId: 'hamnet' },
        { id: 'miyako-marty', name: 'Miyako Bellizzi', movieId: 'marty-supreme' },
        { id: 'ruth-sinners', name: 'Ruth E. Carter', movieId: 'sinners' }
      ]
    },
    'best-makeup-hairstyling': {
      id: 'best-makeup-hairstyling',
      name: 'Best Makeup and Hairstyling',
      nominees: [
        { movieId: 'frankenstein' },
        { movieId: 'kokuho' },
        { movieId: 'sinners' },
        { movieId: 'the-smashing-machine' },
        { movieId: 'the-ugly-stepsister' }
      ]
    },
    'best-sound': {
      id: 'best-sound',
      name: 'Best Sound',
      nominees: [
        { movieId: 'f1' },
        { movieId: 'frankenstein' },
        { movieId: 'one-battle-after-another' },
        { movieId: 'sinners' },
        { movieId: 'sirat' }
      ]
    },
    'best-visual-effects': {
      id: 'best-visual-effects',
      name: 'Best Visual Effects',
      nominees: [
        { movieId: 'avatar-fire-and-ash' },
        { movieId: 'f1' },
        { movieId: 'jurassic-world-rebirth' },
        { movieId: 'the-lost-bus' },
        { movieId: 'sinners' }
      ]
    },
    'best-casting': {
      id: 'best-casting',
      name: 'Best Casting',
      nominees: [
        { id: 'nina-hamnet', name: 'Nina Gold', movieId: 'hamnet' },
        { id: 'jennifer-marty', name: 'Jennifer Venditti', movieId: 'marty-supreme' },
        { id: 'cassandra-obaa', name: 'Cassandra Kulukundis', movieId: 'one-battle-after-another' },
        { id: 'gabriel-secret', name: 'Gabriel Domingues', movieId: 'the-secret-agent' },
        { id: 'francine-sinners', name: 'Francine Maisler', movieId: 'sinners' }
      ]
    }
  }
};

// Helper functions
function getMovie(movieId) {
  return OSCAR_DATA.movies[movieId];
}

function getCategory(categoryId) {
  return OSCAR_DATA.categories[categoryId];
}

function getAllMovies() {
  return Object.values(OSCAR_DATA.movies).sort((a, b) => b.nominations - a.nominations);
}

function getAllCategories() {
  return Object.values(OSCAR_DATA.categories);
}

function getMovieNominations(movieId) {
  const nominations = [];
  for (const [categoryId, category] of Object.entries(OSCAR_DATA.categories)) {
    const isNominated = category.nominees.some(n =>
      n.movieId === movieId || n.id === movieId
    );
    if (isNominated) {
      const nominee = category.nominees.find(n => n.movieId === movieId || n.id === movieId);
      nominations.push({
        category: category,
        nominee: nominee
      });
    }
  }
  return nominations;
}

function getNomineeName(nominee, category) {
  if (nominee.name) return nominee.name;
  if (nominee.title) return nominee.title;
  if (nominee.movieId) {
    const movie = getMovie(nominee.movieId);
    return movie ? movie.title : nominee.movieId;
  }
  return 'Unknown';
}

function getNomineeId(nominee) {
  if (nominee.id) return nominee.id;
  if (nominee.movieId) return nominee.movieId;
  return null;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { OSCAR_DATA, getMovie, getCategory, getAllMovies, getAllCategories, getMovieNominations, getNomineeName, getNomineeId };
}
