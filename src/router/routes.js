
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'home' },
      { path: 'categories', component: () => import('pages/Categories.vue') },
      { path: 'products', component: () => import('pages/Products.vue') },
      { path: 'users', component: () => import('pages/Users.vue') },
      { path: 'transactions', component: () => import('pages/Transactions.vue') },
      { path: 'settings', component: () => import('pages/Settings.vue') },
      { path: 'quantity-units', component: () => import('pages/QuantityUnits.vue') },
      { path: 'restaurant-products', component: () => import('pages/RestaurantProducts.vue') },
      { path: 'discount-types', component: () => import('pages/DiscountTypes.vue') },
      { path: 'order-refunds', component: () => import('pages/OrderRefunds.vue') },
      { path: 'modifiers', component: () => import('pages/Modifiers.vue') },
      { path: 'modifier-categories', component: () => import('pages/ModifierCategories.vue') },
      { path: 'cashup', component: () => import('pages/CashUp.vue') },
      { path: 'advance-cashup', component: () => import('pages/AdvanceCashUp.vue') },
      { path: 'customers', component: () => import('pages/Customers.vue') },
      { path: 'payments', component: () => import('pages/Payments.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/login',
    component: () =>  import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name:'Login', component: () => import('pages/Login.vue') },
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
