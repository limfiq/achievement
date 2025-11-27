const pool = require('../config/db');

const getAllAchievements = async (req, res) => {
    try {
        const [achievements] = await pool.execute(`
      SELECT a.*, u.full_name, u.nim, u.study_program, c.name as category_name
      FROM achievements a
      JOIN users u ON a.user_id = u.id
      LEFT JOIN categories c ON a.category = c.name
      ORDER BY a.created_at DESC
    `);

        res.json(achievements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const getAchievementById = async (req, res) => {
    try {
        const { id } = req.params;

        const [achievements] = await pool.execute(`
      SELECT a.*, u.full_name, u.nim, u.study_program, c.name as category_name
      FROM achievements a
      JOIN users u ON a.user_id = u.id
      LEFT JOIN categories c ON a.category = c.name
      WHERE a.id = ?
    `, [id]);

        if (achievements.length === 0) {
            return res.status(404).json({ message: 'Pencapaian tidak ditemukan' });
        }

        res.json(achievements[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const getUserAchievements = async (req, res) => {
    try {
        const userId = req.user.id;

        const [achievements] = await pool.execute(`
      SELECT a.*, c.name as category_name
      FROM achievements a
      LEFT JOIN categories c ON a.category = c.name
      WHERE a.user_id = ?
      ORDER BY a.created_at DESC
    `, [userId]);

        res.json(achievements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const createAchievement = async (req, res) => {
    try {
        const { title, description, category, level, achievementDate } = req.body;
        const userId = req.user.id;
        const certificatePath = req.file ? `/uploads/${req.file.filename}` : null;

        const [result] = await pool.execute(
            'INSERT INTO achievements (user_id, title, description, category, level, achievement_date, certificate_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, title, description, category, level, achievementDate, certificatePath]
        );

        res.status(201).json({
            message: 'Pencapaian berhasil ditambahkan',
            id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const updateAchievementStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminNotes } = req.body;

        const [result] = await pool.execute(
            'UPDATE achievements SET status = ?, admin_notes = ? WHERE id = ?',
            [status, adminNotes, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pencapaian tidak ditemukan' });
        }

        res.json({ message: 'Status pencapaian berhasil diperbarui' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const deleteAchievement = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute('DELETE FROM achievements WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pencapaian tidak ditemukan' });
        }

        res.json({ message: 'Pencapaian berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const getCategories = async (req, res) => {
    try {
        const [categories] = await pool.execute('SELECT * FROM categories ORDER BY name');
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

module.exports = {
    getAllAchievements,
    getAchievementById,
    getUserAchievements,
    createAchievement,
    updateAchievementStatus,
    deleteAchievement,
    getCategories
};