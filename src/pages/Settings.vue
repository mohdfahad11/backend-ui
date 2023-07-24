<template>
  <div>
    <div class="row">
      <div class="col col-12">
        <q-splitter
          v-model="splitterModel"
          horizontal
          separator-class="bg-grey-3"
        >
          <template v-slot:before>
            <q-tabs
              v-model="tab"
              class="bg-primary text-white bigger-font"
              align="left"
              active-color="primary"
              active-bg-color="grey-3"
              indicator-color="white"
            >
              <q-tab name="Theme" icon="color_lens" label="Theme" />
            </q-tabs>
          </template>
          <template v-slot:after>
            <div class="row shadow-20 bg-white">
              <div class="col col-12">
                <q-scroll-area style="width: 90%; height: 85vh;">
                  <q-tab-panels
                    v-model="tab"
                    animated
                    swipeable
                    vertical
                    transition-prev="rotate"
                    transition-next="rotate"
                  >
                    <q-tab-panel name="Theme">
                      <Themes />
                    </q-tab-panel>
                  </q-tab-panels>
                </q-scroll-area>
              </div>
            </div>
          </template>
        </q-splitter>
      </div>
    </div>
  </div>
</template>

<script>
import Themes from '../components/settings/themes.vue'
export default {
  data() {
      return {
        tab: "Theme",
        splitterModel: 20,
        adminAuth: false,
        signInDialog: false,
      };
  },
  components: { Themes }
}
</script>
