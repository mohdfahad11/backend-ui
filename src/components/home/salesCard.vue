<template>
  <div class="row full-width">
    <div class="col col-md-4 q-pa-sm">
      <q-card class="my-card row">
        <div class="col-3 bg-light-blue-4 flex flex-center">
          <q-icon name="attach_money" color="white" size="2.5rem"></q-icon>
        </div>
        <div class="col-9">
          <q-card-section class="q-pb-none q-pt-sm">
          <div class="text-h6 text-light-blue-5">Today's Sales</div>
          <div class="text-subtitle2 text-grey">{{ formatDateValue(formattedTodayDate) }}</div>
          </q-card-section>
          <q-card-section class="q-pb-xs q-pt-sm">
            <div class="text-h6 text-weight-bold">${{ totalDaySale }}</div>
          </q-card-section>
        </div>
      </q-card>
    </div>

    <div class="col col-md-4 q-pa-sm">
      <q-card class="my-card row">
        <div class="col-3 bg-indigo-3 flex flex-center">
          <q-icon name="attach_money" color="white" size="2.5rem"></q-icon>
        </div>
        <div class="col-9">
          <q-card-section class="q-pb-none q-pt-sm">
          <div class="text-h6 text-indigo-4">Weekly Sales</div>
          <div class="text-subtitle2 text-grey">{{ formatDateValue(currentWeek.firstDay) }} to
            {{ formatDateValue(currentWeek.lastDay) }}</div>
          </q-card-section>
          <q-card-section class="q-pb-xs q-pt-sm">
            <div class="text-h6 text-weight-bold">${{ totalWeekSale }}</div>
          </q-card-section>
        </div>
      </q-card>
    </div>

    <div class="col col-md-4 q-pa-sm">
      <q-card class="my-card row">
        <div class="col-3 bg-deep-orange-4 flex flex-center">
          <q-icon name="attach_money" color="white" size="2.5rem"></q-icon>
        </div>
        <div class="col-9">
          <q-card-section class="q-pb-none q-pt-sm">
          <div class="text-h6 text-deep-orange-6">Monthly Sales</div>
          <div class="text-subtitle2 text-grey">{{ formatDateValue(currentMonth.firstDay) }} to
            {{ formatDateValue(currentMonth.lastDay) }}</div>
          </q-card-section>
          <q-card-section class="q-pb-xs q-pt-sm">
            <div class="text-h6 text-weight-bold">${{ totalMonthSale }}</div>
          </q-card-section>
        </div>
      </q-card>
    </div>

    <div class="col col-md-4 q-pa-sm">
      <q-card class="my-card row">
        <div class="col-3 bg-pink-4 flex flex-center">
          <q-icon name="account_balance_wallet" color="white" size="2.5rem"></q-icon>
        </div>
        <div class="col-9">
          <q-card-section class="q-pb-none q-pt-sm">
          <div class="text-h6 text-pink-5">Today's Cash Collection</div>
          <div class="text-subtitle2 text-grey">{{ formatDateValue(formattedTodayDate) }}</div>
          </q-card-section>
          <q-card-section class="q-pb-xs q-pt-sm">
            <div class="text-h6 text-weight-bold">${{ totalCashSaleForToday }}</div>
          </q-card-section>
        </div>
      </q-card>
    </div>

    <div class="col col-md-4 q-pa-sm">
      <q-card class="my-card row">
        <div class="col-3 bg-green-4 flex flex-center">
          <q-icon name="credit_card" color="white" size="2.5rem"></q-icon>
        </div>
        <div class="col-9">
          <q-card-section class="q-pb-none q-pt-sm">
          <div class="text-h6 text-green-5">Today's Card Collection</div>
          <div class="text-subtitle2 text-grey">{{ formatDateValue(formattedTodayDate) }}</div>
          </q-card-section>
          <q-card-section class="q-pb-xs q-pt-sm">
            <div class="text-h6 text-weight-bold">${{ totalCardSaleForToday }}</div>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { date } from "quasar";
import moment from "moment";

export default {
  name: "PageIndex",
  computed: {
    ...mapState("orders", [
      "orders",
      "refundedOrders",
      "totalCashSaleForToday",
      "totalCardSaleForToday",
      "totalDaySale",
      "totalWeekSale",
      "totalMonthSale",
    ]),
    currentWeek() {
      let newDate = new Date();
      let wD = date.getDayOfWeek(newDate);
      let firstDay = date.subtractFromDate(newDate, { days: wD });
      let lastDay = date.addToDate(firstDay, { days: 6 });
      return {
        firstDay: date.formatDate(firstDay, "MM-DD-YYYY"),
        lastDay: date.formatDate(lastDay, "MM-DD-YYYY"),
      };
    },
    formattedTodayDate() {
      return date.formatDate(new Date(), "MM-DD-YYYY");
    },
    currentMonth() {
      let newDate = new Date();
      let firstDay = date.startOfDate(newDate, "month");
      let lastDay = date.endOfDate(newDate, "month");
      return {
        firstDay: date.formatDate(firstDay, "MM-DD-YYYY"),
        lastDay: date.formatDate(lastDay, "MM-DD-YYYY"),
      };
    },
    getCurrentWeek() {
      let newDate = new Date();
      let wD = date.getDayOfWeek(newDate);
      let firstDay = date.subtractFromDate(newDate, { days: wD });
      let lastDay = date.addToDate(firstDay, { days: 6 });
      let week = [];
      while (firstDay <= lastDay) {
        week.push(date.formatDate(firstDay, "DD-MM-YYYY"));
        firstDay = date.addToDate(firstDay, { days: 1 });
      }
      return week;
    },
  },
  methods: {
    ...mapActions("orders", [
      "getOrders",
      "getCashSalesForTheDay",
      "getCardSalesForTheDay",
      "getTotalSales",
    ]),
    formatDateValue(dateVal) {
      return date.formatDate(new Date(dateVal), "DD-MM-YYYY");
    },
  },
  created() {
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf("week");
    let weekEnd = currentDate.clone().endOf("week");
    let monthStart = currentDate.clone().startOf("month");
    let monthEnd = currentDate.clone().endOf("month");

    this.getCashSalesForTheDay({ date: currentDate.format("YYYY-MM-DD") });
    this.getCardSalesForTheDay({ date: currentDate.format("YYYY-MM-DD") });
    this.getTotalSales({
      date_from: currentDate.format("YYYY-MM-DD"),
      date_to: currentDate.format("YYYY-MM-DD"),
      commit_name: "SET_TOTAL_DAY_SALE",
    });
    this.getTotalSales({
      date_from: weekStart.format("YYYY-MM-DD"),
      date_to: weekEnd.format("YYYY-MM-DD"),
      commit_name: "SET_TOTAL_WEEK_SALE",
    });
    this.getTotalSales({
      date_from: monthStart.format("YYYY-MM-DD"),
      date_to: monthEnd.format("YYYY-MM-DD"),
      commit_name: "SET_TOTAL_MONTH_SALE",
    });
  },
};
</script>

<style></style>
