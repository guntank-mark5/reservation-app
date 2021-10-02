const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    max: [60, 'ユーザー名は最大60文字まで']
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    max: [60, 'Eメールは最大60文字まで']
  },
  password: {
    type: String,
    required: true,
    max: [30, '最大30文字まで'],
    mmin: [8, 'パスワードは8文字以上で入力してください']
  },
})

UserSchema.methods.hasSamePassword = function (inputsPassword) {
  const user = this
  return bcrypt.compareSync(inputsPassword, user.password)
}

UserSchema.pre('save', function (next) {
  const user = this
  const saltRounds = 10
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('User', UserSchema)
