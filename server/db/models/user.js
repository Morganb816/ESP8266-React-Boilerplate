const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: Sequelize.STRING,
        get() {
            return () => this.getDataValue('password')
        }
    },
    salt: {
        type: Sequelize.STRING,
        get() {
            return () => this.getDataValue('salt')
        }
    }
});

User.prototype.correctPassword = function(passwordAttempt) {
    return User.encryptPassword(passwordAttempt, this.salt()) === this.password()
};
User.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64')
};
User.encryptPassword = (original, salt) => {
    return crypto.createHash('RSA-SHA256').update(original).update(salt).digest('hex')
};
const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.email = user.email.toLowerCase();
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password(), user.salt())
    }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;