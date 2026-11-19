# Quizmate-vinix7

QuizMate VINIX7 adalah platform asesmen dan evaluasi pembelajaran interaktif berbasis web untuk peserta VINIX7 LMS Assessment. Aplikasi ini dibangun secara murni, mandiri (zero external runtime dependencies), sepenuhnya responsif di semua perangkat (Desktop, Tablet, Mobile), dan mengintegrasikan seluruh alur pengguna (user journey) dari desain Figma:

01_Login: Halaman autentikasi akun peserta (username "Siti", toggle visibilitas kata sandi, auto-login demo).

02_Katalog & Pemilihan Kuis VINIX7:
Welcome Hero Card dengan statistik cohort real-time.
Quick Stats Metric Strip (4 Modul Tuntas, 91.5 Rata-rata Nilai, #3 Peringkat Kelas, 100% Kehadiran).
Filter modul (Semua, Frontend Web, Backend, UI/UX) dan search input.
8-Kolom Quiz Cards Area: Modul 4 (Prioritas Pekan Ini), Modul 5 (React Lifecycle), Modul 3 (Tailwind CSS), Modul 2 (REST API), Modul 1 (Git).
4-Kolom Sidebar: Panduan Pengerjaan Ujian, SVG Circular Gauge Progres Kurikulum (67%), dan Mini Leaderboard Batch 3.

03_Pengerjaan Kuis Interaktif:
Subheader dengan Live Countdown Timer (18:41), Simpan Draf, dan Kirim Seluruh Jawaban.
Progress bar pengerjaan dinamis (14 dari 15 Soal - 93%).
Area pengerjaan soal: Pill metadata, Prompt pertanyaan, Syntactic Terminal Code Snippet (ES2022 syntax highlighting), Pilihan ganda interaktif (A, B, C, D), dan Petunjuk singkat (Contextual hint).
Navigasi soal footer: Soal Sebelumnya, Tandai Ragu-ragu (Checkbox), Soal Berikutnya.
15-button Question Navigation Palette dengan indikator warna status (Hijau = Terjawab, Biru = Aktif, Kuning = Ragu-ragu, Abu-abu = Belum).

04_Konfirmasi Submit Jawaban:
High-elevation glassmorphic modal konfirmasi.
KPI Summary Cards: 14/15 Dijawab (93%), 1 Soal Ragu-ragu, 0 Kosong, Sisa Waktu 18:41.
Tombol kembali periksa atau konfirmasi kirim instan.

05_Evaluasi (Hasil Evaluasi Kuis):
Celebratory Hero Banner dengan skor kelulusan 93.3 / 100 (Grade A+ Sangat Memuaskan).
4 Key Performance Metrics Bento Grid:
Jawaban Benar: 14 / 15 Soal (93.3%)
Jawaban Salah: 1 Soal ("Hanya No. 11 perlu ditinjau ulang")
Waktu Pengerjaan: 14m 23s
Peringkat: #3 dari 45 Peserta Cohort
Toolbar aksi: Unduh Sertifikat (PDF), Kembali ke Katalog, Lihat Leaderboard.
Review Jawaban & Pembahasan Detail untuk seluruh 15 butir soal dengan filter (Semua, Benar, Perlu Evaluasi).
Rekomendasi Modul Selanjutnya: Modul 5 (React & State Management).

06_Leaderboard (Papan Peringkat Batch 3):
Podium Top 3 (Emas, Perak, Perunggu) dengan highlight peserta aktif (Siti Rahmawati).
Tabel peringkat lengkap dengan akumulasi poin, rata-rata, modul selesai, dan badge predikat kelulusan.

07_Cari Modul atau Topik:
Quick Search Modal yang dapat dipanggil dengan shortcut Ctrl+K atau Cmd+K.

08_Profil Peserta:
Modal profil data mahasiswa (Siti Rahmawati, NIM, Track Frontend Web, IPK, dan opsi logout).

Token Desain & Tipografi
Palet Warna:
Primary Brand / Deep Indigo: #3525cd
Action Primary: #4f46e5
Slate Background: #f8f9ff / #eff4ff
Surface White: #ffffff
Success / Emerald: #006e4b / #6ffbbe / #005338
Warning / Amber: #b45309 / #fef3c7
Danger / Crimson: #ba1a1a / #93000a / #ffdad6
Tipografi:
Headings: Plus Jakarta Sans
Body: Inter
Code & Monospace: Fira Code / Liberation Mono
Cara Menjalankan & Membuka Proyek

Aplikasi web ini sepenuhnya self-contained dan tidak memerlukan instalasi runtime Node.js atau paket npm eksternal.

Metode 1: Buka Langsung di Browser

Cukup klik ganda atau buka file index.html di browser web favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, dll.):

C:\Users\User\.gemini\antigravity\scratch\quizmate-vinix7\index.html
Metode 2: Melalui Local Web Server

Jika Anda memiliki live server di IDE atau HTTP server lokal:

bash
# Contoh dengan Python (jika tersedia):
python -m http.server 8080
# Buka http://localhost:8080
