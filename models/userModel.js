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
        this.db.insert({
            forename: 'Peter',
            surname: 'Smith',
            email: 'peter@example.com',
            password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C'
        });

        this.db.insert({
            forename: 'Ann',
            surname: 'Johnson',
            email: 'ann@example.com',
            password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S'
        });

        return this;
    }

    create(forename, surname, email, password, callback) {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            console.error('Error hashing password:', err);
            callback(null);
            return;
          }
      
          const user = { forename, surname, email, password: hash };
          this.db.insert(user, (err, newUser) => {
            if (err) {
              console.error('Error inserting user into database:', err);
              callback(null);
              return;
            }
      
            callback(newUser);
          });
        });
      }

    lookup(user, cb) {
        this.db.find({ 'email': user }, function(err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }
}

const dao = new UserDAO();
dao.init();
module.exports = dao;
