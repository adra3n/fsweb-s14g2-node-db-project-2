const carsModel = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const existCar = await carsModel.getById(req.params.id)
    if (!existCar) {
      res
        .status(404)
        .json({ message: `${req.params.id} kimliğine sahip araba bulunamadı` })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS
  const fields = ['vin', 'make', 'model', 'mileage']
  let missedFields = []
  fields.forEach((i) => {
    const item = fields[i]
    if (!req.body.item) {
      missedFields.push(item)
    }
  })
  if (missedFields.length > 0) {
    res.status(400).json({ message: 'Eksik Alan' })
  }
}

const checkVinNumberValid = (req, res, next) => {
  // HOKUS POKUS
  try {
    let isVinValid = vinValidator.validate(req.body.vin)
    if (!isVinValid) {
      res.status(400).json({ message: `vin ${req.body.vin} geçersizdir.` })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const isRecordExist = await carsModel.getByVin(req.body.vin)
    if (isRecordExist) {
      res.status(400).json({ message: `vin ${req.body.vin} zaten var.` })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
}
