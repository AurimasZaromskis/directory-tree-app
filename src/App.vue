<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <directories-tree
              class="d-inline-block"
              :directory="getDirectories.root"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import DirectoriesTree from "./components/DirectoriesTree";

export default {
  name: "App",
  components: {
    DirectoriesTree
  },
  computed: {
    ...mapGetters(["getDirectories"])
  }
};
</script>
