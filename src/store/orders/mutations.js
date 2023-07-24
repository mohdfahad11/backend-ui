import Vue from 'vue'
import { date } from 'quasar'

export function GET_ORDERS(state, res) {
  state.orders = [...res]
}
export function GET_TOTAL_NUM(state, res) {
  state.total_num = res
}

export function SET_TOTAL_DAILY_SALE(state, res) {
  state.totalOneDaySale = res
}

export function SET_TOTAL_WEEKLY_SALE(state, res) {
  state.totalWeeklySale = res
}

export function SET_TOTAL_MONTHLY_SALE(state, res) {
  state.totalMonthlySale = res
}

export function GET_REFUNDED_ORDERS(state, res) {
  state.refundedOrders = [...res]
}

export function GET_TOTAL_REFUNDED_ORDERS(state, res) {
  state.totalRefundedOrders = res
}

export function SET_TOTAL_CASH_SALE_FOR_TODAY(state, res) {
  state.totalCashSaleForToday = res
}

export function SET_TOTAL_CARD_SALE_FOR_TODAY(state, res) {
  state.totalCardSaleForToday = res
}

export function SET_TOTAL_DAY_SALE(state, res) {
  state.totalDaySale = res
}

export function SET_TOTAL_WEEK_SALE(state, res) {
  state.totalWeekSale = res
}

export function SET_TOTAL_MONTH_SALE(state, res) {
  state.totalMonthSale = res
}
