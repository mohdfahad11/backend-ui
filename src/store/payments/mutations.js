export function GET_PAYMENTS (state, res) {
    state.payments = [...res]
  }

  export function GET_PAYMENT_METHOD (state, res) {
    state.payment_method = [...res]
  }
