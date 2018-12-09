import { Mileage } from '../models/Mileage.model';

// Get all mileage transactions
router.route('/mileage').get((req, res) => {
      Mileage.find({}, (err, mileage) => {
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

// Update existing mileage transaction
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