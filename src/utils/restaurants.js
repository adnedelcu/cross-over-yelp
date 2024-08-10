import { API_URL, mockData } from "../../config"
import restaurants from '../assets/restaurants.json'

export const getRestaurants = () => {
  if (mockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(restaurants);
      }, 1500);
    })
  }
  return fetch(`${API_URL}/restaurants`)
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const getRestaurant = (id) => {
  if (mockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(restaurants.find(item => item.id == id));
      }, 1500);
    })
  }

  return fetch(`${API_URL}/restaurants/${id}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}
