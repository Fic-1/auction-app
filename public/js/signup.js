/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';

export const signup = async (
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
) => {
  const name = `${firstName}  ${lastName}`;
  if (password !== passwordConfirm)
    showAlert('danger', 'Passwords do not match');
  if (!email || !password || !passwordConfirm)
    showAlert('danger', 'Please enter valid information');
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signed in successfuly!');
      window.setTimeout(() => {
        location.assign('/'); //* Poslje dodati rutu /me
      }, 1500);
    }
  } catch (error) {
    showAlert('danger', error.response.data.message);
  }
};
