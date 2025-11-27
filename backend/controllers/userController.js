const bcrypt = require('bcryptjs');
const pool = require('../config/db');

// Mendapatkan semua pengguna (hanya admin)
const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.execute(
            'SELECT id, username, email, full_name, role, nim, study_program, created_at FROM users ORDER BY created_at DESC'
        );

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

// Mendapatkan pengguna berdasarkan ID (hanya admin)
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const [users] = await pool.execute(
            'SELECT id, username, email, full_name, role, nim, study_program, created_at FROM users WHERE id = ?',
            [id]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        res.json(users[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

// Memperbarui data pengguna (hanya admin)
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, role, nim, studyProgram } = req.body;

        const [result] = await pool.execute(
            'UPDATE users SET full_name = ?, email = ?, role = ?, nim = ?, study_program = ? WHERE id = ?',
            [fullName, email, role, nim, studyProgram, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        res.json({ message: 'Data pengguna berhasil diperbarui' });
    } catch (error) {
        console.error(error);
        // Cek error untuk email atau username yang sudah ada
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email atau username sudah digunakan' });
        }
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

// Menghapus pengguna (hanya admin)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Mencegah admin menghapus dirinya sendiri
        if (req.user.id == id) {
            return res.status(400).json({ message: 'Tidak dapat menghapus akun Anda sendiri' });
        }

        const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        res.json({ message: 'Pengguna berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

// Mendapatkan profil pengguna yang sedang login
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const [users] = await pool.execute(
            'SELECT id, username, email, full_name, role, nim, study_program, created_at FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        res.json(users[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

// Memperbarui profil pengguna yang sedang login
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fullName, nim, studyProgram } = req.body;

        const [result] = await pool.execute(
            'UPDATE users SET full_name = ?, nim = ?, study_program = ? WHERE id = ?',
            [fullName, nim, studyProgram, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        res.json({ message: 'Profil berhasil diperbarui' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

// Mengubah password pengguna yang sedang login
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Password saat ini dan password baru harus diisi' });
        }

        // Ambil password hash dari database
        const [users] = await pool.execute('SELECT password FROM users WHERE id = ?', [userId]);

        if (users.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        const user = users[0];

        // Verifikasi password saat ini
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password saat ini salah' });
        }

        // Hash password baru
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update password di database
        await pool.execute('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, userId]);

        res.json({ message: 'Password berhasil diubah' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getProfile,
    updateProfile,
    changePassword
};