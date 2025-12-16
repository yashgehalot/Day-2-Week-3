const express = require('express');
const router = express.Router();
// Import the middleware
const { protect } = require('../middleware/authMiddleware');
// Import the controller functions (Make sure these match your controller exports)
const { 
    createExpense, 
    getExpenses, 
    getExpenseById, 
    updateExpense, 
    deleteExpense 
} = require('../controllers/expenseController');

// Protect all routes in this file (User must be logged in)
router.use(protect);

// Routes
router.post('/', createExpense);      // Create
router.get('/', getExpenses);         // Read All
router.get('/:id', getExpenseById);   // Read Single
router.put('/:id', updateExpense);    // Update
router.delete('/:id', deleteExpense); // Delete

module.exports = router;