import { ObjectId } from 'mongodb';
import { getDB } from '../mongodb.js';

let users = [];

export const getUsers = (req, res) => {
    users = []
    getDB().collection('users')
    .find()
    .forEach(user => users.push(user))
    .then(() => {
        res.status(200).json(users)
    })
    .catch((err) => {
        console.log(err)
        res.status(500)
    });
}

export const createUser = (req, res) => {
    const user = req.body;
    getDB().collection('users')
    .insertOne(user)
    .then((result) => {
        res.status(201).json(result)
    })
    .catch((err) => {
        console.log(err)
        res.status(500)
    })
}

export const getUser = (req, res) => {
    const {id} = req.params;
    //Check if the ID passed is valid
    if(ObjectId.isValid(id)) {
        getDB().collection('users')
        .findOne({_id: new ObjectId(id)})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) =>{
            console.log(err)
            res.status(500)
        })
    } else {
        res.status(500)
    }
}

export const deleteUser = (req, res) => {
    const {id} = req.params;
    //Check if the ID passed is valid
    if(ObjectId.isValid(id)) {
        getDB().collection('users')
        .deleteOne({_id: new ObjectId(id)})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err)
            res.status(500)
        })
    } else {
        res.status(500)
    }
}

export const updateUser = (req, res) => {
    const {id} = req.params;
    const updatedData = req.body;
    //Check if the ID passed is valid
    if(ObjectId.isValid(id)) {
        getDB().collection('users')
        .updateOne({_id: new ObjectId(id)}, {$set: updatedData})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err)
            res.status(500)
        })
    } else {
        res.status(500)
    }   
}