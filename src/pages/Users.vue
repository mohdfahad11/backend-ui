<template>
  <div>
    <CommonComponent :columns="columns" :data="tableData" :tab="'USERS'" />
  </div>
</template>

<script>
import CommonComponent from 'src/components/common/CommonComponent.vue';
import { mapState, mapActions } from 'vuex';
export default {
  components: { CommonComponent },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('users', ['users']),
    columns() {
      let arr = []
      let obj = {}
      let col = []
      if(this.users && this.users.length != 0) {
        col = Object.keys(this.users[0])
        col.push('Actions')
        for(let i in col) {
          if(col[i] == 'email_verified_at' || col[i] == 'password' || col[i] == 'remember_token' || col[i] == 'created_by' || col[i] == 'created_at' || col[i] == 'updated_at' || col[i] == 'updated_by' || col[i] == 'employer_id' ) {
            continue
          }
          if(col[i] == 'role_id') {
            col[i] = 'Type'
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
      return this.users && this.users.length != 0 ? this.users : []
    }
  },
  methods: {
    ...mapActions('users', ['getUsers', 'getUserRoleList']),
    titleCase(string) {
      let str = null
      str = string[0].toUpperCase() + string.substr(1).toLowerCase()
      str = str.split("_").join(" ");
      return str
    }
  },
  created() {
    // this.getUsers({
    //   page: 1,
    //   per_page: 10
    // })
    this.getUserRoleList()
  },
}
</script>
