'use strict'

module.exports = function (Schema) {
  return new Schema({
    _userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    created: {
      type: Date,
      'default': Date.now
    },
    updated: {
      type: Date,
      'default': Date.now
    }
  }, {
    read: 'secondaryPreferred'
  })
}

