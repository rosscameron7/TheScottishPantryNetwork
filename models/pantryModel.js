const nedb = require('nedb');

class PantryModel {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

    // A function to seed the database
    init() {
        this.db.insert({
            food: 'Apples',
            description: 'Fresh red apples',
            quantity: 10,
            expiryDate: '2024-04-25',
            location: 'Glasgow'
        });
        console.log('DB entry for Apples inserted');

        this.db.insert({
            food: 'Oranges',
            description: 'Juicy oranges',
            quantity: 8,
            expiryDate: '2024-04-23',
            location: 'Edinburgh'
        });
        console.log('DB entry for Oranges inserted');
    }

    // A function to return all food entries from the database
    getAllFood() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, foodItems) {
                if (err) {
                    reject(err);
                } else {
                    resolve(foodItems);
                    console.log('getAllFood() returns: ', foodItems);
                }
            });
        });
    }

    // A function to get food entries by a specific location
    getFoodByLocation(location) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'location': location }, function(err, foodItems) {
                if (err) {
                    reject(err);
                } else {
                    resolve(foodItems);
                    console.log('getFoodByLocation() returns: ', foodItems);
                }
            });
        });
    }

    // A function to add a new food entry to the database
    addFood(food, description, quantity, expiryDate, location) {
        const foodItem = {
            food: food,
            description: description,
            quantity: quantity,
            expiryDate: expiryDate,
            location: location
        };

        console.log('Food entry created', foodItem);
        this.db.insert(foodItem, function(err, doc) {
            if (err) {
                console.log('Error inserting food entry', food);
            } else {
                console.log('Food entry inserted into the database', doc);
            }
        });
    }
}

module.exports = PantryModel;
