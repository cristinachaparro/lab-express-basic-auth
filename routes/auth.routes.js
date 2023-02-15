const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");



router.get("/signup", (req, res, next) => {
    res.render("auth/signup-form.hbs")
})

router.post("/signup", async (req, res, next) => {
    const {username, email, password} = req.body

    // All fields are filled
    if(username === "" || email === "" || password === ""){
        res.status(401).render("auth/signup-form.hbs", {
            error: "All fields must be filled"
        })
        return
    }

    // Password requirements are met
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if(passwordRegex.test(password) === false){
        res.render("auth/signup-form.hbs", {
            errorMessage: "Password must be at least 8 characters long, include upper case letters and a special character"
        })
        return
    }

    try {

        // Username does not exist in DB
        const foundUsername = await User.findOne({username: username})
        if(foundUsername !== null){
            res.render("auth/signup-form.hbs", {
                errorMessage: "Username already exists"
            })
            return
        }

        // Email does not exist in DB
        const foundEmail = await User.findOne({email: email})
        if(foundEmail !== null){
            res.render("auth/signup-form.hbs", {
                errorMessage: "Email already exists"
            })
            return
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        await User.create({
            username,
            email,
            password: hashedPassword

        })

        res.redirect("/auth/login")
    } catch (error) {
        next(error)
    }
})

module.exports = router;