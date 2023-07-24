import { RestaurantAgent } from "src/agent";
import { Loading } from "quasar"
import notifications from "src/boot/notifications";
import Vue from 'vue';
const objVue = new Vue
let res;

export function getRestaurants ({ commit, dispatch}, params) {
  RestaurantAgent.getRestaurants(params)
    .then(response => {
      if (response.status === 200) {
          res = {
              res_data: response.data.restaurants,
              res_msg: 'Successful!',
              res_total: response.data.total
          }
          commit('GET_RESTAURANTS', res.res_data)
          commit('GET_TOTAL_RESTAURANTS', res.res_total)
      }
      else {
        notifications.failureNotify(response.message)
      }
    })
    .catch(error => {
      error && error.response
        ? error.response.status==401
          ? notifications.failureNotify("unauthorized Access!")
          : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message? error.response.data.data.message : 'Something went wrong!')
        : error && error.request
          ? notifications.failureNotify('Backend server is not running!')
          : notifications.failureNotify('Something went wrong!')
    })
    .finally(() => {
      process.env.CLIENT?Loading.hide():null
    })
}

export function getRestaurantProducts ({ commit, dispatch}, params) {
  RestaurantAgent.getRestaurantProducts(params)
    .then(response => {
      if (response.status === 200) {
          res = {
              res_data: response.data.restaurant_products,
              res_msg: 'Successful!',
              res_total: response.data.total
          }
          commit('GET_RESTAURANT_PRODUCTS', res.res_data)
          commit('GET_TOTAL_RESTAURANT_PRODUCTS', res.res_total)
      }
      else {
        notifications.failureNotify(response.message)
      }
    })
    .catch(error => {
      error && error.response
        ? error.response.status==401
          ? notifications.failureNotify("unauthorized Access!")
          : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message? error.response.data.data.message : 'Something went wrong!')
        : error && error.request
          ? notifications.failureNotify('Backend server is not running!')
          : notifications.failureNotify('Something went wrong!')
    })
    .finally(() => {
      process.env.CLIENT?Loading.hide():null
    })
}

export function updateRestaurantProducts ({ commit, dispatch}, params) {
  return new Promise((resolve, reject) => {
    RestaurantAgent.updateRestaurantProducts(params)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.restaurant_product,
                res_msg: 'Successful!'
            }
            // commit('UPDATE_RESTAURANT_PRODUCT', res.res_data)
            dispatch('getRestaurantProducts', {page: 1, per_page: 10})
            resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status==401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject()
      })
      .finally(() => {
        process.env.CLIENT?Loading.hide():null
      })
  })
}

export function getRestaurantsForProduct ({ commit, dispatch}, params) {
  RestaurantAgent.getRestaurantsForProduct(params)
    .then(response => {
      if (response.status === 200) {
          res = {
              res_data: response.data,
              res_msg: 'Successful!',
              // res_total: response.data.total
          }
          commit('GET_RESTAURANTS_FOR_PRODUCT', res.res_data)
          // commit('GET_TOTAL_RESTAURANT_PRODUCTS', res.res_total)
      }
      else {
        notifications.failureNotify(response.message)
      }
    })
    .catch(error => {
      error && error.response
        ? error.response.status==401
          ? notifications.failureNotify("unauthorized Access!")
          : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message? error.response.data.data.message : 'Something went wrong!')
        : error && error.request
          ? notifications.failureNotify('Backend server is not running!')
          : notifications.failureNotify('Something went wrong!')
    })
    .finally(() => {
      process.env.CLIENT?Loading.hide():null
    })
}

export function getPerHourSale ({ commit, dispatch}, params) {
  RestaurantAgent.getPerHourSale(params)
    .then(response => {
      if (response.status === 200) {
          res = {
              res_data: response.data.sales,
              res_msg: 'Successful!',
              res_total: response.data.total
          }
          commit('GET_HOUR_SALE', res.res_data)
      }
      else {
        notifications.failureNotify(response.message)
      }
    })
    .catch(error => {
      error && error.response
        ? error.response.status==401
          ? notifications.failureNotify("unauthorized Access!")
          : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message? error.response.data.data.message : 'Something went wrong!')
        : error && error.request
          ? notifications.failureNotify('Backend server is not running!')
          : notifications.failureNotify('Something went wrong!')
    })
    .finally(() => {
      process.env.CLIENT?Loading.hide():null
    })
}

export function getPerDaySale ({ commit, dispatch}, params) {
  RestaurantAgent.getPerDaySale(params)
    .then(response => {
      if (response.status === 200) {
          res = {
              res_data: response.data.sales,
              res_msg: 'Successful!',
              res_total: response.data.total
          }
          commit('GET_HOUR_SALE', res.res_data)
      }
      else {
        notifications.failureNotify(response.message)
      }
    })
    .catch(error => {
      error && error.response
        ? error.response.status==401
          ? notifications.failureNotify("unauthorized Access!")
          : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message? error.response.data.data.message : 'Something went wrong!')
        : error && error.request
          ? notifications.failureNotify('Backend server is not running!')
          : notifications.failureNotify('Something went wrong!')
    })
    .finally(() => {
      process.env.CLIENT?Loading.hide():null
    })
}