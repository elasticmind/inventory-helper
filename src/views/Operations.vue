<template>
  <div>
    <table>
      <tr>
        <td>
          <label for="loadSurplus">
            Többlet fájl:
          </label>
        </td>
        <td>
          <input type="file" id="loadSurplus" @change="loadFile($event, 'loadSurplus')" >
        </td>
      </tr>
      <tr>
        <td>
          <label for="loadShortage">
            Hiány fájl:
          </label>
        </td>
        <td>
          <input type="file" id="loadShortage" @change="loadFile($event, 'loadShortage')" >
        </td>
      </tr>
      <tr>
        <td>
          <label for="saveStore">
            Állapot mentése:
          </label>
        </td>
        <td>
          <button id="saveStore" @click="saveStore">Mentés</button>
        </td>
      </tr>
      <tr>
        <td>
          <label for="loadStore">
            Állapot betöltése:
          </label>
        </td>
        <td>
          <input type="file" id="loadStore" @change="loadStore($event)" >
        </td>
      </tr>
      <tr>
        <td>
          <label for="saveCouplings">
            Összevonások mentése:
          </label>
        </td>
        <td>
          <button id="saveCouplings" @click="saveCouplings">Mentés</button>
        </td>
      </tr>
    </table>
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
      saveText(JSON.stringify(this.$store.state, null, 2), 'progress.json');
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
      saveText(exportFormat(this.$store.getters.couplingsItems), 'export.csv');
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

button {
  min-width: 87px;
}

table {
  width: 100%;
}

tr {
  height: 40px;

  & td:first-child {
    text-align: right;
    padding-right: 10px;
  }
}
</style>
