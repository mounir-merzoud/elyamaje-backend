const express = require('express');
const { createEmployee, getEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/', upload.single('profileImage'), createEmployee);
router.get('/', getEmployee);
router.put('/:id', upload.single('profileImage'), updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
