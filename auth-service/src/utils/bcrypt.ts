import * as bcrypt from 'bcrypt';

export function hashPassword(rawPassword: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePasswords(rawPassword: string, hashPassword: string) {
    return bcrypt.compareSync(rawPassword, hashPassword);
}