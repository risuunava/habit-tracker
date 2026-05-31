# Product Requirements Document (PRD)
## Tracker Kebiasaan Sehat

**Versi:** 1.0  
**Tanggal:** 30 Mei 2026  
**Status:** Draft  
**Author:** —

---

## 1. Ringkasan Eksekutif

### 1.1 Latar Belakang

Banyak orang kesulitan membangun kebiasaan sehat secara konsisten karena tidak ada sistem pengingat dan pemantauan yang sederhana namun efektif. Aplikasi yang ada di pasaran seringkali terlalu kompleks, berbayar, atau tidak mendukung komunitas lokal.

### 1.2 Visi Produk

Membangun platform web progressif (PWA) yang membantu pengguna melacak kebiasaan sehat harian dengan visualisasi data yang memotivasi, pengingat otomatis, dan komunitas untuk saling mendukung — sepenuhnya gratis tanpa biaya infrastruktur.

### 1.3 Tujuan Bisnis

- Memberikan alat tracking kebiasaan yang simpel dan dapat diakses dari browser maupun HP tanpa perlu install dari App Store
- Membangun basis pengguna melalui fitur komunitas
- Menjadi portofolio teknis yang mendemonstrasikan full-stack development dengan Firebase

---

## 2. Target Pengguna

### 2.1 User Persona Utama

**Persona 1 — "Budi si Pemula"**
- Usia: 20–30 tahun
- Latar belakang: Mahasiswa atau fresh graduate yang ingin mulai hidup sehat
- Pain point: Mudah lupa dan mudah menyerah setelah beberapa hari
- Kebutuhan: Antarmuka yang simple, pengingat otomatis, dan rasa pencapaian

**Persona 2 — "Rina si Konsisten"**
- Usia: 25–35 tahun
- Latar belakang: Profesional muda yang sudah punya kebiasaan baik tapi ingin melacaknya
- Pain point: Tidak punya satu tempat untuk memantau semua kebiasaan sekaligus
- Kebutuhan: Visualisasi data yang detail, statistik jangka panjang

**Persona 3 — "Komunitas Challenger"**
- Usia: 18–40 tahun
- Latar belakang: Pengguna sosial yang termotivasi oleh kompetisi dan dukungan orang lain
- Pain point: Kurang motivasi kalau sendirian
- Kebutuhan: Fitur tantangan bersama, leaderboard, notifikasi sosial

### 2.2 Segmen Pasar

- Pengguna smartphone di Indonesia dengan akses internet
- Tidak memerlukan pengetahuan teknis apapun
- Rentang usia 17–45 tahun

---

## 3. Scope Produk

### 3.1 Dalam Scope (v1.0)

- Registrasi & login (Google OAuth + email/password)
- Manajemen kebiasaan (tambah, edit, hapus, arsip)
- Check-in harian per kebiasaan
- Kalkulasi streak otomatis
- Heatmap kalender (visualisasi konsistensi)
- Grafik mingguan & bulanan
- Push notification pengingat harian
- Installable sebagai PWA (Progressive Web App)
- Profil pengguna dasar

### 3.2 Luar Scope (v1.0) — Direncanakan untuk v2.0

- Fitur komunitas dan feed publik
- Tantangan bersama (group challenge)
- Ekspor data ke CSV/PDF
- Integrasi dengan Google Fit / Apple Health
- Aplikasi native Android/iOS

---

## 4. Fitur & Persyaratan Fungsional

### 4.1 Autentikasi

| ID | Fitur | Prioritas | Deskripsi |
|---|---|---|---|
| AUTH-01 | Login Google | P0 | Single sign-on dengan akun Google |
| AUTH-02 | Login email/password | P0 | Registrasi dan login manual |
| AUTH-03 | Lupa password | P1 | Reset password via email |
| AUTH-04 | Logout | P0 | Keluar dari sesi aktif |
| AUTH-05 | Proteksi route | P0 | Halaman hanya bisa diakses setelah login |

### 4.2 Manajemen Kebiasaan

| ID | Fitur | Prioritas | Deskripsi |
|---|---|---|---|
| HAB-01 | Tambah kebiasaan | P0 | Form: nama, ikon, warna, frekuensi (harian/mingguan) |
| HAB-02 | Edit kebiasaan | P1 | Ubah nama, ikon, atau warna |
| HAB-03 | Hapus kebiasaan | P1 | Hapus permanen dengan konfirmasi |
| HAB-04 | Arsip kebiasaan | P2 | Sembunyikan tanpa menghapus riwayat |
| HAB-05 | Urutan kebiasaan | P2 | Drag-and-drop untuk mengatur urutan di dashboard |
| HAB-06 | Maksimal kebiasaan | P1 | Batas 20 kebiasaan aktif per pengguna |

### 4.3 Check-in & Streak

| ID | Fitur | Prioritas | Deskripsi |
|---|---|---|---|
| CHK-01 | Check-in harian | P0 | Tandai kebiasaan selesai hari ini dengan satu ketukan |
| CHK-02 | Batal check-in | P1 | Batalkan check-in di hari yang sama |
| CHK-03 | Check-in hari sebelumnya | P2 | Izinkan check-in mundur maksimal 1 hari |
| STR-01 | Hitung streak aktif | P0 | Jumlah hari berturut-turut tanpa putus |
| STR-02 | Streak terpanjang | P1 | Rekam streak terpanjang sepanjang waktu |
| STR-03 | Reset streak otomatis | P0 | Streak kembali ke 0 jika melewatkan 1 hari |
| STR-04 | Badge pencapaian | P1 | Badge otomatis di streak ke-7, 30, 100, 365 hari |

### 4.4 Visualisasi & Statistik

| ID | Fitur | Prioritas | Deskripsi |
|---|---|---|---|
| VIZ-01 | Heatmap kalender | P0 | Grid 12 bulan terakhir, warna intensitas per hari |
| VIZ-02 | Grafik bar mingguan | P1 | Completion rate 7 hari terakhir per kebiasaan |
| VIZ-03 | Statistik bulanan | P1 | Persentase keberhasilan per bulan |
| VIZ-04 | Ringkasan hari ini | P0 | Berapa kebiasaan selesai vs total hari ini |
| VIZ-05 | Riwayat lengkap | P2 | Tabel log per kebiasaan dengan filter tanggal |

### 4.5 Notifikasi

| ID | Fitur | Prioritas | Deskripsi |
|---|---|---|---|
| NOT-01 | Push notification harian | P1 | Pengingat di jam yang ditentukan pengguna |
| NOT-02 | Konfigurasi jam pengingat | P1 | Pengguna atur jam notifikasi per kebiasaan atau global |
| NOT-03 | Notifikasi streak terancam | P2 | Notifikasi sore hari jika belum check-in |
| NOT-04 | Notifikasi pencapaian | P2 | Notifikasi saat mencapai milestone streak |

### 4.6 PWA & Pengalaman Offline

| ID | Fitur | Prioritas | Deskripsi |
|---|---|---|---|
| PWA-01 | Installable ke home screen | P0 | Manifest.json + service worker terdaftar |
| PWA-02 | Tampilan dashboard offline | P1 | Tampilkan data cache saat tidak ada koneksi |
| PWA-03 | Antrian check-in offline | P2 | Check-in tersimpan lokal, sync saat online |
| PWA-04 | Splash screen | P1 | Loading screen bermerek saat PWA dibuka |

---

## 5. Persyaratan Non-Fungsional

### 5.1 Performa

- Waktu load pertama (First Contentful Paint): < 2 detik pada koneksi 4G
- Interaktif penuh (Time to Interactive): < 3 detik
- Operasi check-in: respons UI < 100ms (optimistic update)
- Ukuran bundle JS awal: < 200 KB gzipped

### 5.2 Kompatibilitas

- Browser: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- Device: Mobile-first, responsif untuk tablet dan desktop
- OS: Android 8+, iOS 14+ (via browser)
- Resolusi minimum: 320px lebar layar

### 5.3 Keamanan

- Seluruh komunikasi menggunakan HTTPS
- Autentikasi dikelola Firebase Authentication
- Data pengguna hanya bisa diakses oleh pemilik akun (Firestore Security Rules)
- Tidak menyimpan password di client
- Token sesi diperbarui otomatis oleh Firebase

### 5.4 Skalabilitas

- Dirancang untuk berjalan penuh di Firebase Spark (free tier)
- Batas: hingga ~500 pengguna aktif harian sebelum mendekati kuota Firestore
- Kuota harian Firestore: 50.000 baca / 20.000 tulis — cukup untuk 500 pengguna dengan ~100 operasi/hari

### 5.5 Ketersediaan

- Target uptime: mengikuti SLA Firebase Hosting (99.95%)
- Tidak ada server yang dikelola sendiri — zero maintenance infrastructure

---

## 6. Arsitektur Teknis

### 6.1 Tech Stack

| Layer | Teknologi | Alasan |
|---|---|---|
| Frontend | React 19 + Vite | Ekosistem besar, HMR cepat saat development |
| Styling | Tailwind CSS | Utility-first, konsisten, tidak butuh CSS custom |
| State | React Context + hooks | Cukup untuk skala proyek ini, tanpa overhead Redux |
| Backend | Firebase Firestore | Realtime, gratis, tidak butuh server |
| Auth | Firebase Authentication | OAuth Google built-in, aman, gratis |
| Notifikasi | Firebase Cloud Messaging | Push notification gratis tanpa batas |
| Chart | Chart.js + react-chartjs-2 | Ringan, cukup untuk kebutuhan visualisasi |
| Deploy | Firebase Hosting | Gratis, CDN global, HTTPS otomatis |

### 6.2 Struktur Data Firestore

```
users/
  {userId}/
    profile:
      displayName: string
      email: string
      photoURL: string
      createdAt: timestamp
      notifTime: string        // "07:00"

    habits/
      {habitId}/
        name: string           // "Olahraga pagi"
        icon: string           // "running"
        color: string          // "#1D9E75"
        frequency: string      // "daily" | "weekly"
        createdAt: timestamp
        isArchived: boolean
        order: number

        logs/
          {YYYY-MM-DD}: boolean  // true = check-in dilakukan

        stats/
          currentStreak: number
          longestStreak: number
          totalCheckIns: number
          lastCheckedIn: string  // "YYYY-MM-DD"
```

### 6.3 Firestore Security Rules (Ringkasan)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

---

## 7. Desain & UX

### 7.1 Prinsip Desain

- **Simpel dulu** — satu aksi utama per layar
- **Feedback instan** — setiap check-in langsung terasa responsif (optimistic UI)
- **Motivasi visual** — warna dan animasi merayakan konsistensi
- **Mobile-first** — semua elemen minimal ukuran tap 44×44px

### 7.2 Alur Pengguna Utama

```
Landing Page
    └── Login (Google / Email)
            └── Dashboard
                    ├── [Lihat semua kebiasaan hari ini]
                    ├── [Check-in kebiasaan] ──► Animasi ✓ + update streak
                    ├── [Tambah kebiasaan baru]
                    └── [Lihat statistik]
                              ├── Heatmap kalender
                              ├── Grafik mingguan
                              └── Badge pencapaian
```

### 7.3 Halaman Aplikasi

| Halaman | Path | Deskripsi |
|---|---|---|
| Landing | `/` | Hero section, CTA login |
| Dashboard | `/dashboard` | Daftar kebiasaan + progress hari ini |
| Detail Kebiasaan | `/habit/:id` | Statistik lengkap satu kebiasaan |
| Tambah/Edit | `/habit/new`, `/habit/:id/edit` | Form kebiasaan |
| Profil | `/profile` | Pengaturan akun & notifikasi |
| 404 | `*` | Halaman tidak ditemukan |

### 7.4 Palet Warna

| Peran | Warna | Hex |
|---|---|---|
| Primary (aksi utama) | Teal | `#1D9E75` |
| Success / done | Green | `#22C55E` |
| Warning / streak terancam | Amber | `#EF9F27` |
| Danger / streak putus | Coral | `#D85A30` |
| Neutral / background | Gray | `#F1EFE8` |

---

## 8. Rencana Pengembangan

### 8.1 Milestone

| Fase | Durasi | Deliverable |
|---|---|---|
| **Fase 1** — Setup & Auth | Minggu 1 | Project setup, Firebase config, login Google & email |
| **Fase 2** — Core Habit | Minggu 1–2 | Dashboard, CRUD kebiasaan, check-in, streak counter |
| **Fase 3** — Visualisasi | Minggu 2–3 | Heatmap, grafik mingguan, badge pencapaian |
| **Fase 4** — Notifikasi & PWA | Minggu 3 | Push notification, manifest, service worker |
| **Fase 5** — Polish & Deploy | Minggu 4 | UI refinement, error handling, deploy Firebase Hosting |

### 8.2 Definisi Done (MVP)

Produk dianggap siap diluncurkan jika:

- [ ] Pengguna bisa login, tambah kebiasaan, dan check-in harian
- [ ] Streak terhitung dan tampil dengan benar
- [ ] Heatmap kalender tampil dengan data akurat
- [ ] Push notification berfungsi di Chrome Android
- [ ] Aplikasi bisa diinstall ke home screen
- [ ] Tidak ada data loss saat refresh atau tutup browser
- [ ] Semua halaman responsif di mobile 320px–768px

---

## 9. Metrik Keberhasilan

| Metrik | Target (3 bulan setelah launch) |
|---|---|
| Total pengguna terdaftar | 100+ |
| Pengguna aktif mingguan (WAU) | 30+ |
| Rata-rata streak pengguna aktif | > 5 hari |
| Tingkat retensi hari ke-7 | > 40% |
| Rata-rata kebiasaan per pengguna | > 2 |
| Crash rate | < 1% sesi |

---

## 10. Risiko & Mitigasi

| Risiko | Dampak | Kemungkinan | Mitigasi |
|---|---|---|---|
| Kuota Firestore habis | Tinggi | Rendah | Monitor usage, pasang alert di Firebase Console |
| Push notification tidak didukung iOS Safari | Sedang | Tinggi | Fallback ke pengingat in-app banner |
| Pengguna lupa check-in & kehilangan streak | Tinggi | Tinggi | Fitur "grace period" 1 hari & notifikasi sore |
| Data hilang saat offline | Tinggi | Sedang | Implementasi antrian offline (PWA-03) |
| Firebase mengubah kebijakan free tier | Tinggi | Rendah | Desain agar mudah migrasi ke Supabase |

---

## 11. Glosarium

| Istilah | Definisi |
|---|---|
| **Streak** | Jumlah hari berturut-turut pengguna berhasil check-in suatu kebiasaan |
| **Check-in** | Aksi menandai bahwa kebiasaan telah dilakukan hari ini |
| **Heatmap** | Visualisasi kalender dengan intensitas warna menunjukkan frekuensi check-in |
| **PWA** | Progressive Web App — aplikasi web yang bisa diinstall dan bekerja seperti app native |
| **FCM** | Firebase Cloud Messaging — layanan push notification dari Google |
| **Free tier** | Paket gratis Firebase Spark tanpa biaya bulanan |
| **Optimistic UI** | Teknik UI yang menampilkan hasil aksi sebelum konfirmasi server diterima |

---

*Dokumen ini merupakan living document — akan diperbarui seiring perkembangan produk.*
