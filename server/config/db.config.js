module.exports = {
    HOST: "localhost",
    USER: "agent1",
    PASSWORD: "123",
    DB: "melochord",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };