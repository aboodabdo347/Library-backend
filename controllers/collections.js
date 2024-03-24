const Collection = require("../models/collection");

const allCollections = async (req, res) => {
    try {
        let allRes = await Collection.find();
        res.json(allRes);
    } catch (error) {
        res.json({error: error.message})
    }
}

const userCollections = async (req, res) => {
    try {
        let userCollRes = await Collection.find({_id: req.params.id})
        res.json(userCollRes)
    } catch (error) {
        res.json({error: error.message})
    }
}

const createCollection = async (req, res) => {
    try {
        let collCreateRes = await Collection.create(req.body)
        res.json(collCreateRes)
    } catch (error) {
        res.json({error: error.message})
    }
}

module.exports = {
    allCollections,
    userCollections,
    createCollection
}