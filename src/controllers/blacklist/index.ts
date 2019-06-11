import { BlackListModel } from '../../models/blacklist'
import { NextFunction, Request, Response } from 'express'
import ServerVariables from '../../utils/serverVariables'

class BlacklistController {

    constructor() {
    }

    checkBlacklist(req: Request, res: Response, next: NextFunction) {

        const requestCpf = req.params.cpf

        if (!requestCpf) { return res.status(400).json({ status: '', error: 'CPF não fornecido' }) }

        BlackListModel.findOne({ cpf: requestCpf }, (error, targetCpf) => {

            ServerVariables.queries++

            if (!error) {

                if (targetCpf) {

                    return res.status(200).json({ status: 'BLOCK', error: null })
                }
                else {
                    return res.status(200).json({ status: 'FREE', error: null })
                }
            }
            else {
                return res.status(200).json({ status: '', error: error })
            }
        })
    }

    insertInBlacklist(req: Request, res: Response, next: NextFunction) {

        const target = req.body

        if (!target || !target.cpf || target.cpf === '') { return res.status(400).json({ blocked: false, error: 'CPF não fornecido' }) }

        const blacklistCpf = new BlackListModel(target)
        blacklistCpf.save((error, saved) => {

            if (error) {
                return res.status(200).json({ blocked: false, error: error })
            }
            else {
                return res.status(200).json({ blocked: true, error: null })
            }
        })
    }

    removeFromBlacklist(req: Request, res: Response, next: NextFunction) {

        const requestCpf = req.params.cpf

        if (!requestCpf) { return res.status(400).json({ free: false, error: 'CPF não fornecido' }) }

        BlackListModel.findOneAndRemove({ cpf: requestCpf }, (error, targetCpf) => {

            if (error) {
                return res.status(200).json({ free: false, error: error })
            }
            else {
                return res.status(200).json({ free: true, error: null })
            }
        })
    }

    async countBlacklist() {

        const count_async = BlackListModel.countDocuments({}).lean().exec()
        const count = await count_async

        return count
    }
}

export default new BlacklistController()
