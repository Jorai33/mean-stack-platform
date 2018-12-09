import { Invoice } from '../models/Invoice.model';

// Get all invoices
router.route('/invoices').get((req, res) => {
      Invoice.find({}, (err, invoices) => {
            res.status(200).json(invoices);
      })
})

// Get invoice by ID
router.route('/invoices/:id').get((req, res) => {
      Invoice.findById(req.params.invoiceId, (err, invoice) => {
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
                  res.status(400).send('Failed to save new invoice');
            })
})

// Update existing invoice
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

// Delete invoice by ID
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