import { User } from '../models/users.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../libs/jwt.js';

export const signup = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error('Usuário já está cadastrado');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      watchedMovies: [],
    }); // Change password to hashedPassword
    await newUser.save();
    let token = generateToken(email);
    return { token };
  } catch (error) {
    throw new Error('An unexpected error occurred while creating user');
  }
};

export const login = async (email, password) => {
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
      let token = generateToken(email);
      return token;
    } else {
      throw new Error('Dados inválidos');
    }
  } catch (error) {
    throw new Error('Ocorreu um erro no servidor');
  }
};
