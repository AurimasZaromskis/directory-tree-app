<template>
  <v-card>
    <v-card-title>
      <span class="headline">
        Enter directory name
      </span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="8">
            <v-text-field
              label="Name"
              v-model="newDirectoryName"
              v-on:keyup.enter="submitDirectory"
            />
          </v-col>
          <v-col cols="4">
            <v-btn primary @click="submitDirectory">
              Add
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <ul v-if="errors.length">
              <li
                v-for="(error, index) in errors"
                :key="index"
                class="red--text"
              >
                {{ error }}
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "directory-add-modal",
  props: {
    directory: {
      type: Object
    }
  },
  data: () => ({
    newDirectoryName: "",
    errors: []
  }),
  created() {
    this.clearNewName();
  },
  methods: {
    submitDirectory() {
      this.validateInput();
      if (this.errors.length) return;

      this.addDirectory({
        parent: this.directory,
        toAdd: this.newDirectoryName.trim()
      });
      this.clearNewName();
      this.$emit("submitted");
    },
    clearNewName() {
      this.newDirectoryName = "";
    },
    validateInput() {
      this.errors = [];

      if (!this.newDirectoryName) this.errors.push("Field cannot be empty");
      if (this.newDirectoryName.match(/[^A-Za-z0-9\-_\s]/))
        this.errors.push("Field cannot contain special characters");
    },
    ...mapMutations(["addDirectory"])
  }
};
</script>
