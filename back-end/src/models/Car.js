
import prisma from '../database/client.js'
import Car from '../models/Car.js'
import { ZodError } from 'zod'

const controller = {}


controller.create = async function (req, res) {
  try {
    
    if (req.body.selling_date) {
      req.body.selling_date = new Date(req.body.selling_date)
    }

  
    Car.parse(req.body)

    await prisma.car.create({ data: req.body })
    return res.status(201).end()
  }
  catch (error) {
    console.error(error)

    if (error instanceof ZodError) {
      return res.status(422).json(error.issues)
    }

    return res.status(500).end()
  }
}


controller.retrieveAll = async function (req, res) {
  try {
    const result = await prisma.car.findMany({
      orderBy: [{ brand: 'asc' }]
    })

    res.send(result)
  }
  catch (error) {
    console.error(error)
    res.status(500).end()
  }
}


controller.retrieveOne = async function (req, res) {
  try {
    const result = await prisma.car.findUnique({
      where: { id: Number(req.params.id) }
    })

    if (result) res.send(result)
    else res.status(404).end()
  }
  catch (error) {
    console.error(error)
    res.status(500).end()
  }
}


controller.update = async function (req, res) {
  try {
    if (req.body.selling_date) {
      req.body.selling_date = new Date(req.body.selling_date)
    }

    Car.parse(req.body)

    await prisma.car.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })

    res.status(204).end()
  }
  catch (error) {
    console.error(error)

    if (error.code === 'P2025') {
      return res.status(404).end()
    }

    if (error instanceof ZodError) {
      return res.status(422).json(error.issues)
    }

    res.status(500).end()
  }
}


controller.delete = async function (req, res) {
  try {
    await prisma.car.delete({
      where: { id: Number(req.params.id) }
    })

    res.status(204).end()
  }
  catch (error) {
    console.error(error)

    if (error.code === 'P2025') {
      return res.status(404).end()
    }

    res.status(500).end()
  }
}

export default controller
