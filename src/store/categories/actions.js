import { CategoryAgent } from "src/agent";
import { Loading } from "quasar"
import notifications from "src/boot/notifications";
import Vue from 'vue';
const objVue = new Vue
let res;

export function getCategories ({ commit, dispatch}, params) {
  CategoryAgent.getCategories(params)
    .then(response => {
      if (response.status === 200) {
          res = {
              res_data: response.data.categories,
              res_msg: 'Successful!',
              res_total: response.data.total
          }
          commit('GET_CATEGORIES', res.res_data)
          commit('GET_TOTAL_CAT', res.res_total)
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

export function createCategory ({ commit, dispatch}, body) {
  return new Promise((resolve, reject) => {
    CategoryAgent.createCategory(body)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.category.createdCategory,
                res_msg: 'Successful!'
            }
            commit('ADD_CATEGORY_IN_LIST', res.res_data)
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

export function updateCategory ({ commit, dispatch}, params) {
  return new Promise((resolve, reject) => {
    CategoryAgent.updateCategory(params)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.category,
                res_msg: 'Successful!'
            }
            commit('UPDATE_CATEGORY', res.res_data)
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

export function createAttachment ({ commit, dispatch}, params) {
  return new Promise((resolve, reject) => {
    CategoryAgent.createAttachment(params)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.attachment,
                res_msg: 'Successful!'
            }
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

export function updateAttachment ({ commit, dispatch}, params) {
  return new Promise((resolve, reject) => {
    CategoryAgent.updateAttachment(params)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.attachment,
                res_msg: 'Successful!'
            }
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

export function deleteAttachment ({ commit, dispatch}, params) {
  return new Promise((resolve, reject) => {
    CategoryAgent.deleteAttachment(params)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.attachment,
                res_msg: 'Successful!'
            }
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

export function importCategory ({ commit, dispatch}, body) {
  return new Promise((resolve, reject) => {
    CategoryAgent.importCategory(body)
      .then(response => {
        if (response.status === 200) {
            dispatch('getCategories',{ page: 1, per_page: 10 })
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


export function getAttachment ({ commit, dispatch}, params) {
  return new Promise((resolve, reject) => {
    CategoryAgent.getAttachment(params)
      .then(response => {
        if (response.status === 200) {
          commit('GET_ATTACHMENT', response.data.attachment[0])
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
