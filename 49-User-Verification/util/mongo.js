const mongoose = require('mongoose')
const { mongoPath } = require('@root/config.json')

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}
