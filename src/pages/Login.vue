<template>
  <!-- <div class="full-width">
    <div class="row items-center justify-center full-width" style="height: 100vh;border: 1px solid black; width:100vw">
      <div class="col col-4 text-center bg-white shadow-20 q-pa-lg ">
        <span class="text-h4 text-primary q-pb-md">Login to continue</span>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md q-mt-lg"
        >
          <div>
            <q-input v-model="user.username" type="text" label="Username" outlined />
          </div>
          <div>
            <q-input v-model="user.password" type="password" label="Password" outlined />
          </div>
          <div>
            <q-btn label="Login" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </div>
  </div> -->
  <q-page class="row full-height bg-primary items-center justify-center">
    <div class="col-md-4">
      <q-card class="my-card content-center text-center">
        <q-img
          src="../assets/images/Pratham_logo.png"
          alt="pratham"
          style="height: 280px; max-width: 320px"
        />
        <q-card-section>
          <div class="q-pa-sm">
            <div class="text-h5 q-pb-md text-weight-bold text-center">
              Login Here
            </div>
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md q-mt-lg"
            >
              <div>
                <q-input v-model="user.username" type="text" label="Username" outlined />
              </div>
              <div>
                <q-input v-model="user.password" type="password" label="Password" outlined />
              </div>
              <div>
                <q-btn
                  label="Login"
                  padding="10px 30px"
                  size="md"
                  unelevated
                  type="submit"
                  color="primary"/>
              </div>
            </q-form>
          </div>
        </q-card-section>
        <q-inner-loading
          :showing="visible"
          label-class="text-indigo"
          label-style="font-size: 2em"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      user: {}
    }
  },
  methods: {
    ...mapActions('users', ['loginAdmin']),
    onSubmit() {
      this.loginAdmin(this.user)
        .then(() => {
          this.$router.push({path: '/'})
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onReset() {

    }
  }
}
</script>
