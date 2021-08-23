<template>
  <div>
    <div
      :data-index="index"
      @dragover.prevent="taskDrop"
      :droppable="true"
      :draggable="true"
      @dragstart="dragStart"
      @drop="drop"
      @dragend="dragEnd"
      class="task"
      :id="id"
    >
      <div className="task-title">
        <div>{{ title }}</div>

        <button class="delete-button" @click="deleteTaskBtn" :id="id">X</button>

        <div class="task-info">
          <div>{{ description }}</div>
          <div>{{ executor }}</div>
          <div>{{ date }}</div>
        </div>

        
        <div v-for="i in comments" :key="i.id">
          <div v-if="id === i.parentId">
            <div class="comment">
              <div>{{ i.text }}</div>
              <button
                class="delete-button"
                @click="deleteCommentBtn"
                :id="i.id"
              >
                X
              </button>
            </div>
          </div>
        </div>
        <form v-if="commentButtonOpen" @submit.prevent="submit">
          <input v-focus @change="nameComment" />
          <button type="submit">add comment</button>
        </form>

        <button v-on:click="commentOpen" class="comment-button">
          add comment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "TodoTask",
  props: {
    title: {
      type: String,
      
      required: true,
    },
    description: {
      type: String,
      
      required: true,
    },
    executor: {
      type: String,
      
      required: true,
    },
    date: {
      type: String,
      
      required: true,
    },
    id: {
      type: String,

      required: true,
    },
    comments: {
      required: false,
    },
    index: {
      required: false,
    },
  },
  data() {
    return {
      commentButtonOpen: false,
      commentText: "text",
    };
  },

  methods: {
    drop(e) {
      let data = e.dataTransfer.getData("index");
      this.$emit("change-index", {
        start: data,
        end: e.currentTarget.dataset.index,
      });
      console.log("data", data);
    },
    taskDrop(e) {
      console.log(e.currentTarget.dataset.index);
      this.taskDropIndex = e.currentTarget.dataset.index;

      e.dataTransfer.setData("items", e.currentTarget.dataset.index);
    },

    dragEnd(e) {
      this.taskDropIndex = e.target.dataset.index;
      this.$emit("handle-drag");
    },
    dragStart(e) {
      this.taskStartIndex = e.currentTarget.dataset.index;
      console.log("взял", e.currentTarget.dataset.index);
      let elem = document.getElementById(e.currentTarget.id);
      e.dataTransfer.setData("index", elem.dataset.index);
      console.log(e.dataTransfer);
      this.$emit("take-start-id", e.currentTarget.id);
    },
    submit() {
      if (this.commentText === "") {
        return;
      }
      this.$emit("create-comment", {
        id: uuidv4(),
        parentId: this.id,
        text: this.commentText,
      });
      this.commentText = "";
      this.commentButtonOpen = false;
      console.log(this.comments);

      //
    },
    commentOpen() {
      console.log("kek");
      this.commentButtonOpen = !this.commentButtonOpen;
    },
    nameComment(e) {
      this.commentText = e.target.value;
    },
    deleteTaskBtn(e) {
      console.log(e.target.id);
      this.$emit("delete-task", {
        id: e.target.id,
      });
    },
    deleteCommentBtn(e) {
      this.$emit("delete-comment", {
        id: e.target.id,
      });
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
.comment-button {
  font-size: 10px;
  margin-left: 10px;
  width: 60px;
}
.task-title {
  width: 80%;
  display: flex;
  padding-left: 10%;
  padding-right: 10%;
  justify-content: space-between;
  border-bottom: 2px solid;
}
.task-form {
  display: flex;
  flex-direction: column;
}
.task {
  border: 1px solid;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: rgb(73, 140, 172);
  display: flex;
  flex-direction: column;
  padding: 10px;
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
.comment {
  border: 2px solid;

  overflow: hidden;

  border: 1px solid;
  background-color: white;
}
</style>