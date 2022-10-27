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
    const { curso } = req.body;

    const cursoIndex = dados.findIndex((curso) => {
        return curso.id == id   
    })  

    if(cursoIndex < 0) {
        return res.json({"erro": "Curso não existente, blz?"})
    }


    const cursoAtualizado = {
        id: parseInt(id),
        curso: curso
    }
    
    dados[cursoIndex] = cursoAtualizado

    res.json(dados)
})

router.delete('/cursos/:id', (req, res) => {
    res.send(["JavaScript Básico", "JS Intermediário", "NodeJS"])
})


export default router;