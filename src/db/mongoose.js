const mongoose = require('mongoose')

const connectionUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1/task-db';


mongoose.connect(connectionUrl,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('Mongo connected ...'))
  .catch(err=> console.error(err))  

