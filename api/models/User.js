const bcrypt = require('bcryptjs')
const { roles } = require('/configs/app.config')

module.exports = (sequelize, DataTypes) => sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: sequelize.fn('uuid_generate_v4')
  },
  username: {
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
  },
  role: {
    type: DataTypes.ENUM,
    values: roles,
    allowNull: false,
    defaultValue: roles[ 0 ]
  },
  email: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  paranoid: true,
  underscored: true,
  instanceMethods: {
    comparePassword (password) {
      const hash = this.password

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, success) {
          if (err) {
            reject(err)
          } else {
            resolve(success)
          }
        })
      })
    }
  },
  hooks: {
    beforeCreate (user, options) {
      return hashPassword(user.password).then(hash => {
        user.password = hash
      })
    },
    beforeUpdate (user, options) {
      if (user.changed('password')) {
        return hashPassword(user.password).then(hash => {
          user.password = hash
        })
      }
    }
  }
})

function hashPassword (password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return reject(err)
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) return reject(err)
        resolve(hash)
      })
    })
  })
}
