import { Contact } from '../models/Contact.model';

// Get all contacts
router.route('/contacts').get((req, res) => {
      Contact.find({}, (err, contacts) => {
            res.status(200).json(contacts);
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

// Update existing contact
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