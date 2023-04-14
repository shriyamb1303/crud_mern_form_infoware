const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

router.get('/getUsers', async (req, res) => {
    try {
        const allUsers = await Users.find({});
        res.json(allUsers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/createUser', async (req, res) => {
    const user = req.body;
    const newUser = new Users(user);
    await newUser.save();

    res.json(user);
})

router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const options = { new: true };
        const updateUser = await Users.findByIdAndUpdate(id, update, options);
        res.status(200).send(updateUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await Users.findByIdAndDelete(id);
        res.status(200).send(deleteUser);
    } catch (e) {
        res.status(400).send(error.message);
    }
})

module.exports = router;