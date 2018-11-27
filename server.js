import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Models
import Invoice from './server/models/Invoice.model';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/justaccounts', {
    useNewUrlParser: true
})

const connection = mongoose.connection;

connection.once('open', _ => {
    console.log('MongoDB database connection established');
})

app.use('/', router);

router.route('/invoices').get((req, res) => {
    Invoice.find({}, (err, invoices) => {
        res.json(invoices);
    })
})

router.route('/invoices/:id').get((req, res) => {
    Invoice.findById(req.params.invoiceId, (err, invoice) => {
        res.json(invoice);
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
                    res.json('Successfully updated invoice', invoice);
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
            res.json('Successfully deleted invoice');
        }
    })
})

app.listen(4000, () => {
    console.log(`Express server running on port 4000`);
})