const SinglyLinkedList = require('./linkedList')
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json('application/json'))
app.use(cors())

var list = new SinglyLinkedList()

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.get ('/api/rainbow', asyncMiddleware(async (req, res, next ) => {
  const rainbow = await list.getAll()
  return res.status(200).json(rainbow)
}))

app.post('/api/add', asyncMiddleware(async (req, res, next ) => {
  const index = req.body.index
  const id = req.body.id
  const color = req.body.color
  if (!list.get(index)) {
    await list.push({id, color})
    const colors = list.getAll()
    return res.status(200).json({
      message: `Successfully added rainbow color ${color}`,
      colors
    })
  } else {
    return res.status(400).json({
      message: 'Bad Request'
    })
  }
}))

app.put('/api/edit/:index', asyncMiddleware(async (req, res, next ) => {
  const index = +req.params.index
  const id = req.body.id
  const color = req.body.color
  if (list.get(index)) {
    await list.set(index, {id, color})
    const colors = list.getAll()
    return res.status(200).json({
      message: `Successfully edited rainbow color id ${id} to ${color}`,
      colors
    })
  } else {
    return res.status(400).json({
      message: 'Bad Request'
    })
  }
}))

app.delete('/api/delete/:index', asyncMiddleware(async (req, res, next ) => {
  const index = +req.params.index
  if (list.get(index)) {
    await list.remove(index)
    const newRainbow = await list.getAll()
    return res.status(200).json({
      message: `Successfully deleted rainbow color id ${index}`,
      newRainbow
    })
  } else {
    return res.status(400).json({
      message: 'Bad Request'
    })
  }
}))

app.use(function(err, req, res, next) {
  console.error(err)
  res.status(500).json({message: 'an error occurred'})
})

app.listen(4000, () => {
  console.log('Server is listen at port 4000')
})

