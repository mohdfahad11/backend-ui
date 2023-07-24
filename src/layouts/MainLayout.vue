<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="bg-grey-1" bordered>
      <q-toolbar class="bg-grey-1 text-black">
        <div class="q-ml-auto">
          <q-btn unelevated color="primary" @click="logOut">
            <q-icon left name="logout" />
            <div>Logout</div>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="210"
      class="bg-drawer"
      bordered
    >
      <q-toolbar class="bg-primary text-white q-py-xs">
        <q-avatar size="42px" class="q-ml-md">
          <img src="../assets/images/avatar.png" />
        </q-avatar>
        <q-toolbar-title class="q-pl-xs"> Pratham </q-toolbar-title>
      </q-toolbar>
      <q-tabs
        vertical
        switch-indicator
        stretch
        outside-arrows
        mobile-arrows
        class="bg-grey-1 text-grey-9 route-tabs"
      >
        <q-route-tab
          v-for="link in essentialLinks"
          :label="link.title"
          :key="link.title"
          :icon="link.icon"
          :to="link.link"
          exact
          active-class="text-primary bg-grey-3"
          class="text-capitalize"
        />
        
      </q-tabs>
      <!-- <q-tabs class="bg-primary">
        <q-route-tab>
          <q-btn
            push
            icon="logout"
            label="Logout"
            @click="logOut"
            class="bg-white text-primary text-bold q-px-sm"
          />
        </q-route-tab>
      </q-tabs> -->
    </q-drawer>
    <q-page-container>
      <router-view class="q-pa-xs bg-grey-3"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
const linksData = [
  {
    title: "Dashboard",
    icon: "mdi-monitor-dashboard",
    link: "/",
  },
  {
    title: "Categories",
    icon: "mdi-animation",
    link: "/categories",
  },
  {
    title: "Products",
    icon: "mdi-cube-outline",
    link: "/products",
  },
  {
    title: "Restaurant Products",
    icon: "restaurant",
    link: "/restaurant-products",
  },
  {
    title: "Modifier Categories",
    icon: "restaurant",
    link: "/modifier-categories",
  },
  {
    title: "Modifiers",
    icon: "restaurant",
    link: "/modifiers",
  },
  {
    title: "Transactions",
    icon: "mdi-bank-transfer",
    link: "/transactions",
  },
  {
    title: "Order Refunds",
    icon: "mdi-bank-transfer",
    link: "/order-refunds",
  },
  {
    title: "Users",
    icon: "mdi-account-multiple",
    link: "/users",
  },
  {
    title: "Quantity Units",
    icon: "mdi-scale",
    link: "/quantity-units",
  },
  {
    title: "Discount Types",
    icon: "price_change",
    link: "/discount-types",
  },
  {
    title: "Settings",
    icon: "settings_applications",
    link: "/settings",
  },
  {
    title: "CashUp",
    icon: "money",
    link: "/cashup",
  },
  {
    title: "Advance CashUp",
    icon: "payments",
    link: "/advance-cashup",
  },
  {
    title: "Customers",
    icon: "mdi-account",
    link: "/customers",
  },
  {
    title: "Payments",
    icon: "mdi-pandora",
    link: "/payments",
  }
];

export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: true,
      essentialLinks: linksData,
    };
  },
  methods: {
    ...mapActions("users", ["logoutAdmin"]),
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    logOut() {
      this.logoutAdmin();
    },
  },
};
</script>

<style>
.container-class {
  height: 100vh;
  width: 100vw;
  margin-left: 0px;
  margin-top: 0px;
  padding-top: unset !important;
  background-color: rgba(196, 175, 196, 0.504);
  display: flexbox;
  flex-wrap: nowrap;
}
/* .sidebar-class {
  height: 100vh;
  margin-left: 0px;
  margin-top: 0px;
}
.q-layout {
  min-height: unset !important;
} */
.route-tabs {
  height: 92vh;
}
/* .logout-button {
  position: absolute;
  bottom: 10px;
  left: 10%;
} */
</style>
