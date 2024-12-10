const fs = require('fs')
const path = require('path')
const winston = require('winston')


const logDir = 'logs'
if (['local', 'development'].includes(process.env.NODE_ENV) && !fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}


const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`
    })
)

// Set up transports based on environment
const transports = []

if (['local', 'development'].includes(process.env.NODE_ENV)) {
    // For local and development environments
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            level: 'debug', // Console output up to debug level
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'app-debug.log'),
            level: 'debug', // File output up to debug level
            format: logFormat,
        })
    )
} else if (process.env.NODE_ENV === 'production') {
    // For production environment
    transports.push(
        new winston.transports.Console({
            level: 'warn', // Console output for warn and above
            format: winston.format.combine(
                winston.format.json(),
                winston.format.timestamp()
            ),
        })
    )
}

// Create the logger
const logger = winston.createLogger({
    level: ['local', 'development'].includes(process.env.NODE_ENV) ? 'debug' : 'warn',
    format: logFormat,
    transports,
    exceptionHandlers: [
        new winston.transports.File({ filename: path.join(logDir, 'exceptions.log') })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: path.join(logDir, 'rejections.log') })
    ],
    exitOnError: false, // Do not exit on handled exceptions
})


module.exports = {logger}
