import * as mongoose from 'mongoose'

export interface BlacklistModelInterface extends mongoose.Document {
}

const blacklistSchema = new mongoose.Schema({

    cpf: {
        type: String,
        required: true,
        unique: true,
    }
})

export const BlackListModel = mongoose.model<BlacklistModelInterface>('blacklist', blacklistSchema)
