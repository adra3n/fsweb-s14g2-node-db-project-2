// HOKUS POKUS
const router = require('express').Router()
const carsModel = require('./cars-model')
const middleware = require('./cars-middleware')

router.get('/', async (req, res, next) => {
  try {
    const allCars = await carsModel.getAll()
    res.json(allCars)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', middleware.checkCarId, (req, res, next) => {
  try {
    res.json(req.existCar)
  } catch (error) {
    next(error)
  }
})

router.post(
  '/',
  middleware.checkCarPayload,
  middleware.checkVinNumberValid,
  middleware.checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const createdCar = await carsModel.create(req.body)
      res.json(createdCar)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
