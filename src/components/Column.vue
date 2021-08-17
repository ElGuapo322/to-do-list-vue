<template>
  <div class="column">
    <div class="title">
      {{ title }}
      <button class="delete-button" id="props.id" onClick="delButton">
        X
      </button>
    </div>

    <button v-if="!setAddButtonOpen" @click="setAddButtonOpen = true">AddButton</button>

    <form
    class="task-form"
      v-else
      :id="id"
      @submit.prevent="submit"
    >
      <input placeholder="Имя задачи" @change="setName" />
      <input placeholder="Описание задачи" @change="setDescription" />
      <input placeholder="Исполнитель" @change="setExecutor" />
      <input placeholder="Срок исполнения" @change="setDate" />
      <button :id="id" >create</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Column",
  props: {
    title: {
      type: String,
      default: "name",
      required: true,
    },
    id: {
      type: String,
      
      required: true,
    },
  },
  data() {
    return {
      setAddButtonOpen: false,
      name: "",
      description:"",
      executor:"",
      date:"",

    };
  },
  methods: {
    setName(e) {
      this.name = e.target.value;
    },
    setDescription(e){
      this.description = e.target.value;
    },
    setExecutor(e){
        this.executor = e.target.value;

    },
    setDate(e){
        this.date = e.target.value;

    },
    submit(e) {
        let obj = {
            name: this.name,
            description: this.description,
            executor: this.executor,
            date: this.date,
        }
        console.log(obj, e.target.id)
        this.setAddButtonOpen = false;
      //
    },
  },
};
</script>
<style>
.column {
  border: 2px solid;
  min-height: 400px;
  width: 300px;
  margin-left: 50px;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  background-color: rgba(231, 247, 248, 0.911);
}
.title {
  border-bottom: 1px solid;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(102, 203, 250);
}
.delete-button {
  height: 22px;
  width: 22px;
  border: 1px solid;
  background-color: rgb(7, 26, 194);
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.task-form {
  display: flex;
  flex-direction: column;
}
</style>