# Sistem Pelaporan Intelijen

Sistem Pelaporan Intelijen adalah aplikasi berbasis web yang dirancang untuk mempermudah pelaporan, pengelolaan, dan evaluasi laporan oleh anggota maupun pemimpin tim.

## Fitur Utama

### **1. Autentikasi**
- **Login:** Pengguna dapat login menggunakan NRP dan password.
- **Register:** Anggota baru dapat mendaftar dengan nama, NRP, dan password.
- **Role-based Access:**
  - **Pemimpin:** Memiliki akses ke fitur khusus seperti melihat semua laporan anggota.
  - (jumlah akun pemimpin di batasi)
  - **Anggota:** Hanya memiliki akses untuk membuat laporan.

### **2. Laporan**
- **Membuat Laporan:**
  - Anggota dapat membuat laporan dengan judul, deskripsi, dan dokumentasi (gambar).
- **Melihat Laporan:**
  - Pemimpin dapat melihat laporan anggota.
- **Edit Laporan:**
  - Pemimpin dapat mengedit laporan yang sudah dibuat.
- **Salin ke Clipboard:**
  - Memungkinkan laporan disalin dalam format rapi untuk dikirim ke platform lain seperti WhatsApp.

### **3. Dokumentasi**
- **Unggah Dokumentasi:**
  - Pengguna dapat mengunggah gambar terkait laporan.
- **Pengelolaan Dokumentasi:**
  - Gambar yang diunggah tersimpan di Backendless dan dapat diperbarui sesuai kebutuhan.

### **4. Dashboard**
- **Ringkasan Status:**
  - Menampilkan jumlah laporan pada database
- **Laporan Terbaru:**
  - Pemimpin dapat melihat laporan yang baru di upload.

## Teknologi yang Digunakan

- **Frontend:**
  - Javascript
  - React.js
  - CSS Modules
  - netlify
- **Backend:**
  - Backendless (untuk database, autentikasi, dan file storage)
- **Tools:**
  - React Router DOM untuk navigasi
  - Toastify untuk notifikasi

## Struktur Folder
```
.
├── public
├── src
│   ├── assets
│   |   ├── logo.png
│   ├── components
│   │   ├── Header.js
│   │   ├── Header.module.css
│   │   ├── Footer.js
│   ├── pages
│   │   ├── Dashboard.js
│   │   ├── Dashboard.module.css
│   │   ├── Login.js
│   │   ├── Login.module.css
│   │   ├── Register.js
│   │   ├── Register.module.css
│   │   ├── ReportForm.js
│   │   ├── ReportForm.module.css
│   │   ├── ReportDetails.js
│   │   ├── ReportDetails.module.css
│   │   ├── LeaderTools.js
│   │   ├── LeaderTools.module.css
│   ├── services
│   │   ├── backendless.js
│   │   ├── reportService.js
│   ├── utils
│   │   ├── constants.js
│   │   ├── validate.js
│   │   ├── toast.js
│   ├── App.js
│   ├── index.js
├── README.md
```

## Cara Menjalankan Aplikasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/sistem-pelaporan-intelijen.git
   ```

2. **Masuk ke Direktori Proyek**
   ```bash
   cd sistem-pelaporan-intelijen
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Jalankan Aplikasi**
   ```bash
   npm start
   ```

5. **Akses Aplikasi di Browser**
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Pengaturan Backendless

1. **Login ke Backendless**
   - Buat akun di [Backendless](https://backendless.com/) jika belum memiliki.

2. **Buat Aplikasi Baru**
   - Buat aplikasi baru di dashboard Backendless.

3. **Konfigurasi Database**
   - Buat tabel dengan nama `Laporan` dan tambahkan kolom berikut:
     - `judul` (string)
     - `deskripsi` (text)
     - `dokumentasi` (string untuk URL gambar)
     - `status` (string)
     - `created` (datetime)

4. **Update File backendless.js**
   - Masukkan **App ID** dan **REST API Key** Anda:
     ```javascript
     const Backendless = require('backendless');

     Backendless.initApp('YOUR_APP_ID', 'YOUR_REST_API_KEY');

     export default Backendless;
     ```

## Catatan Tambahan
- Pastikan file gambar yang diunggah tidak melebihi batas ukuran yang ditentukan oleh Backendless.
- Fitur edit laporan hanya tersedia untuk laporan yang dibuat oleh pengguna terkait.
- Gunakan Toastify untuk memberikan notifikasi interaktif kepada pengguna.
