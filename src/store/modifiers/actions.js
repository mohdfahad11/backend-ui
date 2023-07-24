import { ModifierAgent } from "src/agent";
import { Loading } from "quasar"
import notifications from "src/boot/notifications";
import Vue from 'vue';
const objVue = new Vue
let res;

export function getModifiers ({ commit, dispatch}, params) {
  return new Promise((resolve, reject) => {
    ModifierAgent.getModifiers(params)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.modifiers,
                res_msg: 'Successful!',
                res_total: response.data.total
            }
            commit('GET_MODIFIERS', res.res_data)
            commit('GET_TOTAL_MODIFIERS', res.res_total)
            resolve(response)
        }
        else {
          notifications.failureNotify(response.message)
          reject(response)
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
        reject(error)
      })
      .finally(() => {
        process.env.CLIENT?Loading.hide():null
      })
  })
}

export function createModifier ({ commit, dispatch}, body) {
  return new Promise((resolve, reject) => {
    ModifierAgent.createModifier(body)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.modifier,
                res_msg: 'Successful!'
            }
            commit('ADD_MODIFIER_IN_LIST', res.res_data)
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

export function updateModifier ({ commit, dispatch}, params) {
  return new Promise((resolve, reject) => {
    ModifierAgent.updateModifier(params)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.modifier,
                res_msg: 'Successful!'
            }
            commit('UPDATE_MODIFIER', res.res_data)
            resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        console.log(error.response.status)
        error && error.response
          ? error.response.status==401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.message? error.response.data.message : 'Something went wrong!')
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


export function getModifierCategories ({ commit, dispatch}, params) {
  ModifierAgent.getModifierCategories(params)
    .then(response => {
      if (response.status === 200) {
          res = {
              res_data: response.data.modifier_categories,
              res_msg: 'Successful!',
              res_total: response.data.total
          }
          commit('GET_MODIFIER_CATEGORIES', res.res_data)
          commit('GET_TOTAL_MODIFIER_CAT', res.res_total)
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

export function createModifierCategory ({ commit, dispatch}, body) {
  return new Promise((resolve, reject) => {
    ModifierAgent.createModifierCategory(body)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.modifier_category,
                res_msg: 'Successful!'
            }
            commit('ADD_MODIFIER_CATEGORY_IN_LIST', res.res_data)
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

export function updateModifierCategory ({ commit, dispatch}, params) {
  return new Promise((resolve, reject) => {
    ModifierAgent.updateModifierCategory(params)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.modifier_category,
                res_msg: 'Successful!'
            }
            commit('UPDATE_MODIFIER_CATEGORY', res.res_data)
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

export function getRestaurantProductModifier ({ commit, dispatch}, params) {
  return new Promise((resolve, reject) => {
    ModifierAgent.getRestaurantProductModifier(params)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.restaurant_product_modifiers,
                res_msg: 'Successful!',
                res_total: response.data.total
            }
            commit('GET_RESTAURANT_PRODUCT_MODIFIERS', res.res_data)
            commit('GET_TOTAL_RESTAURANT_PRODUCT_MODIFIERS', res.res_total)
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
        reject(error)
      })
      .finally(() => {
        process.env.CLIENT?Loading.hide():null
      })
    })
}



export function importModifiers ({ commit, dispatch}, body) {
  return new Promise((resolve, reject) => {
    ModifierAgent.importModifiers(body)
      .then(response => {
        if (response.status === 200) {
            dispatch('getModifiers',{ page: 1, per_page: 10 })
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

export function addMultipleRestaurantProductModifiers ({ commit, dispatch}, body) {
  return new Promise((resolve, reject) => {
    ModifierAgent.addMultipleRestaurantProductModifiers(body)
      .then(response => {
        if (response.status === 200) {
          dispatch('getRestaurantProductModifier',{ per_page: 9999, restaurant_product_id: body.restaurant_product_modifiers[0].restaurant_product_id })
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

export function importModifierCategories ({ commit, dispatch}, body) {
  return new Promise((resolve, reject) => {
    ModifierAgent.importModifierCategories(body)
      .then(response => {
        if (response.status === 200) {
            dispatch('getModifierCategories',{ page: 1, per_page: 10 })
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


export function addRestaurantProductModifier ({ commit, dispatch}, body) {
  return new Promise((resolve, reject) => {
    ModifierAgent.addRestaurantProductModifier(body)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.restaurant_product_modifier,
                res_msg: 'Successful!'
            }
            commit('ADD_RESTAURANT_PRODUCT_MODIFIER_IN_LIST', res.res_data)
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

export function updateRestaurantProductModifier ({ commit, dispatch}, params) {
  return new Promise((resolve, reject) => {
    ModifierAgent.updateRestaurantProductModifier(params)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.restaurant_product_modifier,
                res_msg: 'Successful!'
            }
            commit('UPDATE_RESTAURANT_PRODUCT_MODIFIER', res.res_data)
            resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        console.log(error)
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
