import { Router } from 'express'
import pokeModel from '../models/pokemon.model.js'
const router = Router()

router.get('/', async (req, res) => {
    // res.send('Listando pokemons...')
    const pokemons = await pokeModel.find().lean().exec()
    console.log(pokemons)
    res.render('list', { pokemons })
})

// /pokemon/create
router.get('/create', (req, res) => {
    res.render('create', {})
})

router.get('/:name', async (req, res) => {
    const name = req.params.name
    // res.send('Listando pokemon ' + name)
    // res.send(`Listando pokemon ${name}`)
    const pokemon = await pokeModel.findOne({ name }).lean().exec()
    res.render('one', { pokemon })
})

router.post('/', async (req, res) => {
    const pokemonNew = req.body
    const pokemonGenerated = new pokeModel(pokemonNew)
    await pokemonGenerated.save()
    // res.redirect('/pokemon/' + pokemonGenerated.name)
    res.redirect(`/pokemon/${pokemonGenerated.name}`)
})

router.delete('/:name', (req, res) => {
    const name = req.params.name
    res.send(`Borrando pokemon ${name}`)
})

export default router