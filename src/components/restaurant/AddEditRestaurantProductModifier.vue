<template>
  <div>
    <ValidationObserver v-slot="{ }" ref="observer">
      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md"
      >
        <div class="row items-center">
          <div class="col col-12">
            <span class="text-h6">Available Modifiers</span>
          </div>
          <div class="col col-12" v-if="availableModifiers.length != 0">
            <q-chip outline :color="parseInt(item.status) == 1 ? 'primary' : 'red'" clickable class="text-primary" v-for="item in availableModifiers" :key="item.id" @click="editModifier(item)">
              {{ item.modifier }} - ${{ item.price }}
            </q-chip>
          </div>
          <div class="col col-12" v-else>
            No modifier is associated with the product!
          </div>
          <hr>
          <div class="col col-12">
            <span class="text-h6">Add Modifiers</span>
          </div>
          <div class="col col-4 q-pa-sm" v-if="modifierCategories && modifierCategories.length != 0">
            <!-- <span>Modifier Category*:</span> -->
            <ValidationProvider
              name="modCat"
              rules="required|alpha_spaces"
            >
            <q-select
              v-model="selectedModifierCategory"
              :options="modifierCategories"
              label="Modifier Category*"
              outlined
              @input="getModifiersOfCategory()"
              map-options
              :option-label="(item) => item.modifier_category"
              :option-value="(item) => item.id"
            />
            </ValidationProvider>
          </div>
          <div class="col col-4 q-pa-sm">
            <!-- <span>Modifier*:</span> -->
            <ValidationProvider
              name="modifier"
              rules="required|alpha_spaces"
            >
            <q-select
              v-model="selectedModifier"
              :options="options"
              label="Modifier*"
              outlined
              map-options
              :option-label="(item) => item.modifier"
              :option-value="(item) => item.id"
            />
            </ValidationProvider>
          </div>
          <div class="col col-3 q-pa-sm">
            <ValidationProvider
              name="modifier"
              rules="required"
            >
            <!-- <span>Price*:</span> -->
            <q-input v-model="price" label="Price*"  type="text" outlined />
            </ValidationProvider>
          </div>
          <div class="col col-1 q-pa-sm text-right">
            <q-btn color="primary" icon="add" @click="addModifierToList()" class="q-py-sm" />
          </div>
          <div class="col col-12 q-mt-md" v-if="modifiersLocalList.length != 0">
            <q-chip color="primary text-white" v-for="item in modifiersLocalList" :key="item.id" removable @remove="removeFromList(item)">
              {{ item.modifier }} - ${{ item.price }}
            </q-chip>
          </div>
          <div class=" col col-12 text-center q-mt-lg">
            <q-btn label="Add Modifiers" :disable="modifiersLocalList.length == 0" type="submit" color="primary"/>
          </div>
        </div>
      </q-form>
    </ValidationObserver>

    <q-dialog v-model="showEditForm" persistent>
      <q-card>
        <q-card-actions align="right" class="bg-primary">
          <div class="col col-10 text-h6 text-white text-bold">
            <span class=" q-px-sm q-py-sm rounded-borders">Update {{ prodMod ? prodMod.modifier : null }} </span>
          </div>
          <div class="col col-2 text-right">
            <q-btn icon="close" color="red" class="q-py-sm" v-close-popup padding="" />
          </div>
        </q-card-actions>
        <q-card-section class="row items-center">
          <edit-restaurant-product-modifier :entityDetails="prodMod" :showEditForm.sync="showEditForm" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import notifications from 'src/boot/notifications'
import _ from 'lodash'
import EditRestaurantProductModifier from './EditRestaurantProductModifier.vue'
export default {
  components: { EditRestaurantProductModifier },
  props: ['productDetails'],
  data() {
    return {
      selectedModifierCategory: null,
      selectedModifier: null,
      modifiersLocalList: [],
      modifiersClone: [],
      price: null,
      prodMod: {},
      showEditForm: false
    }
  },
  computed: {
    ...mapState('modifiers', ['modifiers', 'restaurantProductModifiers', 'modifierCategories']),
    options() {
      let temp = []
      let tempPrice,tempModCatId, tempModCat
      if(this.modifiers && this.modifiers.length !=0) {
        temp = this.modifiers.map(v => {
          if(this.restaurantProductModifiers.some(pm => {
            return pm.modifier_id == v.id
          })) {
            return {id:v.id, modifier: v.modifier, disable: true, price: tempPrice}
          } else {
            return {id:v.id, modifier: v.modifier, disable: false, price: 0}
          }
        }).filter(Boolean)
      }
      return temp
    },
    availableModifiers() {
      let temp = []
      let availMod =[]
      let tempPrice,tempModCatId, tempModCat,tempStatus, pmid
      if(this.modifiersClone && this.modifiersClone.length !=0) {
        temp = this.modifiersClone.map(v => {
          if(this.restaurantProductModifiers.some(pm => {
            tempPrice = pm.price
            tempModCatId = pm.modifiers.modifier_category_id
            tempModCat = pm.modifiers.modifier_categories.modifier_category
            tempStatus = pm.status
            pmid = pm.id
            return pm.modifier_id == v.id
          })) {
            let obj = {
              id: pmid,
              modifier_category_id: tempModCatId,
              modifier_category: tempModCat,
              modifier: v.modifier,
              modifier_id: v.id,
              price: tempPrice,
              status: tempStatus
            }
            availMod.push(obj)
          }
        }).filter(Boolean)
      }
      return availMod
    },
  },
  methods: {
    ...mapActions('modifiers', ['getModifiers', 'getModifierCategories', 'addMultipleRestaurantProductModifiers', 'updateRestaurantProductModifier']),
    addModifierToList() {
      if(this.selectedModifierCategory && this.selectedModifier && this.price) {
        if(this.modifiersLocalList.some(md => {
          return md.modifier_id == this.selectedModifier.id
        })) {
          notifications.warningNotify("Modifier is already added in the list!")
        } else {
          let obj = {
            modifier_category_id: this.selectedModifierCategory.id,
            modifier_category: this.selectedModifierCategory.modifier_category,
            modifier: this.selectedModifier.modifier,
            modifier_id: this.selectedModifier.id,
            price: this.price
          }
          this.modifiersLocalList.push(obj)
          this.selectedModifier = null,
          this.price = null
        }
      } else {
        notifications.warningNotify("Enter complete information!")
      }
    },
    editModifier(item){
      this.prodMod = Object.assign({}, item)
      this.showEditForm = true
    },
    removeFromList(item) {
      const objWithIdIndex = this.modifiersLocalList.findIndex((obj) => obj.modifier_id === item.modifier_id);

      if (objWithIdIndex > -1) {
        this.modifiersLocalList.splice(objWithIdIndex, 1);
      }
    },
    getModifiersOfCategory() {
      this.selectedModifier = null
      this.price = null
      this.getModifiers({
        per_page: 9999,
        modifier_category_id: this.selectedModifierCategory.id
      })
    },
    onSubmit() {
      let restaurantProductModifiers = []
      for(let i in this.modifiersLocalList) {
        restaurantProductModifiers.push({
          restaurant_product_id: parseInt(this.productDetails.id),
          modifier_id: this.modifiersLocalList[i].modifier_id,
          price: parseFloat(this.modifiersLocalList[i].price)
        })
      }
      this.addMultipleRestaurantProductModifiers({
        restaurant_product_modifiers: [...restaurantProductModifiers]
      })
        .then(()=>{
          this.modifiersLocalList = []
        })
    }
  },
  created() {
    this.getModifierCategories({
      per_page: 9999
    })
    this.getModifiers({
      per_page: 9999
    })
      .then((res) => {
        this.modifiersClone = [...this.modifiers]
      })
  }
}
</script>
