import { isAxiosError } from "axios";
import api from "../config/axios";
import {  User } from "../types";

const token = localStorage.getItem("AUTH_TOKEN");

export async function getUser() {

  try {
    const { data } = await api<User>("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function updateProfile(formData: User) {
    try {
      const { data } = await api.patch<string>('/user', formData);
      return data
    } catch (error) {
      if (isAxiosError(error) && error.message) {
        throw new Error(error.response?.data.error);
      }
    }
  }

  // export async function uploadImage(file: File) {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   try {
  //     const { data: {image} }: {data: {image: string}} = await api.post('/user/image', formData)
  //     return image // aqui hacemos el dato string por que si no falla al hacer el Render

  //   } catch (error) {
  //     if (isAxiosError(error) && error.message) {
  //       throw new Error(error.response?.data.error);
  //     }
  //   }
  // }

  export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const { data } = await api.post<string>('/user/image', formData)
      return data.toString(); // aqui hacemos el dato string por que si no falla al hacer el Render

    } catch (error) {
      if (isAxiosError(error) && error.message) {
        throw new Error(error.response?.data.error);
      }
    }
  }