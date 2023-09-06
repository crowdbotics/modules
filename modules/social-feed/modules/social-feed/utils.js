export const mapErrors = (error) => {
  let errorMessage = null;
  const errorsList = error.response.data;
  if (error.message === "Network Error") {
    errorMessage = "Network Error";
  } else if (errorsList) {
    const message = Object.keys(errorsList).map((element) => {
      if (typeof errorsList[element] === "object") {
        return Object.keys(errorsList[element]).map(
          (el) => `${element}: ${errorsList[element][el]}`
        );
      } else {
        return `${element}: ${errorsList[element]}`;
      }
    });

    errorMessage = message.join("\n");
  } else {
    errorMessage = error.message;
  }
  return errorMessage;
};

export const toggleFollowById = (followers, targetId) => {
  // Find the index of the object with the targetId
  const index = followers.findIndex((obj) => obj.id === targetId);

  // If the object with the targetId is found, toggle its "follow" value
  if (index !== -1) {
    // Create a shallow copy of the array
    const updatedObjects = [...followers];
    // Toggle the "follow" value
    updatedObjects[index] = {
      ...updatedObjects[index],
      follow: !updatedObjects[index].follow
    };
    return updatedObjects;
  }
  // If the object with the targetId is not found, return the original array
  return followers;
};

// This function generates an array which contains the uppercase English alphabet letters from 'A' to 'Z' as strings.
export const getAlphabets = () => {
  const alphabets = [];
  for (let i = 65; i <= 90; i++) {
    alphabets.push(String.fromCharCode(i));
  }
  return alphabets;
};
