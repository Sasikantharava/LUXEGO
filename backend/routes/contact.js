const express = require('express');
const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/', createContact);
router.get('/', protect, admin, getContacts);
router.put('/:id', protect, admin, updateContact);
router.delete('/:id', protect, admin, deleteContact);

module.exports = router;