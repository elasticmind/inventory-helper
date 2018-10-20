<template>
  <div id="app">
    <router-link to='/store'>Leltár</router-link>
    <router-link to='/couplings'>Összevonások</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
}
</script>


<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

ul {
  list-style-type: none;
}
</style>
