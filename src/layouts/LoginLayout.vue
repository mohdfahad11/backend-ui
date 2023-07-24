<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="q-pt-sm container-class">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
    }
  }
}
</script>

<style>
.container-class{
  height: 100vh;width: 100vw; margin-left:0px; margin-top: 0px;
  padding-top: unset !important;
  background-color: rgba(196, 175, 196, 0.504);
  display: flexbox;
  flex-wrap: nowrap;
}

</style>
