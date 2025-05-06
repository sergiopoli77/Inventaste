console.log("Memulai script generateHash.js...");

try {
    const bcrypt = require('bcryptjs');
    console.log("Modul bcryptjs berhasil di-load.");

    const plainPassword = "admin"; // Ganti ini jika password yang ingin di-hash berbeda
    const saltRounds = 10;         // Pastikan ini konsisten dengan yang kamu gunakan di aplikasi
    console.log(`Mencoba melakukan hash untuk password: "${plainPassword}" dengan salt rounds: ${saltRounds}`);

    bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
        console.log("Callback dari bcrypt.hash dieksekusi.");
        if (err) {
            console.error("Terjadi error di dalam callback bcrypt.hash:", err);
            return;
        }
        console.log(`Password asli: ${plainPassword}`);
        console.log(`Hash bcrypt: ${hash}`);
    });

    console.log("Fungsi bcrypt.hash sudah dipanggil, menunggu callback...");

} catch (error) {
    console.error("Terjadi error di luar callback bcrypt.hash (kemungkinan saat load modul atau setup awal):", error);
    }
