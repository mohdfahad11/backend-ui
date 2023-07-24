<template>
  <div>
    <ValidationObserver v-slot="{ invalid }" ref="observer">
    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <div class="row">
        <div class="col col-6 q-pa-sm" >
          <span>Name*:</span>
          <ValidationProvider
            name="Name"
            rules="required|alpha_spaces"
            v-slot="v"
          >
          <q-input
            :error="v.errors.length > 0"
            :error-message="v.errors[0]"
            v-model="entity.modifier"
            type="text"
            outlined
          />
          </ValidationProvider>
        </div>
        <div class="col col-6 q-pa-sm">
          <span>Category*:</span>
          <ValidationProvider
            name="Category"
            rules="required"
            v-slot="v"
          >
            <q-select :error="v.errors.length > 0" :error-message="v.errors[0]" v-model="entity.modifier_category_id" :options="modifierCategoryOptions"  map-options emit-value outlined />
          </ValidationProvider>
        </div>

        <div class="col col-12 q-pa-sm">
          <q-toggle v-model="status" color="primary" label="Active" left-label/>
        </div>
      </div>
      <div class="text-center">
        <q-btn label="Submit" :disabled="invalid" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" outline class="q-ml-sm" />
      </div>
    </q-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import notifications from 'src/boot/notifications'

  export default {
    props: ['tab', 'mode', 'entityDetails'],
    data() {
      return {
        isActive: true,
        modifier: null,
        localEntity: {
          modifier: null,
          modifier_category_id: null,
          status: null
        },
        entityClone: {}
      }
    },
    methods: {
      ...mapActions('modifiers', ['createModifier', 'updateModifier', 'getModifierCategories']),
      onSubmit() {
        if(this.tab == 'MODIFIERS') {
          let obj = {
            modifier: this.entity.modifier,
            modifier_category_id: this.entity.modifier_category_id,
            status: Number(this.status)
          }
          let functionToExec = this.mode == 'ADD'? this.createModifier(obj) : this.updateModifier({id: this.entity.id, data: obj})
          functionToExec
            .then(() => {
              this.onReset()
              this.$emit("update:showAddForm", false)
            })
        }

      },

      onReset() {
        this.entity.modifier = null
        this.entity.modifier_category_id = null,
        this.status = true
      }
    },
    computed: {
      ...mapState('modifiers', ['modifierCategories']),
      modifierCategoryOptions() {
        let temp = []
        if(this.modifierCategories && this.modifierCategories.length !== 0) {
          temp = this.modifierCategories.map((v) => {
            if(v.status == 1) {
              return { label: v.modifier_category, value: v.id}
            }
          }).filter(Boolean)
        }
        return temp
      },
      entity() {
        return this.mode == 'EDIT' && this.entityDetails ? this.entityDetails : this.localEntity
      },
      status: {
        get() {
          let st = this.mode == 'EDIT' && this.entity ? Boolean(this.entity.status) : this.isActive
          return st
        },
        set(val) {
          this.mode == 'EDIT' && this.entity ? this.entity.status = val : this.isActive = val
        }
      },
    },
    created() {
      this.getModifierCategories({
        per_page: 9999
      })
      this.entityClone = this.mode == 'EDIT' && this.entityDetails ? Object.assign({}, this.entityDetails) : {}
    }
  }
</script>
