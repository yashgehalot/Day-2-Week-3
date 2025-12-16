const Expense = require('../models/Expense');

// 1. Create Expense
const createExpense = async (req, res) => {
  try {
    const { title, amount, category, description, status, date } = req.body;
    const expense = new Expense({
      user: req.user.id,
      title,
      amount,
      category,
      description,
      status,
      date
    });
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get All Expenses (For logged in user)
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get Single Expense (New)
const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if(expense && expense.user.toString() === req.user.id) {
            res.json(expense);
        } else {
            res.status(404).json({ message: "Expense not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Update Expense (New)
const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if(expense && expense.user.toString() === req.user.id) {
            const updatedExpense = await Expense.findByIdAndUpdate(
                req.params.id, 
                req.body, 
                { new: true }
            );
            res.json(updatedExpense);
        } else {
            res.status(404).json({ message: "Expense not found or unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (expense && expense.user.toString() === req.user.id) {
      await expense.deleteOne();
      res.json({ message: "Expense removed" });
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense };