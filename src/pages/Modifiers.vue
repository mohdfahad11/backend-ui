<template>
  <div>
    <CommonComponent :columns="columns" :data="tableData" :tab="'MODIFIERS'" />
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
      ...mapState('modifiers', ['modifiers']),
      columns() {
        let arr = []
        let obj = {}
        let col = []
        if(this.modifiers && this.modifiers.length != 0) {
          col = Object.keys(this.modifiers[0])
          col.push('Actions')
          for(let i in col) {
            if(col[i] == 'modifier_category_id') {
              col[i] ='modifier_category'
            }
            if(col[i] == 'created_at' || col[i]== 'created_by' || col[i] == 'updated_at' || col[i]== 'updated_by' || col[i]=='modifier_categories') {
              continue
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
        return this.modifiers && this.modifiers.length != 0 ? this.modifiers : []
      }
    },
    methods: {
      ...mapActions('modifiers', ['getModifiers']),
      titleCase(string) {
        let str = null
        str = string[0].toUpperCase() + string.substr(1).toLowerCase()
        str = str.split("_").join(" ");
        return str
      }
    },
    created() {
      this.getModifiers({
        page: 1,
        per_page: 10
      })

    },
    components: { CommonComponent }
}
</script>
