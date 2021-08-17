<template>
  <div class="main">
    <div v-for="i in columns" :key="i.id">
      <Column v-bind:id="i.id" v-bind:title="i.title"/>
      <!-- <Column/> -->
    </div> 

    <button v-if="!setAddColumnOpen" @click="setAddColumnOpen = true">
      Добавить
    </button>

    <div v-else class="newColumn">
      <form onSubmit="{addColumn}">
        <input autoFocus @change="colNameMethod" />
        <button type="submit">Добавить</button>
      </form>
    </div>
    
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import Column from "./components/Column.vue"

export default {
  name: "MainPage",
  components: {
    Column,
    
  },
  data(){ 
      return{
    setAddColumnOpen : false,
    colName : "",
  }
  },
  methods: {
    addColumnOpen() {
      this.setAddColumnOpen = true;
    },
    colNameMethod(e){
        this.colName = e.target.value;
    }
  },
  computed: {
    columns() {
      const column = [
        {
          id: uuidv4(),
          title: "Сделать",
        },
        {
          id: uuidv4(),
          title: "В работе",
        },
        {
          id: uuidv4(),
          title: "Сделано",
        },
      ];
      return column;
    },
    tasks(){
        const task =[];
        return task;
    },
    comments(){
        const comment=[];
        return comment;
    }
  },
};
</script>

<style>
.main {
  display: flex;
}
</style>