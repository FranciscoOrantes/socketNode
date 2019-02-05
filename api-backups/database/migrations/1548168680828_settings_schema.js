'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SettingsSchema extends Schema {
  up () {
    this.create('settings', (table) => {
      table.string('name')
      table.string('nameBd')
      table.string('userBd')
      table.string('passwordBd')
      table.string('port')
      table.string('ip')
      table.string('descripcionBd')
      table.date('dateb')
      table.time('timeBd')
      table.boolean('status').defaultTo(false)
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('settings')
  }
}

module.exports = SettingsSchema
