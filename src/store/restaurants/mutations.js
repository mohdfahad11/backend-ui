export function GET_RESTAURANTS (state, res) {
  state.restaurants = [...res]
}
export function GET_TOTAL_RESTAURANTS (state, res) {
  state.totalRestaurants = res
}

export function GET_RESTAURANT_PRODUCTS (state, res) {
  state.restaurantProducts = [...res]
}
export function GET_TOTAL_RESTAURANT_PRODUCTS (state, res) {
  state.totalRestaurantProducts = res
}

export function UPDATE_RESTAURANT_PRODUCT (state, res) {
  Object.assign(
    state.restaurantProducts.find((obj) => obj.id === res.id),
    res
  )
}

export function GET_RESTAURANTS_FOR_PRODUCT (state, res) {
  state.restaurantsForProduct = [...res]
}

export function GET_HOUR_SALE (state,res) {
  state.perHourSale.x = res.map(function (item) {
    return item.hour
  });
  state.perHourSale.y = res.map(function (item) {
    return item.sale_made
  });
}

export function GET_DAY_SALE (state,res) {
  state.perDaySale.x = res.map(function (item) {
    return item.date
  });
  state.perDaySale.y = res.map(function (item) {
    return item.sale_made
  });
}