import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';

// MongoDB User Credentials
import db_credentials from './server/db_credentials.json';

// Models
import User from './server/models/User.model';
import Contact from './server/models/Contact.model';
import Expense from './server/models/Expense.model';
import Invoice from './server/models/Invoice.model';
import Mileage from './server/models/Mileage.model';

const app = express();
const router = express.Router();

app.set('db_secret', db_credentials.secret);

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));


// MongoDB config
mongoose.connect(`mongodb+srv://${db_credentials.username}:${db_credentials.password}@justaccounts-jythb.mongodb.net/justaccounts`, {
    useNewUrlParser: true,
    useCreateIndex: true
})

const connection = mongoose.connection;

connection.once('open', _ => {
    console.log('MongoDB database connection established');
})


// Express router config
app.use('/', router);

// Sign user in
router.route('/login').post((req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {

        if (err) {
            return res.status(500).json({
                err
            })
        } else if (!user) {
            res.statusMessage = 'No user found';
            return res.status(404).end();
        } else if (!user.comparePassword(req.body.password)) {
            res.statusMessage = 'Incorrect password';
            return res.status(401).end();
        } else {
            const token = user.generateToken();
            return res.json({
                token,
                user
            })
        }
    })
})

// Register new user
router.route('/register').post((req, res) => {
    const newUser = new User({
        email: req.body.email
    })

    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

    newUser.save(err => {
        if (err) {
            return res.status(400).send({
                message: err
            })
        } else {
            const token = newUser.generateToken();
            newUser.hash_password = undefined;
            return res.json({
                token,
                newUser
            })
        }
    })
})


// Establish Express route authentication middleware - Require user token from body or 'x-access-token' request header
router.use((req, res, next) => {
    const token = req.body.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, app.get('db_secret'), function(err, decoded) {
            if (err) {
                res.statusMessage = 'User token authentication failed';
                return res.status(500).end();
            } else {
                next();
            }
        })
    } else {
        res.statusMessage = 'No user token provided';
        return res.status(401).end();
    }
})


// Get all contacts
router.route('/contacts').get((req, res) => {
      Contact.find(req.query, (err, contacts) => {
            res.status(200).json(contacts);

            if (err) {
                  console.error(`Error retrieving contacts: ${err.message}`);
            }
      })
})

// Get contact by ID
router.route('/contacts/:id').get((req, res) => {
      Contact.findById(req.params.contactId, (err, contact) => {
            res.status(200).json(contact);
      })
})

// Save new contact
router.route('/contacts').post((req, res) => {
      let newContact = new Contact(req.body);
      newContact.save()
            .then(contact => {
                  res.status(200).send(contact);
            })
            .catch(err => {
                  res.status(400).send('Failed to save new contact');
            })
})

// Update contact by ID
router.route('/contact/update/:id').post((req, res) => {
      Contact.findById(req.params.id, (err, contact => {
            if (!contact) {
                  return next(new Error('Unable to find contact'));
            } else {
                  contact.save()
                  .then(contact => {
                        res.status(200).json('Successfully updated contact', contact);
                  })
                  .catch(err => {
                        res.status(400).send('Error updating contact', err);
                  })
            }
      }))
})

// Delete contact by ID
router.route('/contacts/delete/:id').get((req, res) => {
      Contact.findByIdAndRemove({
            id: req.params.id
      }, (err, contact) => {
            if (err) {
                  res.json(err);
            } else {
                  res.status(200).json('Successfully deleted contact');
            }
      })
})


// Get all expenses
router.route('/expenses').get((req, res) => {
      Expense.find(req.query, (err, expenses) => {
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

// Update expense by ID
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


// Get all invoices
router.route('/invoices').get((req, res) => {
    Invoice.find(req.query, (err, invoices) => {
        res.status(200).json(invoices);
    })
})

// Get invoice by ID
router.route('/invoices/:id').get((req, res) => {
    Invoice.findById(req.params.id, (err, invoice) => {
        res.status(200).json(invoice);
    })
})

// Save new invoice
router.route('/invoices').post((req, res) => {
    let newInvoice = new Invoice(req.body);
    newInvoice.save()
        .then(invoice => {
            res.status(200).send(invoice);
        })
        .catch(err => {
            console.error(`Error saving new invoice: ${err.message}`);
            res.status(400).send('Failed to save new invoice');
        })
})

// Update invoice by ID
router.route('/invoice/update/:id').post((req, res) => {
      Invoice.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, invoice) => {
            if (err) {
                res.json(err);
            } else {
                res.status(200).json(invoice);
            }
      })
})

// Delete invoice by ID
router.route('/invoices/delete/:id').get((req, res) => {
    Invoice.findByIdAndRemove({
        id: req.params.id
    }, (err, res) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json('Successfully deleted invoice');
        }
    })
})


// Get all mileage transactions
router.route('/mileage').get((req, res) => {
      Mileage.find(req.query, (err, mileage) => {
            res.status(200).json(mileage);
      })
})

// Get mileage transaction by ID
router.route('/mileage/:id').get((req, res) => {
      Mileage.findById(req.params.mileageId, (err, mileage) => {
            res.status(200).json(mileage);
      })
})

// Save new mileage transaction
router.route('/mileage').post((req, res) => {
      let newMileage = new Mileage(req.body);
      newMileage.save()
            .then(mileage => {
                  res.status(200).send(mileage);
            })
            .catch(err => {
                  res.status(400).send('Failed to save new mileage');
            })
})

// Update mileage transaction by ID
router.route('/mileage/update/:id').post((req, res) => {
      Mileage.findById(req.params.id, (err, mileage => {
            if (!mileage) {
                  return next(new Error('Unable to find mileage'));
            } else {
                  mileage.save()
                  .then(mileage => {
                        res.status(200).json('Successfully updated mileage', mileage);
                  })
                  .catch(err => {
                        res.status(400).send('Error updating mileage', err);
                  })
            }
      }))
})

// Delete mileage transaction by ID
router.route('/mileage/delete/:id').get((req, res) => {
      Mileage.findByIdAndRemove({
            id: req.params.id
      }, (err, mileage) => {
            if (err) {
                  res.json(err);
            } else {
                  res.status(200).json('Successfully deleted mileage');
            }
      })
})

app.listen(4000, _ => {
    console.log(`Express server running on port 4000`);
})