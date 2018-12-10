import { Expense } from '../models/Expense.model';

// Get all expenses
router.route('/expenses').get((req, res) => {
      Expense.find({}, (err, expenses) => {
            res.status(200).json(expenses);
      })
})

// Get expense by ID
router.route('/expenses/:id').get((req, res) => {
      Expense.findById(req.params.expenseId, (err, expense) => {
            res.status(200).json(expense);
      })
})

// Save new expense
router.route('/expenses').post((req, res) => {
      let newExpense = new Expense(req.body);
      newExpense.save()
            .then(expense => {
                  res.status(200).send(expense);
            })
            .catch(err => {
                  res.status(400).send('Failed to save new expense');
            })
})

// Update existing expense
router.route('/expense/update/:id').post((req, res) => {
      Expense.findById(req.params.id, (err, expense => {
            if (!expense) {
                  return next(new Error('Unable to find expense'));
            } else {
                  expense.save()
                  .then(expense => {
                        res.status(200).json('Successfully updated expense', expense);
                  })
                  .catch(err => {
                        res.status(400).send('Error updating expense', err);
                  })
            }
      }))
})

// Delete expense by ID
router.route('/expenses/delete/:id').get((req, res) => {
      Expense.findByIdAndRemove({
            id: req.params.id
      }, (err, expense) => {
            if (err) {
                  res.json(err);
            } else {
                  res.status(200).json('Successfully deleted expense');
            }
      })
})