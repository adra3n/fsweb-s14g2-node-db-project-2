const db = require('../../data/db-config')

const getAll = () => {
  // HOKUS POKUS
  return db('cars')
}

const getById = (id) => {
  // HOKUS POKUS+
  return db('cars').where('id', id).first()
}

const create = (car) => {
  const createdCar = db('cars')
    .insert(car)
    .then((ids) => {
      return getById(ids[0])
    })
  return createdCar
}

const getByVin = (vin) => {
  return db('cars').where('vin', vin).first()
}

module.exports = {
  getAll,
  create,
  getById,
  getByVin,
}
