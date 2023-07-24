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
            v-model="entity.modifier_category"
            type="text"
            outlined
          />
          </ValidationProvider>
        </div>

        <div class="col col-6 q-pa-sm" >
          <span>Seqence No.*:</span>
          <ValidationProvider
            name="seq_no"
            rules="required|numeric"
            v-slot="v"
          >
          <q-input
            :error="v.errors.length > 0"
            :error-message="v.errors[0]"
            v-model="entity.seq_no"
            type="text"
            outlined
          />
          </ValidationProvider>
        </div>

        <div class="col col-4 q-pa-sm">
          <q-toggle v-model="status" color="primary" label="Active" left-label/>
        </div>
        <div class="col col-4 q-pa-sm">
          <q-toggle v-model="isMandatory" color="primary" label="Mandatory" left-label/>
        </div>
        <div class="col col-4 q-pa-sm">
          <q-toggle v-model="isSingleSelect" color="primary" label="Single Select" left-label/>
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
        isMandatoryVal: false,
        isSingleSelectVal: false,
        modifierCategory: null,
        localEntity: {
          modifier_category: null,
          status: null,
          isMandatory: null,
          isSingleSelect: null,
          seq_no: null
        },
        entityClone: {}
      }
    },
    methods: {
      ...mapActions('modifiers', ['createModifierCategory', 'updateModifierCategory']),
      onSubmit() {
        if(this.tab == 'MODIFIER_CATEGORIES') {
          let obj = {
            modifier_category: this.entity.modifier_category,
            status: Number(this.status),
            is_mandatory: Number(this.isMandatory),
            is_single_select: Number(this.isSingleSelect),
            seq_no: Number(this.entity.seq_no)
          }
          let functionToExec = this.mode == 'ADD'? this.createModifierCategory(obj) : this.updateModifierCategory({id: this.entity.id, data: obj})
          functionToExec
            .then(() => {
              this.onReset()
              this.$emit("update:showAddForm", false)
            })
        }

      },

      onReset() {
        this.entity.modifier_category = null,
        this.status = true,
        this.isMandatory = false,
        this.isSingleSelect = false,
        this.entity.seq_no = null
      }
    },
    computed: {
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
      isMandatory: {
        get() {
          let st = this.mode == 'EDIT' && this.entity ? Boolean(this.entity.is_mandatory) : this.isMandatoryVal
          return st
        },
        set(val) {
          this.mode == 'EDIT' && this.entity ? this.entity.is_mandatory = val : this.isMandatoryVal = val
        }
      },
      isSingleSelect: {
        get() {
          let st = this.mode == 'EDIT' && this.entity ? Boolean(this.entity.is_single_select) : this.isSingleSelectVal
          return st
        },
        set(val) {
          this.mode == 'EDIT' && this.entity ? this.entity.is_single_select = val : this.isSingleSelectVal = val
        }
      },
    },
    created() {
      this.entityClone = this.mode == 'EDIT' && this.entityDetails ? Object.assign({}, this.entityDetails) : {}
    }
  }
</script>
