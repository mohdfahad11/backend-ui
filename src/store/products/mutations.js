export function GET_PRODUCTS(state, res) {
  state.products = [...res]
}
export function GET_TOTAL_PROD(state, res) {
  state.totalProducts = res
}

export function ADD_PRODUCT_IN_LIST(state, res) {
  state.products.unshift(res)
  state.totalProducts = state.totalProducts + 1
}

export function UPDATE_PRODUCT(state, res) {
  Object.assign(
    state.products.find((obj) => obj.id === res.id),
    res
  )
}

export function GET_QUANTITY_UNITS(state, res) {
  state.quantityUnits = [...res]
}

export function ADD_QUANTITY_UNIT_IN_LIST(state, res) {
  state.quantityUnits.unshift(res)
}

export function UPDATE_QUANTITY_UNIT(state, res) {
  Object.assign(
    state.quantityUnits.find((obj) => obj.id === res.id),
    res
  )
}

export function GET_DISCOUNT_TYPES(state, res) {
  state.discountTypes = [...res]
}

export function ADD_DISCOUNT_TYPE_IN_LIST(state, res) {
  state.discountTypes.unshift(res)
}

export function UPDATE_DISCOUNT_TYPE(state, res) {
  Object.assign(
    state.discountTypes.find((obj) => obj.id === res.id),
    res
  )
}

export function SET_TOTAL_QUANTITY_UNITS(state, res) {
  state.totalQuantityUnits = res
}

export function SET_TOTAL_DISCOUNT_TYPES(state, res) {
  state.totalDiscountTypes = res
}