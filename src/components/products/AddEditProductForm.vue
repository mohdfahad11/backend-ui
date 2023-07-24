<template>
  <div>
    <ValidationObserver v-slot="{ invalid }" ref="observer">
      <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
        <div class="row">
          <div class="col col-6 q-pa-sm">
            <span>Name*:</span>
            <ValidationProvider
              name="Name"
              rules="required|alpha_spaces"
              v-slot="v"
            >
              <q-input
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                v-model="entity.name"
                type="text"
                outlined
              />
            </ValidationProvider>
          </div>
          <div class="col col-6 q-pa-sm">
            <span>Category*:</span>
            <ValidationProvider name="Category" rules="required" v-slot="v">
              <q-select
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                v-model="entity.category_id"
                :options="categoryOptions"
                map-options
                emit-value
                outlined
              />
            </ValidationProvider>
          </div>
          <div class="col col-4 q-pa-sm">
            <span>Quantity*:</span>
            <ValidationProvider
              name="Quantity"
              rules="required|numeric|min_value:0"
              v-slot="v"
            >
              <q-input
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                v-model="entity.quantity"
                type="text"
                outlined
              />
            </ValidationProvider>
          </div>
          <div class="col col-4 q-pa-sm">
            <span>Quantity Unit*:</span>
            <ValidationProvider
              name="Quantity Unit"
              rules="required|numeric"
              v-slot="v"
            >
              <q-select
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                v-model="entity.quantity_unit"
                :options="quantityUnitOptions"
                map-options
                emit-value
                outlined
              />
            </ValidationProvider>
          </div>
          <div class="col col-4 q-pa-sm">
            <span>Barcode:</span>
            <ValidationProvider
              name="Barcode"
              rules="numeric|min_value:0"
              v-slot="v"
            >
              <q-input
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                v-model="entity.barcode"
                type="text"
                outlined
              />
            </ValidationProvider>
          </div>
          <div class="col col-6 q-pa-sm">
            <span>Price* :</span>
            <ValidationProvider
              name="Price"
              rules="required|min_value:0"
              v-slot="v"
            >
              <q-input
                prefix="$"
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                v-model="entity.price"
                type="text"
                outlined
              />
            </ValidationProvider>
          </div>
          <div class="col col-6 q-pa-sm">
            <span>Restaurants*:</span>
            <ValidationProvider name="Restaurants" rules="required" v-slot="v">
              <q-select
                outlined
                v-model="restaurantIds"
                multiple
                map-options
                :options="restaurants"
                :option-label="(item) => item.name"
                :option-value="(item) => item.id"
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                style="width: 250px"
              ></q-select>
            </ValidationProvider>
          </div>
          <div class="col col-6 q-pa-sm">
            <span>Discount:</span>
            <ValidationProvider name="Discount" rules="" v-slot="v">
              <q-input
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                v-model="entity.discount"
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
                v-model="entity.discount_type"
                :options="discountTypes"
                map-options
                emit-value
                :option-label="(item) => item.type"
                :option-value="(item) => item.id"
                outlined
              />
            </ValidationProvider>
          </div>
          <div class="col col-6 q-pa-sm">
            <span>Description:</span>
            <ValidationProvider name="Name" rules="alpha_spaces" v-slot="v">
              <q-input
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                v-model="entity.description"
                type="textarea"
                outlined
              />
            </ValidationProvider>
          </div>

          <div class="col col-6 q-pa-sm">
            <span>Image:</span>
            <br />
            <q-btn
              @click="callPhotoInput"
              class="q-mb-md full-width"
              :ripple="false"
            >
              <q-btn
                padding="none"
                flat
                @click.stop="deleteConfirm = true"
                class="absolute-right"
                style="height: 40px"
                v-if="attachment && Object.keys(attachment).length != 0"
              >
                <q-avatar size="35px">
                  <img src="~assets/images/delete.png" alt="" />
                </q-avatar>
              </q-btn>
              <q-avatar size="122px" square>
                <img v-if="productImage" :src="imgSrc" />
                <img
                  v-else-if="
                    mode == 'EDIT' && Object.keys(attachment).length != 0
                  "
                  :src="attachment.upload_path"
                  alt=""
                />
                <img v-else src="~assets/images/add_image.png" alt="" />
              </q-avatar>
            </q-btn>
            <q-file
              v-model="productImage"
              ref="prodImg"
              :label="tab == 'PRODUCTS' ? 'Product Image' : 'Category Image'"
              outlined
              accept="image/*"
              @input="onPhotoUpload"
              max-file-size="1000000"
              style="display: none"
            />
          </div>

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

    <q-dialog v-model="deleteConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure, you want to delete image?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="red"
            v-close-popup
            @click="deleteImage()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import notifications from "src/boot/notifications";
import _ from "lodash";
export default {
  props: ["tab", "mode", "entityDetails"],
  data() {
    return {
      isActive: true,
      category: null,
      productImage: null,
      localEntity: {
        name: null,
        description: null,
        quantity: null,
        quantity_unit: null,
        price: null,
        barcode: null,
        discount: null,
        discount_type: null,
        status: null,
        created_by: null,
        category_id: null,
      },
      imgSrc: null,
      deleteConfirm: false,
      entityClone: {},
      deletedRestaurantIds: [],
      addedRestaurantIds: [],
    };
  },
  methods: {
    ...mapActions("categories", [
      "getCategories",
      "updateAttachment",
      "deleteAttachment",
      "createAttachment",
    ]),
    ...mapActions("products", [
      "createProduct",
      "updateProduct",
      "getQuantityUnits",
      "deleteRestaurantProduct",
      "createRestaurantProducts",
    ]),
    ...mapActions("restaurants", [
      "getRestaurants",
      "getRestaurantsForProduct",
    ]),
    onPhotoUpload() {
      this.imgSrc = URL.createObjectURL(this.productImage);
    },
    callPhotoInput() {
      this.$refs.prodImg.$el.click();
    },
    onSubmit() {
      let obj = new FormData();
      obj.append("name", this.entity.name);
      this.entity.description
        ? obj.append("description", this.entity.description)
        : null;
      obj.append("quantity", this.entity.quantity * 1);
      obj.append("quantity_unit", this.entity.quantity_unit);
      obj.append("price", this.entity.price * 1);
      this.entity.barcode
        ? obj.append("barcode", this.entity.barcode * 1)
        : null;
      obj.append("discount", this.entity.discount * 1);
      obj.append(
        "discount_type",
        this.entity.discount_type ? this.entity.discount_type * 1 : 1
      );
      obj.append("status", Number(this.status));
      obj.append("category_id", this.entity.category_id);
      this.productImage ? obj.append("attachment", this.productImage) : null;
      for (let i = 0; i < this.restaurantIds.length; i++) {
        obj.append("restaurant_ids[]", parseInt(this.restaurantIds[i].id));
      }

      if (this.mode == "ADD") {
        this.createProduct(obj).then(() => {
          this.onReset();
          this.$store.commit("categories/GET_ATTACHMENT", {});
          this.$emit("update:showAddForm", false);
        });
      } else {
        this.getAddedAndDeletedRestaurantIds();
        if (this.productImage) {
          if (
            this.entityClone.status != Number(this.status) ||
            this.entity.name != this.entityClone.name ||
            this.entity.description != this.entityClone.description ||
            this.entity.quantity * 1 != this.entityClone.quantity * 1 ||
            this.entity.quantity_unit != this.entityClone.quantity_unit ||
            this.entity.price * 1 != this.entityClone.price * 1 ||
            this.entity.discount * 1 != this.entityClone.discount * 1 ||
            this.entity.discount_type != this.entityClone.discount_type ||
            this.entity.category_id != this.entityClone.category_id ||
            this.entity.barcode * 1 != this.entityClone.barcode * 1
          ) {
            obj.set("attachment", null);
            this.updateProduct({ id: this.entity.id, data: obj }).then(() => {
              this.onReset();
              this.$store.commit("categories/GET_ATTACHMENT", {});
              this.$emit("update:showAddForm", false);
            });
          }
          if (Object.keys(this.attachment).length != 0) {
            let FD = new FormData();
            FD.append("attachment", this.productImage);
            this.updateAttachment({
              id: this.attachment.id,
              module_type: 2,
              module_id: this.entity.id,
              body: FD,
            }).then(() => {
              this.onReset();
              this.$store.commit("categories/GET_ATTACHMENT", {});
              this.$emit("update:showAddForm", false);
            });
          } else {
            let FD = new FormData();
            FD.append("module_type", 2);
            FD.append("module_id", this.entity.id);
            FD.append("attachment", this.productImage);
            this.createAttachment(FD).then(() => {
              this.onReset();
              this.$store.commit("categories/GET_ATTACHMENT", {});
              this.$emit("update:showAddForm", false);
            });
          }
        } else {
          if (
            this.entityClone.status != Number(this.status) ||
            this.entity.name != this.entityClone.name ||
            this.entity.description != this.entityClone.description ||
            this.entity.quantity * 1 != this.entityClone.quantity * 1 ||
            this.entity.quantity_unit != this.entityClone.quantity_unit ||
            this.entity.price * 1 != this.entityClone.price * 1 ||
            this.entity.discount * 1 != this.entityClone.discount * 1 ||
            this.entity.discount_type != this.entityClone.discount_type ||
            this.entity.category_id != this.entityClone.category_id ||
            this.entity.barcode * 1 != this.entityClone.barcode * 1
          ) {
            this.updateProduct({ id: this.entity.id, data: obj }).then(() => {
              this.onReset();
              this.$store.commit("categories/GET_ATTACHMENT", {});
              this.$emit("update:showAddForm", false);
            });
          } else {
            this.$store.commit("categories/GET_ATTACHMENT", {});
            this.$emit("update:showAddForm", false);
          }
        }
      }
    },
    deleteImage() {
      this.deleteAttachment({
        id: parseInt(this.attachment.id),
        module_type: parseInt(this.attachment.module_type),
        module_id: parseInt(this.attachment.module_id),
      }).then(() => {
        this.$store.commit("categories/GET_ATTACHMENT", {});
        notifications.successNotify("Image is deleted successfully!");
      });
    },
    onReset() {
      this.status = true;
      (this.entity.name = null),
        (this.entity.description = null),
        (this.entity.quantity = null),
        (this.entity.quantity_unit = null),
        (this.entity.price = null),
        (this.entity.barcode = null),
        (this.entity.discount = null),
        (this.entity.discount_type = null),
        (this.entity.category_id = null);
    },
    init() {
      this.categories && this.categories.length !== 0
        ? null
        : this.getCategories({
            per_page: 9999,
          });
      this.quantityUnits && this.quantityUnits.length !== 0
        ? null
        : this.getQuantityUnits();

      this.restaurants && this.restaurants.length !== 0
        ? null
        : this.getRestaurants();

      if (this.mode == "EDIT" && this.entityDetails) {
        this.getRestaurantsForProduct({ product_id: this.entityDetails.id });
      }
    },
    initSelectValues() {
      if (this.mode == "ADD") {
        this.entity.category_id = this.categoryOptions[0];
        this.entity.restaurantIds = this.restaurants[0].id;
        this.entity.discount_type - this.discountTypes[0].id;
        this.entity.quantity_unit = this.quantityUnitOptions[0];
      }
    },
    getAddedAndDeletedRestaurantIds() {
      const deletedIds = _.differenceBy(
        this.restaurantsForProduct,
        this.restaurantIds,
        "id"
      );
      const addedIds = _.differenceBy(
        this.restaurantIds,
        this.restaurantsForProduct,
        "id"
      );
      if (deletedIds.length !== 0) {
        let obj;
        for (let item in deletedIds) {
          obj = {
            restaurant_id: deletedIds[item].id,
            product_id: this.entity.id,
          };
          this.deleteRestaurantProduct(obj).then(() => {
            this.$emit("update:showAddForm", false);
          });
        }
      }
      if (addedIds.length !== 0) {
        let list = [];
        for (let item in addedIds) {
          list.push({
            restaurant_id: addedIds[item].id,
            product_id: this.entity.id,
          });
        }
        this.createRestaurantProducts({ restaurant_products: [...list] }).then(
          () => {
            this.$emit("update:showAddForm", false);
          }
        );
      }
    },
  },
  computed: {
    ...mapState("categories", ["categories", "attachment"]),
    ...mapState("products", ["quantityUnits", "discountTypes"]),
    ...mapState("restaurants", ["restaurants"]),
    ...mapGetters("restaurants", ["restaurantsForProduct"]),
    restaurantIds: {
      get() {
        return this.mode == "EDIT" && this.restaurantsForProduct
          ? [...this.restaurantsForProduct]
          : [];
      },
      set(val) {
        this.restaurantIds.length = 0;
        for (let i = 0; i < val.length; i++) {
          let temp = this.restaurants
            .map((v) => {
              if (v.id == val[i].id) {
                return v;
              }
            })
            .filter(Boolean);
          this.restaurantIds.push(temp[0]);
        }
      },
    },
    entity() {
      return this.mode == "EDIT" && this.entityDetails
        ? this.entityDetails
        : this.localEntity;
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
    categoryOptions() {
      let temp = [];
      if (this.categories && this.categories.length !== 0) {
        temp = this.categories
          .map((v) => {
            if (v.status == 1) {
              return { label: v.category, value: v.id };
            }
          })
          .filter(Boolean);
      }
      return temp;
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
    prodImg() {
      return this.mode == "EDIT" && Object.keys(this.attachment).length != 0
        ? this.attachment.upload_path
        : this.productImage;
    },
  },
  created() {
    this.entityClone =
      this.mode == "EDIT" && this.entityDetails
        ? Object.assign({}, this.entityDetails)
        : {};
    this.init();
    // this.initSelectValues()
  },
};
</script>
