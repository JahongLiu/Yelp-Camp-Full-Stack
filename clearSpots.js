const mongoose = require('mongoose');
const Spot = require('./models/spots');

mongoose.connect('mongodb://localhost:27017/timelapse-spots', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

async function clearSpots() {
    try {
        await Spot.deleteMany({});
        console.log('All spots have been removed from the database.');
    } catch (err) {
        console.error('Error clearing spots:', err);
    } finally {
        mongoose.connection.close();
    }
}

clearSpots();
