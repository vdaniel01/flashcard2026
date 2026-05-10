const express = require("express")
const Card = require("../models/cardModel")
const {createCard, getCard, getCards, deleteCard, updateCard} = require("../controllers/cardController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)
router.get("/", getCards)

router.get("/:id", getCard)

router.post("/", createCard)

router.delete("/:id", deleteCard)

router.patch("/:id", updateCard)

module.exports = router