
import { axiosInstance } from "./boot/axios";
export async function attachAdminAuthHeader() {
  let su
  // if(window) {
  //   su = JSON.parse(await window.manageData.getCookie('Admin'))
  // }
  // console.log(su)
  su = JSON.parse(localStorage.getItem('Admin'))
  if (su && su.token) {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + su.token
  }
}


const Requests = {
  del: (url, body = {}) => {
    return axiosInstance.delete(url, { data: body });
  },
  get: (url, params = {}) =>
    axiosInstance.get(url, { params }),
  post: (url, body) => axiosInstance.post(url, body),
  put: (url, body) => axiosInstance.put(url, body),
  patch: (url, body) => axiosInstance.patch(url, body)
};

export const CategoryAgent = {
  getCategories: (params) => {
    return Requests.get('categories', params)
  },
  createCategory: (body) => {
    attachAdminAuthHeader()
    return Requests.post('category', body)
  },
  updateCategory: (params) => {
    attachAdminAuthHeader()
    return Requests.patch('category/' + params.id, params.data)
  },
  importCategory: (body) => {
    attachAdminAuthHeader()
    return Requests.post('import-categories', body)
  },
  getAttachment: (params) => {
    return Requests.get('attachments', params)
  },
  updateAttachment: (params) => {
    attachAdminAuthHeader()
    return Requests.patch('attachment/' + params.id + '/' + params.module_type + '/' + params.module_id, params.body)
  },
  deleteAttachment: (params) => {
    attachAdminAuthHeader()
    return Requests.patch('attachment/status/' + params.id + '/' + params.module_type + '/' + params.module_id)
  },
  createAttachment: (params) => {
    attachAdminAuthHeader()
    return Requests.post('attachment', params)
  }
}

export const ProductAgent = {
  getProducts: (params) => {
    return Requests.get('products', params)
  },
  createProduct: (body) => {
    attachAdminAuthHeader()
    return Requests.post('product', body)
  },
  importProduct: (body) => {
    attachAdminAuthHeader()
    return Requests.post('import-products', body)
  },
  updateProduct: (params) => {
    attachAdminAuthHeader()
    return Requests.patch('product/' + params.id, params.data)
  },
  getQuantityUnits: (params) => {
    return Requests.get('quantity-units', params)
  },
  createQuantityUnit: (body) => {
    attachAdminAuthHeader()
    return Requests.post('quantity-unit', body)
  },
  updateQuantityUnit: (params) => {
    attachAdminAuthHeader()
    return Requests.patch('quantity-unit/' + params.id, params.data)
  },
  importQuantityUnit: (body) => {
    attachAdminAuthHeader()
    return Requests.post('import-quantity-units', body)
  },
  getDiscountTypes: (params) => {
    return Requests.get('discount-types', params)
  },
  createDiscountType: (body) => {
    attachAdminAuthHeader()
    return Requests.post('discount-type', body)
  },
  updateDiscountType: (params) => {
    attachAdminAuthHeader()
    return Requests.patch('discount-type/' + params.id, params.data)
  },
  importDiscountType: (body) => {
    attachAdminAuthHeader()
    return Requests.post('import-discount-types', body)
  },
  createRestaurantProducts: (body) => {
    attachAdminAuthHeader()
    return Requests.post('restaurant-products', body)
  },
  deleteRestaurantProduct: (params) => {
    attachAdminAuthHeader()
    return Requests.del('/restaurant-product/' + params.restaurant_id + '/' + params.product_id)
  }
}

export const OrderAgent = {
  getOrders: (params) => {
    return Requests.get('orders', params)
  },
  getTotalSale: (params) => {
    return Requests.get('/period-sale', params)
  },
  getRefundedOrders: (params) => {
    return Requests.get('/refunded-orders', params)
  },
  getCashSalesForTheDay: (params) => {
    attachAdminAuthHeader()
    return Requests.get('/report/per-day-cash-sale', params)
  },
  getCardSalesForTheDay: (params) => {
    attachAdminAuthHeader()
    return Requests.get('/report/per-day-card-sale', params)
  },
  getTotalSales: (params) => {
    attachAdminAuthHeader()
    return Requests.get('/report/total-sales', params)
  }
}

export const UserAgent = {
  getUsers: (params) => {
    return Requests.get('users', params)
  },
  getUserRoleList: (params) => {
    return Requests.get('user-roles', params)
  },
  createUser: (body) => {
    attachAdminAuthHeader()
    return Requests.post('user', body)
  },
  updateUser: (params) => {
    attachAdminAuthHeader()
    return Requests.patch('user/' + params.id, params.data)
  },
  loginAdmin: (params) => {
    return Requests.post('/login', params)
  },
  logoutAdmin: () => {
    attachAdminAuthHeader()
    return Requests.put('/logout')
  }
}

export const RestaurantAgent = {
  getRestaurants: () => {
    return Requests.get('/restaurants')
  },
  getRestaurantProducts: (params) => {
    return Requests.get('/restaurant-products', params)
  },
  updateRestaurantProducts: (params) => {
    attachAdminAuthHeader()
    return Requests.patch('/restaurant-product/' + params.restaurant_product_id, params.body)
  },
  getRestaurantsForProduct: (params) => {
    return Requests.get('/restaurants-for-product', params)
  },
  getPerHourSale: (params) => {
    attachAdminAuthHeader()
    return Requests.get('report/per-hour-sale', params)
  }
}

export const ModifierAgent = {
  getModifiers: (params) => {
    return Requests.get('modifiers', params)
  },
  createModifier: (body) => {
    attachAdminAuthHeader()
    return Requests.post('modifier', body)
  },
  updateModifier: (params) => {
    attachAdminAuthHeader()
    return Requests.patch('modifier/' + params.id, params.data)
  },
  getModifierCategories: (params) => {
    return Requests.get('modifier-categories', params)
  },
  createModifierCategory: (body) => {
    attachAdminAuthHeader()
    return Requests.post('modifier-category', body)
  },
  updateModifierCategory: (params) => {
    attachAdminAuthHeader()
    return Requests.patch('modifier-category/' + params.id, params.data)
  },
  importModifierCategories: (body) => {
    attachAdminAuthHeader()
    return Requests.post('import-modifier-categories', body)
  },
  importModifiers: (body) => {
    attachAdminAuthHeader()
    return Requests.post('import-modifiers', body)
  },
  getRestaurantProductModifier: (params) => {
    return Requests.get('restaurant-product-modifiers', params)
  },
  addRestaurantProductModifier: (params) => {
    attachAdminAuthHeader()
    return Requests.post('restaurant-product-modifier', params)
  },
  addMultipleRestaurantProductModifiers: (parmas) => {
    attachAdminAuthHeader()
    return Requests.post('create-multiple-restaurant-product-modifiers', parmas)
  },
  updateRestaurantProductModifier: (params) => {
    attachAdminAuthHeader()
    return Requests.patch('restaurant-product-modifier/' + params.id, params.obj)
  }
}

export const CashupAgent = {
  getCashup: (params) => {
    return Requests.get('cashups', params)
  },
  getAdvanceCashup: (params) => {
    return Requests.get('advance-cashes', params)
  }
}

export const CustomerAgent = {
  getCustomers: (params) => {
    return Requests.get('users', params)
  }
}
export const PaymentAgent = {
  getPayments: (params) => {
    attachAdminAuthHeader()
    return Requests.get('report/payments', params)
  },
  getPaymentMethod: (params) => {
    return Requests.get('payment-methods')
  },
}