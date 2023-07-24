<template>
  <div>
    <CommonComponent :columns="columns" :data="tableData" :tab="'CASHUP'" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CommonComponent from "../components/common/CommonComponent.vue";
export default {
  computed: {
    ...mapState("cashup", ["cashups"]),
    columns() {
      let arr = [];
      let obj = {};
      let col = [];
      if (this.cashups && this.cashups.length != 0) {
        col = Object.keys(this.cashups[0]);
        for (let i in col) {
          if (
            col[i] == "restaurant_id" ||
            col[i] == "cashup_done_at" ||
            col[i] == "note" ||
            col[i] == "active_user_id" ||
            col[i] == "witness_user_id" ||
            col[i] == "created_at" ||
            col[i] == "created_by" ||
            col[i] == "updated_at" ||
            col[i] == "updated_by" ||
            col[i] == "status"
          ) {
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
      return this.cashups && this.cashups.length != 0 ? this.cashups : [];
    },
  },
  methods: {
    ...mapActions("cashup", ["getCashup"]),
    titleCase(string) {
      let str = null;
      str = string[0].toUpperCase() + string.substr(1).toLowerCase();
      str = str.split("_").join(" ");
      return str;
    },
  },
  created() {
    this.getCashup();
  },
  components: { CommonComponent },
};
</script>
