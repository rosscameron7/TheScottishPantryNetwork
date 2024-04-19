const Datastore = require("gray-nedb");
const bcrypt = require('bcrypt');

const saltRounds = 10;

class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            // embedded
            this.db = new Datastore({
                filename: dbFilePath,
                autoload: true
            });
        } else {
            // in memory
            this.db = new Datastore();
        }
    }

    init() {
        // Insert initial users
        const users = [
            {
                forename: 'Peter',
                surname: 'Smith',
                email: 'peter@example.com',
                password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C' // Password: password1
            },
            {
                forename: 'Ann',
                surname: 'Johnson',
                email: 'ann@example.com',
                password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S' // Password: password2
            }
        ];

        this.db.insert(users, (err, newDocs) => {
            if (err) {
                console.error('Error inserting initial users:', err);
            } else {
                console.log('Initial users inserted:', newDocs);
            }
        });
    }

    create(forename, surname, email, password, callback) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                callback(null);
            } else {
                const user = { forename, surname, email, password: hash };
                this.db.insert(user, (err, newUser) => {
                    if (err) {
                        console.error('Error inserting user into database:', err);
                        callback(null);
                    } else {
                        callback(newUser);
                    }
                });
            }
        });
    }

    lookup(email, cb) {
        this.db.findOne({ email }, (err, user) => {
            if (err || !user) {
                cb(null);
            } else {
                cb(user);
            }
        });
    }
}

const dao = new UserDAO('../database/tspn.db');
dao.init(); // Initialize the database with initial users
module.exports = dao;
