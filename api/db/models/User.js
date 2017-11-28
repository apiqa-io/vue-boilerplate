const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  timestamps: true,
  paranoid: true,
  underscored: true,
  instanceMethods: {
    comparePassword (password) {
      const hash = this.password

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, success) => {
          if (err) {
            reject(err)
          } else {
            resolve({
              success,
              id: this.id
            })
          }
        })
      })
    },
    toJSON () {
      let values = Object.assign({}, this.get())
      delete values.password
      return values
    }
  },
  hooks: {
    beforeCreate (user, options) {
      return hashPassword(user.password)
        .then(hash => {
          user.password = hash
        })
    },
    beforeUpdate (user, options) {
      if (user.changed('password')) {
        return hashPassword(user.password)
          .then(hash => {
            user.password = hash
          })
      }
    }
  }
})

function hashPassword (password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err)
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err)
        resolve(hash)
      })
    })
  })
}
