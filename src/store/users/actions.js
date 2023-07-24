import { UserAgent } from "src/agent";
import { Loading } from "quasar"
import notifications from "src/boot/notifications";
import displayLoader from "src/boot/displayLoader";
import Vue from 'vue';
const objVue = new Vue
let res;

export function getUsers ({ commit, dispatch}, params) {
  UserAgent.getUsers(params)
    .then(response => {
      if (response.status === 200) {
          res = {
              res_data: response.data.users,
              res_msg: 'Successful!',
              res_total: response.data.total
          }
          commit('GET_USERS', res.res_data)
          commit('GET_TOTAL_USER', res.res_total)
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

export function createUser ({ commit, dispatch}, body) {
  return new Promise((resolve, reject) => {
    UserAgent.createUser(body)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.user,
                res_msg: 'Successful!'
            }
            commit('ADD_USER_IN_LIST', res.res_data)
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

export function updateUser ({ commit, dispatch}, params) {
  return new Promise((resolve, reject) => {
    UserAgent.updateUser(params)
      .then(response => {
        if (response.status === 200) {
            res = {
                res_data: response.data.user,
                res_msg: 'Successful!'
            }
            commit('UPDATE_USER', res.res_data)
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

export function loginAdmin({ commit, state }, loginData) {
  displayLoader.displayLoader()
  return new Promise((resolve, reject) => {
    UserAgent.loginAdmin(loginData)
      .then(response => {
        if (response.status === 200) {
          let data = response.data
          if(data.token) {
            let Admin = {
              "user": data.user,
              "token": data.token
            }
            if(Admin.user.role_id !== 1) {
              notifications.failureNotify("User is not Admin!")
              reject()
            } else {
              commit('LOGIN_ADMIN', Admin)
              resolve()
            }
          }
        } else {
          notifications.failureNotify(response.data.message)
          reject()
        }
      })
      .catch(error => {
        error && error.response
          ? error.response.status==401
            ? notifications.failureNotify(error.response.data.message)
            : notifications.failureNotify(error.response.data && error.response.data.data && error.response.data.data.message? error.response.data.data.message : 'Something went wrong!')
          : error && error.request
            ? notifications.failureNotify('Backend server is not running!')
            : notifications.failureNotify('Something went wrong!')
        reject(error)
      })
      .finally(() => {
        Loading.hide()
      })
    })
}

export function logoutAdmin({ commit, state }) {
  displayLoader.displayLoader()
  return new Promise((resolve, reject) => {
    UserAgent.logoutAdmin()
      .then(response => {
        if(response.status == 200) {
          commit('LOGOUT_ADMIN');
          this.$router.push({ name: 'Login', query: { redirect: this.$router.currentRoute.path } })
        }
        else {
          notifications.failureNotify('Something went wrong! Please try again!')
        }
      })
      .catch(error => {
        let msg = null
        error && error.response
          ? msg = msg = error.response.data && error.response.data.data && error.response.data.data.message? error.response.data.data.message : 'Something went wrong!'
          : error && error.request
            ? msg = 'Backend server is not running!'
            : msg = 'Something went wrong!'
        notifications.failureNotify(msg)
      })
      .finally(() => {
        Loading.hide()
      })
    })
}

export function getUserRoleList ({ commit, dispatch}, params) {
  UserAgent.getUserRoleList(params)
    .then(response => {
      if (response.status === 200) {
          res = {
              res_data: response.data.user_roles,
              res_msg: 'Successful!',
              res_total: response.data.total
          }
          commit('GET_USER_ROLE_LIST', res.res_data)
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
