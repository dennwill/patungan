# Patungan

Split bill di mana saja, kapan saja. Aplikasi web untuk menghitung dan mengelola pengeluaran bersama dengan mudah untuk banyak peserta.

## Update Terbaru!

- Diimplementasikan OCR Reading, tidak perlu mengetik manual (Pertimbangkan untuk mendukung saya agar proyek ini terus berjalan dan meningkatkan batas token untuk semua orang!)
- Ditambahkan beberapa visual
- Diperbaiki padding dan margin yang tidak nyaman
- Ditingkatkan penanganan input

## Deskripsi

Patungan adalah aplikasi web modern yang dirancang untuk menyederhanakan proses pembagian tagihan dan pengelolaan pengeluaran bersama. Baik Anda makan bersama teman, berbagi biaya akomodasi, atau membagi pengeluaran kelompok apa pun, Patungan memudahkan untuk melacak item, menetapkannya ke peserta, dan secara otomatis menghitung bagian masing-masing orang termasuk biaya layanan dan pajak.

## Fitur

- **OCR Reading**: Deteksi struk dari gambar dengan akurasi yang presisi
- **Tambah Item**: Tambahkan item makanan dengan mudah beserta harga dan jumlahnya
- **Kelola Peserta**: Tambahkan dan kelola daftar orang yang akan berbagi tagihan
- **Penetapan Item Pintar**: Tetapkan item ke satu atau beberapa peserta untuk pembagian biaya yang fleksibel
- **Biaya Tambahan**: Dukungan untuk perhitungan biaya layanan dan pajak
  - Biaya Layanan: Jumlah tetap atau berbasis persentase
  - Pajak (PPN): Perhitungan pajak Indonesia standar
- **Perhitungan Otomatis**: Sistem secara otomatis menghitung bagian individu termasuk distribusi biaya proporsional
- **Dukungan Dua Bahasa**: Dukungan penuh untuk bahasa Indonesia (default) dan Inggris
- **Toggle Bahasa**: Pengguna dapat beralih bahasa kapan saja dengan preferensi yang persisten
- **Tampilan Ringkasan**: Rincian jelas tentang berapa banyak yang harus dibayar setiap orang
- **Desain Responsif**: UI yang bersih dan modern dibuat dengan Tailwind CSS

## Tech Stack

- **Frontend Framework**: Vue 3
- **Backend Framework**: Node.js + Express
- **Build Tool**: Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS 4
- **Internationalization**: vue-i18n v11
- **AI Integration**: Google Gemini API (server-side)
- **Additional Libraries**:
  - lucide-vue-next, oh-vue-icons (icons)
  - reka-ui (UI components)
  - html-to-image (export functionality)
  - class-variance-authority (component styling)
  - multer (file uploads)
  - cors (CORS handling)

## Memulai

### Prerequisites

- Node.js (v20.19.0 atau v22.12.0 atau lebih tinggi)
- npm

### Instalasi

1. Clone repository:

```bash
git clone https://github.com/dennwill/patungan.git
cd patungan
```

2. Install dependencies frontend:

```bash
npm install
```

3. Set up backend:

```bash
cd backend
npm install
```

4. Konfigurasi environment variables:

Buat file `.env` di direktori `backend/` dengan API key Gemini Anda:

```env
GEMINI_API_KEY=api_key_gemini_anda_di_sini
PORT=3001
```

5. Start server backend:

```bash
cd backend
npm start
```

6. Di terminal baru, start development server frontend:

```bash
npm run dev
```

Aplikasi akan tersedia di `http://localhost:5173`

### Building untuk Production

Untuk membuat build production yang dioptimalkan:

```bash
npm run build
```

Untuk preview build production:

```bash
npm run preview
```

## Struktur Proyek

```
src/
├── components/          # Komponen Vue
│   ├── OrderedFood.vue     # Manajemen item
│   ├── Participants.vue    # Manajemen peserta
│   ├── AdditionalFees.vue  # Konfigurasi biaya
│   ├── Claiming.vue        # Penetapan item ke peserta
│   ├── Summary.vue         # Rincian tagihan akhir
│   ├── Header.vue          # Header aplikasi dengan toggle bahasa
│   ├── Tabs.vue            # Navigasi tab
│   ├── LanguageToggle.vue  # Pengalih bahasa
backend/
├── server.js            # Server Express untuk API calls
├── package.json         # Dependencies backend
└── .env                 # Environment variables backend
│   ├── ConfirmDialog.vue  # Popup konfirmasi untuk mulai ulang
│   └── ui/                 # Komponen UI yang dapat digunakan ulang
├── stores/              # Manajemen state Pinia
│   ├── itemStore.js        # State item dan biaya
│   └── nameStore.js        # State peserta
├── locales/             # File terjemahan
│   ├── id.json             # Terjemahan Indonesia
│   └── en.json             # Terjemahan Inggris
├── styles/              # Global styles
├── i18n.js              # Konfigurasi i18n
├── main.js              # Entry point aplikasi
└── App.vue              # Root component
```

## Cara Penggunaan

1. **Tambah Item**: Mulai dengan menambahkan item dari tagihan Anda dengan harga dan jumlah masing-masing
2. **Konfigurasi Biaya**: (Opsional) Tambahkan biaya layanan dan pajak jika berlaku
3. **Tambah Peserta**: Tambahkan nama semua orang yang akan berbagi biaya
4. **Klaim Item**: Tetapkan setiap item ke peserta yang akan membaginya. Item dapat dibagi di antara beberapa orang
5. **Lihat Ringkasan**: Lihat rincian akhir yang menunjukkan berapa banyak yang harus dibayar setiap orang. Pengguna dapat memilih untuk menyalin, atau mengekspor ke gambar.

## Dukungan Dua Bahasa

Aplikasi mendukung bahasa Indonesia dan Inggris:

- **Bahasa Default**: Indonesia
- **Toggle Bahasa**: Klik tombol toggle bahasa di header untuk beralih antara Indonesia (ID) dan Inggris (EN)
- **Pilihan Persisten**: Pilihan bahasa Anda disimpan di localStorage browser dan akan diingat saat kunjungan berikutnya

## Rencana Masa Depan

- **Dukungan Mata Uang**: Dukungan multi-mata uang untuk penggunaan internasional
- **Integrasi Pembayaran**: Fitur penyelesaian pembayaran cepat
- **Aplikasi Mobile**: Aplikasi mobile native untuk iOS dan Android

## Kredit

Shoutout ke desainer logo yang luar biasa!  
Instagram: [@clarissamngndn](https://www.instagram.com/clarissamngndn/)

## Lisensi

Proyek ini open source dan tersedia di bawah Lisensi MIT.

## Dukungan

Jika Anda mengalami masalah atau memiliki saran, silakan buka issue di repository GitHub.

---

Dibuat dengan perhatian terhadap detail untuk pengalaman pembagian tagihan yang mulus.
