<template>
  <div>
    <CommonComponent :columns="columns" :data="tableData" :tab="'MODIFIER_CATEGORIES'" />
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
      ...mapState('modifiers', ['modifierCategories']),
      columns() {
        let arr = []
        let obj = {}
        let col = []
        if(this.modifierCategories && this.modifierCategories.length != 0) {
          col = Object.keys(this.modifierCategories[0])
          col.push('Actions')
          for(let i in col) {
            if(col[i] == 'products') {
              continue;
            }
            if( i==0 ) {
              obj = {
                name: col[i],
                required: true,
                label: this.titleCase(col[i]),
                align: "left",
                field: row => row[col[i]],
                format: val => `${val}`,
                sortable: true,
                headerClasses: "bg-primary text-white"
              }
            } else {
              obj = {
                name: col[i],
                label: this.titleCase(col[i]),
                align: "left",
                field: col[i],
                sortable: true,
                headerClasses: "bg-primary text-white"
              }
            }
            arr.push(obj)
          }
        }
        return arr
      },
      tableData() {
        return this.modifierCategories && this.modifierCategories.length != 0 ? this.modifierCategories : []
      }
    },
    methods: {
      ...mapActions('modifiers', ['getModifierCategories']),
      titleCase(string) {
        let str = null
        str = string[0].toUpperCase() + string.substr(1).toLowerCase()
        str = str.split("_").join(" ");
        return str
      }
    },
    created() {
      this.getModifierCategories({
        page: 1,
        per_page: 10
      })

    },
    components: { CommonComponent }
}
</script>
