

export function GET_MODIFIER_CATEGORIES (state, res) {
  state.modifierCategories = [...res]
}
export function GET_MODIFIERS (state, res) {
  state.modifiers = [...res]
}
export function GET_TOTAL_MODIFIERS (state, res) {
  state.totalModifiers = res
}
export function GET_TOTAL_MODIFIER_CAT (state, res) {
  state.totalModifierCategories = res
}

export function ADD_MODIFIER_CATEGORY_IN_LIST(state, res) {
  state.modifierCategories.unshift(res)
  state.totalModifierCategories = state.totalModifierCategories + 1
}

export function UPDATE_MODIFIER_CATEGORY (state, res) {
  Object.assign(
    state.modifierCategories.find((obj) => obj.id === res.id),
    res
  )
}

export function ADD_MODIFIER_IN_LIST(state, res) {
  state.modifiers.unshift(res)
  state.totalModifiers = state.totalModifiers + 1
}

export function UPDATE_MODIFIER (state, res) {
  Object.assign(
    state.modifiers.find((obj) => obj.id === res.id),
    res
  )
}

export function GET_RESTAURANT_PRODUCT_MODIFIERS (state, res) {
  state.restaurantProductModifiers= [...res]
}

export function GET_TOTAL_RESTAURANT_PRODUCT_MODIFIERS (state, res) {
  state.totalRestaurantProductModifiers = res
}

export function ADD_RESTAURANT_PRODUCT_MODIFIER_IN_LIST(state, res) {
  state.restaurantProductModifiers.unshift(res)
  state.totalRestaurantProductModifiers = state.totalRestaurantProductModifiers + 1
}

export function UPDATE_RESTAURANT_PRODUCT_MODIFIER (state, res) {
  Object.assign(
    state.restaurantProductModifiers.find((obj) => obj.id === res.id),
    res
  )
}
