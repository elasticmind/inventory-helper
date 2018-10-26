<template>
  <div>
    <label for="loadSurplus">
      Többlet fájl:
      <input type="file" id="loadSurplus" @change="loadFile($event, 'loadSurplus')" >
    </label>
    <br>
    <label for="loadShortage">
      Hiány fájl:
      <input type="file" id="loadShortage" @change="loadFile($event, 'loadShortage')" >
    </label>
    <br>
    <br>
    <button @click="saveStore">Állapot mentése</button>
    <br>
    <label for="loadStore">
      Állapot betöltése:
      <input type="file" id="loadStore" @change="loadStore($event)" >
    </label>
    <br>
    <br>
    <button @click="saveCouplings">Összevonások mentése</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import saveText from '@/util/saveText';
import { exportFormat } from '@/util/dataTransformer';

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
    },
    saveStore() {
      saveText(JSON.stringify(this.$store.state, null, 2), 'progress');
    },
    loadStore(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.$store.replaceState(JSON.parse(reader.result));
      };

      reader.readAsText(file);
    },
    saveCouplings() {
      saveText(exportFormat(this.$store.getters.couplingsItems), 'export');
    },
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
