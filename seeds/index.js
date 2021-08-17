const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID 
            author: '61157d0aeb70af6b88eb33d6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry:
            {
                coordinates: [-78.449927, 45.572801],
                type: "Point"
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dpasewjqz/image/upload/v1629143496/YelpCamp/nf0ssyvbkfzhqperbqo8.jpg',
                    filename: 'YelpCamp/nf0ssyvbkfzhqperbqo8'
                },
                {
                    url: 'https://res.cloudinary.com/dpasewjqz/image/upload/v1629143496/YelpCamp/ihtzji5sahi6wgcfsgnb.jpg',
                    filename: 'YelpCamp/ihtzji5sahi6wgcfsgnb'
                },
                {
                    url: 'https://res.cloudinary.com/dpasewjqz/image/upload/v1629143496/YelpCamp/g2cecqlkqpuwbhfei7oo.jpg',
                    filename: 'YelpCamp/g2cecqlkqpuwbhfei7oo'
                },
                {
                    url: 'https://res.cloudinary.com/dpasewjqz/image/upload/v1629143496/YelpCamp/lc0iwq89d6y1wrdt1hxt.jpg',
                    filename: 'YelpCamp/lc0iwq89d6y1wrdt1hxt'
                }
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac enim nec erat vehicula iaculis. Ut ut nisl dictum, bibendum neque sed, auctor enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc libero mi, congue non vehicula efficitur, vulputate at purus. Etiam pharetra egestas lorem sit amet vestibulum. Vestibulum faucibus mi nec ante lacinia, vel pellentesque purus pulvinar. Phasellus elementum ante tristique libero cursus porttitor. Nunc sollicitudin, lectus sed aliquam imperdiet, massa erat condimentum eros, eu ullamcorper nibh odio non urna. Maecenas nulla nisl, auctor a porttitor a, eleifend vel orci. Duis vel ipsum porttitor ligula ornare commodo nec ut justo.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => mongoose.connection.close());