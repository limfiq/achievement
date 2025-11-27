const pool = require('../config/db');

const getAllAnnouncements = async (req, res) => {
    try {
        const [announcements] = await pool.execute(`
      SELECT a.*, u.full_name as author_name
      FROM announcements a
      JOIN users u ON a.author_id = u.id
      WHERE a.is_active = true
      ORDER BY a.created_at DESC
    `);

        res.json(announcements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const getAnnouncementById = async (req, res) => {
    try {
        const { id } = req.params;

        const [announcements] = await pool.execute(`
      SELECT a.*, u.full_name as author_name
      FROM announcements a
      JOIN users u ON a.author_id = u.id
      WHERE a.id = ?
    `, [id]);

        if (announcements.length === 0) {
            return res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
        }

        res.json(announcements[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const createAnnouncement = async (req, res) => {
    try {
        const { title, content } = req.body;
        const authorId = req.user.id;

        const [result] = await pool.execute(
            'INSERT INTO announcements (title, content, author_id) VALUES (?, ?, ?)',
            [title, content, authorId]
        );

        res.status(201).json({
            message: 'Pengumuman berhasil ditambahkan',
            id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, isActive } = req.body;

        const [result] = await pool.execute(
            'UPDATE announcements SET title = ?, content = ?, is_active = ? WHERE id = ?',
            [title, content, isActive, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
        }

        res.json({ message: 'Pengumuman berhasil diperbarui' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute('DELETE FROM announcements WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
        }

        res.json({ message: 'Pengumuman berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

module.exports = {
    getAllAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};