export function restaurantsForProduct(state) {
  let temp = []
  for( let i = 0; i < state.restaurantsForProduct.length; i++) {
    temp.push(state.restaurantsForProduct[i].restaurants)
  }
  return temp
}
