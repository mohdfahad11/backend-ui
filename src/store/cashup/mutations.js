export function GET_CASHUPS(state, res) {
  state.cashups = [...res]
}

export function GET_ADVANCE_CASHUPS(state, res) {
  state.advancecashup = [...res]
}

export function SET_TOTAL_CASHUPS(state, res) {
  state.totalCashups = res
}

export function SET_TOTAL_ADVANCE_CASHUPS(state, res) {
  state.totalAdvanceCashups = res
}