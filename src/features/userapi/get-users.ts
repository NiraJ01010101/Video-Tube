import { api } from "lib/api-client";
import Cookies from 'js-cookie';

const authToken = Cookies.get('accessToken') || "";

export const loginUser = async (data: any) => {
  const response = await api.post('/users/login', data);
  return response
}

export const logoutUser = async () => {
  const response = await api.post('/users/logout', {}, {
    headers: {
      "Authorization": authToken,
    }
  });
  return response
}

export const registerUser = async (data: any) => {
  const response = await api.post('/users/register', data);
  return response
}

export const forgotPassword = async (data: any) => {
  const response = await api.post('/users/forget-password', data);
  return response
}

export const resetPassword = async ({ data, tokenId }: any) => {
  const response = await api.post(`/users/reset-password/${tokenId}`, data);
  return response
}

export const getUser = async () => {
  const response = await api.get('/users/current-user', {
    headers: {
      "Authorization": authToken,
    }
  });
  return response
}

export const getUserChannel = async (username: any) => {
  const response = await api.get(`/users/channel/${username}`, {
    headers: {
      "Authorization": authToken,
    }
  });
  return response
}