import { API_URL, mockData } from "../../config"
import users from '../assets/users.json'

export const getUsers = () => {
  if (mockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(users);
      }, 1500);
    })
  }
  return fetch(`${API_URL}/users`)
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const getUser = (id) => {
  if (mockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(users, id);
        resolve(users.find(item => item.id == id));
      }, 1500);
    })
  }
  return fetch(`${API_URL}/users/${id}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}
