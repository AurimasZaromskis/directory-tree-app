<template>
  <div>
    <div
      @click="isExpanded = !isExpanded"
      :style="{ 'margin-left': `${level * 20}px` }"
    >
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on }">
          <div @contextmenu.prevent="on.click">
            <v-icon small color="blue">
              {{ isExpanded ? "mdi-folder-open" : "mdi-folder" }}
            </v-icon>
            <span>
              {{ directory.title }}
            </span>
          </div>
        </template>
        <v-list>
          <v-list-item @click="() => (showDirectoryInput = true)">
            <v-list-item-title>
              Add directory
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="level" @click="deleteDirectory(directory)">
            <v-list-item-title>
              Delete
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <template v-if="isExpanded">
      <directories-tree
        v-for="(child, index) in directory.children"
        :key="index"
        :directory="child"
        :level="level + 1"
      />
    </template>
    <v-dialog width="300" v-model="showDirectoryInput">
      <directory-add-modal
        v-if="showDirectoryInput"
        @submitted="() => (showDirectoryInput = false)"
        :directory="directory"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import DirectoryAddModal from "./DirectoryAddModal";

export default {
  name: "directories-tree",
  components: {
    DirectoryAddModal
  },
  props: {
    directory: {
      type: Object
    },
    level: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    isExpanded: false,
    showDirectoryInput: false
  }),
  methods: {
    ...mapMutations(["deleteDirectory"])
  }
};
</script>
