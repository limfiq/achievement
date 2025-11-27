const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
    getAllTestPeriods,
    getTestPeriodById,
    createTestPeriod,
    updateTestPeriod,
    deleteTestPeriod
} = require('../controllers/testPeriodController');

router.get('/', auth, getAllTestPeriods);
router.get('/:id', auth, getTestPeriodById);
router.post('/', auth, adminAuth, createTestPeriod);
router.put('/:id', auth, adminAuth, updateTestPeriod);
router.delete('/:id', auth, adminAuth, deleteTestPeriod);

module.exports = router;