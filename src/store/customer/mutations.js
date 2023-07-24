export function GET_CUSTOMERS(state, res) {
  state.customers = [...res]
}

export function SET_TOTAL_CUSTOMERS(state, res) {
  state.totalCustomers = res
}
