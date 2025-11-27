const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool = require('../config/db');

const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validasi gagal',
                errors: errors.array()
            });
        }

        const { username, email, password, fullName, nim, studyProgram } = req.body;

        // Check if user already exists
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Username atau email sudah digunakan' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password, full_name, nim, study_program) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, hashedPassword, fullName, nim, studyProgram]
        );

        res.status(201).json({ message: 'Pengguna berhasil didaftarkan' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validasi gagal',
                errors: errors.array()
            });
        }

        const { username, password } = req.body;

        // Find user
        const [users] = await pool.execute(
            'SELECT id, username, email, password, full_name, role, nim, study_program FROM users WHERE username = ? OR email = ?',
            [username, username]
        );

        if (users.length === 0) {
            return res.status(400).json({ message: 'Username atau password salah' });
        }

        const user = users[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Username atau password salah' });
        }

        // Create JWT token
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                fullName: user.full_name,
                role: user.role,
                nim: user.nim,
                studyProgram: user.study_program
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

const validateRegister = [
    body('username').isLength({ min: 3 }).withMessage('Username minimal 3 karakter'),
    body('email').isEmail().withMessage('Email tidak valid'),
    body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
    body('fullName').notEmpty().withMessage('Nama lengkap harus diisi')
];

const validateLogin = [
    body('username').notEmpty().withMessage('Username atau email harus diisi'),
    body('password').notEmpty().withMessage('Password harus diisi')
];

module.exports = {
    register,
    login,
    validateRegister,
    validateLogin
};