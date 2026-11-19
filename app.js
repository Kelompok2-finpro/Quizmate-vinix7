/**
 * QuizMate VINIX7 - Modern Learning Platform & Interactive Assessment Web App
 * Responsive, interactive, and high-fidelity prototype implementation
 */

// Application State
const state = {
  currentView: 'catalog', // 'login', 'catalog', 'quiz', 'eval', 'leaderboard'
  user: {
    name: 'Siti Rahmawati',
    username: 'Siti',
    role: 'Cohort Batch 3 · Frontend',
    cohort: 'VINIX7 COHORT BATCH 3',
    rank: 3,
    avgScore: 91.5,
    modulesCompleted: 4,
    totalModules: 6,
    attendance: '100%'
  },
  quiz: {
    id: 'modul-4',
    title: 'Modul 4: Dasar JavaScript Modern & DOM Manipulation',
    totalQuestions: 15,
    timeRemainingSeconds: 18 * 60 + 41, // 18m 41s
    timerInterval: null,
    currentQuestionIndex: 13, // 0-indexed; starts at question 14 to match the Figma screen
    answers: {
      0: 'B',
      1: 'A',
      2: 'C',
      3: 'B',
      4: 'A',
      5: 'D',
      6: 'B',
      7: 'A',
      8: 'C',
      9: 'B',
      10: 'A', // Question 11 answered wrongly (intended to match Figma screen 05)
      11: 'C',
      12: 'B',
      13: 'A', // Question 14 Option A
      14: 'B'
    },
    flagged: {
      10: true // Question 11 flagged for review
    },
    isSubmitted: false
  },
  evalFilter: 'all' // 'all', 'correct', 'wrong'
};

// Quiz Question Bank (15 comprehensive questions aligned with Figma prototype)
const questionBank = [
  {
    id: 1,
    topic: 'ES6 Syntax · Destructuring & Default Values',
    points: 10,
    prompt: 'Diberikan objek konfigurasi berikut: <code>const { theme = "light", timeout = 3000 } = config;</code>. Apa nilai <code>theme</code> jika <code>config = { theme: undefined }</code>?',
    code: 'const config = { theme: undefined };\nconst { theme = "light", timeout = 3000 } = config;\nconsole.log(theme);',
    codeFilename: 'destructuring-default.js',
    codeLang: 'JAVASCRIPT ES6',
    options: [
      { id: 'A', text: 'undefined' },
      { id: 'B', text: '"light"' },
      { id: 'C', text: 'null' },
      { id: 'D', text: 'TypeError: Cannot read properties' }
    ],
    correctAnswer: 'B',
    hint: 'Default values pada destructuring diaktifkan jika nilai properti bernilai strictly undefined.',
    explanation: 'Dalam JavaScript ES6, default parameter atau default destructuring value hanya berlaku jika nilai target bernilai <code>undefined</code>. Karena <code>config.theme === undefined</code>, nilai fallback <code>"light"</code> digunakan.'
  },
  {
    id: 2,
    topic: 'Array Methods · Mutating vs Non-Mutating',
    points: 10,
    prompt: 'Manakah dari metode array berikut yang mengembalikan array baru tanpa mengubah (memutasi) array asli?',
    code: null,
    options: [
      { id: 'A', text: 'Array.prototype.map()' },
      { id: 'B', text: 'Array.prototype.push()' },
      { id: 'C', text: 'Array.prototype.sort()' },
      { id: 'D', text: 'Array.prototype.reverse()' }
    ],
    correctAnswer: 'A',
    hint: 'Pilihlah functional method yang mengedepankan prinsip immutability.',
    explanation: '<code>map()</code>, <code>filter()</code>, dan <code>slice()</code> adalah pure non-mutating methods yang menghasilkan array baru, sedangkan <code>push</code>, <code>sort</code>, dan <code>reverse</code> memutasi array asli.'
  },
  {
    id: 3,
    topic: 'Function Scope · Rest Operator',
    points: 10,
    prompt: 'Apa keluaran dari fungsi berikut saat dipanggil dengan parameter <code>sumAll(1, 2, 3, 4)</code>?',
    code: 'function sumAll(first, ...others) {\n  return others.reduce((acc, curr) => acc + curr, first);\n}\nconsole.log(sumAll(1, 2, 3, 4));',
    codeFilename: 'rest-operator.js',
    codeLang: 'JAVASCRIPT ES6',
    options: [
      { id: 'A', text: '9' },
      { id: 'B', text: '[2, 3, 4]' },
      { id: 'C', text: '10' },
      { id: 'D', text: 'NaN' }
    ],
    correctAnswer: 'C',
    hint: 'Parameter first bernilai 1, sedangkan others adalah array [2, 3, 4].',
    explanation: 'Nilai awal accumulator adalah <code>first</code> (1). Array <code>others</code> berisi <code>[2, 3, 4]</code> yang dijumlahkan: 1 + 2 + 3 + 4 = 10.'
  },
  {
    id: 4,
    topic: 'ES6 Arrow Functions · `this` Lexical Context',
    points: 10,
    prompt: 'Bagaimana perilaku kata kunci <code>this</code> di dalam arrow function jika dibandingkan dengan fungsi reguler?',
    code: null,
    options: [
      { id: 'A', text: 'Mengikat this ke objek window/global saat fungsi dipanggil' },
      { id: 'B', text: 'Mewarisi this dari enclosing lexical context di mana ia didefinisikan' },
      { id: 'C', text: 'Memiliki this sendiri yang dapat di-rebind dengan .bind()' },
      { id: 'D', text: 'Selalu bernilai undefined dalam strict mode' }
    ],
    correctAnswer: 'B',
    hint: 'Arrow functions tidak memiliki konteks this sendiri (lexical this).',
    explanation: 'Arrow function tidak memiliki binding <code>this</code>, <code>arguments</code>, <code>super</code>, atau <code>new.target</code> sendiri; ia mewarisi konteks <code>this</code> dari scope pembungkusnya.'
  },
  {
    id: 5,
    topic: 'Operators · Nullish Coalescing (??)',
    points: 10,
    prompt: 'Apa perbedaan mendasar antara operator OR logis (<code>||</code>) dan Nullish Coalescing (<code>??</code>)?',
    code: 'const count = 0;\nconst val1 = count || 10;\nconst val2 = count ?? 10;\nconsole.log(val1, val2);',
    codeFilename: 'nullish-check.js',
    codeLang: 'JAVASCRIPT ES2020',
    options: [
      { id: 'A', text: 'val1 menghasilkan 10, val2 menghasilkan 0' },
      { id: 'B', text: 'val1 menghasilkan 0, val2 menghasilkan 10' },
      { id: 'C', text: 'Keduanya menghasilkan 0' },
      { id: 'D', text: 'Keduanya menghasilkan 10' }
    ],
    correctAnswer: 'A',
    hint: '0 bernilai falsy bagi || tetapi bukan null/undefined bagi ??.',
    explanation: 'Operator <code>||</code> menganggap <code>0</code>, <code>""</code>, dan <code>false</code> sebagai falsy dan mengambil fallback. Operator <code>??</code> hanya memeriksa apakah nilai bernilai <code>null</code> atau <code>undefined</code>.'
  },
  {
    id: 6,
    topic: 'Modern DOM · Event Delegation',
    points: 10,
    prompt: 'Mengapa teknik Event Delegation pada parent container lebih disarankan dibandingkan memasang event listener pada setiap child item di dalam list dinamis?',
    code: null,
    options: [
      { id: 'A', text: 'Menghindari syntax error pada browser lama' },
      { id: 'B', text: 'Memaksa browser melakukan reflow synchronous' },
      { id: 'C', text: 'Mencegah event bubbling ke level document' },
      { id: 'D', text: 'Menghemat konsumsi memori dan otomatis menangani elemen baru yang di-render secara dinamis' }
    ],
    correctAnswer: 'D',
    hint: 'Manfaatkan fase event bubbling ke parent element.',
    explanation: 'Event Delegation memanfaatkan fase bubbling dari child ke parent. Cukup 1 listener pada parent untuk ribuan child, dan child yang ditambahkan belakangan tetap berfungsi.'
  },
  {
    id: 7,
    topic: 'DOM Manipulation · DocumentFragment',
    points: 10,
    prompt: 'Kapan penggunaan <code>document.createDocumentFragment()</code> paling direkomendasikan?',
    code: null,
    options: [
      { id: 'A', text: 'Hanya ketika memuat file script eksternal' },
      { id: 'B', text: 'Saat menambahkan banyak node DOM sekaligus untuk meminimalkan reflow & repaint' },
      { id: 'C', text: 'Saat menghapus elemen dari shadow DOM' },
      { id: 'D', text: 'Sebagai pengganti localStorage' }
    ],
    correctAnswer: 'B',
    hint: 'Fragment adalah lightweight container di memori yang tidak berada di live DOM tree.',
    explanation: 'Menambahkan elemen langsung ke live DOM memicu kalkulasi layout dan repaint berulang. DocumentFragment menampung perubahan di memori sebelum disisipkan sekali saja.'
  },
  {
    id: 8,
    topic: 'Closures · Lexical Scoping & Loop Var vs Let',
    points: 10,
    prompt: 'Berapakah angka yang dicetak pada console setelah 100ms?',
    code: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}',
    codeFilename: 'closure-scope.js',
    codeLang: 'JAVASCRIPT ES5 vs ES6',
    options: [
      { id: 'A', text: '3, 3, 3' },
      { id: 'B', text: '0, 1, 2' },
      { id: 'C', text: 'undefined, undefined, undefined' },
      { id: 'D', text: '1, 2, 3' }
    ],
    correctAnswer: 'A',
    hint: 'Kata kunci var memiliki function-level scope, bukan block-level scope.',
    explanation: 'Karena <code>var</code> tidak memiliki block scope, semua callback <code>setTimeout</code> berbagi satu referensi variabel <code>i</code> yang sama, yang bernilai 3 setelah loop selesai. Jika menggunakan <code>let</code>, hasilnya adalah 0, 1, 2.'
  },
  {
    id: 9,
    topic: 'Asynchronous JS · Promise State Transitions',
    points: 10,
    prompt: 'Setelah sebuah Promise bertransisi ke status Fulfilled atau Rejected, apakah status tersebut dapat berubah kembali?',
    code: null,
    options: [
      { id: 'A', text: 'Bisa, jika memanggil .retry()' },
      { id: 'B', text: 'Bisa, jika dipanggil di dalam try/catch' },
      { id: 'C', text: 'Tidak bisa, Promise bersifat settled (immutable)' },
      { id: 'D', text: 'Tergantung apakah menggunakan async/await' }
    ],
    correctAnswer: 'C',
    hint: 'Promise hanya dapat diselesaikan (settle) satu kali.',
    explanation: 'Setelah Promise settled (baik fulfilled atau rejected), nilainya tidak dapat diubah lagi oleh pemanggilan <code>resolve</code> atau <code>reject</code> berikutnya.'
  },
  {
    id: 10,
    topic: 'Object Immutability · Object.freeze()',
    points: 10,
    prompt: 'Apakah <code>Object.freeze(obj)</code> secara otomatis membekukan nested objects (objek bersarang) di dalamnya secara mendalam (deep freeze)?',
    code: 'const user = Object.freeze({\n  name: "Siti",\n  profile: { role: "Frontend" }\n});\nuser.profile.role = "Lead";',
    codeFilename: 'shallow-freeze.js',
    codeLang: 'JAVASCRIPT MODERN',
    options: [
      { id: 'A', text: 'Ya, Object.freeze() melakukan deep freeze secara rekursif' },
      { id: 'B', text: 'Tidak, Object.freeze() bersifat shallow (hanya membekukan properti tingkat pertama)' },
      { id: 'C', text: 'Menimbulkan syntax error saat kompilasi' },
      { id: 'D', text: 'Hanya bekerja pada array' }
    ],
    correctAnswer: 'B',
    hint: 'Perhatikan properti nested profile.',
    explanation: '<code>Object.freeze()</code> hanya bekerja secara shallow. Objek bersarang <code>user.profile</code> tetap dapat dimutasi kecuali jika dibekukan secara rekursif.'
  },
  {
    id: 11,
    topic: 'Array Methods · Mutating Method Identification',
    points: 10,
    prompt: 'Manakah method array JavaScript bawaan berikut yang secara langsung memodifikasi susunan array asli (mutating method)?',
    code: null,
    options: [
      { id: 'A', text: 'Array.prototype.slice()' },
      { id: 'B', text: 'Array.prototype.splice()' },
      { id: 'C', text: 'Array.prototype.concat()' },
      { id: 'D', text: 'Array.prototype.filter()' }
    ],
    correctAnswer: 'B',
    hint: 'Hati-hati antara slice (potong salin) dan splice (potong hapus/sisip langsung).',
    explanation: '<code>splice()</code> menghapus atau menyisipkan elemen langsung pada array asli (memutasi array). Sedangkan <code>slice()</code>, <code>concat()</code>, dan <code>filter()</code> mengembalikan array baru.'
  },
  {
    id: 12,
    topic: 'Web APIs · Client-Side Storage Differences',
    points: 10,
    prompt: 'Apa karakteristik utama dari data yang disimpan di dalam <code>sessionStorage</code>?',
    code: null,
    options: [
      { id: 'A', text: 'Otomatis terkirim ke server pada setiap HTTP request header' },
      { id: 'B', text: 'Tersimpan permanen tanpa batas waktu hingga user membersihkan cache' },
      { id: 'C', text: 'Hanya bertahan selama tab/window browser aktif dan dihapus saat tab ditutup' },
      { id: 'D', text: 'Dapat diakses oleh domain yang berbeda (cross-origin)' }
    ],
    correctAnswer: 'C',
    hint: 'SessionStorage scoped per tab dan masa pakainya terikat sesi tab.',
    explanation: '<code>sessionStorage</code> memiliki masa pakai terbatas pada siklus hidup tab browser aktif. Saat tab ditutup, data akan dihapus secara otomatis.'
  },
  {
    id: 13,
    topic: 'Performance · Debounce vs Throttle',
    points: 10,
    prompt: 'Pada fitur live search input di mana Anda ingin menunggu hingga pengguna berhenti mengetik selama 300ms sebelum memanggil API, teknik manakah yang tepat digunakan?',
    code: null,
    options: [
      { id: 'A', text: 'Throttling' },
      { id: 'B', text: 'Debouncing' },
      { id: 'C', text: 'Memoization' },
      { id: 'D', text: 'Event Delegation' }
    ],
    correctAnswer: 'B',
    hint: 'Debounce menunda eksekusi sampai periode tenang (inactivity) tercapai.',
    explanation: '<code>Debouncing</code> menunda eksekusi fungsi sampai tidak ada lagi event baru selama durasi tertentu (cocok untuk search bar). <code>Throttling</code> membatasi eksekusi maksimal sekali per interval (cocok untuk scroll/resize).'
  },
  {
    id: 14,
    topic: 'ES6 Async / Await & Event Loop',
    points: 10,
    prompt: 'Perhatikan potongan kode JavaScript modern berikut. Apakah urutan keluaran string yang dicetak pada console ketika fungsi <code>fetchData()</code> dieksekusi secara asinkron?',
    code: `async function fetchData() {
  console.log("A");
  const result = await Promise.resolve("B");
  console.log(result);
  console.log("C");
}

console.log("D");
fetchData();
console.log("E");`,
    codeFilename: 'event-loop-demo.js',
    codeLang: 'JAVASCRIPT ES2022',
    options: [
      { id: 'A', text: 'D, A, E, B, C' },
      { id: 'B', text: 'A, B, C, D, E' },
      { id: 'C', text: 'D, A, B, C, E' },
      { id: 'D', text: 'A, D, E, B, C' }
    ],
    correctAnswer: 'A',
    hint: 'Petunjuk Singkat: Perhatikan prioritas antrean microtask queue (Promise resolution) versus synchronous execution loop.',
    explanation: 'Urutan eksekusi: 1) "D" dicetak secara sinkron. 2) fetchData() dipanggil: "A" dicetak secara sinkron. 3) Eksekusi await Promise.resolve("B") melepaskan kendali dan memasukkan sisa fungsi ke microtask queue. 4) "E" dicetak secara sinkron. 5) Call stack kosong, event loop menjalankan microtask queue: "B" lalu "C". Maka urutan yang benar adalah: D, A, E, B, C.'
  },
  {
    id: 15,
    topic: 'ES Modules · Static vs Dynamic Import',
    points: 10,
    prompt: 'Manakah keuntungan utama dari penggunaan Dynamic Import (<code>import()</code>) dibandingkan Static Import (<code>import ... from ...</code>)?',
    code: null,
    options: [
      { id: 'A', text: 'Dynamic import tidak memerlukan bundler sama sekali' },
      { id: 'B', text: 'Memungkinkan Code Splitting dan Lazy Loading modul saat dibutuhkan sesuai kondisi runtime' },
      { id: 'C', text: 'Membuat variabel modul menjadi global otomatis' },
      { id: 'D', text: 'Mengabaikan error syntax pada modul eksternal' }
    ],
    correctAnswer: 'B',
    hint: 'Dynamic import mengembalikan Promise dan mendukung lazy loading.',
    explanation: '<code>import()</code> dinamis mengembalikan Promise dan memungkinkan pemuatan modul hanya saat pengguna berinteraksi (Lazy Loading), mengurangi ukuran initial bundle.'
  }
];

// Leaderboard Cohort Batch 3 Data
const leaderboardData = [
  { rank: 1, name: 'Ahmad Fauzi', track: 'Frontend Web', modules: 6, avg: 98.0, points: 980, badge: 'Honors Cumlaude', medal: 'gold' },
  { rank: 2, name: 'Rian Pratama', track: 'Fullstack Dev', modules: 6, avg: 96.5, points: 965, badge: 'High Distinction', medal: 'silver' },
  { rank: 3, name: 'Siti Rahmawati', track: 'Frontend Web', modules: 5, avg: 94.5, points: 945, badge: 'Distinction · Top 10%', medal: 'bronze', isCurrentUser: true },
  { rank: 4, name: 'Budi Santoso', track: 'Backend Engineer', modules: 5, avg: 92.0, points: 920, badge: 'Pass with Merit' },
  { rank: 5, name: 'Dewi Lestari', track: 'UI/UX & Design', modules: 5, avg: 91.0, points: 910, badge: 'Pass with Merit' },
  { rank: 6, name: 'Fikri Haikal', track: 'Frontend Web', modules: 4, avg: 89.5, points: 895, badge: 'Good Standing' },
  { rank: 7, name: 'Nadia Putri', track: 'Fullstack Dev', modules: 4, avg: 88.0, points: 880, badge: 'Good Standing' },
  { rank: 8, name: 'Dimas Anggara', track: 'Backend Engineer', modules: 4, avg: 86.5, points: 865, badge: 'Good Standing' }
];

// Application Lifecycle & DOM Initialization
function initApp() {
  initNavigation();
  initLoginView();
  initCatalogView();
  initQuizArena();
  initModalConfirm();
  initEvalView();
  initLeaderboardView();
  initSearchAndProfile();
  initActionButtons();
  initMobileMenu();
  
  // Start on catalog view by default
  switchView('catalog');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// View Navigation Router
function switchView(viewName) {
  state.currentView = viewName;
  
  // Update header nav active styles
  document.querySelectorAll('.nav-item').forEach(el => {
    if (el.dataset.view === viewName) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Hide all views, display target view
  document.querySelectorAll('.view-section').forEach(viewEl => {
    viewEl.classList.remove('active');
  });

  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) {
    targetView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle specific view hooks
  if (viewName === 'quiz') {
    startQuizTimer();
    renderQuestion(state.quiz.currentQuestionIndex);
    updatePaletteGrid();
  } else {
    stopQuizTimer();
  }

  if (viewName === 'eval') {
    renderEvaluationResults();
  }
}

function initNavigation() {
  document.querySelectorAll('[data-view-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.viewTarget;
      switchView(target);
    });
  });

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.view;
      if (target) switchView(target);
    });
  });

  const logoBtn = document.querySelector('.logo-badge');
  if (logoBtn) {
    logoBtn.addEventListener('click', () => switchView('catalog'));
  }
}

// VIEW 1: LOGIN LOGIC
function initLoginView() {
  const loginForm = document.getElementById('login-form');
  const pwdInput = document.getElementById('login-password');
  const togglePwdBtn = document.getElementById('toggle-password-btn');

  if (togglePwdBtn && pwdInput) {
    togglePwdBtn.addEventListener('click', () => {
      const isPassword = pwdInput.type === 'password';
      pwdInput.type = isPassword ? 'text' : 'password';
      togglePwdBtn.innerHTML = isPassword ? '👁️' : '👁️‍🗨️';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('login-username');
      if (usernameInput && usernameInput.value.trim()) {
        state.user.name = usernameInput.value.trim() === 'Siti' ? 'Siti Rahmawati' : usernameInput.value.trim();
        updateUserHeader();
      }
      showToast(`Selamat datang kembali, ${state.user.name}!`);
      switchView('catalog');
    });
  }
}

function updateUserHeader() {
  const userNameEl = document.querySelector('.user-name');
  if (userNameEl) userNameEl.textContent = state.user.name;
}

// VIEW 2: CATALOG LOGIC
function initCatalogView() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const quizCards = document.querySelectorAll('.quiz-card');
  const catalogSearch = document.getElementById('catalog-search-input');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.category;
      applyCatalogFilter(category, catalogSearch ? catalogSearch.value : '');
    });
  });

  if (catalogSearch) {
    catalogSearch.addEventListener('input', (e) => {
      const activeTab = document.querySelector('.filter-tab.active');
      const category = activeTab ? activeTab.dataset.category : 'all';
      applyCatalogFilter(category, e.target.value);
    });
  }
}

function applyCatalogFilter(category, query) {
  const normalizedQuery = (query || '').toLowerCase().trim();
  const quizCards = document.querySelectorAll('.quiz-card');

  quizCards.forEach(card => {
    const cardCat = card.dataset.category || 'all';
    const cardText = card.textContent.toLowerCase();
    
    const matchesCat = category === 'all' || cardCat === category;
    const matchesQuery = !normalizedQuery || cardText.includes(normalizedQuery);

    if (matchesCat && matchesQuery) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// VIEW 3: QUIZ ARENA LOGIC
function initQuizArena() {
  const prevBtn = document.getElementById('btn-prev-question');
  const nextBtn = document.getElementById('btn-next-question');
  const flagCheckbox = document.getElementById('flag-question-checkbox');
  const saveDraftBtn = document.getElementById('btn-save-draft');
  const submitExamBtn = document.getElementById('btn-submit-exam');
  const paletteSubmitBtn = document.getElementById('btn-palette-submit');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.quiz.currentQuestionIndex > 0) {
        state.quiz.currentQuestionIndex--;
        renderQuestion(state.quiz.currentQuestionIndex);
        updatePaletteGrid();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.quiz.currentQuestionIndex < questionBank.length - 1) {
        state.quiz.currentQuestionIndex++;
        renderQuestion(state.quiz.currentQuestionIndex);
        updatePaletteGrid();
      } else {
        openConfirmationModal();
      }
    });
  }

  if (flagCheckbox) {
    flagCheckbox.addEventListener('change', (e) => {
      const qIdx = state.quiz.currentQuestionIndex;
      if (e.target.checked) {
        state.quiz.flagged[qIdx] = true;
      } else {
        delete state.quiz.flagged[qIdx];
      }
      updatePaletteGrid();
    });
  }

  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', () => {
      showToast('✓ Draf tersimpan dan terenkripsi secara otomatis ke server!');
    });
  }

  if (submitExamBtn) {
    submitExamBtn.addEventListener('click', () => {
      openConfirmationModal();
    });
  }

  if (paletteSubmitBtn) {
    paletteSubmitBtn.addEventListener('click', () => {
      openConfirmationModal();
    });
  }
}

function startQuizTimer() {
  stopQuizTimer();
  const timerDisplay = document.getElementById('live-timer-digits');
  
  state.quiz.timerInterval = setInterval(() => {
    if (state.quiz.timeRemainingSeconds > 0) {
      state.quiz.timeRemainingSeconds--;
      if (timerDisplay) {
        const m = Math.floor(state.quiz.timeRemainingSeconds / 60);
        const s = state.quiz.timeRemainingSeconds % 60;
        timerDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      }
    } else {
      stopQuizTimer();
      showToast('Waktu pengerjaan telah berakhir. Jawaban Anda dikirim otomatis.');
      submitQuizAndGrade();
    }
  }, 1000);
}

function stopQuizTimer() {
  if (state.quiz.timerInterval) {
    clearInterval(state.quiz.timerInterval);
    state.quiz.timerInterval = null;
  }
}

function renderQuestion(index) {
  const q = questionBank[index];
  if (!q) return;

  // Question header & pill
  const qNumberEl = document.getElementById('q-number-pill');
  const qTopicEl = document.getElementById('q-topic-label');
  const qPointsEl = document.getElementById('q-points-label');
  const qPromptEl = document.getElementById('q-prompt-text');
  const qTerminalContainer = document.getElementById('q-terminal-container');
  const qOptionsContainer = document.getElementById('q-options-container');
  const qHintEl = document.getElementById('q-hint-text');
  const flagCheckbox = document.getElementById('flag-question-checkbox');
  const prevBtn = document.getElementById('btn-prev-question');
  const nextBtn = document.getElementById('btn-next-question');

  if (qNumberEl) qNumberEl.textContent = `Soal No. ${q.id} dari ${questionBank.length}`;
  if (qTopicEl) qTopicEl.textContent = `Topik: ${q.topic}`;
  if (qPointsEl) qPointsEl.textContent = `Bobot: ${q.points} Poin`;
  if (qPromptEl) qPromptEl.innerHTML = q.prompt;

  // Code snippet
  if (qTerminalContainer) {
    if (q.code) {
      qTerminalContainer.style.display = 'block';
      qTerminalContainer.innerHTML = `
        <div class="terminal-titlebar">
          <div class="terminal-dots">
            <span class="terminal-dot dot-red"></span>
            <span class="terminal-dot dot-yellow"></span>
            <span class="terminal-dot dot-green"></span>
            <span class="terminal-filename">${q.codeFilename || 'snippet.js'}</span>
          </div>
          <span class="terminal-lang-badge">${q.codeLang || 'JAVASCRIPT ES2022'}</span>
        </div>
        <pre class="terminal-code-body"><code>${escapeHtml(q.code)}</code></pre>
      `;
    } else {
      qTerminalContainer.style.display = 'none';
      qTerminalContainer.innerHTML = '';
    }
  }

  // Answer Choices
  if (qOptionsContainer) {
    qOptionsContainer.innerHTML = '';
    const selectedAnswer = state.quiz.answers[index];

    q.options.forEach(opt => {
      const isSelected = selectedAnswer === opt.id;
      const optCard = document.createElement('div');
      optCard.className = `option-choice-card ${isSelected ? 'selected' : ''}`;
      optCard.dataset.optionId = opt.id;

      optCard.innerHTML = `
        <div class="option-badge">${opt.id}</div>
        <div class="option-text">${escapeHtml(opt.text)}</div>
        <div class="option-selected-tag">
          <span>✓</span> Pilihan Anda
        </div>
      `;

      optCard.addEventListener('click', () => {
        state.quiz.answers[index] = opt.id;
        renderQuestion(index);
        updatePaletteGrid();
        updateProgressBar();
      });

      qOptionsContainer.appendChild(optCard);
    });
  }

  // Hint
  if (qHintEl) {
    qHintEl.textContent = q.hint || 'Pilihlah salah satu jawaban yang paling relevan.';
  }

  // Flag doubt toggle state
  if (flagCheckbox) {
    flagCheckbox.checked = !!state.quiz.flagged[index];
  }

  // Previous button label / disabled state
  if (prevBtn) {
    prevBtn.disabled = index === 0;
    prevBtn.style.opacity = index === 0 ? '0.5' : '1';
    prevBtn.innerHTML = `<span>←</span> Soal Sebelumnya ${index > 0 ? `(No. ${index})` : ''}`;
  }

  // Next button label
  if (nextBtn) {
    if (index === questionBank.length - 1) {
      nextBtn.innerHTML = `Kirim Seluruh Jawaban <span>✓</span>`;
    } else {
      nextBtn.innerHTML = `Soal Berikutnya (No. ${index + 2}) <span>→</span>`;
    }
  }

  updateProgressBar();
}

function updateProgressBar() {
  const answeredCount = Object.keys(state.quiz.answers).length;
  const total = questionBank.length;
  const pct = Math.round((answeredCount / total) * 100);

  const fillBar = document.getElementById('exam-progress-fill');
  const textCount = document.getElementById('exam-progress-count');

  if (fillBar) fillBar.style.width = `${pct}%`;
  if (textCount) textCount.textContent = `${answeredCount} dari ${total} Soal (${pct}%)`;
}

function updatePaletteGrid() {
  const paletteGrid = document.getElementById('palette-grid');
  if (!paletteGrid) return;

  paletteGrid.innerHTML = '';
  questionBank.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.className = 'palette-btn';
    btn.dataset.index = idx;

    const isCurrent = idx === state.quiz.currentQuestionIndex;
    const isAnswered = state.quiz.answers[idx] !== undefined;
    const isFlagged = !!state.quiz.flagged[idx];

    if (isCurrent) {
      btn.classList.add('active');
    } else if (isFlagged) {
      btn.classList.add('flagged');
    } else if (isAnswered) {
      btn.classList.add('answered');
    }

    btn.innerHTML = `
      <span>${q.id}</span>
      ${isAnswered && !isCurrent && !isFlagged ? '<span class="palette-check-icon">✓</span>' : ''}
      ${isFlagged ? '<span style="font-size:10px;">🚩</span>' : ''}
    `;

    btn.addEventListener('click', () => {
      state.quiz.currentQuestionIndex = idx;
      renderQuestion(idx);
      updatePaletteGrid();
    });

    paletteGrid.appendChild(btn);
  });
}

// VIEW 4: CONFIRMATION MODAL LOGIC
function initModalConfirm() {
  const modalOverlay = document.getElementById('confirm-modal-overlay');
  const cancelBtn = document.getElementById('btn-modal-cancel');
  const confirmBtn = document.getElementById('btn-modal-confirm');

  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeConfirmationModal);
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      closeConfirmationModal();
      submitQuizAndGrade();
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeConfirmationModal();
    });
  }
}

function openConfirmationModal() {
  const modalOverlay = document.getElementById('confirm-modal-overlay');
  if (!modalOverlay) return;

  const total = questionBank.length;
  const answeredCount = Object.keys(state.quiz.answers).length;
  const flaggedCount = Object.keys(state.quiz.flagged).length;
  const emptyCount = total - answeredCount;

  const m = Math.floor(state.quiz.timeRemainingSeconds / 60);
  const s = state.quiz.timeRemainingSeconds % 60;
  const timeFormatted = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  document.getElementById('modal-stat-answered').textContent = `${answeredCount} / ${total}`;
  document.getElementById('modal-stat-flagged').textContent = `${flaggedCount} Soal`;
  document.getElementById('modal-stat-empty').textContent = `${emptyCount} Soal`;
  document.getElementById('modal-stat-timer').textContent = timeFormatted;

  modalOverlay.classList.add('active');
}

function closeConfirmationModal() {
  const modalOverlay = document.getElementById('confirm-modal-overlay');
  if (modalOverlay) modalOverlay.classList.remove('active');
}

// SUBMISSION & GRADING LOGIC
function submitQuizAndGrade() {
  state.quiz.isSubmitted = true;
  stopQuizTimer();
  showToast('✓ Jawaban berhasil dikirim! Menghitung hasil evaluasi...');
  switchView('eval');
}

// VIEW 5: EVALUATION RESULTS LOGIC
function initEvalView() {
  const filterBtns = document.querySelectorAll('.eval-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.evalFilter = btn.dataset.filter;
      renderReviewQuestions();
    });
  });

  const downloadCertBtn = document.getElementById('btn-download-cert');
  if (downloadCertBtn) {
    downloadCertBtn.addEventListener('click', () => {
      showToast('📥 Mengunduh Sertifikat Kompetensi Modul 4 (PDF)...');
    });
  }
}

function renderEvaluationResults() {
  let correctCount = 0;
  let totalScore = 0;

  questionBank.forEach((q, idx) => {
    const studentAns = state.quiz.answers[idx];
    if (studentAns === q.correctAnswer) {
      correctCount++;
      totalScore += q.points;
    }
  });

  const wrongCount = questionBank.length - correctCount;
  const finalPercentage = ((correctCount / questionBank.length) * 100).toFixed(1);

  // Update Hero & Bento Stats
  const scoreNumEl = document.getElementById('eval-score-number');
  const kpiCorrectEl = document.getElementById('eval-kpi-correct');
  const kpiCorrectPctEl = document.getElementById('eval-kpi-correct-pct');
  const kpiWrongEl = document.getElementById('eval-kpi-wrong');
  const kpiWrongDescEl = document.getElementById('eval-kpi-wrong-desc');

  if (scoreNumEl) scoreNumEl.textContent = finalPercentage;
  if (kpiCorrectEl) kpiCorrectEl.textContent = `${correctCount} / ${questionBank.length}`;
  if (kpiCorrectPctEl) kpiCorrectPctEl.textContent = `${finalPercentage}%`;
  if (kpiWrongEl) kpiWrongEl.textContent = `${wrongCount}`;
  if (kpiWrongDescEl) {
    kpiWrongDescEl.textContent = wrongCount === 1 ? 'Hanya No. 11 perlu ditinjau ulang' : `${wrongCount} Soal perlu dievaluasi`;
  }

  renderReviewQuestions();
}

function renderReviewQuestions() {
  const reviewContainer = document.getElementById('eval-review-list');
  if (!reviewContainer) return;

  reviewContainer.innerHTML = '';

  questionBank.forEach((q, idx) => {
    const studentAns = state.quiz.answers[idx] || 'Tidak dijawab';
    const isCorrect = studentAns === q.correctAnswer;

    if (state.evalFilter === 'correct' && !isCorrect) return;
    if (state.evalFilter === 'wrong' && isCorrect) return;

    const card = document.createElement('div');
    card.className = `review-item-card ${isCorrect ? 'is-correct' : 'is-wrong'}`;

    card.innerHTML = `
      <div class="review-item-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="pill-badge ${isCorrect ? 'pill-success' : 'pill-danger'}">
            ${isCorrect ? '✓ Benar' : '✗ Perlu Ditinjau'}
          </span>
          <span style="font-family:var(--font-heading); font-weight:700; font-size:14px; color:var(--color-text-main);">
            Soal No. ${q.id}
          </span>
        </div>
        <span style="font-size:12px; color:var(--color-text-muted); font-weight:600;">
          ${q.topic}
        </span>
      </div>

      <div class="review-item-prompt">${q.prompt}</div>

      ${q.code ? `
        <div class="terminal-code-box" style="margin-bottom:14px;">
          <div class="terminal-titlebar">
            <span class="terminal-filename" style="margin-left:0;">${q.codeFilename || 'snippet.js'}</span>
            <span class="terminal-lang-badge">${q.codeLang || 'JAVASCRIPT'}</span>
          </div>
          <pre class="terminal-code-body"><code>${escapeHtml(q.code)}</code></pre>
        </div>
      ` : ''}

      <div class="review-answers-grid">
        <div class="review-answer-box student-answer">
          <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:2px;">
            Jawaban Anda:
          </div>
          <div style="font-weight:600; color:${isCorrect ? 'var(--color-success-dark)' : 'var(--color-danger-dark)'};">
            Pilihan ${studentAns}: ${getOptionText(q, studentAns)}
          </div>
        </div>

        <div class="review-answer-box correct-key">
          <div style="font-size:11px; font-weight:700; color:var(--color-success-dark); text-transform:uppercase; margin-bottom:2px;">
            Kunci Jawaban Resmi:
          </div>
          <div style="font-weight:600;">
            Pilihan ${q.correctAnswer}: ${getOptionText(q, q.correctAnswer)}
          </div>
        </div>
      </div>

      <div class="review-explanation-box">
        <strong>Pembahasan & Kaidah Teknis:</strong><br/>
        ${q.explanation}
      </div>
    `;

    reviewContainer.appendChild(card);
  });
}

function getOptionText(question, optionId) {
  const opt = question.options.find(o => o.id === optionId);
  return opt ? opt.text : '(Tidak memilih)';
}

// VIEW 6: LEADERBOARD LOGIC
function initLeaderboardView() {
  const tableBody = document.getElementById('leaderboard-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = '';
  leaderboardData.forEach(row => {
    const tr = document.createElement('tr');
    if (row.isCurrentUser) tr.className = 'highlight-user';

    tr.innerHTML = `
      <td>
        <span class="sidebar-lb-rank ${row.medal || ''}">#${row.rank}</span>
      </td>
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="user-avatar" style="width:30px; height:30px; font-size:12px;">
            ${row.name.charAt(0)}
          </div>
          <div>
            <div style="font-weight:700; color:var(--color-text-main);">${row.name} ${row.isCurrentUser ? '<span class="pill-badge pill-primary" style="font-size:10px; padding:1px 6px;">Anda</span>' : ''}</div>
            <div style="font-size:11px; color:var(--color-text-muted);">${row.track}</div>
          </div>
        </div>
      </td>
      <td>${row.modules} / 6 Modul</td>
      <td><strong>${row.avg.toFixed(1)}</strong></td>
      <td><span style="font-family:var(--font-heading); font-weight:800; color:var(--color-primary);">${row.points} Pts</span></td>
      <td>
        <span class="pill-badge ${row.rank <= 3 ? 'pill-success' : 'pill-info'}" style="font-size:11px;">
          ${row.badge}
        </span>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}

// SEARCH MODAL & USER PROFILE MODAL
function initSearchAndProfile() {
  const searchTriggers = document.querySelectorAll('.search-trigger');
  const searchModal = document.getElementById('search-modal-overlay');
  const searchInput = document.getElementById('global-search-input');
  const searchResults = document.getElementById('search-results-list');
  const profileTrigger = document.querySelector('.user-profile-btn');
  const profileModal = document.getElementById('profile-modal-overlay');

  // Ctrl+K Shortcut for Search
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearchModal();
    }
    if (e.key === 'Escape') {
      closeSearchModal();
      closeProfileModal();
      closeConfirmationModal();
    }
  });

  searchTriggers.forEach(btn => {
    btn.addEventListener('click', openSearchModal);
  });

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearchModal();
    });
  }

  if (profileTrigger) {
    profileTrigger.addEventListener('click', openProfileModal);
  }

  if (profileModal) {
    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) closeProfileModal();
    });
  }

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      filterSearchResults(q);
    });
  }
}

function openSearchModal() {
  const modal = document.getElementById('search-modal-overlay');
  const input = document.getElementById('global-search-input');
  if (modal) {
    modal.classList.add('active');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 50);
      filterSearchResults('');
    }
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal-overlay');
  if (modal) modal.classList.remove('active');
}

function openProfileModal() {
  const modal = document.getElementById('profile-modal-overlay');
  if (modal) modal.classList.add('active');
}

function closeProfileModal() {
  const modal = document.getElementById('profile-modal-overlay');
  if (modal) modal.classList.remove('active');
}

function filterSearchResults(query) {
  const resultsContainer = document.getElementById('search-results-list');
  if (!resultsContainer) return;

  const catalogItems = [
    { title: 'Modul 4: Dasar JavaScript Modern & DOM Manipulation', type: 'Modul Wajib', desc: 'ES6+, Promises, Async/Await, dan Event Loop', view: 'quiz' },
    { title: 'Modul 5: State Management & React Lifecycle', type: 'Modul Lanjutan', desc: 'useState, useEffect, useMemo, dan Context API', view: 'catalog' },
    { title: 'Modul 3: Responsive Layouts & Tailwind CSS Architecture', type: 'Modul Selesai', desc: 'Utility-first principles dan container queries', view: 'catalog' },
    { title: 'Modul 2: RESTful API Integration & Error Handling', type: 'Modul Selesai', desc: 'Protokol HTTP/HTTPS, fetch, status codes', view: 'catalog' },
    { title: 'Papan Peringkat Cohort VINIX7', type: 'Leaderboard', desc: 'Lihat peringkat kelas dan akumulasi poin peserta', view: 'leaderboard' },
    { title: 'Hasil Evaluasi Modul 4', type: 'Evaluasi', desc: 'Tinjau pembahasan soal dan unduh sertifikat', view: 'eval' }
  ];

  const filtered = catalogItems.filter(item => {
    return !query || item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
  });

  resultsContainer.innerHTML = '';
  if (filtered.length === 0) {
    resultsContainer.innerHTML = '<div style="padding:24px; text-align:center; color:var(--color-text-muted);">Tidak ada materi atau modul yang cocok.</div>';
    return;
  }

  filtered.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'search-result-item';
    itemEl.style.cssText = 'padding:12px 16px; border-radius:8px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition:background 0.2s;';
    itemEl.innerHTML = `
      <div>
        <div style="font-weight:700; color:var(--color-text-main); font-size:14px;">${item.title}</div>
        <div style="font-size:12px; color:var(--color-text-muted);">${item.desc}</div>
      </div>
      <span class="pill-badge pill-info" style="font-size:11px;">${item.type}</span>
    `;

    itemEl.addEventListener('mouseenter', () => itemEl.style.background = 'var(--color-primary-bg)');
    itemEl.addEventListener('mouseleave', () => itemEl.style.background = 'transparent');
    itemEl.addEventListener('click', () => {
      closeSearchModal();
      switchView(item.view);
    });

    resultsContainer.appendChild(itemEl);
  });
}

// Global Action Button Handlers
function initActionButtons() {
  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const action = btn.dataset.action;
      switch (action) {
        case 'auto-login': {
          const form = document.getElementById('login-form');
          if (form) form.dispatchEvent(new Event('submit'));
          break;
        }
        case 'register-info':
          showToast('Silakan hubungi administrator kampus VINIX7 untuk registrasi cohort baru.');
          break;
        case 'locked-modul-5':
          showToast('Selesaikan Modul 4 terlebih dahulu untuk membuka sesi ujian ini.');
          break;
        case 'logout':
          closeProfileModal();
          switchView('login');
          showToast('Anda telah keluar dari akun.');
          break;
        case 'close-profile':
          closeProfileModal();
          break;
        case 'open-privacy':
          showToast('Kebijakan Privasi: Data pengerjaan ujian dilindungi oleh enkripsi TLS.');
          break;
        case 'open-terms':
          showToast('Ketentuan Layanan: Platform ini ditujukan untuk evaluasi akademik peserta VINIX7.');
          break;
        case 'open-help':
          showToast('Bantuan LMS: Hubungi helpdesk@vinix7.edu untuk bantuan teknis.');
          break;
      }
    });
  });
}

// Mobile Responsive Navigation Menu
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('main-nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// Utility: Show Toast Notification
let toastTimer = null;
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>💬</span> ${escapeHtml(message)}`;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Utility: Escape HTML (Safe)
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
