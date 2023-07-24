<template>
  <div>
    <CommonComponent
      :columns="columns"
      :data="tableData"
      :tab="'QUANTITY_UNITS'"
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
    ...mapState("products", ["quantityUnits"]),
    columns() {
      let arr = [];
      let obj = {};
      let col = [];
      if (this.quantityUnits && this.quantityUnits.length != 0) {
        col = Object.keys(this.quantityUnits[0]);
        col.push("Actions");
        for (let i in col) {
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
      return this.quantityUnits && this.quantityUnits.length != 0
        ? this.quantityUnits
        : [];
    },
  },
  methods: {
    ...mapActions("products", ["getQuantityUnits"]),
    titleCase(string) {
      let str = null;
      str = string[0].toUpperCase() + string.substr(1).toLowerCase();
      str = str.split("_").join(" ");
      return str;
    },
  },
  created() {
    this.getQuantityUnits();
  },
  components: { CommonComponent },
};
</script>
