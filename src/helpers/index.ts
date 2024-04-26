import crypto from 'crypto';

const SECRET = process.env.SECRET || 'secret'

export const random = () => crypto.randomBytes(32).toString('base64')

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
}