<template>
  <div>
    <q-form class="q-gutter-md">
      <div class="row">
        <!-- <div class="col col-2 q-pa-sm">
          <span class="text-h6">Order Id: {{order.id}}</span>
        </div> -->
        <div class="col col-4 q-pa-sm text-left">
          <span class="text-h6">Order Type: {{ order.order_types.type }}</span>
        </div>
        <div class="col col-4 q-pa-sm text-center">
          <span class="text-h6">Total: ${{ order.total_amount }}</span>
        </div>
        <div class="col col-4 q-pa-sm text-right">
          <span class="text-h6"
            >Attendant: {{ order.users_orders_created_byTousers.name }}</span
          >
        </div>
        <hr />
        <div class="col col-12">
          <span class="text-h6">Order Line Items</span>
        </div>
        <div class="col col-2 q-pa-sm">
          <span class="text-bold">Sr No.</span>
        </div>
        <div class="col col-3 q-pa-sm">
          <span class="text-bold">Product</span>
        </div>
        <div class="col col-2 q-pa-sm">
          <span class="text-bold">Price</span>
        </div>
        <div class="col col-2 q-pa-sm">
          <span class="text-bold">Quantity</span>
        </div>
        <div class="col col-3 q-pa-sm">
          <span class="text-bold">Total</span>
        </div>
        <div
          class="col col-12"
          v-for="(item, index) in order.order_line_items"
          :key="index"
        >
          <div class="row">
            <div class="col col-2 q-pa-sm">
              {{ index + 1 }}
            </div>
            <div class="col col-3 q-pa-sm">
              <q-input v-model="item.products.name" type="text" disable dense />
            </div>
            <div class="col col-2 q-pa-sm">
              <q-input
                prefix="$"
                v-model="item.price"
                type="text"
                disable
                dense
              />
            </div>
            <div class="col col-2 q-pa-sm">
              <q-input v-model="item.quantity" type="text" disable dense />
            </div>
            <div class="col col-3 q-pa-sm">
              <q-input
                prefix="$"
                v-model="item.line_item_total"
                type="text"
                disable
                dense
              />
            </div>
          </div>
        </div>
        <hr />
        <div class="col col-12" v-if="hasModifiers">
          <span class="text-h6">Ordered Modifiers</span>
          <div class="flex q-py-md">
            <q-markup-table class="full-width" flat>
              <thead>
                <tr>
                  <th class="text-left">
                    <span class="text-bold text-subtitle2">Sr No.</span>
                  </th>
                  <th class="text-left">
                    <span class="text-bold text-subtitle2">Product</span>
                  </th>
                  <th class="text-left">
                    <span class="text-bold text-subtitle2">Modifiers</span>
                  </th>
                  <th class="text-left">
                    <span class="text-bold text-subtitle2">Price</span>
                  </th>
                </tr>
              </thead>
              <tbody
                v-for="(item, index) in order.order_line_items"
                :key="index"
              >
                <tr v-if="item.order_modifiers.length != 0">
                  <td class="text-left">{{ index }}</td>
                  <td>{{ item.products.name }}</td>
                  <td>
                    <div
                      class="row"
                      v-for="(mod, ind) in item.order_modifiers"
                      :key="ind"
                    >
                      -
                      {{ mod.restaurant_product_modifiers.modifiers.modifier }}
                    </div>
                  </td>
                  <td>
                    <div
                      class="row"
                      v-for="(mod, ind) in item.order_modifiers"
                      :key="ind"
                    >
                      ${{ mod.price }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </div>

        <div class="col col-12">
          <span class="text-h6">Discount & Surcharge</span>
        </div>

        <div class="col col-3">
          <p class="text-subtitle2 text-bold">Discount</p>
          <p v-if="order.discount && order.discount_type === 2">
            {{ order.discount }}%
          </p>
          <p v-else>${{ order.discount }}</p>
        </div>
        <div class="col col-3">
          <p class="text-subtitle2 text-bold">Surcharge</p>
          <p v-if="order.surcharge_amount && order.surcharge_type === 2">
            {{ order.surcharge_amount }}%
          </p>
          <p v-else>${{ order.surcharge_amount }}</p>
        </div>
        <div class="col col-3">
          <p class="text-subtitle2 text-bold">Waiting Time (Mins)</p>
          <p>
            {{
              order.waiting_time !== null
                ? timeDiff(order.created_at, order.waiting_time)
                : "-"
            }}
          </p>
        </div>
        <div class="col col-3">
          <p class="text-subtitle2 text-bold">Delivery Time (Mins)</p>
          <p>
            {{
              order.delivery_time !== null
                ? timeDiff(order.created_at, order.delivery_time)
                : "-"
            }}
          </p>
        </div>

        <div class="col col-12 q-mb-md">
          <q-input
            v-model="order.discount_reason"
            type="textarea"
            label="Note"
            outlined
            disable
          />
        </div>

        <div class="col col-12">
          <span class="text-h6">Payment Details</span>
        </div>
        <div class="col col-2 q-pa-sm">
          <span class="text-bold">Sr No.</span>
        </div>
        <div class="col col-5 q-pa-sm">
          <span class="text-bold">Payment Method</span>
        </div>
        <div class="col col-5 q-pa-sm">
          <span class="text-bold">Amount Paid</span>
        </div>
        <div
          class="col col-12"
          v-for="(item, ind) in order.order_payment_methods"
          :key="item.id"
        >
          <div class="row">
            <div class="col col-2 q-pa-sm">
              {{ ind + 1 }}
            </div>
            <div class="col col-5 q-pa-sm">
              <q-input
                v-model="item.payment_methods.method"
                type="text"
                disable
                dense
              />
            </div>
            <div class="col col-5 q-pa-sm">
              <q-input
                prefix="$"
                v-model="item.amount_paid"
                type="text"
                disable
                dense
              />
            </div>
          </div>
        </div>

        <div class="col col-12 q-pa-sm">
          <q-input v-model="order.note" type="textarea" label="Note" outlined />
        </div>
        <hr />
        <div class="col col-12">
          <span class="text-h6">Customer Details</span>
        </div>
        <div class="col col-4 q-pa-sm">
          <q-input
            :value="
              order.customer_name ||
              (order.users_orders_ordered_byTousers
                ? order.users_orders_ordered_byTousers.name
                : '')
            "
            type="text"
            label="Name"
            disable
          />
        </div>
        <div class="col col-4 q-pa-sm">
          <q-input
            :value="
              order.customer_email ||
              (order.users_orders_ordered_byTousers
                ? order.users_orders_ordered_byTousers.email
                : '')
            "
            type="text"
            label="Email"
            disable
          />
        </div>
        <div class="col col-4 q-pa-sm">
          <q-input
            :value="
              order.customer_phone_number ||
              (order.users_orders_ordered_byTousers
                ? order.users_orders_ordered_byTousers.phone_no
                : '')
            "
            type="text"
            label="Phone Number"
            disable
          />
        </div>
      </div>
      <div class="text-center">
        <q-btn label="Close" color="primary" @click="closeForm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["tab", "orderDetails"],
  data() {
    return {};
  },
  methods: {
    closeForm() {
      this.$emit("update:showAddForm", false);
    },
    timeDiff(createdAt, deliveryOrWaitingTime) {
      // return moment(createdAt, "HH:mm:ss").diff(
      //   moment(deliveryOrWaitingTime, "HH:mm:ss"),
      //   "minutes"
      // );
      return moment(moment.utc(deliveryOrWaitingTime).utcOffset('+10:00').format('HH:mm:ss'), "HH:mm:ss").diff(
        moment(moment.utc(createdAt).utcOffset('+10:00').format('HH:mm:ss'), "HH:mm:ss"),
        "minutes"
      );
    },
  },
  computed: {
    hasModifiers() {
      return this.order.order_line_items.some(
        (item) => item.order_modifiers.length > 0
      );
    },
    order() {
      return this.orderDetails ? this.orderDetails : {};
    },
  },
};
</script>
