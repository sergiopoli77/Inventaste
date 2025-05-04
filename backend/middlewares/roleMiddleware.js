const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // Ambil token dari header Authorization
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    // Verifikasi token dan ambil data pengguna
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token tidak valid" });
      }

      // Menyimpan decoded token ke request untuk akses di controller
      req.user = decoded;

      // Cek apakah role yang ada di decoded token cocok dengan role yang dibutuhkan
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Akses ditolak: Anda tidak memiliki hak akses" });
      }

      // Jika role valid, lanjutkan ke middleware berikutnya
      next();
    });
  };
};

module.exports = roleMiddleware;
