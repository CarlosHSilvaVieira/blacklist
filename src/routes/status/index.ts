import { Router, NextFunction, Request, Response } from 'express'
import BlacklistController from '../../controllers/blacklist'
import ServerVariables from '../../utils/serverVariables'

const api = Router()

api.get('/', async (req: Request, res: Response, next: NextFunction) => {

    const count = await BlacklistController.countBlacklist()

    // 1 day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    let hours = 0

    try {
        const diff = Math.abs(new Date().getTime() - ServerVariables.started.getTime())
        hours = Math.ceil(diff / oneDay)
    } catch (error) {
        hours = -1
    }

    res.status(200).json({
        blocked: count,
        queries: ServerVariables.queries,
        uptime: hours
    })
})

export default api
