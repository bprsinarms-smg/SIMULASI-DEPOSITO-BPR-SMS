# Simulasi & Pembukaan Deposito BPR SMS

Aplikasi statis berbasis HTML, CSS, dan JavaScript. Siap dipublikasikan melalui GitHub Pages.

## Isi folder
- `index.html` — struktur halaman
- `style.css` — tampilan responsif/mobile-first
- `script.js` — simulasi, validasi, konfirmasi, dan pengaturan link formulir
- `assets/logo-bpr.png` — tempat logo BPR SMS

## 1. Pasang logo
Ganti file `assets/logo-bpr.png` dengan logo resmi BPR SMS. Gunakan nama file yang sama (`logo-bpr.png`) agar tidak perlu mengubah kode.

## 2. Masukkan link formulir pembukaan deposito
Buka `script.js`, cari baris paling atas:

```js
const DEPOSITO_FORM_URL = "";
```

Masukkan link formulir resmi di antara tanda kutip, contoh:

```js
const DEPOSITO_FORM_URL = "https://alamat-formulir-resmi-anda";
```

Jangan gunakan contoh alamat tersebut sebagai link sungguhan. Ganti dengan URL resmi yang diberikan BPR SMS.

## 3. Upload ke GitHub
1. Masuk ke https://github.com dan login.
2. Klik **New repository**.
3. Beri nama, misalnya `deposito-bpr-sms`.
4. Pilih **Public**, lalu klik **Create repository**.
5. Klik **Add file → Upload files**.
6. Upload seluruh isi folder project ini (bukan hanya file ZIP).
7. Klik **Commit changes**.

## 4. Aktifkan GitHub Pages
1. Buka repository.
2. Masuk ke **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/ (root)`.
5. Klik **Save**.
6. Tunggu proses publikasi selesai. GitHub akan menampilkan alamat website di halaman Pages.

## 5. Rumus simulasi
Asumsi 30 hari per bulan dan 365 hari per tahun:
- Bunga kotor = nominal × (bunga tahunan / 100) × (30 × tenor) / 365
- Pajak = bunga kotor × 20%
- Bunga bersih = bunga kotor − pajak
- Cashback = 1% × nominal jika nominal ≥ Rp100.000.000; jika di bawah Rp100.000.000, cashback = Rp0
- Estimasi total = nominal + bunga bersih + cashback

**Penting:** nilai bunga/pajak/cashback dan ketentuan produk harus diverifikasi dan disetujui pihak BPR sebelum dipublikasikan kepada nasabah. Simulasi ini tidak memproses pembukaan deposito atau transaksi dana. Data input tidak dikirim/disimpan ke server oleh aplikasi ini.
