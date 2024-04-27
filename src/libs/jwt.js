import jwt from 'jsonwebtoken';

export const generateToken = cpf => {
  return jwt.sign(cpf, process.env.JWT_SECRET);
};
