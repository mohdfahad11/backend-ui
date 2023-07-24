import { OrderAgent } from "src/agent";
import { Loading } from "quasar"
import notifications from "src/boot/notifications";
import Vue from 'vue';
const objVue = new Vue
let res;

export function getOrders({ commit, dispatch }, params) {
  OrderAgent.getOrders(params)
    .then(response => {
      if (response.status === 200) {
        res = {
          res_data: response.data.orders,
          res_msg: 'Successful!',
          res_total: response.data.total
        }
        commit('GET_ORDERS', res.res_data)
        commit('GET_TOTAL_NUM', res.res_total)
      }
      else {
        notifications.failureNotify(response.message)
      }
    })
    .catch(error => {
      console.log(error)
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

export function getTotalSale({ commit, dispatch }, params) {
  OrderAgent.getTotalSale(params.obj)
    .then(response => {
      if (response.status === 200) {
        res = {
          res_data: response.data.sale_of_period._sum.total_amount,
          res_msg: 'Successful!',
        }
        if (params.period == 'Daily') {
          commit('SET_TOTAL_DAILY_SALE', res.res_data)
        } else if (params.period == 'Weekly') {
          commit('SET_TOTAL_WEEKLY_SALE', res.res_data)
        } else if (params.period == 'Monthly') {
          commit('SET_TOTAL_MONTHLY_SALE', res.res_data)
        }

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

export function getCashSalesForTheDay({ commit, dispatch }, params) {
  OrderAgent.getCashSalesForTheDay(params)
    .then(response => {

      if (response.status === 200) {
        commit('SET_TOTAL_CASH_SALE_FOR_TODAY', response.data.sales.total_amount ? response.data.sales.total_amount : 0)
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

export function getCardSalesForTheDay({ commit, dispatch }, params) {
  OrderAgent.getCardSalesForTheDay(params)
    .then(response => {
      if (response.status === 200) {
        commit('SET_TOTAL_CARD_SALE_FOR_TODAY', response.data.sales.total_amount ? response.data.sales.total_amount : 0)
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

export function getRefundedOrders({ commit, dispatch }, params) {
  OrderAgent.getRefundedOrders(params)
    .then(response => {
      if (response.status === 200) {
        res = {
          res_data: response.data.refunded_orders,
          res_msg: 'Successful!',
          res_total: response.data.total
        }
        commit('GET_REFUNDED_ORDERS', res.res_data)
        commit('GET_TOTAL_REFUNDED_ORDERS', res.res_total)
      }
      else {
        notifications.failureNotify(response.message)
      }
    })
    .catch(error => {
      console.log(error)
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

export function getTotalSales({ commit, dispatch }, params) {
  const { date_from, date_to } = params;
  OrderAgent.getTotalSales({ date_from, date_to })
    .then(response => {
      if (response.status === 200) {
        commit(params.commit_name, response.data.sales.total_amount ? response.data.sales.total_amount : 0)
      }
      else {
        notifications.failureNotify(response.message)
      }
    })
    .catch(error => {
      console.log(error)
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
