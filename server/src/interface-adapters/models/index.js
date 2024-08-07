const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialectOptions: {
    useUTC: true, // for reading from database
  },
  timezone: "+00:00", // for writing to database
});

const User = require("./UserModel")(sequelize, Model, DataTypes);
const Account = require("./AccountModel")(sequelize, Model, DataTypes);
const Note = require("./NoteModel")(sequelize, Model, DataTypes);
const Contact = require("./ContactModel")(sequelize, Model, DataTypes);
const Bank = require("./BankModel")(sequelize, Model, DataTypes);

User.hasMany(Account, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Account.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Note, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Note.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Contact, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Contact.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Bank, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Bank.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  sequelize,
  Model,
  User,
  Account,
  Note,
  Contact,
  Bank,
};
