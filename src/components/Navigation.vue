<template>
  <nav>
    <router-link to='/operations' class="nav-item">Műveletek</router-link>
    <router-link to='/store' class="nav-item">Leltár</router-link>
    <router-link to='/couplings' class="nav-item">Összevonások({{ couplingsCount }})</router-link>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["couplingsCount"])
  }
};
</script>

<style lang="scss" scoped>
nav {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  margin: 0 20px;
  padding: 5px 20px;
  width: 300px;
  height: 40px;
  text-align: center;
  font-size: 1.2rem;
  text-transform: uppercase;

  &:hover {
    background-color: #eee;
    color: #444;
  }
}

.router-link-active {
  background-color: #666;
  color: #fff;
}
</style>
