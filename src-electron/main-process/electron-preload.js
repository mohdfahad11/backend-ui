let isDev = false;
try {
  isDev = require('electron-is-dev')
} catch (error) {
  isDev = false;
}

// import contextBridge from 'electron'
// import session from 'electron'
const { contextBridge } = require('electron');
const { session } = require('electron')


contextBridge.exposeInMainWorld(
  'manageData', {
    getCookie: (key) => {
      session.defaultSession.cookies.get({ name: key })
        .then((cookies) => {
          return cookies
        }).catch((error) => {
          console.log(error)
        })
    },
    setCookies: (key, value) => {
      let cookie = {url: 'http://saAdmin.com', name: key, value: value, expirationDate: 99999999999}
      session.defaultSession.cookies.set(cookie)
        .then(() => {
          // success
        }, (error) => {
          console.error(error)
        })
    },
    removeCookie: (name) => {
      let url= 'http://saAdmin.com'
      session.defaultSession.cookies.remove(url, name)
        .then(() => {
          // success
        }, (error) => {
          console.error(error)
        })
    }
  }
)
