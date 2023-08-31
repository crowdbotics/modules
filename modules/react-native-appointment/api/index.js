const baseUrlGoogle = "https://www.googleapis.com/calendar/v3/calendars";

export const getAppointmentByDate = async (accessToken, maxResults = 100, datetime) => {
  try {
    const response = await fetch(`${baseUrlGoogle}/primary/events?showDeleted=false&orderBy=startTime&singleEvents=true&maxResults=${maxResults}&timeMin=${datetime}`, {
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
export const getAllAppointments = async accessToken => {
  try {
    const response = await fetch(`${baseUrlGoogle}/primary/events?showDeleted=false&orderBy=startTime&singleEvents=true`, {
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
    const response = await fetch(`${baseUrlGoogle}/primary/events/${id}`, {
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
export const createSlackChannel = async (baseUrl, accessToken, data) => {
  // get global options
  try {
    const response = await fetch(`${baseUrl}/modules/slack/service/create-channel/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${accessToken}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const createGoogleFolder = async (baseUrl, accessToken, data) => {
  try {
    const response = await fetch(`${baseUrl}/modules/drive/service/create/folder/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const createHubSpotContact = async (baseUrl, data) => {
  try {
    const response = await fetch(`${baseUrl}/modules/hubspot/service/create-contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const createHubSpotDeal = async (baseUrl, data) => {
  try {
    const response = await fetch(`${baseUrl}/modules/hubspot/service/deals/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};
