<template>
  <div class="q-pa-sm">
    <div class="row">
      <!-- <div class="col col-3 q-pr-sm">
        <q-input v-model="transactionDateFrom" type="text" label="Transaction Date From" debounce="1000" clearable outlined @change="searchData()" placeholder="YYYY/MM/DD"  stack-label />
      </div> -->
      <div class="col col-4 q-pr-sm">
        <q-input
          outlined
          v-model="transactionDateFrom"
          mask="date"
          label="From Date"
          class="q-mb-sm q-mx-xs"
          :key="fromDateKey"
          clearable
          @keyup.enter="searchData()"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qFromDateProxy"
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="transactionDateFrom"
                  @input="fromDateFunction"
                  :options="(date) => date <= currDate"
                >
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col col-4 q-pr-sm">
        <q-input
          outlined
          v-model="transactionDateTo"
          mask="date"
          label="To Date"
          class="q-mb-sm q-mx-xs"
          :key="toDateKey"
          clearable
          @keyup.enter="searchData()"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qToDateProxy"
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="transactionDateTo"
                  @input="toDateFunction"
                  :options="(date) => date <= currDate"
                >
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <!-- <div class="col col-4">
        <q-input v-model="orderNo" type="text" label="Order No." clearable outlined debounce="1000" @input="searchData()"  />
      </div> -->
    </div>
    <div class="row shadow-20 bg-white">
      <div class="col col-12">
        <q-scroll-area style="width: 100%; height: 85vh">
          <q-table
            ref="tableRef"
            :data="tableData"
            :columns="columns"
            row-key="name"
            :rows-per-page-options="[10, 20, 50, 0]"
            flat
            :pagination.sync="pagination"
            :loading="loading"
            @request="onRequest"
          >
            <template v-slot:body-cell-order_id="props">
              <q-td :key="props.row.id">
                {{ props.row.order_line_items.orders.id }}
              </q-td>
            </template>

            <template v-slot:body-cell-refund_types="props">
              <q-td :key="props.row.type">
                {{ props.row.refund_types.type }}
              </q-td>
            </template>

            <template v-slot:body-cell-refunded_at="props">
              <q-td :key="props.row.created_at">
                {{ props.row.created_at.substr(0, 10) }}
                <br />
                {{ props.row.created_at.substr(11, 8) }}
              </q-td>
            </template>
            <template v-slot:body-cell-item_name="props">
              <q-td :key="props.row.order_line_item_id">
                {{ props.row.order_line_items.products.name }}
              </q-td>
            </template>
            <template v-slot:body-cell-refund_amount="props">
              <q-td :key="props.row.type">
                ${{ props.row.order_line_items.line_item_total }}
              </q-td>
            </template>
            <!-- <template v-slot:body-cell-type="props">
              <q-td :key="props.row.name">
                {{props.row.order_types.type}}
              </q-td>
            </template> -->
          </q-table>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { date } from "quasar";
export default {
  props: [],
  data() {
    return {
      fromDateKey: 0,
      toDateKey: 0,
      loading: false,
      filter: "",
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10,
      },
      transactionDateFrom: null,
      transactionDateTo: null,
      showAddForm: false,
      orderDetails: null,
    };
  },
  computed: {
    ...mapState("orders", [
      "orders",
      "total_num",
      "refundedOrders",
      "totalRefundedOrders",
    ]),
    currDate() {
      return date.formatDate(new Date(), "YYYY/MM/DD");
    },
    columns() {
      let arr = [];
      let obj = {};
      let col = [];
      if (this.refundedOrders && this.refundedOrders.length != 0) {
        col = Object.keys(this.refundedOrders[0]);
        col.push("refund_amount");
        // col.push("Actions");
        for (let i in col) {
          if (col[i] == "id") {
            col[i] = "order_id";
          }
          if (col[i] == "order_line_item_id") {
            col[i] = "item_name";
          }
          if (col[i] == "created_at") {
            col[i] = "refunded_at";
          }
          if (
            col[i] == "type" ||
            col[i] == "refunded_by" ||
            col[i] == "order_line_items" ||
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
      return this.refundedOrders && this.refundedOrders.length != 0
        ? this.refundedOrders
        : [];
    },
  },
  mounted() {
    // get initial data from server (1st page)
    this.searchData();
  },
  methods: {
    ...mapActions("orders", ["getOrders", "getRefundedOrders"]),
    fromDateFunction() {
      this.$refs.qFromDateProxy.hide();
      this.fromDateKey++;
      this.searchData();
    },
    toDateFunction() {
      this.$refs.qToDateProxy.hide();
      this.toDateKey++;
      this.searchData();
    },
    openAddForm() {
      this.showAddForm = true;
      // this.mode = "ADD";
    },
    searchData() {
      this.onRequest({
        pagination: this.pagination,
      });
    },
    ViewTransaction(data) {
      this.showAddForm = true;
      this.orderDetails = Object.assign({}, data);
    },
    titleCase(string) {
      let str = null;
      str = string[0].toUpperCase() + string.substr(1).toLowerCase();
      str = str.split("_").join(" ");
      return str;
    },
    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      this.loading = true;

      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.totalRefundedOrders;

        const fetchCount =
          rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;

        this.getRefundedOrders({
          page: page,
          per_page: fetchCount,
          created_at_from: this.transactionDateFrom
            ? date.formatDate(this.transactionDateFrom, "YYYY/MM/DD")
            : null,
          created_at_to: this.transactionDateTo
            ? date.formatDate(this.transactionDateTo, "YYYY/MM/DD")
            : null,
        });
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;

        this.loading = false;
      }, 300);
    },
    // getRowsNumberCount (filter) {
    //   if (!filter) {
    //     return this.tableData.length
    //   }
    // }
  },
  created() {},
  components: {},
};
</script>
