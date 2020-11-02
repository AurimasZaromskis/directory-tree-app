import Vue from "vue";
import Vuex from "vuex";
import { isEqual } from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    directories: {
      root: {
        title: "/",
        children: [
          {
            title: "My Music",
            children: [
              {
                title: "Classic",
                children: []
              },
              {
                title: "Rap",
                children: []
              },
              {
                title: "Pop",
                children: []
              }
            ]
          },
          {
            title: "My Photos",
            children: [
              {
                title: "Vocation",
                children: [
                  {
                    title: "USA 2016",
                    children: []
                  },
                  {
                    title: "Italy 2012",
                    children: []
                  }
                ]
              },
              {
                title: "Conference",
                children: []
              },
              {
                title: "Family",
                children: []
              }
            ]
          },
          {
            title: "My Documents",
            children: [
              {
                title: "Invoices",
                children: []
              },
              {
                title: "Agreements",
                children: []
              }
            ]
          }
        ]
      }
    }
  },
  getters: {
    getDirectories: state => {
      return state.directories;
    }
  },
  mutations: {
    deleteDirectory: (state, toDelete) => {
      findAndDelete(state.directories.root, toDelete);
    },
    addDirectory: (state, { parent, toAdd }) => {
      findAndAdd(state.directories.root, parent, toAdd);
    }
  }
});

function findAndDelete(directory, toDelete) {
  directory.children.forEach(child => {
    if (isEqual(child, toDelete)) {
      directory.children = directory.children.filter(
        dir => !isEqual(dir, toDelete)
      );
      return;
    }
    findAndDelete(child, toDelete);
  });
}

function findAndAdd(directory, parent, toAdd) {
  if (isEqual(directory, parent)) {
    let regexp = new RegExp("^" + toAdd + "(\\s\\(\\d\\))?$");

    let duplicates = directory.children.filter(child =>
      regexp.test(child.title)
    ).length;

    if (duplicates) {
      toAdd = toAdd.replace(regexp, `${toAdd} (${duplicates})`);
    }

    directory.children.push({
      title: toAdd,
      children: []
    });
    return;
  }
  directory.children.forEach(child => findAndAdd(child, parent, toAdd));
}
