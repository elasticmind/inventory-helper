<template>
  <div id="app">
    <navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  components: {
    Navigation
  }
};
</script>


<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}

ul {
  list-style-type: none;
}

html:root {
  font-size: 20px;
  background-color: #222;
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

button {
  font-size: 1.1rem;
  padding: 5px 20px;
  border-radius: 1000px;
  border: none;
  cursor: pointer;
}

.filter-wrapper {
  height: 40px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  width: 80%;
}
</style>
