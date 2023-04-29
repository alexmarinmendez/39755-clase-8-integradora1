import express from 'express'
import handlebars from 'express-handlebars'
import pokeRouter from './routes/pokemon.router.js'
// import trainnerRouter from './routes/trainner.router.js'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// /start Confifuración del motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
// /end Confifuración del motor de plantillas

// /start Configuracion de carpeta pública (archivos estáticos)
app.use(express.static('./src/public'))
// /end Configuracion de carpeta pública (archivos estáticos)

app.get('/', (req, res) => res.send('Server OK!'))
app.use('/pokemon', pokeRouter)
// app.use('/trainner', trainnerRouter)

mongoose.set('strictQuery', false)
try {
    await mongoose.connect('mongodb+srv://coder:coder@backend39755.3gncg2t.mongodb.net/pokedex')
    app.listen(8080, () => console.log('Server Up'))
  } catch (error) {
    console.log('No se pude conectar con la BD')
  }

