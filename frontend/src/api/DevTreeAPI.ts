import { isAxiosError } from "axios";
import api from "../config/axios";
import {  User, Userhandle } from "../types";

const token = localStorage.getItem("AUTH_TOKEN");
// este archivo es el que interactua con nuestro back end 

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

  export async function getUserByHandle(handle: string) {
    try {
      const url = `/${handle}`
      const { data } = await api<Userhandle>(url);
      return data
    } catch (error) {
      if (isAxiosError(error) && error.message) {
        throw new Error(error.response?.data.error);
      }
    }
  }

  export async function searchByHandle(handle: string) {
    try {
    const {data} = await api.post<string>('/search', {handle})// toma el handle que mandamos del search
    return data 
    } catch (error) {
      if (isAxiosError(error) && error.message) {
        throw new Error(error.response?.data.error);
      }
    }
  }