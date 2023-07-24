<template>
  <div>
    <CommonComponent :columns="columns" :data="tableData" :tab="'CUSTOMERS'" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CommonComponent from "../components/common/CommonComponent.vue";
export default {
  computed: {
    ...mapState("customer", ["customers"]),
    columns() {
      let arr = [];
      let obj = {};
      let col = [];
      if (this.customers && this.customers.length != 0) {
        col = Object.keys(this.customers[0]);
        for (let i in col) {
          if (col[i] == "id" || col[i] == "role_id") {
            continue;
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
      return this.customers && this.customers.length != 0 ? this.customers : [];
    },
  },
  methods: {
    ...mapActions("customer", ["getCustomers"]),
    titleCase(string) {
      let str = null;
      str = string[0].toUpperCase() + string.substr(1).toLowerCase();
      str = str.split("_").join(" ");
      return str;
    },
  },
  created() {
    this.getCustomers({
      role: 3,
    });
  },
  components: { CommonComponent },
};
</script>
