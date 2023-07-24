/*
export function someMutation (state) {
}
*/
export async function SET_THEME_COLOR (state, res) {
  state.selectedTheme = JSON.parse(JSON.stringify(res))
  localStorage.setItem('ThemeLocalStorage', JSON.stringify(state.selectedTheme))
  // if(window) {
  //   await window.manageData.setCookies('ThemeLocalStorage', JSON.stringify(state.selectedTheme))
  // }
}
