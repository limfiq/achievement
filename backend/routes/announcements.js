const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
    getAllAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} = require('../controllers/announcementController');

router.get('/', getAllAnnouncements);
router.get('/:id', getAnnouncementById);
router.post('/', auth, adminAuth, createAnnouncement);
router.put('/:id', auth, adminAuth, updateAnnouncement);
router.delete('/:id', auth, adminAuth, deleteAnnouncement);

module.exports = router;