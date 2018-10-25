<template>
  <div>
    <label for="loadSurplus">
      Többlet fájl:
      <input type="file" id="loadSurplus" @change="loadFile($event, 'loadSurplus')" >
    </label>
    <br>
    <label for="loadSurplus">
      Hiány fájl:
      <input type="file" id="loadShortage" @change="loadFile($event, 'loadShortage')" >
    </label>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["filteredCouplings", "couplingsCount"])
  },
  methods: {
    ...mapActions(["loadSurplus", "loadShortage"]),
    loadFile(event, action) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.$store.dispatch(action, JSON.parse(reader.result));
      };

      reader.readAsText(file);
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  width: 80%;
  margin: 0 auto;
  color: #eee;
}
</style>
