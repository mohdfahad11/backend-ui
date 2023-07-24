<template>
  <div id="chart" class="q-mt-sm">
    <q-card class="my-card">
      <apexchart
        type="bar"
        ref="radar"
        height="400"
        class="q-pa-sm"
        :options="orderOptions"
        :series="orderSeries"
      ></apexchart>
    </q-card>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import VueApexCharts from "vue-apexcharts";
import { date } from "quasar";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      // series: [
      //   {
      //     name: 'Net Profit',
      //     data: [44, 55, 57, 56, 61, 0 , 0]
      //   }
      // ],
    };
  },
  computed: {
    ...mapState("orders", ["orders", "refundedOrders"]),
    chartXData() {
      let newDate = new Date();
      let wD = date.getDayOfWeek(newDate);
      let firstDay = date.subtractFromDate(newDate, { days: wD });
      let lastDay = date.addToDate(firstDay, { days: 6 });
      let week = [];
      while (firstDay <= lastDay) {
        week.push(date.formatDate(firstDay, "YYYY-MM-DD"));
        firstDay = date.addToDate(firstDay, { days: 1 });
      }
      return week;
    },
    chartYSalesData() {
      let arr = [0, 0, 0, 0, 0, 0, 0];
      if (this.orders.length != 0) {
        this.orders.forEach((item) => {
          let dateformate = date.formatDate(item.created_at, "YYYY-MM-DD");
          arr[this.chartXData.indexOf(dateformate)] += item.total_amount * 1;

          arr[this.chartXData.indexOf(dateformate)] =
            arr[this.chartXData.indexOf(dateformate)].toFixed(2) * 1;
          // window.dispatchEvent(new Event("resize"));
        });
      }
      return arr;
    },
    chartYRefundData() {
      let arr = [0, 0, 0, 0, 0, 0, 0];
      if (this.refundedOrders.length != 0) {
        this.refundedOrders.forEach((item) => {
          let dateformate = date.formatDate(item.created_at, "YYYY-MM-DD");
          arr[this.chartXData.indexOf(dateformate)] +=
            item.order_line_items.line_item_total * 1;

          // window.dispatchEvent(new Event("resize"));
        });
      }
      return arr;
    },
    orderOptions() {
      return {
        chart: {
          type: "bar",
          height: 350,
        },
        title: {
          text: 'Transaction'
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "15%",
            endingShape: "rounded",
          },
        },
        colors: ["#1974d2", "#FF0000"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          title: {
            text: "Date",
          },
        },
        yaxis: {
          title: {
            text: "Total Amount",
          },
          decimalsInFloat: 0,
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val;
            },
          },
        },
        xaxis: {
          categories: this.chartXData,
        },
      };
    },
    orderSeries() {
      return [
        {
          name: "Total Sale",
          data: this.chartYSalesData,
        },
        {
          name: "Refunds",
          data: this.chartYRefundData,
        },
      ];
    },
  },
  created() {
    this.getOrders({
      page: 1,
      per_page: 9999,
    });
  },
  methods: {
    ...mapActions("orders", {
      getOrders: "getOrders",
    }),
  },
};
</script>
