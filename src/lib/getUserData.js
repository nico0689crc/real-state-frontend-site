import LOCALSTORAGE_ITEMS from "constants/localStorageItems"

const getUserData = () => {
  const userData = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS.USER_DATA));

  return {
    client: userData?.client || null,
    uid: userData?.uid || null,
    accessToken: userData?.accessToken || null,
    tokenExpirationDate: userData?.tokenExpirationDate || null
  }
}

export default getUserData;
