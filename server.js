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
import Invoice from './server/models/invoice.model';

const app = express();
const router = express.Router();

app.set('db_secret', db_credentials.secret);

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

mongoose.connect(`mongodb+srv://${db_credentials.username}:${db_credentials.password}@justaccounts-jythb.mongodb.net/justaccounts`, {
    useNewUrlParser: true,
    useCreateIndex: true
})

const connection = mongoose.connection;

connection.once('open', _ => {
    console.log('MongoDB database connection established');
})

app.use('/', router);

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

router.route('/invoices').get((req, res) => {
    Invoice.find({}, (err, invoices) => {
        res.status(200).json(invoices);
    })
})

router.route('/invoices/:id').get((req, res) => {
    Invoice.findById(req.params.invoiceId, (err, invoice) => {
        res.status(200).json(invoice);
    })
})

router.route('/invoices').post((req, res) => {
    let newInvoice = new Invoice(req.body);
    newInvoice.save()
        .then(invoice => {
            res.status(200).send(invoice);
        })
        .catch(err => {
            res.status(400).send('Failed to save new invoice');
        })
})

router.route('/invoice/update/:id').post((req, res) => {
    Invoice.findById(req.params.id, (err, invoice => {
        if (!invoice) {
            return next(new Error('Unable to find invoice'));
        } else {
            invoice.save()
                .then(invoice => {
                    res.status(200).json('Successfully updated invoice', invoice);
                })
                .catch(err => {
                    res.status(400).send('Error updating invoice', err);
                })
        }
    }))
})

router.route('/invoices/delete/:id').get((req, res) => {
    Invoice.findByIdAndRemove({
        id: req.params.id
    }, (err, invoice) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json('Successfully deleted invoice');
        }
    })
})

app.listen(4000, _ => {
    console.log(`Express server running on port 4000`);
})