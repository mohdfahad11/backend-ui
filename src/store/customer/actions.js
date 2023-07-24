import { CustomerAgent } from "src/agent";
import { Loading } from "quasar"
import notifications from "src/boot/notifications";
import Vue from 'vue';
const objVue = new Vue
let res;

export function getCustomers({ commit, dispatch }, params) {
  CustomerAgent.getCustomers(params)
    .then(response => {
      if (response.status === 200) {
        res = {
          res_data: response.data.users,
          res_msg: 'Successful!'
        }
        commit('GET_CUSTOMERS', res.res_data)
        commit('SET_TOTAL_CUSTOMERS', response.data.total)
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