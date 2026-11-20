# QuizMate VINIX7

Website platform kuis interaktif **QuizMate VINIX7**, dibangun dari 8 desain SVG tanpa mengubah tampilan aslinya.
Setiap halaman menampilkan desain SVG secara 1:1 (responsif, skala mengikuti lebar layar) dan menambahkan area klik interaktif untuk navigasi antarhalaman.

## Halaman

| File | Halaman |
|---|---|
| `index.html` | Login |
| `katalog.html` | Katalog & Pemilihan Kuis |
| `kuis.html` | Pengerjaan Kuis Interaktif |
| `konfirmasi.html` | Konfirmasi Submit Jawaban |
| `evaluasi.html` | Evaluasi / Hasil |
| `leaderboard.html` | Leaderboard (Coming Soon) |
| `search.html` | Pencarian |
| `profil.html` | Profil |

## Alur navigasi

Login → Katalog → Kuis → Konfirmasi → Evaluasi. Menu atas (Katalog Kuis, Riwayat Evaluasi, Leaderboard Peserta, kolom cari, profil) tersedia di setiap halaman.

## Struktur

```
.
├── index.html, katalog.html, kuis.html, konfirmasi.html,
│   evaluasi.html, leaderboard.html, search.html, profil.html
├── assets/design/   # desain asli (SVG)
├── assets/favicon.svg
├── css/style.css
├── js/app.js
└── .github/workflows/pages.yml
```

## Menjalankan lokal

Buka `index.html` di browser, atau jalankan server statis:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Deploy ke GitHub Pages

1. Buat repository baru di GitHub, lalu:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: QuizMate VINIX7"
   git branch -M main
   git remote add origin https://github.com/USERNAME/quizmate-vinix7.git
   git push -u origin main
   ```
2. Di GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Setiap push ke `main` akan otomatis ter-deploy (workflow `pages.yml`).

> Catatan: teks pada desain SVG sudah berupa outline, sehingga tampilan identik dengan desain Figma. Untuk menjadikannya aplikasi dinamis (data kuis, skor, autentikasi), halaman dapat dibangun ulang dengan HTML/CSS komponen secara bertahap.
