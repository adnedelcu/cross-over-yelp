import { API_URL } from "../../config"

export const getCities = () => {
  return fetch(`${API_URL}/cities`)
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const getCity = (id) => {
  return fetch(`${API_URL}/cities/${id}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}
