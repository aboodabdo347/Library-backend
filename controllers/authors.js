const Author = require("../models/Author");

const allAuthors = async (req, res) => {
    try {
        //get all authors
    } catch (error) {
        res.json({error: error.message})
    }
}

module.exports = {
    allAuthors
}