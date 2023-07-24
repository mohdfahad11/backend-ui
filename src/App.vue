<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { colors } from 'quasar'
import { mapActions } from 'vuex';
export default {
  name: 'App',
  methods: {
    ...mapActions('orders', ['getOrders', 'getRefundedOrders']),
    async initApplication() {
      // let admin, theme
      let admin = JSON.parse(localStorage.getItem('Admin'))
      let theme = JSON.parse(localStorage.getItem("ThemeLocalStorage"));
      if(window) {
        // admin = JSON.parse(await window.manageData.getCookie('Admin'))
        // theme = JSON.parse(await window.manageData.getCookie('ThemeLocalStorage'))
      }
      if(!admin || admin == {}) {
        this.$router.push({ name: 'Login' })
      }
      this.getRefundedOrders()
      setTimeout(() => {
        if (theme) {
          colors.setBrand("primary", theme.hex);
        } else {
          let colorTheme = {
            id: 2,
            label: 'Violet Blue (Default)',
            value: 'indigo-7',
            hex: '#3949AB'
          };
          this.$store.commit("settings/SET_THEME_COLOR", colorTheme);
        }
      }, 1000);
    }
  },
  created() {
    this.initApplication()
  }
}
</script>
