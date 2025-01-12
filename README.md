# Aplikasi Pencarian Lokasi Barang di Gudang

Aplikasi web untuk mempermudah pencarian lokasi barang di gudang menggunakan peta khusus dengan penanda untuk lokasi yang presisi.

## Fitur

- Pencarian barang berdasarkan nomor lot batch.
- Menampilkan detail barang, termasuk nama, gambar, jumlah, lokasi, dan nama proyek.
- Peta interaktif dengan penanda lokasi barang.
- Fungsi admin untuk menambah, mengedit, dan menghapus data barang (memerlukan login).
- Antarmuka pengguna yang ramah dengan React dan Material-UI.

## Teknologi yang Digunakan

- **Frontend**: React, React Leaflet, Material-UI
- **Backend**: Express.js, Node.js
- **Database**: MySQL
- **Pemetaan**: Peta gudang kustom menggunakan Leaflet.js dengan konversi piksel ke koordinat.

## Instalasi

### Prasyarat

- Node.js dan npm sudah terpasang.
- Database MySQL telah disiapkan.

### Repo

[git clone https://github.com/rizkycahyaz/frontend_warehouse.git](https://github.com/rizkycahyaz/frontend_warehouse.git)

## Catatan

- Untuk mengakses halaman "Tambah Lokasi", gunakan URL berikut di browser:
  http://localhost:3001/add-lokasi

- Halaman ini tidak dimasukkan dalam antarmuka utama karena lokasi barang pada peta gudang telah bersifat tetap. Koordinat untuk setiap lokasi sudah dikonfigurasi berdasarkan tata letak gudang fisik yang tidak berubah.

- Halaman ini tersedia melalui URL langsung untuk kebutuhan pemeliharaan atau penyesuaian khusus yang mungkin diperlukan oleh admin atau pengembang.
