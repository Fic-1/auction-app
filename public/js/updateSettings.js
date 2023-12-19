/* eslint-disable */
// Update data function

import axios from 'axios';
import { showAlert } from './alerts';

//* Type: 'password' || 'data'
export const updateSettings = async (data, type) => {
  console.log(data);
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    console.log(res);
    if (res.data.status === 'Success') {
      showAlert('success', `${type.toUpperCase()} changed successfuly!`);
      setTimeout(() => window.location.reload(), 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateCover = async (data, id) => {
  console.log(data);
  try {
    const url = `/my-products/${id}/edit/uploadCover`;
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    console.log(res);
    if (res.data.status === 'Success') {
      showAlert('success', `COVER IMAGE changed successfuly!`);
      setTimeout(() => window.location.reload(), 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateProductData = async (data, id) => {
  console.log(data);
  try {
    const url = `/my-products/${id}/edit`;
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    console.log(res);
    if (res.data.status === 'Success') {
      showAlert('success', `PRODUCT DATA changed successfuly!`);
      setTimeout(() => window.location.reload(), 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const createNewProduct = async (data, elementArray) => {
  console.log(data);
  try {
    console.log('before request');
    const res = await axios({
      method: 'POST',
      url: '/api/v1/products/create-my-product',
      data,
    });
    console.log(res);
    if (res.data.status === 'Success') {
      showAlert('success', `PRODUCT created successfuly!`);
      elementArray.array.forEach((el) => {
        el.classList.toggle('hidden');
      });
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
