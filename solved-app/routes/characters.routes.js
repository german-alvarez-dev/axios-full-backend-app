const express = require('express')
const router = express.Router()

const CharactersService = require('./../service/')
const charactersApiHandler = new CharactersService()

// Characters list
router.get('/list', (req, res) => {

    charactersApiHandler
        .getAllCharacters()
        .then(response => res.render('pages/characters-list', { characters: response.data }))
        .catch(error => console.log(error))
})

// New character form render
router.get('/create', (req, res) => res.render('pages/new-character-form'))

// New character form submit
router.post('/create', (req, res) => {

    const characterInfo = req.body

    charactersApiHandler
        .createCharacter(characterInfo)
        .then(() => res.redirect(`/characters/list`))
        .catch(error => console.log(error))
})

// Character edit form render and auto fill
router.get('/edit/:id', (req, res) => {

    const characterId = req.params.id

    charactersApiHandler
        .getOneCharacter(characterId)
        .then(response => res.render('pages/edit-character-form', { character: response.data }))
        .catch(error => console.log(error))
})

// Character edit form submit
router.post('/edit/:id', (req, res) => {

    const characterId = req.params.id
    const characterInfo = req.body

    charactersApiHandler
        .editCharacter(characterId, characterInfo)
        .then(() => res.redirect(`/characters/list`))
        .catch(error => console.log(error))
})

router.get('/delete/:id', (req, res) => {

    const characterId = req.params.id

    charactersApiHandler
        .deleteCharacter(characterId)
        .then(() => res.redirect(`/characters/list`))
        .catch(error => console.log(error))
})

module.exports = router
