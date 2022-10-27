import express from 'express'
import dados from '../db/cursos.js'

const router = express.Router()

router.get('/cursos', (req, res) => {
    res.send(dados)
})

router.post('/cursos', (req, res) => {
    const { id, curso } = req.body;
    
    // verificação de existencia deste curso 
    const existeCurso = dados.some(dado => {
        return dado.id == id;
    })

    if(existeCurso) {
        return res.json({"erro": "Curso existente amigo"})
    }

    const novoCurso = {
        id: id,
        curso: curso
    }

    dados.push(novoCurso)

    res.send(dados)
})

router.put('/cursos/:id', (req, res) => {
    const { id }  = req.params

    const curso = dados.filter((curso) => {
        return curso.id == id   
    })    

    console.log(curso)
    res.json(curso)
})

router.delete('/cursos/:id', (req, res) => {
    res.send(["JavaScript Básico", "JS Intermediário", "NodeJS"])
})


export default router;