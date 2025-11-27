const pool = require('../config/db');

const getAllTestPeriods = async (req, res) => {
    try {
        const [testPeriods] = await pool.execute(
            'SELECT * FROM test_periods ORDER BY start_date DESC'
        );

        res.json(testPeriods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const getTestPeriodById = async (req, res) => {
    try {
        const { id } = req.params;

        const [testPeriods] = await pool.execute(
            'SELECT * FROM test_periods WHERE id = ?',
            [id]
        );

        if (testPeriods.length === 0) {
            return res.status(404).json({ message: 'Periode tes tidak ditemukan' });
        }

        res.json(testPeriods[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const createTestPeriod = async (req, res) => {
    try {
        const { title, description, startDate, endDate, announcementDate, location } = req.body;

        const [result] = await pool.execute(
            'INSERT INTO test_periods (title, description, start_date, end_date, announcement_date, location) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, startDate, endDate, announcementDate, location]
        );

        res.status(201).json({
            message: 'Periode tes berhasil ditambahkan',
            id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const updateTestPeriod = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, startDate, endDate, announcementDate, location } = req.body;

        const [result] = await pool.execute(
            'UPDATE test_periods SET title = ?, description = ?, start_date = ?, end_date = ?, announcement_date = ?, location = ? WHERE id = ?',
            [title, description, startDate, endDate, announcementDate, location, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Periode tes tidak ditemukan' });
        }

        res.json({ message: 'Periode tes berhasil diperbarui' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const deleteTestPeriod = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute('DELETE FROM test_periods WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Periode tes tidak ditemukan' });
        }

        res.json({ message: 'Periode tes berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

module.exports = {
    getAllTestPeriods,
    getTestPeriodById,
    createTestPeriod,
    updateTestPeriod,
    deleteTestPeriod
};