<template>
  <div>
    <ValidationObserver v-slot="{ invalid }" ref="observer">
    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <div class="row">
        <div class="col col-12 q-pa-sm" >
          <ValidationProvider
            name="Name"
            rules="required|alpha_spaces"
            v-slot="v"
          >
            <q-input :error="v.errors.length > 0" :error-message="v.errors[0]" v-model="unit.type" type="text" label="Name*" outlined />
          </ValidationProvider>
        </div>
        <!-- <div class="col col-12 q-pa-sm">
          <ValidationProvider
            name="Description"
            rules="alpha_spaces"
            v-slot="v"
          >
            <q-input :error="v.errors.length > 0" :error-message="v.errors[0]" v-model="unit.description" type="textarea" label="Description" outlined />
          </ValidationProvider>
        </div> -->
        <!-- <div class="col col-12 q-pa-sm">
          <q-toggle v-model="status" color="primary" label="Active" left-label/>
        </div> -->
      </div>
      <div class="text-center">
        <q-btn label="Submit" :disable="invalid" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" outline class="q-ml-sm" />
      </div>
    </q-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    props: ['tab', 'mode', 'unitDetails'],
    data() {
      return {
        isActive: true,
        localUnit: {
          type: null,
          // description: null,
          status: null
        }
      }
    },
    methods: {
      ...mapActions('products', ['createDiscountType', 'updateDiscountType']),
      onSubmit() {
        let obj = {
          type: this.unit.type,
          // status: Number(this.status)
        }
        let functionToExec = this.mode == 'ADD'? this.createDiscountType(obj) : this.updateDiscountType({id: this.unit.id, data: obj})
        functionToExec
          .then(() => {
            this.onReset()
            this.$emit("update:showAddForm", false)
          })

      },
      onReset() {
        this.unit.type = null,
        this.status = true
      }
    },
    computed: {
      unit() {
        return this.mode == 'EDIT' && this.unitDetails ? this.unitDetails : this.localUnit
      },
      status: {
        get() {
          let st = this.mode == 'EDIT' && this.unit ? Boolean(this.unit.status) : this.isActive
          return st
        },
        set(val) {
          this.mode == 'EDIT' && this.unit ? this.unit.status = val : this.isActive = val
        }
      }
    }
  }
</script>
