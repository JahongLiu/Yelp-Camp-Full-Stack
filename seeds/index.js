const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Spots = require('../models/spots');
const spots = require('../models/spots');

mongoose.connect('mongodb://localhost:27017/timelapse-spots', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = arrary => arrary[Math.floor(Math.random() * arrary.length)]



const seedDB = async () => {
    await Spots.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = 0;
        const spot = new Spots({
            author: '64258bfac9b9e0f3c70bead2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Nesciunt ad corrupti numquam quia, qui rerum perferendis nihil impedit fugit.Temporibus veritatis facere sunt optio, dolorum aliquam numquam fugiat quod laboriosam.',
            accessibility: 'free to enter',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,  
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dd9v5kmby/image/upload/v1680472388/TimelapseSpot/pc2ja6miu9ru6xefl7t6.jpg',
                    filename: 'TimelapseSpot/pc2ja6miu9ru6xefl7t6',
                },
                {
                    url: 'https://res.cloudinary.com/dd9v5kmby/image/upload/v1680472388/TimelapseSpot/n2uziluw5q4qfjzb5swn.jpg',
                    filename: 'TimelapseSpot/n2uziluw5q4qfjzb5swn',
                },
                {
                    url: 'https://res.cloudinary.com/dd9v5kmby/image/upload/v1680472389/TimelapseSpot/hzvwknr0acjgrf0cqshv.jpg',
                    filename: 'TimelapseSpot/hzvwknr0acjgrf0cqshv',
                },
                {
                    url: 'https://res.cloudinary.com/dd9v5kmby/image/upload/v1680472389/TimelapseSpot/beajtxr94zith7apasqu.jpg',
                    filename: 'TimelapseSpot/beajtxr94zith7apasqu',
                }
            ],
        })
        await spot.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})