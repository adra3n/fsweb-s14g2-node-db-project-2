/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // SİHRİNİZİ GÖSTERİN
  return knex.schema.createTable('cars', (table) => {
    table.increments() //id isimli kolon üretir , her kayıtta 1-1 arttırır.
    table.string('vin').notNullable().unique()
    table.string('make').notNullable()
    table.string('model').notNullable()
    table.integer('mileage').notNullable()
    table.string('title')
    table.string('transmission')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // SİHRİNİZİ GÖSTERİN

  return knex.schema.dropTableIfExists('cars')
}
