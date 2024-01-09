/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';
// import axios from 'axios';
export const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgot-password',
      data: {
        email,
      },
    });
    if (res.data.status === 'success') {
      showAlert(
        'success',
        'Password reset token sent! Please check your email.',
      );
      window.setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }
  } catch (error) {
    showAlert('danger', error.response.data.message);
  }
};

export const resetPassword = async (password, passwordConfirm, token) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/reset-password/${token}`,
      data: {
        password,
        passwordConfirm,
      },
    });
    console.log(res.url);
    if (res.data.status === 'success') {
      showAlert('success', 'Password changed successfuly!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('danger', error.response.data.message);
  }
};
