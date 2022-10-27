import express from 'express'

const router = express.Router()

const cursos = [
    {
        id: 1,
        curso: "JS I"
    },
    {
        id: 2,
        curso: "JS II"
    },
    {
        id: 3,
        curso: "JS III"
    }
]

router.get('/cursos', (req, res) => {
    const {query} = req
    console.log(query)
    res.send(["JavaScript Básico", "JS Intermediário", "NodeJS"])
})

router.post('/cursos', (req, res) => {
    const { body } = req; 
    console.log(body)
    res.send(["JavaScript Básico", "JS Intermediário", "NodeJS", "ReactJS"])
})

router.put('/cursos/:id', (req, res) => {
    const { id }  = req.params

    const curso = cursos.filter((curso) => {
        return curso.id == id   
    })    

    console.log(curso)
    res.json(curso)
})

router.delete('/cursos/:id', (req, res) => {
    res.send(["JavaScript Básico", "JS Intermediário", "NodeJS"])
})


export default router;