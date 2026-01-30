const { Sequelize } = require('sequelize')
import env from './.env'

// Database
const sequelize = new Sequelize(
  {
    dialect: 'postgres',
    user: env.DB_USER,
    password: env.DB_PASSWORD ,
    host: env.DB_URL ,
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      createdAt: 'added',
      updatedAt: 'updated',
    }
  },
)

// Database initialization
async function initDatabase() {
  try {
    await sequelize.authenticate()
    console.log('✓ Database connection established')

    await sequelize.sync()
    console.log('✓ Models synchronized')

    // Import and execute seeder
    const initializeData = require('./seeders/init-data')
    await initializeData()
  } catch (error) {
    console.error('Error during database initialization:', error)
  }
}

initDatabase()

module.exports = sequelize
