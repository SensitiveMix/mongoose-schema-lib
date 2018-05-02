'use strict'

const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const schemas = Object.create(null)
const baseSchemas = [
  'User'
]

fs.readdirSync(path.resolve(__dirname, './schema')).forEach(function (schema) {
  schema = schema.slice(0, -3)
  schemas[_.capitalize(schema)] = require(`./schema/${schema}`)
})

exports.schemas = function (Schema) {
  return getSchemas(Schema, Object.keys(schemas), getSchemas(Schema, baseSchemas))
}

exports.getSchema = function (Schema, name) {
  let fn = schemas[name]
  if (!fn) throw new Error('Schema "' + name + '" not exists!')
  return fn.length === 1 ? fn(Schema) : fn(Schema, getSchemas(Schema, baseSchemas))
}

function getSchemas (Schema, schemaNames, subSchemas) {
  let res = {}
  schemaNames.forEach((schema) => {
    res[schema] = schemas[schema](Schema, subSchemas)
  })
  return res
}

