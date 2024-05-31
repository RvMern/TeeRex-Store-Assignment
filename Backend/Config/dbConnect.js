const mongoose = require('mongoose');

const dbConnect = async() => {
   mongoose.connect(process.env.MONGODB_URL)
   .then(data => console.log(`Database connected successfully ${data.connection.host}:${data.connection.port}`))
   .catch(err => console.log(`Database connection failed due to : ${err}`))
}

module.exports = dbConnect();