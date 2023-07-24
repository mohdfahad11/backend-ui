export function GET_USERS (state, res) {
  state.users = [...res]
}
export function GET_TOTAL_USER (state, res) {
  state.totalUsers = res
}

export function ADD_USER_IN_LIST(state, res) {
  state.users.unshift(res)
}

export function UPDATE_USER (state, res) {
  Object.assign(
    state.users.find((obj) => obj.id === res.id),
    res
  )
}

export async function LOGIN_ADMIN(state, res) {
  state.admin = Object.assign({}, res)
  // if(window) {
  //   await window.manageData.setCookies('Admin',  JSON.stringify(state.admin))
  // }
  localStorage.setItem('Admin', JSON.stringify(state.admin))
}

export async function LOGOUT_ADMIN() {
  localStorage.removeItem('Admin')
  // if(window) {
  //   await window.manageData.removeCookie('Admin')
  // }

}

export function GET_USER_ROLE_LIST(state, res) {
  state.userRoles = [...res]
}

