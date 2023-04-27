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
      req.existCar = existCar
      next()
    }
  } catch (error) {
    next(error)
  }
}

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS
  try {
    const fields = ['vin', 'make', 'model', 'mileage']
    let missedFields = []
    for (let i = 0; i < fields.length; i++) {
      const item = fields[i]
      if (!req.body[item]) {
        missedFields.push(item)
      }
    }
    if (missedFields.length) {
      res.status(400).json({ message: `${missedFields.toString()} is missing` })
    } else {
      next()
    }

    /*for (let x = 0; x < missedFields.length; x++) {
      switch (missedFields[x]) {
        case 'vin':
          res.status(400).json({
            message: `vin is missing`,
          })
          break
        case 'make':
          res.status(400).json({
            message: `make is missing`,
          })
          break
        case 'model':
          res.status(400).json({
            message: `model is missing`,
          })
          break
        case 'mileage':
          res.status(400).json({
            message: `mileage is missing`,
          })
          break
        default:
          next()
          break
      }
    }*/
  } catch (error) {
    next(error)
  }
}

const checkVinNumberValid = (req, res, next) => {
  // HOKUS POKUS
  try {
    let isVinValid = vinValidator.validate(req.body.vin)
    if (!isVinValid) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
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
      res.status(400).json({ message: `vin ${req.body.vin} already exists` })
    } else {
      next()
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
