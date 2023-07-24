

export function GET_CATEGORIES (state, res) {
  state.categories = [...res]
}
export function GET_TOTAL_CAT (state, res) {
  state.totalCategories = res
}
export function ADD_CATEGORY_IN_LIST(state, res) {
  state.categories.unshift(res)
  state.totalCategories = state.totalCategories + 1
}

export function UPDATE_CATEGORY (state, res) {
  Object.assign(
    state.categories.find((obj) => obj.id === res.id),
    res
  )
}

export function GET_ATTACHMENT(state, res) {
  state.attachment = Object.assign({}, res)
}
