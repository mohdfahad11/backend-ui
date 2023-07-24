<template>
  <div>
    <ValidationObserver v-slot="{ invalid }" ref="observer">
      <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
        <div class="row">
          <div class="col q-pa-sm">
            <span>Name*:</span>
            <ValidationProvider name="Name" rules="required" v-slot="v">
              <q-input
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                :value="entity.products.name"
                type="text"
                outlined
                disable
              />
            </ValidationProvider>
          </div>
          <!-- <div class="col col-6 q-pa-sm">
          <span>Quantity*:</span>
          <ValidationProvider
            name="Quantity"
            rules="required|numeric|min_value:0"
            v-slot="v"
          >
            <q-input :error="v.errors.length > 0" :error-message="v.errors[0]" v-model="entity.quantity" type="text" outlined />
          </ValidationProvider>
        </div>
        <div class="col col-6 q-pa-sm">
          <span>Quantity Unit*:</span>
          <ValidationProvider
            name="Quantity Unit"
            rules="required|numeric"
            v-slot="v"
          >
            <q-select :error="v.errors.length > 0" :error-message="v.errors[0]" v-model="entity.quantity_unit" :options="quantityUnitOptions"  map-options emit-value outlined />
          </ValidationProvider>
        </div> -->
          <div class="col col-6 q-pa-sm">
            <span>Price*:</span>
            <ValidationProvider name="Price" rules="required" v-slot="v">
              <q-input
                prefix="$"
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                v-model="actualPrice"
                type="text"
                outlined
              />
            </ValidationProvider>
          </div>
          <!-- <div class="col col-6 q-pa-sm">
            <span>Discount:</span>
            <ValidationProvider name="Discount" rules="numeric" v-slot="v">
              <q-input
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                v-model="actualDiscount"
                type="text"
                outlined
              />
            </ValidationProvider>
          </div>
          <div class="col col-6 q-pa-sm">
            <span>Discount Type:</span>
            <ValidationProvider name="Discount Type" rules="numeric" v-slot="v">
              <q-select
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                v-model="actualDiscountType"
                :options="discountTypes"
                map-options
                emit-value
                :option-label="(item) => item.type"
                :option-value="(item) => item.id"
                outlined
              />
            </ValidationProvider>
          </div> -->

          <div class="col col-12 q-pa-sm">
            <q-toggle
              v-model="status"
              color="primary"
              label="Active"
              left-label
            />
          </div>
        </div>
        <div class="text-center">
          <q-btn
            label="Submit"
            :disable="invalid"
            type="submit"
            color="primary"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            outline
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  props: ["tab", "mode", "entityDetails"],
  data() {
    return {
      isActive: true,
      category: null,
      productImage: null,
      localEntity: {
        products: {
          name: null,
        },
        quantity: null,
        quantity_unit: null,
        price: null,
        discount: null,
        discount_type: null,
        status: null,
      },
      entityClone: {},
    };
  },
  methods: {
    // ...mapActions('categories', ['getCategories', 'updateAttachment', 'deleteAttachment', 'createAttachment']),
    ...mapActions("products", [
      "createProduct",
      "updateProduct",
      "getQuantityUnits",
    ]),
    ...mapActions("restaurants", [
      "getRestaurants",
      "getRestaurantsForProduct",
      "updateRestaurantProducts",
    ]),
    // onPhotoUpload() {
    //   this.imgSrc = URL.createObjectURL(this.productImage)
    // },
    // callPhotoInput() {
    //   this.$refs.prodImg.$el.click()
    // },
    onSubmit() {
      let obj = {};
      this.entityClone.price != this.entity.price
        ? (obj["price"] = this.actualPrice * 1)
        : null;
      this.entityClone.discount != this.entity.discount
        ? (obj["discount"] = this.actualDiscount * 1)
        : null;
      this.entityClone.discount_type != this.entity.discount_type
        ? (obj["discount_type"] = this.actualDiscountType * 1)
        : null;
      this.entityClone.status != this.entity.status
        ? (obj["status"] = Number(this.status))
        : null;
      this.updateRestaurantProducts({
        restaurant_product_id: parseInt(this.entity.id),
        body: obj,
      }).then(() => {
        this.$emit("update:showAddForm", false);
      });
    },

    onReset() {
      this.status = true;
      (this.entity.price = null),
        (this.entity.discount = null),
        (this.entity.discount_type = null);
    },
  },
  computed: {
    ...mapState("categories", ["categories", "attachment"]),
    ...mapState("products", ["quantityUnits", "discountTypes"]),
    ...mapState("restaurants", ["restaurants"]),
    ...mapGetters("restaurants", ["restaurantsForProduct"]),
    entity() {
      return this.mode == "EDIT" && this.entityDetails
        ? this.entityDetails
        : this.localEntity;
    },
    actualPrice: {
      get() {
        if (this.mode == "EDIT") {
          return this.entity.price !== null
            ? this.entity.price
            : this.entity.products.price;
        } else {
          return this.localEntity.price;
        }
      },
      set(val) {
        this.entity.price = val;
      },
    },
    actualDiscount: {
      get() {
        if (this.mode == "EDIT") {
          return this.entity.discount !== null
            ? this.entity.discount
            : this.entity.products.discount;
        } else {
          return this.localEntity.discount;
        }
      },
      set(val) {
        this.entity.discount = val;
      },
    },
    actualDiscountType: {
      get() {
        if (this.mode == "EDIT") {
          return this.entity.discount_type !== null
            ? this.entity.discount_type
            : this.entity.products.discount_type;
        } else {
          return this.localEntity.discount_type;
        }
      },
      set(val) {
        this.entity.discount_type = val;
      },
    },
    status: {
      get() {
        let st =
          this.mode == "EDIT" && this.entity
            ? Boolean(this.entity.status)
            : this.isActive;
        return st;
      },
      set(val) {
        this.mode == "EDIT" && this.entity
          ? (this.entity.status = val)
          : (this.isActive = val);
      },
    },
    quantityUnitOptions() {
      let temp = [];
      if (this.quantityUnits && this.quantityUnits.length !== 0) {
        temp = this.quantityUnits
          .map((v) => {
            if (v.status == 1) {
              return { label: v.unit, value: v.id };
            }
          })
          .filter(Boolean);
      }
      return temp;
    },
    // prodImg() {
    //   return this.mode == 'EDIT' && Object.keys(this.attachment).length !=0 ? this.attachment.upload_path : this.productImage
    // }
  },
  created() {
    this.entityClone =
      this.mode == "EDIT" && this.entityDetails
        ? Object.assign({}, this.entityDetails)
        : {};
    this.quantityUnits && this.quantityUnits.length !== 0
      ? null
      : this.getQuantityUnits();
  },
};
</script>
