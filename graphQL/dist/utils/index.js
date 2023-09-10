import jwt from 'jsonwebtoken';
const SECRET_KEY = 'mySecret';
export const generateJWTToken = (userId) => {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
    return token;
};
export const verifyJWTToken = (token) => {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
};
