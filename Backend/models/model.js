const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
  },
  interests: [
    {
      type: String,
    },
  ],
  links: {
    linkedin: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    facebook: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
    web: {
      type: String,
      default: '',
    },
  },
  professional: {
    Education: {
      type: String,
      default: '',
    },
    Job: {
      type: String,
      default: '',
    },
  },
  followers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
  ],
  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
  ],
  about: {
    type: String,
  },
})

mongoose.model('user', userSchema)
