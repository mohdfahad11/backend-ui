<template>
  <div>
    <CommonComponent
      :columns="columns"
      :data="tableData"
      :tab="'REST_PRODUCTS'"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CommonComponent from "../components/common/CommonComponent.vue";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("categories", ["categories"]),
    ...mapState("restaurants", ["restaurantProducts", "restaurants"]),

    columns() {
      let arr = [];
      let obj = {};
      let col = [];
      if (this.restaurantProducts && this.restaurantProducts.length != 0) {
        col = Object.keys(this.restaurantProducts[0]);
        col.push("Actions");
        for (let i in col) {
          if (col[i] == "product_id" || col[i] == "discount_type") {
            continue;
          }
          if (col[i] == "products") {
            col[i] = "product";
          }
          if (col[i] == "restaurants") {
            col[i] = "restaurant";
          }
          if (col[i] == "discount_types") {
            col[i] = "discount_type";
          }
          if (i == 0) {
            obj = {
              name: col[i],
              required: true,
              label: this.titleCase(col[i]),
              align: "left",
              field: (row) => row[col[i]],
              format: (val) => `${val}`,
              sortable: true,
              headerClasses: "bg-primary text-white",
            };
          } else {
            obj = {
              name: col[i],
              label: this.titleCase(col[i]),
              align: "left",
              field: col[i],
              sortable: true,
              headerClasses: "bg-primary text-white",
            };
          }
          arr.push(obj);
        }
      }
      return arr;
    },
    tableData() {
      return this.restaurantProducts && this.restaurantProducts.length != 0
        ? this.restaurantProducts
        : [];
    },
  },
  methods: {
    ...mapActions("categories", ["getCategories"]),
    ...mapActions("restaurants", ["getRestaurants", "getRestaurantProducts"]),
    ...mapActions("products", ["getDiscountTypes"]),
    titleCase(string) {
      let str = null;
      str = string[0].toUpperCase() + string.substr(1).toLowerCase();
      str = str.split("_").join(" ");
      return str;
    },
  },
  created() {
    this.getRestaurantProducts({
      page: 1,
      per_page: 10,
    });
    this.getRestaurants();
    this.getDiscountTypes();
  },
  components: { CommonComponent },
};
</script>
