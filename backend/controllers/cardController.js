const Card = require("../models/cardModel")
const mongoose = require("mongoose")
//get cards
const getCards = async (req, res) => {
    try {
        const cards = await Card.find({}).sort({createdAt: -1})
        res.status(200).json(cards)
    } catch (error) {
        
    }
}

//get a single card
const getCard = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){ //megfelelő id típus került átadásra
        return res.status(404).json({error: "No such a card"})
    }
    const card = await Card.findById(id)
    if(!card){
        return res.status(400).json({error: "No such a card"})
    }

    res.status(200).json(card)
}



//create
const createCard = async (req, res) => {
    const {question, answer} = req.body

    let emptyFields = []

    if(!question){
        emptyFields.push("question")
    }

    if(!answer){
        emptyFields.push("answer")
    }

    if(emptyFields.length>0){
        return res.status(400).json({error: "Please fill in all fields!", emptyFields})
    }


    try {
        const card = await Card.create({question, answer})
        res.status(200).json(card)        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
//delete
const deleteCard = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such a card"})
    }
    const card = await Card.findOneAndDelete({_id: id})
    if(!card){
        res.status(404).json({error: "No such a card"})
    }

    res.status(200).json(card)
}

//update
const updateCard = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such a card"})
    }

    const card = await Card.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})
    if(!card){
        res.status(404).json({error: "No such a card"})
    }
    res.status(200).json(card)
}

module.exports = {createCard, getCards, getCard, deleteCard, updateCard}
