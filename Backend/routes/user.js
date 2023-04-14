const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const user = mongoose.model('user')

const checkloggedin = require('../middleware/checkloggedin')

router.get('/user/:id', checkloggedin, function (req, res) {
  user
    .findOne({ _id: req.params.id })
    .select({ password: 0 })
    .exec(function (error, founduser) {
      if (error) {
        return res.status(404).json({ err: 'user not found' })
      }
      res.json({ founduser })
    })
})

router.put('/updatePersonalDetails', checkloggedin, function (req, res) {
  const { fname, lname, phone } = req.body
  user
    .findByIdAndUpdate(
      req.user._id,
      {
        lname,
        fname,
        phone,
      },
      { new: true },
    )
    .exec(function (err, result) {
      if (err) {
        return res.status(422).json({ error: err })
      }
      res.status(200).json({ result })
    })
})

router.put('/addInterest', checkloggedin, function (req, res) {
  console.log('inside updateInterests method ', req.body.interests)
  user.findByIdAndUpdate(
    req.user._id,
    { $set: { interests: req.body.interests } },
    { new: true },
    function (err, result) {
      if (err) {
        return res.status(422).json({ error: err })
      }
      console.log('updateInterests:', result)
      res.status(200).json({ result })
    },
  )
})

router.get('/getFollowers', checkloggedin, function (req, res) {
  console.log('inside getFollowers')
  user
    .find({ _id: { $in: req.user._id } })
    .populate('followers')
    .exec(function (err, foundFollowers) {
      if (err) {
        return res.status(422).json({ error: err })
      }
      console.log('inside getFollowers result:', foundFollowers)
      let followersArray = []

      foundFollowers.forEach((element) => {
        console.log('element:', element.followers)
        element.followers.forEach((follower) => {
          console.log('follower:', follower)
          const { _id, fname, lname, email, phone } = follower
          followersArray.push({
            _id,
            fname,
            lname,
            email,
            phone,
            followers: follower.followers,
          })
        })
      })
      res.status(200).json(followersArray)
    })
})

router.put('/follow', checkloggedin, function (req, res) {
  console.log('inside follow method ', req.body.followId)
  user
    .findByIdAndUpdate(
      req.body.followId,
      {
        $addToSet: { followers: req.user._id },
      },
      { new: true },
    )
    .exec(function (err, result) {
      if (err) {
        return res.status(422).json({ error: err })
      }

      user
        .findByIdAndUpdate(
          req.user._id,
          {
            $addToSet: { following: req.body.followId },
          },
          { new: true },
        )
        .exec(function (err, result) {
          if (err) {
            return res.status(422).json({ error: err })
          }
          res.status(200).json({ result })
        })
    })
})

router.put('/unfollow', checkloggedin, function (req, res) {
  const followerId = req.body.followerId
  user.findByIdAndUpdate(
    req.user._id,
    { $pull: { following: followerId } },
    { new: true },
    function (err, result) {
      if (err) {
        return res.status(422).json({ error: err })
      }
      res.status(200).json({ result })
    },
  )
})

router.put('/updatepic', checkloggedin, function (req, res) {
  user.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: { pic: req.body.pic } },
    { new: true },
    function (err, result) {
      if (err) {
        return res.status(422).json({ error: 'profile picture is not updated' })
      }
      res.json({ result })
    },
  )
})

router.put('/updateabout', checkloggedin, function (req, res) {
  user.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: { about: req.body.about } },
    { new: true },
    function (err, result) {
      if (err) {
        return res.status(422).json({ error: 'profile picture is not updated' })
      }
      res.json({ result })
    },
  )
})

router.put('/updatelinks', checkloggedin, async (req, res) => {
  try {
    const { linkedin, twitter, github, facebook, instagram, web } = req.body

    console.log(linkedin, twitter, github, facebook, instagram, web)

    const updatedUser = await user.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          'links.linkedin': linkedin,
          'links.twitter': twitter,
          'links.github': github,
          'links.facebook': facebook,
          'links.instagram': instagram,
          'links.web': web,
        },
      },
      { new: true },
    )

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ message: 'Links updated successfully', founduser: updatedUser })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

router.put('/updateprofinfo', checkloggedin, async (req, res) => {
  try {
    const { education, job } = req.body
    const updatedUser = await user.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          'professional.Education': education,
          'professional.Job': job,
        },
      },
      { new: true },
    )
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' })
    }
    res.status(200).send({
      message: 'User profile information updated successfully',
      user: updatedUser,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Internal server error' })
  }
})

module.exports = router
