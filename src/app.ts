import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import * as cors from 'cors'

import routes from './routes'

class App {

    public app: express.Application
    public mongoURL: string = 'mongodb://localhost/CPFChecker'

    constructor() {

        this.app = express()
        this.config()
        this.mongoConfig()
    }

    private mongoConfig() {

        mongoose.connect(this.mongoURL, {
            useNewUrlParser: true,
        })
    }

    private config() {

        //Cors
        this.app.use(cors())

        // Accepting Application/json
        this.app.use(bodyParser.json())

        // Accepting application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }))

        this.app.use('/', routes)
    }
}

export default new App().app
