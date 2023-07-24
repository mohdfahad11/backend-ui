<template>
  <div class="">
    <div class="row items-center">
      <div
        class="col col-4 q-pa-sm"
        v-if="tab == 'REST_PRODUCTS' && restaurants"
      >
        <q-select
          v-model="searchRestaurant"
          :options="restaurants"
          label="Search Restaurant"
          clearable
          outlined
          @input="searchData()"
          map-options
          :option-label="(item) => item.name"
          :option-value="(item) => item.id"
        />
      </div>
      <div
        class="col col-4 q-pa-sm"
        v-if="tab != 'ADVANCECASHUP' && tab != 'CASHUP' && tab != 'CUSTOMERS'"
      >
        <q-input
          v-model="searchName"
          type="text"
          :label="searchLabel"
          clearable
          outlined
          debounce="1000"
        />
      </div>
      <div class="col col-3 q-pa-sm" v-if="tab == 'USERS'">
        <q-input
          v-model="searchEmail"
          type="text"
          label="Search Email"
          clearable
          outlined
          debounce="1000"
          @input="searchData()"
        />
      </div>
      <div class="col col-3 q-pa-sm" v-if="tab == 'USERS'">
        <q-input
          v-model="searchPhoneNo"
          type="text"
          label="Search Phone No."
          clearable
          outlined
          debounce="1000"
          @input="searchData()"
        />
      </div>
      <div
        class="col col-4 q-pa-sm"
        v-if="(tab == 'PRODUCTS' || tab == 'REST_PRODUCTS') && categories"
      >
        <q-select
          v-model="searchCategory"
          :options="categories"
          label="Search Category"
          clearable
          outlined
          @input="searchData()"
          map-options
          :option-label="(item) => item.category"
          :option-value="(item) => item.id"
        />
      </div>
      <div
        class="col col-4 q-pa-sm"
        v-if="tab == 'MODIFIERS' && modifierCategories"
      >
        <q-select
          v-model="searchModifierCategory"
          :options="modifierCategories"
          label="Search Category"
          clearable
          outlined
          @input="searchData()"
          map-options
          emit-value
          :option-label="(item) => item.modifier_category"
          :option-value="(item) => item.id"
        />
      </div>
      <div
        class="col text-right q-pa-sm"
        :class="
          tab == 'USERS'
            ? ['col-2']
            : tab == 'PRODUCTS' || tab == 'MODIFIERS'
            ? ['col-4']
            : ['col-8']
        "
      >
        <q-btn
          v-if="
            tab !== 'CUSTOMERS' &&
            tab !== 'CASHUP' &&
            tab !== 'ADVANCECASHUP' &&
            tab != 'REST_PRODUCTS'
          "
          round
          color="primary"
          icon="add"
          class="q-mx-xs"
          @click="openAddForm"
        />
        <!-- <q-btn v-if="tab !=='USERS'" round color="primary" icon="download" class="q-mx-xs" /> -->
        <q-btn
          v-if="
            tab !== 'CUSTOMERS' &&
            tab !== 'CASHUP' &&
            tab !== 'ADVANCECASHUP' &&
            tab !== 'USERS' &&
            tab != 'REST_PRODUCTS' &&
            tab != 'DISCOUNT_TYPES'
          "
          round
          color="primary"
          icon="mdi-database-import-outline"
          class="q-mx-xs"
          @click="openImportForm"
        />
      </div>
    </div>
    <div class="row shadow-10 bg-white">
      <div class="col col-12">
        <q-scroll-area style="width: 100%; height: 85vh">
          <q-table
            :data="data"
            :columns="columns"
            row-key="id"
            :filter="searchName"
            :rows-per-page-options="[10, 20, 50, 0]"
            :pagination.sync="pagination"
            :loading="loading"
            @request="onRequest"
            flat
          >
            <template v-slot:body-cell-status="props">
              <q-td :key="props.row.id + 'I'">
                <span v-if="props.row.status == 1" class="text-green">
                  Active
                </span>
                <span v-else class="text-orange"> Inactive </span>
              </q-td>
            </template>
            <template v-slot:body-cell-is_mandatory="props">
              <q-td :key="props.row.id + 'Y'">
                <span v-if="props.row.is_mandatory == 1" class="">
                  Mandatory
                </span>
                <span v-else class=""> Optional </span>
              </q-td>
            </template>

            <template
              v-slot:body-cell-cashup_date="props"
              v-if="tab == 'CASHUP'"
            >
              <q-td :key="props.row.id + 'cashup_date'">
                {{ formatDateTime(props.row.cashup_date) }}
              </q-td>
            </template>

            <template
              v-slot:body-cell-Difference="props"
              v-if="tab == 'ADVANCECASHUP'"
            >
              <q-td :key="props.row.id + 'date-diff'">
                {{ differenceAmnt(props.row) }}
              </q-td>
            </template>

            <template
              v-slot:body-cell-date="props"
              v-if="tab == 'ADVANCECASHUP'"
            >
              <q-td :key="props.row.id + 'date'">
                {{ formatDateTime(props.row.date) }}
              </q-td>
            </template>

            <template v-slot:body-cell-is_single_select="props">
              <q-td :key="props.row.id + 'W'">
                <span v-if="props.row.is_single_select == 1" class="">
                  Single Select
                </span>
                <span v-else class=""> Multiselect </span>
              </q-td>
            </template>
            <template
              v-slot:body-cell-float_amount="props"
              v-if="tab == 'CASHUP'"
            >
              <q-td :key="props.row.float_amount">
                ${{ props.row.float_amount }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-eftpos_amount="props"
              v-if="tab == 'CASHUP'"
            >
              <q-td :key="props.row.eftpos_amount">
                ${{ props.row.eftpos_amount }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-till_amount="props"
              v-if="tab == 'CASHUP'"
            >
              <q-td :key="props.row.till_amount">
                ${{ props.row.till_amount }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-safedrop_amount="props"
              v-if="tab == 'CASHUP'"
            >
              <q-td :key="props.row.safedrop_amount">
                ${{ props.row.safedrop_amount }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-expected_eftpos_amount="props"
              v-if="tab == 'CASHUP'"
            >
              <q-td :key="props.row.expected_eftpos_amount">
                ${{ props.row.expected_eftpos_amount }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-expected_till_amount="props"
              v-if="tab == 'CASHUP'"
            >
              <q-td :key="props.row.expected_till_amount">
                ${{ props.row.expected_till_amount }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-expected_float_amount="props"
              v-if="tab == 'CASHUP' || tab == 'ADVANCECASHUP'"
            >
              <q-td :key="props.row.expected_float_amount">
                ${{ props.row.expected_float_amount }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-advance_amount="props"
              v-if="tab == 'ADVANCECASHUP'"
            >
              <q-td :key="props.row.advance_amount">
                ${{ props.row.advance_amount }}
              </q-td>
            </template>
            <template v-slot:body-cell-Type="props" v-if="tab == 'USERS'">
              <q-td :key="props.row.email">
                {{
                  props.row.role_id == 1
                    ? "Admin"
                    : props.row.role_id == 2
                    ? "Attendant"
                    : "Customer"
                }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-quantity="props"
              v-if="tab == 'PRODUCTS'"
            >
              <q-td :key="props.row.id + 'A'">
                {{
                  props.row.quantity_units
                    ? props.row.quantity + " " + props.row.quantity_units.unit
                    : null
                }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-category="props"
              v-if="tab == 'PRODUCTS'"
            >
              <q-td :key="props.row.id + 'B'">
                {{
                  props.row.categories ? props.row.categories.category : null
                }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-product="props"
              v-if="tab == 'REST_PRODUCTS'"
            >
              <q-td :key="props.row.id + 'C'">
                {{ props.row.products ? props.row.products.name : null }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-restaurant="props"
              v-if="tab == 'REST_PRODUCTS'"
            >
              <q-td :key="props.row.id + 'D'">
                {{ props.row.restaurants ? props.row.restaurants.name : null }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-modifier_category="props"
              v-if="tab == 'MODIFIERS'"
            >
              <q-td :key="props.row.id + 'z'">
                {{
                  props.row.modifier_categories
                    ? props.row.modifier_categories.modifier_category
                    : null
                }}
              </q-td>
            </template>
            <template
              v-slot:body-cell-discount_type="props"
              v-if="tab == 'REST_PRODUCTS'"
            >
              <q-td :key="props.row.id + 'E'">
                {{
                  props.row.discount_types
                    ? props.row.discount_types.type
                    : props.row.products.discount_types
                    ? props.row.products.discount_types.type
                    : null
                }}
              </q-td>
            </template>
            <template v-slot:body-cell-price="props">
              <q-td :key="props.row.id + 'F'" v-if="tab == 'PRODUCTS'">
                ${{
                  props.row.price ? props.row.price : props.row.products.price
                }}
              </q-td>
              <q-td :key="props.row.id + 'F'" v-if="tab == 'REST_PRODUCTS'">
                ${{
                  props.row.price ? props.row.price : props.row.products.price
                }}
              </q-td>
            </template>
            <template v-slot:body-cell-discount="props">
              <q-td :key="props.row.id + 'G'" v-if="tab == 'PRODUCTS'">
                {{
                  props.row.discount
                    ? props.row.discount
                    : props.row.products.discount
                }}%
              </q-td>
              <q-td :key="props.row.id + 'G'" v-if="tab == 'REST_PRODUCTS'">
                {{
                  props.row.discount
                    ? props.row.discount
                    : props.row.products.discount
                }}%
              </q-td>
            </template>
            <template v-slot:body-cell-Actions="props">
              <q-td :key="props.row.id + 'H'">
                <q-btn
                  round
                  color="primary"
                  icon="edit"
                  class="q-mx-xs"
                  @click="openEditForm(props.row)"
                />
                <q-btn
                  round
                  color="primary"
                  icon="auto_awesome_motion"
                  class="q-mx-xs"
                  @click="openModifiersForm(props.row)"
                  v-if="tab == 'REST_PRODUCTS'"
                />
              </q-td>
            </template>
          </q-table>
        </q-scroll-area>
      </div>
    </div>

    <q-dialog v-model="showAddForm" persistent>
      <q-card style="min-width: 400px">
        <q-card-actions align="right" class="bg-primary">
          <div class="col col-10 text-h6 text-white text-bold">
            <span class="q-px-sm q-py-sm rounded-borders"
              >{{ titleOfAddEditDialog }}
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
        <q-card-section v-if="tab == 'CATEGORIES'">
          <AddEditCategoryForm
            :mode="mode"
            :tab="tab"
            :entityDetails="detailedData"
            :showAddForm.sync="showAddForm"
          />
        </q-card-section>
        <q-card-section v-else-if="tab == 'PRODUCTS'">
          <add-edit-product-form
            :mode="mode"
            :tab="tab"
            :entityDetails="detailedData"
            :showAddForm.sync="showAddForm"
          />
        </q-card-section>
        <q-card-section v-else-if="tab == 'QUANTITY_UNITS'">
          <AddEditQuantityUnitForm
            :mode="mode"
            :tab="tab"
            :unitDetails="detailedData"
            :showAddForm.sync="showAddForm"
          />
        </q-card-section>
        <q-card-section v-else-if="tab == 'USERS'">
          <AddEditUserForm
            :mode="mode"
            :tab="tab"
            :userDetails="detailedData"
            :showAddForm.sync="showAddForm"
          />
        </q-card-section>
        <q-card-section v-else-if="tab == 'REST_PRODUCTS'">
          <add-edit-restaurant-product-form
            :mode="mode"
            :tab="tab"
            :entityDetails="detailedData"
            :showAddForm.sync="showAddForm"
          />
        </q-card-section>
        <q-card-section v-else-if="tab == 'DISCOUNT_TYPES'">
          <add-edit-discount-type-form
            :mode="mode"
            :tab="tab"
            :unitDetails="detailedData"
            :showAddForm.sync="showAddForm"
          />
        </q-card-section>
        <q-card-section v-else-if="tab == 'MODIFIER_CATEGORIES'">
          <add-edit-modifier-category
            :mode="mode"
            :tab="tab"
            :entityDetails="detailedData"
            :showAddForm.sync="showAddForm"
          />
        </q-card-section>
        <q-card-section v-else-if="tab == 'MODIFIERS'">
          <add-edit-modifier
            :mode="mode"
            :tab="tab"
            :entityDetails="detailedData"
            :showAddForm.sync="showAddForm"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showImportForm" persistent>
      <q-card style="min-width: 400px">
        <q-card-actions align="right" class="bg-primary">
          <div class="col col-10 text-h6 text-white text-bold">
            <span class="q-px-sm q-py-sm rounded-borders"
              >{{ titleOfImportDialog }}
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
          <ImportCsvFile :tab="tab" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showModifierForm" persistent>
      <q-card style="min-width: 700px">
        <q-card-actions align="right" class="bg-primary">
          <div class="col col-10 text-h6 text-white text-bold">
            <span class="q-px-sm q-py-sm rounded-borders"
              >{{ productDetails ? productDetails.products.name : null }}
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
          <add-edit-restaurant-product-modifier
            :productDetails="productDetails"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddEditCategoryForm from "../category/AddEditCategoryForm.vue";
import AddEditModifierCategory from "../modifiers/AddEditModifierCategory.vue";
import AddEditModifier from "../modifiers/AddEditModifier.vue";
import AddEditDiscountTypeForm from "../products/AddEditDiscountTypeForm.vue";
import AddEditProductForm from "../products/AddEditProductForm.vue";
import AddEditQuantityUnitForm from "../products/AddEditQuantityUnitForm.vue";
import AddEditRestaurantProductForm from "../restaurant/AddEditRestaurantProductForm.vue";
import AddEditUserForm from "../users/AddEditUserForm.vue";
import ImportCsvFile from "./ImportCsvFile.vue";
import AddEditRestaurantProductModifier from "../restaurant/AddEditRestaurantProductModifier.vue";
import moment from "moment";

export default {
  props: ["columns", "data", "tab"],
  data() {
    return {
      loading: false,
      filter: "",
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10,
      },
      searchName: "",
      searchPhoneNo: "",
      searchEmail: "",
      showAddForm: false,
      showImportForm: false,
      searchCategory: null,
      searchModifierCategory: null,
      searchDiscountType: null,
      searchRestaurant: null,
      mode: null,
      entity: null,
      showModifierForm: false,
      productDetails: null,
    };
  },
  computed: {
    ...mapState("customer", ["totalCustomers"]),
    ...mapState("cashup", ["totalAdvanceCashups", "totalCashups"]),
    ...mapState("categories", ["totalCategories", "categories"]),
    ...mapState("products", [
      "totalProducts",
      "totalQuantityUnits",
      "totalDiscountTypes",
    ]),
    ...mapState("users", ["totalUsers"]),
    ...mapState("restaurants", ["restaurants", "totalRestaurantProducts"]),
    ...mapState("modifiers", [
      "totalModifierCategories",
      "totalModifiers",
      "modifierCategories",
      "modifiers",
    ]),
    titleOfImportDialog() {
      return this.tab == "CATEGORIES"
        ? "Import Product Categories"
        : this.tab == "PRODUCTS" || this.tab == "REST_PRODUCTS"
        ? "Import Products"
        : this.tab == "SERVICES"
        ? null
        : this.tab == "USERS"
        ? "Import Users"
        : this.tab == "QUANTITY_UNITS"
        ? "Import Quantity Units"
        : this.tab == "MODIFIER_CATEGORIES"
        ? "Import Modifier Categories"
        : this.tab == "MODIFIERS"
        ? "Import Modifiers"
        : null;
    },
    titleOfAddEditDialog() {
      if (this.mode == "ADD") {
        return this.tab == "CATEGORIES"
          ? "Add Product Category"
          : this.tab == "PRODUCTS" || this.tab == "REST_PRODUCTS"
          ? "Add Product"
          : this.tab == "SERVICES"
          ? null
          : this.tab == "USERS"
          ? "Add User"
          : this.tab == "QUANTITY_UNITS"
          ? "Add Quantity Unit"
          : this.tab == "MODIFIER_CATEGORIES"
          ? "Add Modifier Category"
          : this.tab == "MODIFIERS"
          ? "Add Modifier"
          : null;
      } else {
        return this.tab == "CATEGORIES"
          ? "Edit Product Category"
          : this.tab == "PRODUCTS" || this.tab == "REST_PRODUCTS"
          ? "Edit Product"
          : this.tab == "SERVICES"
          ? null
          : this.tab == "USERS"
          ? "Edit User"
          : this.tab == "QUANTITY_UNITS"
          ? "Edit Quantity Unit"
          : this.tab == "MODIFIER_CATEGORIES"
          ? "Edit Modifier Category"
          : this.tab == "MODIFIERS"
          ? "Edit Modifier"
          : null;
      }
    },
    searchLabel() {
      return this.tab == "CATEGORIES"
        ? "Search Category"
        : this.tab == "PRODUCTS" || this.tab == "REST_PRODUCTS"
        ? "Search Product"
        : this.tab == "SERVICES"
        ? "Search Services"
        : this.tab == "USERS"
        ? "Search User"
        : this.tab == "QUANTITY_UNITS"
        ? "Search Units"
        : this.tab == "MODIFIER_CATEGORIES"
        ? "Search Modifier Category"
        : this.tab == "MODIFIERS"
        ? "Search Modifier"
        : "Search";
    },
    detailedData() {
      return this.entity ? this.entity : {};
    },
  },
  mounted() {
    // get initial data from server (1st page)
    this.searchData();
  },
  created() {
    if (this.tab == "PRODUCTS") {
      this.getCategories({
        page: 1,
        per_page: 99999,
      });
    }
    if (this.tab == "REST_PRODUCTS") {
      this.getRestaurants();
    }
    if (this.tab == "MODIFIERS") {
      this.getModifierCategories({
        per_page: 99999,
      });
    }
  },
  methods: {
    ...mapActions("customer", ["getCustomers"]),
    ...mapActions("cashup", ["getCashup"]),
    ...mapActions("cashup", ["getAdvanceCashup"]),
    ...mapActions("categories", ["getCategories", "getAttachment"]),
    ...mapActions("products", [
      "getProducts",
      "getDiscountTypes",
      "getQuantityUnits",
    ]),
    ...mapActions("users", ["getUsers"]),
    ...mapActions("restaurants", ["getRestaurants", "getRestaurantProducts"]),
    ...mapActions("modifiers", [
      "getModifierCategories",
      "getModifiers",
      "getRestaurantProductModifier",
    ]),
    searchData() {
      this.onRequest({
        pagination: this.pagination,
      });
    },
    openAddForm() {
      this.$store.commit("categories/GET_ATTACHMENT", {});
      this.showAddForm = true;
      this.mode = "ADD";
    },
    formatDateTime(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    differenceAmnt(item) {
      return (Number(item.advance_amount) - Number(item.expected_float_amount)).toFixed(2);
    },
    openModifiersForm(data) {
      this.getRestaurantProductModifier({
        per_page: 9999,
        restaurant_product_id: data.id,
      })
        .then(() => {
          this.showModifierForm = true;
          this.productDetails = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openEditForm(data) {
      let moduleType;
      this.entity = Object.assign({}, data);
      this.$store.commit("categories/GET_ATTACHMENT", {});
      moduleType =
        this.tab == "CATEGORIES" ? 1 : this.tab == "PRODUCTS" ? 2 : null;
      if (this.tab == "CATEGORIES" || this.tab == "PRODUCTS") {
        this.getAttachment({
          module_type: moduleType,
          module_id: this.entity.id,
        }).then(() => {
          this.showAddForm = true;
          this.mode = "EDIT";
        });
      } else {
        this.showAddForm = true;
        this.mode = "EDIT";
      }
    },
    openImportForm() {
      this.showImportForm = true;
    },
    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      this.loading = true;
      let totalRows = 99999;
      const fetchCount = rowsPerPage === 0 ? totalRows : rowsPerPage;
      if (this.tab == "CATEGORIES") {
        this.getCategories({
          page: page,
          per_page: fetchCount,
          category_name:
            this.searchName && this.searchName != "" ? this.searchName : null,
        });
      } else if (this.tab == "PRODUCTS") {
        this.getProducts({
          page: page,
          per_page: fetchCount,
          product_name:
            this.searchName && this.searchName != "" ? this.searchName : null,
          category_id: this.searchCategory ? this.searchCategory.id : null,
        });
      } else if (this.tab == "USERS") {
        this.getUsers({
          page: page,
          per_page: fetchCount,
          name:
            this.searchName && this.searchName != "" ? this.searchName : null,
          email:
            this.searchEmail && this.searchEmail != ""
              ? this.searchEmail
              : null,
          phone_no:
            this.searchPhoneNo && this.searchPhoneNo != ""
              ? this.searchPhoneNo
              : null,
        });
      } else if (this.tab == "REST_PRODUCTS") {
        this.getRestaurantProducts({
          page: page,
          per_page: fetchCount,
          restaurant_id:
            this.searchRestaurant && this.searchRestaurant != ""
              ? this.searchRestaurant.id
              : null,
          product_name:
            this.searchName && this.searchName != "" ? this.searchName : null,
          category_id: this.searchCategory ? this.searchCategory.id : null,
        });
      } else if (this.tab == "DISCOUNT_TYPES") {
        this.getDiscountTypes({
          page: page,
          per_page: fetchCount,
          type:
            this.searchName && this.searchName != "" ? this.searchName : null,
        });
      } else if (this.tab == "QUANTITY_UNITS") {
        this.getQuantityUnits({
          page: page,
          per_page: fetchCount,
          unit:
            this.searchName && this.searchName != "" ? this.searchName : null,
        });
      } else if (this.tab == "MODIFIER_CATEGORIES") {
        this.getModifierCategories({
          page: page,
          per_page: fetchCount,
          modifier_category:
            this.searchName && this.searchName != "" ? this.searchName : null,
        });
      } else if (this.tab == "MODIFIERS") {
        this.getModifiers({
          page: page,
          per_page: fetchCount,
          modifier:
            this.searchName && this.searchName != "" ? this.searchName : null,
          modifier_category_id: this.searchModifierCategory
            ? this.searchModifierCategory
            : null,
        });
      } else if (this.tab == "CASHUP") {
        this.getCashup({
          page: page,
          per_page: fetchCount,
        });
      } else if (this.tab == "ADVANCECASHUP") {
        this.getAdvanceCashup({
          page: page,
          per_page: fetchCount,
        });
      } else if (this.tab == "CUSTOMERS") {
        this.getCustomers({
          page: page,
          per_page: fetchCount,
          role: 3,
        });
      }

      setTimeout(() => {
        if (this.tab == "CATEGORIES") {
          this.pagination.rowsNumber = this.totalCategories;
        } else if (this.tab == "PRODUCTS") {
          this.pagination.rowsNumber = this.totalProducts;
        } else if (this.tab == "USERS") {
          this.pagination.rowsNumber = this.totalUsers;
        } else if (this.tab == "REST_PRODUCTS") {
          this.pagination.rowsNumber = this.totalRestaurantProducts;
        } else if (this.tab == "MODIFIERS") {
          this.pagination.rowsNumber = this.totalModifiers;
        } else if (this.tab == "MODIFIER_CATEGORIES") {
          this.pagination.rowsNumber = this.totalModifierCategories;
        } else if (this.tab == "QUANTITY_UNITS") {
          this.pagination.rowsNumber = this.totalQuantityUnits;
        } else if (this.tab == "DISCOUNT_TYPES") {
          this.pagination.rowsNumber = this.totalDiscountTypes;
        } else if (this.tab == "CASHUP") {
          this.pagination.rowsNumber = this.totalCashups;
        } else if (this.tab == "ADVANCECASHUP") {
          this.pagination.rowsNumber = this.totalAdvanceCashups;
        } else if (this.tab == "CUSTOMERS") {
          this.pagination.rowsNumber = this.totalCustomers;
        }

        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;

        this.loading = false;
      }, 300);
    },
  },
  watch: {
    totalCategories(newVal, oldVal) {
      if (this.tab == "CATEGORIES") {
        this.pagination.rowsNumber = newVal;
      }
    },
    totalUsers(newVal, oldVal) {
      if (this.tab == "USERS") {
        this.pagination.rowsNumber = newVal;
      }
    },
    totalProducts(newVal, oldVal) {
      if (this.tab == "PRODUCTS") {
        this.pagination.rowsNumber = newVal;
      }
    },
    totalRestaurantProducts(newVal, oldVal) {
      if (this.tab == "REST_PRODUCTS") {
        this.pagination.rowsNumber = newVal;
      }
    },
    totalModifiers(newVal, oldVal) {
      if (this.tab == "MODIFIERS") {
        this.pagination.rowsNumber = newVal;
      }
    },
    totalModifierCategories(newVal, oldVal) {
      if (this.tab == "MODIFIER_CATEGORIES") {
        this.pagination.rowsNumber = newVal;
      }
    },
    totalDiscountTypes(newVal, oldVal) {
      if (this.tab == "DISCOUNT_TYPES") {
        this.pagination.rowsNumber = newVal;
      }
    },
    totalQuantityUnits(newVal, oldVal) {
      if (this.tab == "QUANTITY_UNITS") {
        this.pagination.rowsNumber = newVal;
      }
    },
    totalCashups(newVal, oldVal) {
      if (this.tab == "CASHUP") {
        this.pagination.rowsNumber = newVal;
      }
    },
    totalAdvanceCashups(newVal, oldVal) {
      if (this.tab == "ADVANCECASHUP") {
        this.pagination.rowsNumber = newVal;
      }
    },
  },
  components: {
    AddEditCategoryForm,
    AddEditUserForm,
    ImportCsvFile,
    AddEditProductForm,
    AddEditQuantityUnitForm,
    AddEditRestaurantProductForm,
    AddEditDiscountTypeForm,
    AddEditModifierCategory,
    AddEditModifier,
    AddEditRestaurantProductModifier,
  },
};
</script>
