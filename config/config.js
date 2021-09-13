const config = {
    development: {
        PORT: 5000,
        SECRET: "somesecret",
    },
    production: {
        PORT: 80,
    },
    SALT_ROUNDS: 10,
}

module.exports = config[process.env.NODE_ENV.trim()];