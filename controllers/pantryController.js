const pantryDAO = require("../models/pantryModel");
const userDao = require("../models/userModel");
const bcrypt = require("bcrypt");

const db = new pantryDAO("./database/tspn.db");
db.init();

exports.show_register_page = function (req, res) {
    res.render("user/register");
};

exports.handle_register = async function (req, res) {
    const forename = req.body.forename;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;

    if (!forename || !surname || !email || !password) {
        return res.status(400).render("user/register", { error: "Missing required fields" });
    }   

    userDao.lookup(email, function (user) {
        if(user) {
            res.send(401, "User already exists:", user);
            return;
        }
        userDao.create(forename, surname, email, password, function(user) {
            console.log("User created:", user);
            res.redirect("/login");
        });
    });
};

exports.show_login = function (req, res) {
    res.render("user/login");
};

exports.handle_login = async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).render("user/login", { error: "Missing required fields" });
    }

    userDao.lookup(email, function (user) {
        if (!user) {
            return res.status(404).render("user/login", { error: "User not found" });
        }

        bcrypt.compare(password, user.password, function (err, passwordMatch) {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).render("error", { error: "Internal server error" });
            }

            if (!passwordMatch) {
                return res.status(401).render("user/login", { error: "Invalid password" });
            }

            // Authentication successful
            res.status(200).redirect("/dashboard");
        });
    });
};