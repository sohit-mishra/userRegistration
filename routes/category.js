const express = require('express');
const { createCategory, updateCategory, deleteCategory, getAllCategory, getIdCategory } = require('../controllers/categoryController');

const router = express.Router();

router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.get('/', getAllCategory);
router.get('/:id', getIdCategory);


module.exports = router;