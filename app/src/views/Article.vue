<script setup>
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import articleHttp from "../services/article";
import storeHttp from "../services/store";

const open = ref(false);
const name = ref("");
const precio = ref("");
const storeId = ref("");
const fields = ref(["name", "price", "store", "actions"]);
const articles = ref([]);
const stores = ref([]);
const articleSelected = ref(null);
const actionModal = ref("");

const addArticle = () => {
  getAllStore();
  open.value = true;
  actionModal.value = "add";
};
const editArticle = (article) => {
  getAllStore();
  // console.log(stores);
  open.value = true;
  actionModal.value = "edit";
  name.value = article.name;
  precio.value = article.precio;
  storeId.value = article.store.id;
  articleSelected.value = article;
};
const getAllStore = () => {
  storeHttp.getAll().then((res) => {
    stores.value = res.data;
  });
};
const getAll = () => {
  articleHttp.getAll().then((res) => {
    articles.value = res.data;
  });
};
const save = () => {
  const datos = {
    name: name.value,
  };
  articleHttp.post({ body: datos }).then((res) => {
    resetForm();
    getAll();
  });
};
const update = () => {
  const datos = {
    name: name.value,
    precio: precio.value,
    storeId: storeId.value,
  };
  articleHttp.put(articleSelected.value.id, { body: datos }).then((res) => {
    resetForm();
    getAll();
  });
};
const remove = (id) => {
  articleHttp.delete(id).then((res) => {
    resetForm();
    getAll();
  });
};
const resetForm = () => {
  open.value = false;
  name.value = "";
  precio.value = "";
  storeId.value = "";
  articleSelected.value = null;
};

getAll();
</script>

<template>
  <div class="container">
    <div class="table">
      <div class="filters">
        <button @click="addArticle">Add Article</button>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="(field, index) in fields" :key="`field-${index}`">
              {{ field }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in articles" :key="`article-${index}`">
            <td>{{ article.name }}</td>
            <td>{{ article.precio }}</td>
            <td>{{ article.store.name }}</td>
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="actions edit"
                @click="editArticle(article)"
              >
                <path
                  d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="actions delete"
                @click="remove(article.id)"
              >
                <path
                  d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :open.sync="open" @hide="resetForm" width="25rem" height="40vh">
      <template v-slot:header>
        {{ actionModal == "add" ? "Add" : "Update" }} Article
      </template>

      <template v-slot:body>
        <div class="container-modal">
          <div>
            <label for="">Name:</label> <input type="text" v-model="name" />
          </div>
          <div>
            <label for="">Price:</label>
            <input type="number" v-model="precio" />
          </div>
          <div>
            <label for="">Store:</label>
            <select v-model="storeId">
              <option v-for="store in stores" :key="store.id" :value="store.id">
                {{ store.name }}
              </option>
            </select>
            <!-- <input type="text" v-model="storeId"> -->
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <div class="footer-modal">
          <button class="danger" @click="resetForm">Cancel</button>
          <button
            class="success"
            @click="actionModal == 'add' ? save() : update()"
          >
            {{ actionModal == "add" ? "Add" : "Update" }}
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  justify-content: flex-end;
  background-color: #e5e5e7;
  padding: 2rem 3rem;
  border-radius: 0.5rem;
}

.container button {
  border-radius: 0.3rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  color: #fff;
  transition: all 0.2s ease-in-out;
}

.container button:hover {
  opacity: 0.7;
}

.filters button {
  background-color: #456fe5;
  border: 1px solid #456fe5;
}

.filters button:hover {
  background-color: #456fe5;
  color: #fff;
}

.footer-modal {
  display: flex;
  justify-content: flex-end;
}

.footer-modal button {
  margin-left: 1rem;
  border-radius: 0.3rem;
}

.footer-modal button.danger {
  border: 1px solid red;
  background-color: red;
}

.footer-modal button.success {
  border: 1px solid green;
  background-color: green;
}

.container-modal {
  padding: 1rem;
}

.container-modal div {
  margin-top: 2.5rem;
  margin-left: 1rem;
}

.container-modal div label {
  margin-right: 3rem;
}

.container-modal div input {
  height: 1.5rem;
}

.table {
  width: 28rem;
  margin-top: 8rem;
  margin-left: auto;
  margin-right: auto;
}

.table table {
  margin-top: 1rem;
  width: 100%;
  background-color: #e5e5e7;
  padding: 2rem 3rem;
  border-radius: 0.5rem;
}

.table td,
.table th {
  padding: 1rem;
  text-align: left;
}

.table th {
  padding-top: 0;
  text-transform: uppercase;
}

.table th:last-child,
.table td:last-child {
  text-align: right;
}

.actions {
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  cursor: pointer;
}

.edit {
  fill: green;
}

.delete {
  fill: red;
}
</style>
