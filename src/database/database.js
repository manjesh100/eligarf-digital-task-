const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/mobileApps_portal';
// { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB Database');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  })


