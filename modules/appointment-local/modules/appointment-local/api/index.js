import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL ="https://730b-39-53-79-219.ngrok.io"

export const createAppointment = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/modules/appointment-local/appointment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    throw new Error('NETWORK_ERROR').message
  }
};

export const getAppointment = async () => {
    try {
      const response = await fetch(`${BASE_URL}/modules/appointment-local/appointment/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response
    } catch (error) {
      throw new Error('NETWORK_ERROR').message
    }
  };

  export const deleteAppointment = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/modules/appointment-local/appointment/${data}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response
    } catch (error) {
      throw new Error('NETWORK_ERROR').message
    }
  };