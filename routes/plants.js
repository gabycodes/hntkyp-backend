const express = require('express')
const router = express.Router()
const Plant = require('../models/plant')

async function getPlant(req, res, next) {
  try {
    plant = await Plant.findById(req.params.id)
    if (plant == null) {
      return res.status(404).json({ message: 'Cant find plant'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.plant = plant
  next()
}

// Get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find()
    res.json(plants)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one plant
router.get('/:id', getPlant, (req, res) => {
  res.json(res.plant)
})

// Create one plant
router.post('/', async (req, res) => {
  console.log('here')
  const plant = new Plant({
    id: req.body.id,
    name: req.body.name,
    latinName: req.body.latinName,
    imgUrl: req.body.imgUrl,
    description: req.body.description,
  })

  console.log('here here!')

  try {
    const newPlant = await plant.save()
    res.status(201).json(newPlant)
  } catch (err) {
    console.log('error', err)
    res.status(400).json({ message: err.message })
  }
})

// Update one plant
router.patch('/:id', getPlant, async (req, res) => {
  if (req.body.name != null) {
    res.plant.name = req.body.name
  }

  // if (req.body.createdAt != null) {
  //   res.body.createdAt = req.body.createdAt
  // }
  try {
    const updatedPlant = await res.plant.save()
    res.json(updatedPlant)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

// Delete one plant
router.delete('/:id', getPlant, async (req, res) => {
  try {
    await res.plant.remove()
    res.json({ message: 'Deleted that plant' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router