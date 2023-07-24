<template>
  <div>
    <ValidationObserver v-slot="{ invalid }" ref="observer">
      <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
        <div class="row">
          <div class="col col-12 q-pa-sm">
            <span>Price*:</span>
            <ValidationProvider name="Name" rules="required" v-slot="v">
              <q-input
                :error="v.errors.length > 0"
                :error-message="v.errors[0]"
                v-model="entity.price"
                type="text"
                outlined
              />
            </ValidationProvider>
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
            :disabled="invalid"
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
import { mapActions, mapState } from "vuex";

export default {
  props: ["entityDetails"],
  data() {
    return {
      isActive: true,
      price: null,
      localEntity: {
        price: null,
        status: null,
      },
      entityClone: {},
    };
  },
  methods: {
    ...mapActions("modifiers", ["updateRestaurantProductModifier"]),
    onSubmit() {
      if (
        this.entityClone.status != this.status ||
        this.entityClone.price != this.entity.price
      ) {
        let obj = {
          status: Number(this.status),
          price: parseFloat(this.entity.price),
        };
        this.updateRestaurantProductModifier({
          id: this.entity.id,
          obj: obj,
        }).then(() => {
          this.onReset();
          this.$emit("update:showEditForm", false);
        });
      }
    },

    onReset() {
      (this.entity.price = null), (this.status = true);
    },
  },
  computed: {
    entity() {
      return this.entityDetails ? this.entityDetails : this.localEntity;
    },
    status: {
      get() {
        let st = this.entity ? Boolean(this.entity.status) : this.isActive;
        return st;
      },
      set(val) {
        this.entity ? (this.entity.status = val) : (this.isActive = val);
      },
    },
  },
  created() {
    this.entityClone = this.entityDetails
      ? Object.assign({}, this.entityDetails)
      : {};
  },
};
</script>
