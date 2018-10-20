<template>
  <div id="app">
    <board />
  </div>
</template>

<script>
import Board from '@/components/Board';

export default {
  components: {
    Board,
  }
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
