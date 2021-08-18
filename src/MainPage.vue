<template>
  <div class="main">
    <div v-for="i in showColumns" :key="i.id">
      <Column v-bind:id="i.id" v-bind:title="i.title"/>
      
    </div> 

    <button v-if="!setAddColumnOpen" @click="setAddColumnOpen = true">
      Добавить
    </button>

    <div v-else class="newColumn">
      <form @submit.prevent="addColumn">
        <input v-focus @change="colNameMethod" />
        <button type="submit">Добавить</button>
      </form>
    </div>
    
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import Column from "./components/Column.vue";
import {mapMutations} from "vuex"

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
    methods: {
    focusInput() {
      this.$refs.focusMe.focus();
    }
  },
  ...mapMutations(['createColumn']),
  addColumn(){
    if(this.colName ===""){
     return
    }
    this.createColumn({
    id: uuidv4(),
    title: this.colName
  }
  
    )
    this.colName ="";
    this.setAddColumnOpen = false;
  },
    addColumnOpen() {
      this.setAddColumnOpen = true;
      this.focusInput
    },
    colNameMethod(e){
      this.$refs.focusMe.focus();
    
        this.colName = e.target.value;
    }
  },
  directives: {
  focus: {
    
    inserted: function (el) {
      el.focus()
    }
  }
},
  computed: {
    
    showColumns(){
      return this.$store.getters.showColumns
    }
  },
};
</script>

<style>
.main {
  display: flex;
}
</style>