<template>
  <div>
    <SalesCard />
    <div class="row">
      <Chart class="q-px-sm col-6"/>
      <HourSaleChart class="q-px-sm col-6"/>
    </div>
  </div>
</template>

<script>
import SalesCard from 'src/components/home/salesCard.vue'
import Chart from 'src/components/home/chart.vue';
import HourSaleChart from 'src/components/home/hourChart.vue'
import { mapActions } from 'vuex';
  export default {
    name: "PageIndex",
    computed: {},
    components: { SalesCard, Chart, HourSaleChart },
    created() {
      // this.initApplication()
    },
    methods: {
      ...mapActions('orders', ['getOrders', 'getRefundedOrders'])
    }
}
</script>

<style>
</style>
