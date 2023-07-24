<template>
  <div>
    <div class="row items-center text-center">
      <div class="col col-6">
        <q-file
          ref="csvFileInput"
          outlined
          v-model="csvFile"
          label="Select File to Import"
          accept=".csv"
          style="display:none"
        />
        <q-input outlined readonly v-model="fileName" type="text" label="Select file to import" @input="readFile()" />
      </div>
      <div class="col col-6">
        <q-btn color="primary" label="Browse" @click="$refs.csvFileInput.$el.click()" class="q-py-sm" />
      </div>
    </div>
    <div class="full-width text-center q-pt-lg">

      <q-btn color="primary" label="Import" class="q-mr-sm q-py-sm" @click="csvFileSelected()" :disable="nofileSelected" v-close-popup />
      <q-btn outline color="primary" label="Cancel" class="q-ml-sm q-py-sm" v-close-popup />
    </div>
  </div>
</template>

<script>
  import papa from 'papaparse'
import { mapState, mapActions } from 'vuex'
  export default {
    props: ['tab'],
    data() {
      return {
        csvFile: null,
        content: [],
        parsed: false
      }
    },
    methods: {
      csvFileSelected() {
        let that = this
        let array = []
        papa.parse( this.csvFile, {
          header: true,
          skipEmptyLines: true,
          step: function(row, parser) {
            row.data.status = Number(row.data.status)
            if(that.tab == 'PRODUCTS'){
              row.data.status = Number(row.data.status)
              row.data.quantity = Number(row.data.quantity)
              row.data.quantity_unit = Number(row.data.quantity_unit)
              row.data.category_id = Number(row.data.category_id)
              row.data.price = Number(row.data.price)
              row.data.discount = Number(row.data.discount)
              row.data.discount_type = Number(row.data.discount_type)
              row.data.restaurant_ids = JSON.parse("[" + row.data.restaurant_ids + "]");
            } else if(that.tab == "MODIFIERS") {
              row.data.modifier_category_id = Number(row.data.modifier_category_id)
            } else if(that.tab == 'MODIFIER_CATEGORIES') {
              row.data.is_mandatory =  Number(row.data.is_mandatory)
              row.data.is_single_select =  Number(row.data.is_single_select)
              row.data.seq_no = Number(row.data.seq_no)
            }
            array.push(row.data)
          },
          complete: function(){
            let formData = new FormData()
            let objCat = { categories: array }
            let objProd = { products: array }
            let objQty = { quantity_units: array }
            let objModifiers= { modifiers: array }
            let objModifierCategories = { modifier_categories: array }
            that.tab == 'CATEGORIES'
              ? that.$store.dispatch('categories/importCategory', objCat)
              : that.tab == 'PRODUCTS'
                ? that.$store.dispatch('products/importProduct', objProd)
                : that.tab == 'QUANTITY_UNITS'
                  ? that.$store.dispatch('products/importQuantityUnit', objQty)
                  : that.tab == "MODIFIERS"
                    ? that.$store.dispatch('modifiers/importModifiers', objModifiers)
                    : that.tab == "MODIFIER_CATEGORIES"
                      ? that.$store.dispatch('modifiers/importModifierCategories', objModifierCategories)
                      : null
            //this.content = results.data;
            this.content = array
            this.parsed = true;
          }
        });
      },

    },
    computed:{
      fileName() {
        return this.csvFile == null ? null : this.csvFile.name
      },
      nofileSelected() {
        return !this.fileName
      }
    }
  }
</script>
