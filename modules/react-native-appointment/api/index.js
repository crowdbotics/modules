
const BASE_URL = "https://www.googleapis.com/calendar/v3/calendars";

export const createAppointment = async (accessToken, data) => {
  try {
    const response = await fetch(`${BASE_URL}/primary/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const getAppointmentByDate = async (accessToken, maxResults = 100, datetime) => {
  try {
    const response = await fetch(`${BASE_URL}/primary/events?showDeleted=false&orderBy=startTime&singleEvents=true&maxResults=${maxResults}&timeMin=${datetime}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const getAllAppointments = async (accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/primary/events?showDeleted=false&orderBy=startTime&singleEvents=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const deleteAppointment = async (accessToken, id) => {
  try {
    const response = await fetch(`${BASE_URL}/primary/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};
