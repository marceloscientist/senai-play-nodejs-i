import express from 'express'
import cursos from './rotas/cursos.js'

const app = express()
const port = 8000

app.use(express.json())
app.use(cursos)

app.listen(port, ()=> {
    console.log(`http://localhost:${port}`)
})
