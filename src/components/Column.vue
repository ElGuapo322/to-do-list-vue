<template>
  <div
    class="column"
    @drop.prevent="drop"
    
    @dragover.prevent
    :id="id"
  >
    <div class="title">
      {{ title }}
      <button class="delete-button" :id="id" @click="delColumn">X</button>
    </div>

    <button v-if="!setAddButtonOpen" @click="setAddButtonOpen = true">
      AddButton
    </button>

    <form class="task-form" v-else :id="id" @submit.prevent="submit">
      <input v-focus placeholder="Имя задачи" @change="setName" />
      <input placeholder="Описание задачи" @change="setDescription" />
      <input placeholder="Исполнитель" @change="setExecutor" />
      <input placeholder="Срок исполнения" @change="setDate" />
      <button>create</button>
    </form>

    <div v-for="(i, index) in tasks" v-bind:key="i.index">
      <div v-if="i.parentId === id">
        <TodoTask
          @change-index="changeIndex"
          @handle-drag="handleDrag"
          @take-start-id="takeStartId"
          @delete-comment="delComment"
          @create-comment="createComment"
          :comments="comments"
          @delete-task="deleteTask"
          :index="index"
          :dropId="dropId"
          :key="i.id"
          v-bind:title="i.name"
          v-bind:description="i.description"
          v-bind:executor="i.executor"
          v-bind:date="i.date"
          v-bind:id="i.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import TodoTask from "./TodoTask";

export default {
  name: "Column",
  components: {
    TodoTask,
  },
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
    tasks: {
      required: false,
    },
    comments: {
      required: false,
    },
  },
  data() {
    return {
      setAddButtonOpen: false,
      name: "",
      index: "",
      dropId: "",
    };
  },
  methods: {
    changeIndex(data) {
      this.$emit("change-index", data);
    },
    handleDrag() {
      this.$emit("handle-drag");
    },
    drop(e) {
      console.log("Айди сброса", e.currentTarget.key);
      this.$emit("take-drop-id", e.currentTarget.id);
    },
    takeStartId(data) {
      this.$emit("take-start-id", data);
    },

    setName(e) {
      this.name = e.target.value;
    },
    setDescription(e) {
      this.description = e.target.value;
    },
    setExecutor(e) {
      this.executor = e.target.value;
    },
    setDate(e) {
      this.date = e.target.value;
    },
    delColumn(e) {
      //console.log();
      this.$emit("delete-column", {
        id: e.target.id,
      });
    },
    deleteTask(data) {
      this.$emit("delete-task", data);
    },
    submit() {
      if (this.name === "") {
        return;
      }
      this.$emit("create-task", {
        id: uuidv4(),
        parentId: this.id,
        name: this.name,
        description: this.description,
        executor: this.executor,
        date: this.date,
      });

      this.name = "";
      this.description = "";
      this.executor = "";
      this.date = "";
      this.setAddButtonOpen = false;
      //
    },
    createComment(data) {
      this.$emit("create-comment", data);
      console.log("в колоннах", this.comments);
    },
    delComment(data) {
      this.$emit("delete-comment", data);
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
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
  padding-bottom:100px;
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