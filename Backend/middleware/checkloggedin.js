const mongoose = require('mongoose')
const JWT_SECRET = process.env.JWT_SECRET
const user = mongoose.model('user')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  console.log('middle')
  const { authentication } = req.headers
  console.log(authentication)
  if (!authentication) {
    return res.status(402).json({ error: 'You must be logged in' })
  }
  console.log('hi' + process.env.JWT_SECRET)
  jwt.verify(authentication, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(402).json({ error: 'error in auth' })
    }
    const { _id } = payload

    user.findById(_id).then((fuser) => {
      req.user = fuser
      next()
      // res.json({message:fuser});
    })
  })
}
