const mongoose = require('mongoose')
// const { mongoPath } = require('./config.json')

const mongoPath =
  'mongodb+srv://tutorial:bwfySQU7MDhPPyON@mongodb-tutorial.hbbee.mongodb.net/wornoffkeys?retryWrites=true&w=majority'

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}
