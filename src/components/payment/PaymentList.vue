<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col col-4 q-pa-sm">
        <q-select
          v-model="searchPayment"
          :options="payment_method"
          label="Search Payment"
          outlined
          @input="searchData()"
          map-options
          :option-label="(item) => item.method"
          :option-value="(item) => item.id"
        />
      </div>
    </div>
    <div class="row shadow-20 bg-white">
      <div class="col col-12">
        <q-scroll-area style="width: 100%; height: 85vh;">
          <q-table
            ref="tableRef"
            :data="tableData"
            :columns="columns"
            row-key="name"
            :rows-per-page-options="[10,20,50,0]"
            flat
            :loading="loading"
          >
            <template v-slot:body-cell-created_at="props">
              <q-td :key="props.row.created_at">
                {{props.row.created_at.substr(0,10)}}
                <br>
                {{props.row.created_at.substr(11, 8)}}
              </q-td>
            </template>
            <template v-slot:body-cell-amount_paid="props">
              <q-td :key="props.row.amount_paid">
                ${{props.row.amount_paid}}
              </q-td>
            </template>
          </q-table>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
  export default {
    props: [],
    data() {
      return {
        loading: false,
        searchPayment: 1
      }
    },
    computed: {
      ...mapState('payments', ['payments', 'payment_method']),
      columns() {
        let arr = []
        let obj = {}
        let col = []
        if(this.payments && this.payments.length != 0) {
          col = Object.keys(this.payments[0])
          for(let i in col) {
            if(col[i] == 'users_order_payment_methods_created_byTousers' || col[i] == 'payment_method_id') {
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
        return this.payments && this.payments.length != 0 ? this.payments : []
      }
    },
    methods: {
      ...mapActions('payments', ['getPayments', 'getPaymentMethod']),
      titleCase(string) {
        let str = null
        str = string[0].toUpperCase() + string.substr(1).toLowerCase()
        str = str.split("_").join(" ");
        return str
      },
      searchData() {
        this.getPayments({payment_method_id: this.searchPayment.id})
      }
    },
    created() {
      this.getPaymentMethod()
      this.getPayments({payment_method_id: 1})
    }
  }
</script>