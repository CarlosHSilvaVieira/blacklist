import { Router } from 'express'
import BlacklistController from '../../controllers/blacklist'

const api = Router()

api.get('/:cpf', BlacklistController.checkBlacklist)
api.post('/block', BlacklistController.insertInBlacklist)
api.get('/free/:cpf', BlacklistController.removeFromBlacklist)

export default api
