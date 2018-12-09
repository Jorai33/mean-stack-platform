import { User } from '../models/User.model';

// Sign in
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

// Delete user account
router.route('/users/delete/:id').get((req, res) => {
      User.findByIdAndRemove({
            id: req.params.id
      }, (err, user) => {
            if (err) {
                  res.json(err);
            } else {
                  res.status(200).json('Successfully deleted user');
            }
      })
})