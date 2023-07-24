let loggedInAdmin = JSON.parse(localStorage.getItem('Admin'))
// let loggedInAdmin
// if(window) {
//   loggedInAdmin = JSON.parse(window.manageData.getCookie('Admin'))
// }
export default function () {
  return {
    users: null,
    admin: loggedInAdmin ? loggedInAdmin : {},
    totalUsers: 0,
    userRoles: []
  }
}
