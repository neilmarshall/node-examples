const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/test';
const db = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    available: Boolean
});

const Car = mongoose.model('Car', carSchema);

const addCar = new Car({
    brand: "Ford",
    model: "Focus",
    year: 2000,
    available: true
});

//addCar.save((err, doc) => {
    //if (err) { console.log(err); }
    //console.log(doc);
//});

Car.find(
    {_id:
        {$in: ["5e6d0866a9d8156f0eec25c6", "5e6d0a2996cdab7e8f0d6de6"]}
    },
    (err, doc) => {
        if (err) { console.log(err); }
        console.log(doc);
});

Car.find((err, doc) => {
    if (err) { console.log(err); }
    console.log(doc.length);
});

Car.find(
    {},
    projection={ brand: 1, model: 1, _id: 0 },
    (err, doc) => {
        if (err) { console.log(err); }
        console.log(doc);
    }
);

