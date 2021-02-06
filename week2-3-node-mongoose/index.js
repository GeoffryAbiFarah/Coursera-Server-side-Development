const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("connected correctly to server !");
    const newDish = Dishes({
        name: "Uthappiza",
        description: "delicious"
    });

    newDish.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.find().exec();
        })
        .then((dishes) => {
            console.log(dishes);

            return Dishes.deleteMany();
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) =>{
            console.log(err);
        });
});