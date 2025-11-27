const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getProfile,
    updateProfile,
    changePassword
} = require('../controllers/userController');

// Routes untuk admin mengelola semua pengguna
router.get('/', auth, adminAuth, getAllUsers);         // GET /api/users (semua user)
router.get('/:id', auth, adminAuth, getUserById);       // GET /api/users/123 (user spesifik)
router.put('/:id', auth, adminAuth, updateUser);       // PUT /api/users/123 (update user spesifik)
router.delete('/:id', auth, adminAuth, deleteUser);     // DELETE /api/users/123 (hapus user spesifik)

// Routes untuk pengguna yang sedang login
router.get('/profile', auth, getProfile);               // GET /api/users/profile (profil saya)
router.put('/profile', auth, updateProfile);            // PUT /api/users/profile (update profil saya)
router.put('/change-password', auth, changePassword);   // PUT /api/users/change-password (ubah password saya)

module.exports = router;