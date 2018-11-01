<template>
  <div id="app">
    <navigation />
    <keep-alive>
    <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Navigation
  },
  computed: {
    ...mapGetters(['isCouplingAddable'])
  },
  mounted() {
    window.addEventListener("keyup", this.enterHandler);
  },
  destroyed() {
    window.removeEventListener("keyup", this.enterHandler);
  },
  methods: {
    ...mapActions(["addCoupling"]),
    enterHandler(event) {
      if (event.keyCode === 13) {
        if (this.isCouplingAddable) {
          this.addCoupling();
        }
      }
    }
  }
};
</script>


<style lang="scss">
*:not(button) {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}

ul {
  list-style-type: none;
}

html {
  height: 100vh;

  &:root {
    font-size: 14px;
    background-color: #222;
  }
}

input[type="text"] {
  background-color: #ddd;
  display: block;
  height: 30px;
  width: 100%;
  margin-right: 5px;
  border: none;
  font-size: 1.2rem;
  padding: 5px;
}

input[type="checkbox"] {
  width: 40px;
  transform: scale(1.5);
}

.filter-wrapper {
  height: 40px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  width: 80%;
}
</style>
