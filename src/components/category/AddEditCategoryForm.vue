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
          <span>Name*:</span>
          <ValidationProvider
            name="Name"
            rules="required|alpha_spaces"
            v-slot="v"
          >
          <q-input
            :error="v.errors.length > 0"
            :error-message="v.errors[0]"
            v-model="entity.category"
            type="text"
            outlined
          />
          </ValidationProvider>
        </div>
        <div class="col col-6 q-pa-sm">
          <span>Description:</span>
          <ValidationProvider
            name="Description"
            rules="alpha_spaces"
            v-slot="v"
          >
          <q-input :error="v.errors.length > 0" :error-message="v.errors[0]" v-model="entity.description" type="textarea" outlined />
          </ValidationProvider>
        </div>
        <div class="col col-6 q-pa-sm">
          <span>Image:</span>
          <br>
          <q-btn @click="callPhotoInput" class="q-mb-md full-width" :ripple="false">
            <q-btn padding="none" flat @click.stop="deleteConfirm=true" class="absolute-right" style="height:40px" v-if="attachment && Object.keys(attachment).length != 0">
              <q-avatar size="35px">
                <img src="~assets/images/delete.png" alt="">
              </q-avatar>
            </q-btn>
            <q-avatar
              size="122px"
              square
            >
              <img v-if="productImage" :src="imgSrc">
              <img v-else-if="mode=='EDIT' && Object.keys(attachment).length !=0" :src="attachment.upload_path" alt="">
              <img v-else src="~assets/images/add_image.png" alt="" >
              <!-- <img :src="attachment.upload_path" > -->

            </q-avatar>
          </q-btn>
          <q-file
            v-model="productImage"
            ref="prodImg"
            :label="tab=='PRODUCTS' ? 'Product Image' : 'Category Image'"
            outlined
            accept="image/*"
            @input="onPhotoUpload"
            max-file-size="1000000"
            style="display: none;"
          />
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

    <q-dialog v-model="deleteConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure, you want to delete image?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" v-close-popup @click="deleteImage()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
        category: null,
        localEntity: {
          category: null,
          description: null,
          status: null
        },
        productImage: null,
        imgSrc: null,
        deleteConfirm: false,
        entityClone: {}
      }
    },
    methods: {
      ...mapActions('categories', ['createCategory', 'updateCategory', 'updateAttachment', 'deleteAttachment', 'createAttachment']),
      onPhotoUpload() {
        this.imgSrc = URL.createObjectURL(this.productImage)
      },
      callPhotoInput() {
        this.$refs.prodImg.$el.click()
      },
      onSubmit() {
        if(this.tab == 'CATEGORIES') {
          let obj = new FormData()
          obj.append('category', this.entity.category),
          obj.append('status', Number(this.status)),
          this.productImage ? obj.append('attachment', this.productImage) : null

          if(this.mode == 'ADD') {
            this.createCategory(obj)
              .then(() => {
                this.onReset()
                this.$store.commit('categories/GET_ATTACHMENT', {})
                this.$emit("update:showAddForm", false)
              })
          } else {
            if(this.productImage) {
              if(this.entityClone.status != Number(this.status) || this.entity.category != this.entityClone.category) {
                obj.set('attachment', null)
                this.updateCategory({id: this.entity.id, data: obj})
                  .then(() => {
                    this.onReset()
                    this.$store.commit('categories/GET_ATTACHMENT', {})
                    this.$emit("update:showAddForm", false)
                  })
              }
              if(Object.keys(this.attachment).length !=0) {
                let FD = new FormData()
                FD.append('attachment', this.productImage)
                this.updateAttachment({
                  id: this.attachment.id,
                  module_type: 1,
                  module_id: this.entity.id,
                  body: FD
                })
                  .then(() => {
                    this.onReset()
                    this.$store.commit('categories/GET_ATTACHMENT', {})
                    this.$emit("update:showAddForm", false)
                  })
              } else {
                let FD = new FormData()
                FD.append('module_type', 1)
                FD.append('module_id', this.entity.id)
                FD.append('attachment', this.productImage)
                this.createAttachment(FD)
                  .then(() => {
                    this.onReset()
                    this.$store.commit('categories/GET_ATTACHMENT', {})
                    this.$emit("update:showAddForm", false)
                  })
              }
            } else {
              if(this.entityClone.status != Number(this.status) || this.entity.category != this.entityClone.category ) {
                this.updateCategory({id: this.entity.id, data: obj})
                  .then(() => {
                    this.onReset()
                    this.$store.commit('categories/GET_ATTACHMENT', {})
                    this.$emit("update:showAddForm", false)
                  })
              } else {
                this.$store.commit('categories/GET_ATTACHMENT', {})
                this.$emit("update:showAddForm", false)

              }
            }
          }

        }

      },
      deleteImage() {
        this.deleteAttachment({
          id: parseInt(this.attachment.id),
          module_type: parseInt(this.attachment.module_type),
          module_id: parseInt(this.attachment.module_id)
        })
          .then(()=> {
            this.$store.commit('categories/GET_ATTACHMENT', {})
            notifications.successNotify("Image is deleted successfully!")
          })
      },
      onReset() {
        this.entity.category = null,
        this.status = true
      }
    },
    computed: {
      ...mapState('categories', ['attachment']),
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
      prodImg() {
        return this.mode == 'EDIT' && Object.keys(this.attachment).length !=0 ? this.attachment.upload_path : this.productImage
      }
    },
    created() {
      this.entityClone = this.mode == 'EDIT' && this.entityDetails ? Object.assign({}, this.entityDetails) : {}
    }
  }
</script>
