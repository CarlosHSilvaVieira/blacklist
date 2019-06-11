import { Router, NextFunction, Request, Response } from 'express'
import blacklistRoutes from './blacklist'
import statusRoutes from './status'

const api = Router()

api.get('/', (req: Request, res: Response, next: NextFunction) => {

    res.status(200).send('API funcionando corretamente')
})

api.use('/blacklist', blacklistRoutes)
api.use('/status', statusRoutes)

export default api
