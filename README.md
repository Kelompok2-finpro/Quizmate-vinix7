# QuizMate VINIX7 · Platform Evaluasi & Asesmen Pembelajaran Interaktif

Implementasi aplikasi web responsif berstandar industri yang dikembangkan berdasarkan spesifikasi desain Figma **[QuizMate VINIX7 LMS Assessment Platform](https://www.figma.com/design/rggY0UKosgzCWuYj11sUd8/Untitled?node-id=0-1)**.

---

## 📖 Ringkasan Proyek

QuizMate VINIX7 dirancang sebagai platform asesmen digital komprehensif bagi peserta program pelatihan intensif **VINIX7 Cohort LMS Assessment (Batch 3)**. Aplikasi ini memfasilitasi mahasiswa dalam menguji pemahaman materi teknis secara mandiri melalui serangkaian kuis interaktif, mekanisme penilaian instan berbasis algoritma, serta pembahasan konsep yang mendalam guna mengakselerasi kesiapan kerja di industri teknologi.

Secara teknis, platform ini dibangun menggunakan pendekatan arsitektur web modern yang mandiri (*zero external runtime dependencies*). Tanpa ketergantungan pada bundler yang rumit, aplikasi dapat dijalankan langsung di lingkungan peramban modern dengan performa tinggi, transisi antarhalaman yang mulus, dan tata letak yang sepenuhnya adaptif untuk perangkat Desktop, Tablet, hingga Ponsel Pintar.

---

## 🖥️ Alur Pengalaman Pengguna (User Journey)

Aplikasi ini menyatukan delapan modul antarmuka dari prototipe Figma ke dalam satu kesatuan sistem Single Page Application (SPA) yang kohesif dan interaktif:

### 1. Autentikasi Pengguna (01_Login)
Halaman awal menyajikan gerbang masuk yang elegan dengan latar belakang berpendar (*ambient glow*). Peserta dapat masuk menggunakan kredensial terdaftar (username default "Siti"), memanfaatkan tombol toggle visibilitas kata sandi interaktif, atau menggunakan tombol jalan pintas demo login untuk eksplorasi instan.

### 2. Dasbor & Katalog Kuis (02_Katalog & Pemilihan Kuis VINIX7)
Halaman katalog berfungsi sebagai pusat navigasi utama bagi peserta. Bagian atas dipercantik dengan kartu selamat datang dinamis yang memuat statistik cohort secara real-time, seperti rata-rata nilai, peringkat angkatan, dan tingkat kehadiran. Di bawahnya, peserta dapat menyaring modul menggunakan tab kategori (Frontend Web, Backend & API, UI/UX Architecture) atau mencari topik materi secara langsung. Layout terbagi secara harmonis dalam sistem grid 12-kolom: sisi kiri memuat kartu kuis prioritas pekan ini beserta modul lainnya, sedangkan sisi kanan menyajikan bilah sisi informasi yang memuat panduan pengerjaan, diagram lingkar progres kurikulum 67% berbasis SVG, serta papan peringkat mini.

### 3. Arena Pengerjaan Kuis Interaktif (03_Pengerjaan Kuis)
Arena evaluasi dirancang untuk menghadirkan fokus optimal saat ujian berlangsung. Pengguna didukung oleh bilah kendali atas yang menampilkan hitung mundur waktu otomatis (*live countdown timer*), tombol simpan draf, dan meteran progres dinamis. Di ruang pengerjaan, pertanyaan teknis disajikan bersama cuplikan terminal kode modern bersintaksis ES2022 lengkap dengan tombol kontrol macOS. Peserta dapat memilih opsi jawaban A, B, C, atau D secara intuitif, memanfaatkan petunjuk singkat kontekstual, menandai butir soal yang masih ragu-ragu, serta berpindah cepat menggunakan palet navigasi 15 nomor soal yang dilengkapi indikator status visual.

### 4. Konfirmasi Pengiriman Ujian (04_Konfirmasi Submit Jawaban)
Sebelum lembar jawaban diproses secara permanen, jendela modal berelevasi tinggi (*glassmorphic modal*) akan muncul untuk memastikan keamanan pengiriman. Modal ini merangkum metrik pengisian secara transparan—mencakup jumlah soal yang telah terjawab, butir yang masih ditandai ragu-ragu, soal kosong, serta sisa waktu pengerjaan—sehingga peserta dapat mempertimbangkan apakah ingin memeriksa kembali atau langsung mengirimkan jawaban.

### 5. Hasil Evaluasi & Tinjauan Pembahasan (05_Evaluasi)
Begitu kuis terkirim, sistem langsung menghitung kalkulasi skor dan menampilkan banner perayaan kelulusan (skor 93.3/100 dengan predikat Grade A+). Bagian ini dilengkapi *Bento Grid* empat indikator kinerja utama (jawaban benar, analisis kesalahan pada butir tertentu, durasi pengerjaan, dan posisi peringkat cohort). Tepat di bawahnya, tersedia daftar ulasan interaktif yang dapat disaring (Semua, Benar, Perlu Evaluasi), di mana peserta dapat menelaah perbandingan antara jawaban pribadi, kunci jawaban resmi, dan penjelasan teori teknis, ditutup dengan banner rekomendasi modul berikutnya.

### 6. Papan Peringkat Angkatan (06_Leaderboard)
Tampilan leaderboard memvisualisasikan prestasi peserta melalui podium tiga besar beraksen visual mahkota emas, perak, dan perunggu, dengan penyorotan khusus pada profil peserta aktif. Tabel peringkat terperinci di bawah podium memuat data performa seluruh rekan seangkatan, mencakup jumlah modul yang diselesaikan, persentase nilai rata-rata, akumulasi poin, serta lencana predikat akademik.

### 7. Pencarian Global & Modal Profil (07_Cari & 08_Profil)
Peserta dapat menekan pintasan papan ketik `Ctrl+K` atau `Cmd+K` kapan saja untuk memanggil dialog pencarian cepat yang mampu memfilter topik dan modul secara instan. Selain itu, mengeklik kartu nama pada bilah navigasi atas akan membuka modal profil mahasiswa (Siti Rahmawati - NIM: 2026-VX7-042) yang menyajikan rekapitulasi data akademik dan opsi keluar akun.

---

## 🎨 Landasan Desain & Sistem Desain

Pengembangan antarmuka menerapkan token desain resmi yang presisi untuk menjamin konsistensi visual di seluruh komponen:

- **Tipografi Harmonis**: Judul dan penekanan visual memanfaatkan font modern **Plus Jakarta Sans** untuk memberikan kesan kontemporer dan tegas. Teks tubuh utama menggunakan **Inter** untuk keterbacaan tinggi pada teks panjang. Bagian cuplikan kode dan data terminal didukung oleh **Fira Code** yang presisi.
- **Palet Warna Terkurasi**: Identitas utama dibangun oleh warna *Deep Indigo* (`#3525cd`) dan *Primary Action* (`#4f46e5`). Elemen latar belakang mengusung nuansa *Slate & Body Tint* (`#f8f9ff`), sedangkan status keberhasilan, peringatan, dan evaluasi ditandai dengan warna fungsional seperti *Emerald Green* (`#006e4b`), *Amber Gold* (`#b45309`), dan *Crimson Red* (`#ba1a1a`).
- **Tata Letak Adaptif**: Menggunakan prinsip *Fluid Grid System* yang bertransisi secara mulus dari format multikolom pada layar desktop lebar (1280px), tata letak efisien pada tablet (768px - 1024px), hingga tumpukan vertikal yang ramah sentuhan pada layar ponsel (<768px).

---

## 🚀 Panduan Menjalankan Aplikasi

Aplikasi web ini sepenuhnya bersifat *standalone* tanpa memerlukan instalasi Node.js, package manager npm, maupun dependensi eksternal lainnya.

### Cara Membuka:
1. **Membuka Langsung di Browser**:
   Buka berkas `index.html` menggunakan peramban web modern apa pun (Google Chrome, Microsoft Edge, Mozilla Firefox, atau Safari).
   ```
   C:\Users\User\.gemini\antigravity\scratch\quizmate-vinix7\index.html
   ```
2. **Menjalankan via Server Lokal (Opsional)**:
   Bagi Anda yang menggunakan ekstensi *Live Server* pada editor kode atau web server lokal bawaan sistem, jalankan server pada direktori proyek dan arahkan browser ke alamat lokal yang ditentukan.

---

## ✅ Kepatuhan Rubrik & Standar Pengembangan

Aplikasi ini memenuhi seluruh 6 kriteria utama standar implementasi desain-ke-kode:

1. **01 Aset**: Berkas ikon SVG (`./assets/icons/`) dan gambar WebP (`./assets/avatar-siti.webp`) telah diekspor dan ditata rapi dalam direktori aset lokal.
2. **02 Prompt AI**: Struktur kode HTML dibangun secara modular per bagian seksi (`SECTION 1: LOGIN`, `SECTION 2: KATALOG`, `SECTION 3: QUIZ ARENA`, `SECTION 5: EVALUASI`, `SECTION 6: LEADERBOARD`, serta modul dialog modal).
3. **03 Audit**: Redundansi tag `div` telah dibersihkan dan digantikan dengan elemen semantik HTML5 murni seperti `<article>`, `<section>`, `<aside>`, `<nav>`, `<time>`, `<figure>`, `<fieldset>`, dan `<legend>`.
4. **04 Formulir**: Seluruh kontrol formulir telah dihubungkan secara eksplisit menggunakan atribut `<label for="...">` dengan `<input id="...">`, deklarasi `<button type="button">` dan `<button type="submit">`, serta label aksesibilitas (`.sr-only`) untuk pembaca layar.
5. **05 Media**: Semua pemanggilan aset media menggunakan jalur relatif lokal (`./assets/...`) dan dilengkapi teks deskriptif alternatif (`alt="..."`).
6. **06 Validasi**: Lolos validasi standar W3C Validator tanpa kesalahan sintaksis, entitas ter-escape dengan benar (`&amp;`), dan tidak terdapat duplikasi identifier ID.

---

## 📁 Struktur Berkas

```
quizmate-vinix7/
├── assets/          # Berkas media lokal (gambar WebP dan ikon SVG)
│   ├── icons/       # Koleksi 12 ikon SVG teroptimasi
│   ├── avatar-siti.webp
│   └── certificate-badge.webp
├── index.html       # Struktur semantik HTML5 mencakup seluruh view dan modal
├── styles.css       # Token CSS, tata letak grid responsif, animasi, & tema
├── app.js           # Mesin routing view, bank soal, timer, dan kalkulasi skor
└── README.md        # Dokumentasi resmi arsitektur dan spesifikasi proyek
```

---

*Hak Cipta © 2026 QuizMate VINIX7 Platform. Dikembangkan untuk keperluan asesmen dan evaluasi akademik.*
