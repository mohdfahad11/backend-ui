let themeLocal = JSON.parse(localStorage.getItem('ThemeLocalStorage'))
// let themeLocal
// if(window) {
//   themeLocal = JSON.parse(window.manageData.getCookie('ThemeLocalStorage'))
// }

export default function () {
  return {
    selectedTheme: themeLocal? themeLocal: {},
  }
}
