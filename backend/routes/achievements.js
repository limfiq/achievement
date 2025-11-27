const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
    getAllAchievements,
    getAchievementById,
    getUserAchievements,
    createAchievement,
    updateAchievementStatus,
    deleteAchievement,
    getCategories
} = require('../controllers/achievementController');

router.get('/', auth, getAllAchievements);
router.get('/categories', auth, getCategories);
router.get('/user', auth, getUserAchievements);
router.get('/:id', auth, getAchievementById);
router.post('/', auth, upload.single('certificate'), createAchievement);
router.put('/:id/status', auth, adminAuth, updateAchievementStatus);
router.delete('/:id', auth, adminAuth, deleteAchievement);

module.exports = router;