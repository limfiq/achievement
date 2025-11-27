

Tentu, ini adalah file `README.md` yang komprehensif dan profesional untuk proyek Anda. File ini menjelaskan semua hal penting tentang proyek, dari deskripsi hingga panduan instalasi dan kontribusi.

Simpan file ini di direktori utama (root) proyek Anda.

---

# Sistem Pencapaian Mahasiswa

![GitHub stars](https://img.shields.io/github/stars/username/achievement-system?style=social)
![GitHub forks](https://img.shields.io/github/forks/username/achievement-system?style=social)
![GitHub license](https://img.shields.io/github/license/username/achievement-system)

Aplikasi full-stack modern untuk mengelola, mendokumentasikan, dan menampilkan pencapaian mahasiswa baru. Dibangun dengan Next.js untuk frontend yang responsif dan Express.js untuk backend yang andal, dengan MySQL sebagai basis data utama. Desain antarmuka terinspirasi dari [STIKOM Banyuwangi](https://stikombanyuwangi.ac.id) untuk memberikan pengalaman pengguna yang familiar dan profesional.

## 📸 Tampilan Aplikasi

*(Tambahkan screenshot atau GIF aplikasi Anda di sini untuk menarik perhatian)*

`![Screenshot Aplikasi](path/to/your/screenshot.png)`

## ✨ Fitur Utama

-   **👥 Manajemen Multi-User:** Sistem role-based access control (Admin & User) untuk mengelola hak akses.
-   **🏆 Pengajuan Pencapaian:** Mahasiswa dapat dengan mudah mengajukan pencapaian akademik dan non-akademik.
-   **📎 Upload Sertifikat:** Dukungan untuk mengunggah file sertifikat sebagai bukti fisik (JPG, PNG, PDF).
-   **✅ Sistem Persetujuan:** Admin dapat meninjau, menyetujui, atau menolak pengajuan pencapaian dengan catatan.
-   **📅 Informasi Periode Tes:** Pusat informasi untuk jadwal tes, lokasi, dan periode pengumuman.
-   **📢 Sistem Pengumuman:** Admin dapat membuat dan mengelola pengumuman resmi kampus.
-   **📱 Desain Responsif:** Antarmuka yang dioptimalkan untuk desktop, tablet, dan mobile menggunakan Material-UI.
-   **🔐 Keamanan Terjamin:** Autentikasi pengguna dengan JSON Web Token (JWT).

## 🛠️ Tech Stack

### Frontend
-   [Next.js 14](https://nextjs.org/) - React Framework
-   [Material-UI](https://mui.com/) - UI Component Library
-   [React Query](https://tanstack.com/query/v3) - Server State Management
-   [Axios](https://axios-http.com/) - HTTP Client
-   [React Hook Form](https://react-hook-form.com/) - Form Management

### Backend
-   [Node.js](https://nodejs.org/) - JavaScript Runtime
-   [Express.js](https://expressjs.com/) - Web Application Framework
-   [MySQL](https://www.mysql.com/) - Relational Database
-   [JWT](https://jwt.io/) - Authentication
-   [Multer](https://www.npmjs.com/package/multer) - File Upload Middleware
-   [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password Hashing

## 🚀 Persiapan

Pastikan Anda telah menginstal perangkat lunak berikut:

-   [Node.js](https://nodejs.org/) (versi 18 atau lebih tinggi)
-   [MySQL](https://www.mysql.com/) (versi 8.0 atau lebih tinggi)
-   [Git](https://git-scm.com/)

## 📦 Instalasi & Menjalankan

Ikuti langkah-langkah berikut untuk mengatur dan menjalankan proyek ini secara lokal.

### 1. Clone Repository

```bash
git clone https://github.com/username/achievement-system.git
cd achievement-system
```

### 2. Setup Database

1.  Buat database baru di MySQL Anda (misalnya: `achievement_system`).
2.  Impor file SQL yang telah disediakan untuk membuat tabel dan data awal.

```bash
mysql -u root -p achievement_system < database/achievement_system.sql
```

### 3. Setup Backend

1.  Masuk ke direktori backend.
    ```bash
    cd backend
    ```
2.  Install semua dependensi.
    ```bash
    npm install
    ```
3.  Buat file `.env` dan konfigurasikan dengan kredensial database Anda.
    ```bash
    cp .env.example .env
    ```
    Buka file `.env` dan sesuaikan isinya:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password_anda
    DB_NAME=achievement_system
    JWT_SECRET=rahasia_jwt_yang_panjang_dan_aman
    JWT_EXPIRE=7d
    PORT=5000
    ```
4.  Jalankan server backend.
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:5000`.

### 4. Setup Frontend

1.  Buka terminal baru, masuk ke direktori frontend.
    ```bash
    cd frontend
    ```
2.  Install semua dependensi.
    ```bash
    npm install
    ```
3.  Buat file `.env.local` untuk konfigurasi variabel lingkungan.
    ```bash
    cp .env.local.example .env.local
    ```
    Isi file `.env.local` dengan URL API backend:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```
4.  Jalankan aplikasi frontend.
    ```bash
    npm run dev
    ```
    Aplikasi akan terbuka di `http://localhost:3000`.

## 👤 Akun Default

Setelah instalasi, Anda dapat login menggunakan akun admin default:

-   **Username:** `admin`
-   **Password:** `admin123`

## 🧪 Pengujian API

Untuk menguji endpoint API secara manual, Anda dapat menggunakan tools seperti [Postman](https://www.postman.com/).

1.  **Login:** `POST /api/auth/login`
2.  **Tambah Pencapaian:** `POST /api/achievements` (memerlukan token)
3.  **Lihat Semua Pencapaian:** `GET /api/achievements` (memerlukan token)
4.  ...dan lainnya.

Pastikan untuk menyertakan token yang didapat dari login di header `Authorization: Bearer <token>` untuk request yang dilindungi.

## 📁 Struktur Proyek

```
achievement-system/
├── backend/                 # Aplikasi Backend (Express.js)
│   ├── config/              # Konfigurasi Database
│   ├── controllers/         # Logika Controller
│   ├── middleware/          # Middleware (Auth, Upload)
│   ├── models/              # Model Database
│   ├── routes/              # Definisi Route API
│   ├── uploads/             # Folder untuk file yang diunggah
│   ├── .env                 # Variabel Lingkungan Backend
│   └── server.js            # Entry Point Backend
├── frontend/                # Aplikasi Frontend (Next.js)
│   ├── components/          # Komponen React
│   ├── context/             # React Context (Auth)
│   ├── hooks/               # Custom Hooks
│   ├── lib/                 # Utilitas (API client)
│   ├── pages/               # Halaman Next.js
│   ├── public/              # Aset Statis
│   ├── styles/              # File CSS Global
│   └── .env.local           # Variabel Lingkungan Frontend
├── database/                # File SQL Database
│   └── achievement_system.sql
├── docker-compose.yml       # Konfigurasi Docker (Opsional)
└── README.md                # File ini
```

## 🤝 Kontribusi

Kontribusi sangatlah diterima! Jika Anda ingin berkontribusi pada proyek ini, silakan ikuti langkah-langkah berikut:

1.  **Fork** repositori ini.
2.  Buat branch fitur baru (`git checkout -b feature/AmazingFeature`).
3.  **Commit** perubahan Anda (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** ke branch (`git push origin feature/AmazingFeature`).
5.  Buka **Pull Request**.

## 📝 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

## 📧 Kontak

Nama Anda - [@username_twitter](https://twitter.com/username_twitter) - email@example.com

Link Proyek: [https://github.com/username/achievement-system](https://github.com/username/achievement-system)
