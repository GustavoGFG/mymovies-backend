import * as authService from '../services/auth.js';

export const signup = async (req, res) => {
  try {
    const response = await authService.signup(req.body);
    if (response.token) {
      res.status(201).json({ success: true, token: response.token });
    } else {
      res.status(500).json({ success: false, error: 'Failed to create user' });
    }
  } catch (error) {
    console.error('Error fetching movies: ', error);
    return res
      .status(500)
      .json({ success: false, error: 'Failed to create user' });
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
    const response = await authService.login(email, password);
    if (response) {
      console.log(response);
      res.status(200).json({ success: true, token: response });
    } else {
      res.status(500).json({ success: false, error: 'Failed to login' });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
