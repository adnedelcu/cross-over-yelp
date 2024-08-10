import { API_URL, mockData } from "../../config"
import users from '../assets/users.json'

export const getUsers = () => {
  return new Promise((resolve) => {
    resolve(users);
  })

  return fetch(`${API_URL}/users`)
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const getUser = (id) => {
  return new Promise((resolve) => {
    console.log(users, id);
    resolve(users.find(item => item.id == id));
  })

    return fetch(`${API_URL}/users/${id}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}
