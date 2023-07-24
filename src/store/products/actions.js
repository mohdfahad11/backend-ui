import { ProductAgent } from "src/agent";
import { Loading } from "quasar"
import notifications from "src/boot/notifications";
import Vue from 'vue';
const objVue = new Vue
let res;

export function getProducts({ commit, dispatch }, params) {
  ProductAgent.getProducts(params)
    .then(response => {
      if (response.status === 200) {
        res = {
          res_data: response.data.products,
          res_msg: 'Successful!',
          res_total: response.data.total
        }
        commit('GET_PRODUCTS', res.res_data)
        commit('GET_TOTAL_PROD', res.res_total)
      }
      else {
        notifications.failureNotify(response.message)
      }
    })
    .catch(error => {
      error && error.response
        ? error.response.status == 401
          ? notifications.failureNotify("unauthorized Access!")
          : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
        : error && error.request
          ? notifications.failureNotify('Backend server is not running!')
          : notifications.failureNotify('Something went wrong!')
    })
    .finally(() => {
      process.env.CLIENT ? Loading.hide() : null
    })
}

export function createProduct({ commit, dispatch }, body) {
  return new Promise((resolve, reject) => {
    ProductAgent.createProduct(body)
      .then(response => {
        if (response.status === 200) {
          res = {
            res_data: response.data.product.createdProduct,
            res_msg: 'Successful!'
          }
          commit('ADD_PRODUCT_IN_LIST', res.res_data)
          resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status == 401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject()
      })
      .finally(() => {
        process.env.CLIENT ? Loading.hide() : null
      })
  })
}

export function importProduct({ commit, dispatch }, body) {
  return new Promise((resolve, reject) => {
    ProductAgent.importProduct(body)
      .then(response => {
        if (response.status === 200) {
          dispatch('getProducts', { page: 1, per_page: 10 })
          resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status == 401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject()
      })
      .finally(() => {
        process.env.CLIENT ? Loading.hide() : null
      })
  })
}

export function updateProduct({ commit, dispatch }, params) {
  return new Promise((resolve, reject) => {
    ProductAgent.updateProduct(params)
      .then(response => {
        if (response.status === 200) {
          res = {
            res_data: response.data.product,
            res_msg: 'Successful!'
          }
          commit('UPDATE_PRODUCT', res.res_data)
          resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status == 401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject()
      })
      .finally(() => {
        process.env.CLIENT ? Loading.hide() : null
      })
  })
}

export function getQuantityUnits({ commit, dispatch }, params) {
  ProductAgent.getQuantityUnits(params)
    .then(response => {
      if (response.status === 200) {
        res = {
          res_data: response.data.quantity_units,
          res_msg: 'Successful!'
        }
        commit('GET_QUANTITY_UNITS', res.res_data)
        commit('SET_TOTAL_QUANTITY_UNITS', response.data.total)
      }
      else {
        notifications.failureNotify(response.message)
      }
    })
    .catch(error => {
      error && error.response
        ? error.response.status == 401
          ? notifications.failureNotify("unauthorized Access!")
          : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
        : error && error.request
          ? notifications.failureNotify('Backend server is not running!')
          : notifications.failureNotify('Something went wrong!')
    })
    .finally(() => {
      process.env.CLIENT ? Loading.hide() : null
    })
}

export function createQuantityUnit({ commit, dispatch }, body) {
  return new Promise((resolve, reject) => {
    ProductAgent.createQuantityUnit(body)
      .then(response => {
        if (response.status === 200) {
          res = {
            res_data: response.data.quantity_unit,
            res_msg: 'Successful!'
          }
          commit('ADD_QUANTITY_UNIT_IN_LIST', res.res_data)
          resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status == 401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject()
      })
      .finally(() => {
        process.env.CLIENT ? Loading.hide() : null
      })
  })
}

export function updateQuantityUnit({ commit, dispatch }, params) {
  return new Promise((resolve, reject) => {
    ProductAgent.updateQuantityUnit(params)
      .then(response => {
        if (response.status === 200) {
          res = {
            res_data: response.data.quantity_unit,
            res_msg: 'Successful!'
          }
          commit('UPDATE_QUANTITY_UNIT', res.res_data)
          resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status == 401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject()
      })
      .finally(() => {
        process.env.CLIENT ? Loading.hide() : null
      })
  })
}

export function importQuantityUnit({ commit, dispatch }, body) {
  return new Promise((resolve, reject) => {
    ProductAgent.importQuantityUnit(body)
      .then(response => {
        if (response.status === 200) {
          dispatch('getQuantityUnits')
          resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status == 401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject()
      })
      .finally(() => {
        process.env.CLIENT ? Loading.hide() : null
      })
  })
}

export function getDiscountTypes({ commit, dispatch }, params) {
  ProductAgent.getDiscountTypes(params)
    .then(response => {
      if (response.status === 200) {
        res = {
          res_data: response.data.discount_types,
          res_msg: 'Successful!'
        }
        commit('GET_DISCOUNT_TYPES', res.res_data)
        commit('SET_TOTAL_DISCOUNT_TYPES', response.data.total)
      }
      else {
        notifications.failureNotify(response.message)
      }
    })
    .catch(error => {
      error && error.response
        ? error.response.status == 401
          ? notifications.failureNotify("unauthorized Access!")
          : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
        : error && error.request
          ? notifications.failureNotify('Backend server is not running!')
          : notifications.failureNotify('Something went wrong!')
    })
    .finally(() => {
      process.env.CLIENT ? Loading.hide() : null
    })
}

export function createDiscountType({ commit, dispatch }, body) {
  return new Promise((resolve, reject) => {
    ProductAgent.createDiscountType(body)
      .then(response => {
        if (response.status === 200) {
          res = {
            res_data: response.data.discount_type,
            res_msg: 'Successful!'
          }
          commit('ADD_DISCOUNT_TYPE_IN_LIST', res.res_data)
          resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status == 401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject()
      })
      .finally(() => {
        process.env.CLIENT ? Loading.hide() : null
      })
  })
}

export function updateDiscountType({ commit, dispatch }, params) {
  return new Promise((resolve, reject) => {
    ProductAgent.updateDiscountType(params)
      .then(response => {
        if (response.status === 200) {
          res = {
            res_data: response.data.discount_type,
            res_msg: 'Successful!'
          }
          commit('UPDATE_DISCOUNT_TYPE', res.res_data)
          resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status == 401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject()
      })
      .finally(() => {
        process.env.CLIENT ? Loading.hide() : null
      })
  })
}

export function importDiscountType({ commit, dispatch }, body) {
  return new Promise((resolve, reject) => {
    ProductAgent.importDiscountType(body)
      .then(response => {
        if (response.status === 200) {
          dispatch('getDiscountTypes')
          resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status == 401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject()
      })
      .finally(() => {
        process.env.CLIENT ? Loading.hide() : null
      })
  })
}

export function createRestaurantProducts({ commit, dispatch }, body) {
  return new Promise((resolve, reject) => {
    ProductAgent.createRestaurantProducts(body)
      .then(response => {
        if (response.status === 200) {
          resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status == 401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject()
      })
      .finally(() => {
        process.env.CLIENT ? Loading.hide() : null
      })
  })
}

export function deleteRestaurantProduct({ commit, dispatch }, params) {
  return new Promise((resolve, reject) => {
    ProductAgent.deleteRestaurantProduct(params)
      .then(response => {
        if (response.status === 200) {
          resolve()
        }
        else {
          notifications.failureNotify(response.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status == 401
            ? notifications.failureNotify("unauthorized Access!")
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message ? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject()
      })
      .finally(() => {
        process.env.CLIENT ? Loading.hide() : null
      })
  })
}
