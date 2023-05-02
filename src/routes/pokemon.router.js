import { Router } from 'express'
import pokeModel from '../models/pokemon.model.js'
const router = Router()

router.get('/', async (req, res) => {
    // res.send('Listando pokemons...')
    const pokemons = await pokeModel.find().lean().exec()
    // console.log(pokemons)
    res.render('list', { pokemons })
})

// /pokemon/create
router.get('/create', (req, res) => {
    res.render('create', {})
})

router.get('/update/:name', async (req, res) => {
    const name = req.params.name
    const pokemon = await pokeModel.findOne({ name }).lean().exec()
    res.render('update', { pokemon })
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

router.put('/:name', async (req, res) => {
    const name = req.params.name
    console.log(name)
    const pokemonNewData = req.body
    console.log(pokemonNewData)
    try {
        await pokeModel.updateOne({ name }, { ...pokemonNewData })
    } catch(err) {
        console.log('error.....')
        res.send({err})
    }
})

router.delete('/:name', async (req, res) => {
    const name = req.params.name
    try {
        await pokeModel.deleteOne({ name })
        res.send(`Pokemon ${name} borrado exitosamente!`)
    } catch (err) {
        res.send({err})
    }
})

export default router