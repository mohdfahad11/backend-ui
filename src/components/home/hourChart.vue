<template>
  <div id="chart" class="q-mt-sm">
    <q-card class="my-card full-height">
      <apexchart
        type="bar"
        ref="radar"
        height="400"
        class="q-pa-sm"
        :options="hourChartOptions"
        :series="hourSeries"
      ></apexchart>
    </q-card>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    ...mapState("restaurants", ["perHourSale"]),
    hourChartOptions() {
      return {
        chart: {
          type: "bar",
          height: 350,
        },
        title: {
          text: 'Per Hour Sale'
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "15%",
            endingShape: "rounded",
          },
        },
        colors: ["#67A457", "#FF0000"],
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
            text: "Hour",
          },
        },
        yaxis: {
          title: {
            text: "Total Sale",
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
          categories: this.perHourSale.x,
        },
      };
    },
    hourSeries() {
      return [
        {
          name: "Hour",
          data: this.perHourSale.y,
        }
      ];
    },
  },
  created() {
    this.getPerHourSale({date: this.date});
  },
  methods: {
    ...mapActions("restaurants", {
      getPerHourSale: "getPerHourSale",
    }),
  },
};
</script>
