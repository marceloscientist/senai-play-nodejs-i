import express from 'express'
import dados from '../db/cursos.js'

const router = express.Router()

function verificaCursoExiste(req, res, next) {
    const { id }  = req.params

    const cursoIndex = dados.findIndex((curso) => {
        return curso.id == id   
    })  

    if(cursoIndex < 0) {
        return res.json({"erro": "Curso não existente, blz?"})
    }

    req.id = id
    req.cursoIndex = cursoIndex

    return next()
}

router.get('/cursos/:id', verificaCursoExiste, (req, res) => {
    const { cursoIndex } = req
    if(dados.length < 0) {
        res.status(404).json({"erro": "Dados não encontrados"})
    } 

    res.status(200).send(dados[cursoIndex])
})

router.get('/cursos', (req, res) => {
    if(dados.length < 0) {
        res.status(404).json({"erro": "Dados não encontrados"})
    } 
    res.status(200).send(dados)
})

router.post('/cursos', (req, res) => {
    const { id, curso } = req.body;
    
    // verificação de existencia deste curso 
    const existeCurso = dados.some(dado => {
        return dado.id == id;
    })

    if(existeCurso) {
        return res.status(400).json({"erro": "Curso existente amigo"})
    }

    const novoCurso = {
        id: id,
        curso: curso
    }

    dados.push(novoCurso)

    res.status(201).json(dados)
})


router.put('/cursos/:id', verificaCursoExiste, (req, res) => {
    const { id, cursoIndex } = req

    const { curso } = req.body;

    const cursoAtualizado = {
        id: parseInt(id),
        curso: curso
    }
    
    dados[cursoIndex] = cursoAtualizado

    res.json(dados)
})

router.delete('/cursos/:id', verificaCursoExiste, (req, res) => {
    const { cursoIndex } = req

    dados.splice(cursoIndex, 1)
    res.send(dados)
})


export default router;