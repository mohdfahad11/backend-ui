<template>
  <div>
    <CommonComponent
      :columns="columns"
      :data="tableData"
      :tab="'ADVANCECASHUP'"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CommonComponent from "../components/common/CommonComponent.vue";
export default {
  computed: {
    ...mapState("cashup", ["advancecashup"]),
    columns() {
      let arr = [];
      let obj = {};
      let col = [];
      if (this.advancecashup && this.advancecashup.length != 0) {
        col = Object.keys(this.advancecashup[0]);
        col.splice(4,0,'Difference')
        for (let i in col) {
          if (
            col[i] == "restaurant_id" ||
            col[i] == "active_user_id" ||
            col[i] == "witness_user_id" ||
            col[i] == "created_at" ||
            col[i] == "created_by" ||
            col[i] == "updated_at" ||
            col[i] == "updated_by"
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
      return this.advancecashup && this.advancecashup.length != 0
        ? this.advancecashup
        : [];
    },
  },
  methods: {
    ...mapActions("cashup", ["getAdvanceCashup"]),
    titleCase(string) {
      let str = null;
      str = string[0].toUpperCase() + string.substr(1).toLowerCase();
      str = str.split("_").join(" ");
      return str;
    },
  },
  created() {
    this.getAdvanceCashup();
  },
  components: { CommonComponent },
};
</script>
