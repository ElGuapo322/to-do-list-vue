<template>
  <div class="main">
    <Column
      @change-index="changeIndex"
      @handle-drag="handleDrag"
      @take-start-id="setStartId"
      @take-drop-id="setDropId"
      v-for="i in columns"
      :key="i.id"
      @delete-task="deleteTask"
      @delete-column="delColumn"
      @create-task="createTask"
      @create-comment="createComment"
      @delete-comment="delComment"
      :comments="comments"
      :tasks="tasks"
      :id="i.id"
      v-bind:title="i.title"
    />

    <button v-if="!setAddColumnOpen" @click="setAddColumnOpen = true">
      Добавить
    </button>

    <div v-else className="newColumn">
      <form @submit.prevent="addColumn">
        <input autoFocus @change="colNameMethod" />
        <button type="submit">Добавить</button>
      </form>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import Column from "./components/Column";

export default {
  name: "MainPage",
  components: {
    Column,
  },
  data() {
    return {
      setAddColumnOpen: false,
      colName: "",
      columnsData: [
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
      ],
      tasksData: [],
      commentsData: [],
      dropId: "",
      startId: "",
    };
  },
  methods: {
    changeIndex(data) {
      const taskCopy = this.tasks[parseInt(data.start)];
      this.tasks.splice(parseInt(data.start), 1);
      this.tasks.splice(data.end, 0, taskCopy);
    },
    handleDrag() {
      console.log(this.dropId, this.startId);
      if (this.startId === "" && this.dropId === "") {
        return;
      }
      this.tasks.map((i) => {
        if (i.id === this.startId) {
          return (i.parentId = this.dropId);
        }
      });
    },
    setStartId(data) {
      console.log("start id", data);
      this.startId = data;
    },
    setDropId(data) {
      console.log("drop id", data);
      this.dropId = data;
    },
    createTask(data) {
      console.log(data);
      this.tasks.push(data);
      console.log(this.tasks);
    },
    colNameMethod(e) {
      this.colName = e.target.value;
    },
    addColumnOpen() {
      this.setAddColumnOpen = true;
    },
    delColumn(data) {
      this.columns = this.columns.filter((column) => column.id !== data.id);
    },
    deleteTask(data) {
      console.log(data);
      this.tasks = this.tasks.filter((task) => task.id !== data.id);
    },
    addColumn() {
      if (this.colName === "") {
        return;
      }
      this.columnsData.push({
        id: uuidv4(),
        title: this.colName,
      });
      this.colName = "";
      this.setAddColumnOpen = false;
    },
    createComment(data) {
      console.log(data);
      console.log(this.comments);
      this.commentsData.push(data);
    },
    delComment(data) {
      this.comments = this.comments.filter((comment) => comment.id !== data.id);
    },
  },
  computed: {
    columns: {
      get() {
        return this.columnsData;
      },
      set(value) {
        return (this.columnsData = value);
      },
    },
    tasks: {
      get() {
        return this.tasksData;
      },
      set(value) {
        return (this.tasksData = value);
      },
    },
    comments: {
      get() {
        return this.commentsData;
      },
      set(value) {
        return (this.commentsData = value);
      },
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
.main {
  display: flex;
}
</style>