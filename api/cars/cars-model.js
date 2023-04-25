const db = require('../../data/db-config')

const getAll = () => {
  // HOKUS POKUS
  return db('cars')
}

const getById = () => {
  // HOKUS POKUS+
  return db('cars').where('id', id).first()
}

const create = () => {
  // HOKUS POKUS
  const insertedCar = db('cars')
    .insert(cars)
    .then((ids) => {
      return getById(ids[0])
    })
  return insertedCar
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
