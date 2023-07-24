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
          @clear="searchData()"
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
          @clear="searchData()"
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
      <!-- <div class="col col-3 q-pr-sm">
        <q-input v-model="transactionDateTo" type="text" label="Transaction Date To" clearable outlined debounce="1000" @change="searchData()" placeholder="YYYY/MM/DD"  stack-label />
      </div> -->
      <div class="col col-4">
        <q-input
          v-model="orderNo"
          type="text"
          label="Order No."
          clearable
          outlined
          debounce="1000"
          @input="searchData()"
        />
      </div>
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
            <template v-slot:body-cell-Actions="props">
              <q-td :key="props.row.name">
                <q-btn
                  round
                  color="primary"
                  icon="remove_red_eye"
                  class="q-mx-xs"
                  @click="ViewTransaction(props.row)"
                />
              </q-td>
            </template>
            <!-- <template v-slot:body-cell-status="props">
              <q-td :key="props.row.name">
                <span v-if="(props.row.status == 1)" class="text-green">
                  Active
                </span>
                <span v-else class="text-orange">
                  Inactive
                </span>
              </q-td>
            </template> -->
            <template v-slot:body-cell-created_at="props">
              <q-td :key="props.row.created_at">
                {{ props.row.created_at.substr(0, 10) }}
                <br />
                {{ getAusTime(props) }}
              </q-td>
            </template>
            <template v-slot:body-cell-discount="props">
              <q-td :key="props.row.name" v-if="props.row.discount_type === 2">
                {{ props.row.discount ? props.row.discount + "%" : "0%" }}
              </q-td>
              <q-td :key="props.row.name" v-else>
                {{ props.row.discount ? "$" + props.row.discount : "$0" }}
              </q-td>
            </template>
            <template v-slot:body-cell-surcharge_amount="props">
              <q-td :key="props.row.name" v-if="props.row.surcharge_type === 2">
                {{
                  props.row.surcharge_amount
                    ? props.row.surcharge_amount + "%"
                    : "0%"
                }}
              </q-td>
              <q-td :key="props.row.name" v-else>
                {{
                  props.row.surcharge_amount
                    ? "$" + props.row.surcharge_amount
                    : "$0"
                }}
              </q-td>
            </template>
            <template v-slot:body-cell-type="props">
              <q-td :key="props.row.name">
                {{ props.row.order_types.type }}
              </q-td>
            </template>
            <template v-slot:body-cell-order_payment_methods="props">
              <q-td :key="props.row.name">
                <p
                  class="q-mb-none"
                  v-for="method in getUniquePaymentMethods(props.row.order_payment_methods)"
                  :key="method.id"
                >
                  {{ method.payment_methods.method }}
                </p>
              </q-td>
            </template>
            <template v-slot:body-cell-ordered_by="props">
              <q-td :key="props.row.name">
                {{
                  props.row.users_orders_ordered_byTousers
                    ? props.row.users_orders_ordered_byTousers.name
                    : ""
                }}
              </q-td>
            </template>
            <template v-slot:body-cell-attendant="props">
              <q-td :key="props.row.id + 'A'">
                {{ props.row.users_orders_created_byTousers.name }}
              </q-td>
            </template>
          </q-table>
        </q-scroll-area>
      </div>
    </div>

    <q-dialog v-model="showAddForm" persistent>
      <q-card style="min-width: 850px">
        <q-card-actions align="right" class="bg-primary">
          <div class="col col-10 text-h6 text-white text-bold">
            <span class="q-px-sm q-py-sm rounded-borders"
              >Order Id: {{ orderDetails ? orderDetails.id : null }}
            </span>
          </div>
          <div class="col col-2 text-right">
            <q-btn
              icon="close"
              color="red"
              class="q-py-sm"
              v-close-popup
              padding=""
            />
          </div>
        </q-card-actions>
        <q-card-section>
          <ViewTransactionDetails
            :orderDetails="orderDetails"
            :tab="'TRANSACTIONS'"
            :showAddForm.sync="showAddForm"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ViewTransactionDetails from "./ViewTransactionDetails.vue";
import { date } from "quasar";
import moment from 'moment';

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
      orderNo: null,
      showAddForm: false,
      orderDetails: null,
    };
  },
  computed: {
    ...mapState("orders", ["orders", "total_num"]),
    currDate() {
      return date.formatDate(new Date(), "YYYY/MM/DD");
    },
    columns() {
      let arr = [];
      let obj = {};
      let col = [];
      if (this.orders && this.orders.length != 0) {
        col = Object.keys(this.orders[0]);
        col.push("Actions");
        for (let i in col) {
          if (
            col[i] == "ordered_by" ||
            col[i] == "delivery_time" ||
            col[i] == "waiting_time" ||
            col[i] == "restaurants" ||
            col[i] == "discount_type" ||
            col[i] == "discount_types" ||
            col[i] == "customer_email" ||
            col[i] == "customer_phone_number" ||
            col[i] == "order_line_items" ||
            col[i] == "note" ||
            col[i] == "order_types" ||
            col[i] == "customer_name" ||
            col[i] == "users_orders_ordered_byTousers" ||
            col[i] == "discount_reason" ||
            col[i] == "surcharge_type" ||
            col[i] == "status"
          ) {
            continue;
          }
          if (col[i] == "users_orders_created_byTousers") {
            col[i] = "attendant";
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
      return this.orders && this.orders.length != 0 ? this.orders : [];
    },
  },
  mounted() {
    // get initial data from server (1st page)
    this.searchData();
  },
  methods: {
    ...mapActions("orders", ["getOrders"]),
    fromDateFunction() {
      this.$refs.qFromDateProxy.hide();
      this.fromDateKey++;
      this.searchData();
    },
    getUniquePaymentMethods(orderPaymentMethods) {
      const uniqueMethods = [];
      const methodIds = [];

      for (const method of orderPaymentMethods) {
        const methodId = method.payment_methods.id;
        if (!methodIds.includes(methodId)) {
          methodIds.push(methodId);
          uniqueMethods.push(method);
        }
      }

      return uniqueMethods;
    },
    getAusTime(props) {
      return moment.utc(props.row.created_at).utcOffset('+10:00').format('HH:mm:ss');
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
      let totalRows = this.total_num;

      const fetchCount = rowsPerPage === 0 ? totalRows : rowsPerPage;
      this.getOrders({
        page: page,
        per_page: fetchCount,
        created_at_from: this.transactionDateFrom
          ? date.formatDate(this.transactionDateFrom, "YYYY/MM/DD")
          : null,
        id: this.orderNo,
        created_at_to: this.transactionDateTo
          ? date.formatDate(this.transactionDateTo, "YYYY/MM/DD")
          : null,
      });
      setTimeout(() => {
        this.pagination.rowsNumber = this.total_num;
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;

        this.loading = false;
      }, 300);
    },
  },
  created() {},
  components: { ViewTransactionDetails },
};
</script>
