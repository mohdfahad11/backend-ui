<template>
  <div>
    <ValidationObserver v-slot="{ invalid }" ref="observer">
    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <div class="row">
        <div class="col col-6 q-pa-sm">
          <ValidationProvider
            name="Full Name"
            rules="required|alpha_spaces|min:3"
            v-slot="v"
          >
            <q-input :error="v.errors.length > 0" :error-message="v.errors[0]" v-model="user.name" type="text" label="Full Name*" outlined />
          </ValidationProvider>
        </div>
        <!-- <div class="col col-6 q-pa-sm">
          <q-input v-model="lname" type="text" label="Last Name" outlined />
        </div> -->
        <div class="col col-6 q-pa-sm">
          <q-select
            v-model="user.role_id"
            :options="userRoles"
            label="User Type"
            outlined
            map-options
            :option-label="(item) => item.role"
            :option-value="(item) => item.id"
          />
        </div>
        <div class="col col-6 q-pa-sm">
          <ValidationProvider
            name="Email"
            rules="required|email"
            v-slot="v"
          >
            <q-input :error="v.errors.length > 0" :error-message="v.errors[0]" v-model="user.email" type="email" label="Email*" outlined :disable="mode=='EDIT'" />
          </ValidationProvider>
        </div>
        <div class="col col-6 q-pa-sm">
          <ValidationProvider
            name="Phone"
            rules="length:10|numeric"
            v-slot="v"
          >
            <q-input :error="v.errors.length > 0" :error-message="v.errors[0]" v-model="user.phone_no" type="text" label="Phone No." outlined />
          </ValidationProvider>
        </div>
        <div class="col col-6 q-pa-sm" >
          <ValidationProvider
            name="Password"
            :rules="mode=='ADD' ? 'required|min:6' : null"
            v-slot="v"
          >
            <q-input :error="v.errors.length > 0" :error-message="v.errors[0]" v-model="password" type="text" :label="mode=='ADD' ? 'Password*' : 'Password'" outlined />
          </ValidationProvider>
        </div>
        <div class="col col-6 q-pa-sm" v-if="mode=='EDIT'" >
          <ValidationProvider
            name="Username"
            rules=""
            v-slot="v"
          >
            <q-input :error="v.errors.length > 0" :error-message="v.errors[0]" v-model="user.username" type="text" label="Username" outlined disable />
          </ValidationProvider>
        </div>
        <div class="col col-12 q-pa-sm">
          <q-toggle v-model="status" color="primary" label="Active" left-label/>
        </div>
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
import { mapState, mapActions } from 'vuex'
  export default {
    props: ['tab', 'mode', 'userDetails'],
    data() {
      return {
        userType: null,
        userTypeOptions: [],
        isActive: true,
        password: null,
        localUser: {
          name: null,
          phone_no: null,
          email: null,
          password: null,
          status: 1,
          role_id: null,
          username: null
        }
      }
    },
    methods: {
      ...mapActions('users', ['createUser', 'updateUser', 'getUserRoleList']),
      onSubmit() {
        let obj = {
          name: this.user.name,
          email: this.user.email,
          phone_no: this.user.phone_no,
          status: Number(this.user.status),
          role_id: this.user.role_id.id,
          password: this.password
        }
        let functionToExec = this.mode == 'ADD'? this.createUser(obj) : this.updateUser({id: this.user.id, data: obj})
        functionToExec
          .then(() => {
            this.onReset()
            this.$emit("update:showAddForm", false)
          })
      },
      onReset() {
        this.user.name = null,
        this.user.email = null,
        this.user.phone_no = null,
        this.user.password = null,
        this.status = true
      }
    },
    computed: {
      ...mapState('users', ['userRoles']),
      user() {
        return this.mode == 'EDIT' && this.userDetails ? this.userDetails : this.localUser
      },
      status: {
        get() {
          let st = this.mode == 'EDIT' && this.user ? Boolean(this.user.status) : this.isActive
          return st
        },
        set(val) {
          this.mode == 'EDIT' && this.user ? this.user.status = val : this.isActive = val
        }
      }
    },
    created() {

    }
  }
</script>
