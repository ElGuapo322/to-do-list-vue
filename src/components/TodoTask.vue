<template>
  <div>
    <div class="task">
      <div className="task-title">
        <div>{{ title }}</div>

        <button
          className="delete-button"
          onClick="{deleteTaskBtn}"
          id="{props.id}"
        >
          X
        </button>

        <div class="task-info">
          <div>{{ description }}</div>
          <div>{{ executor }}</div>
          <div>{{ date }}</div>
        </div>

        <!-- {comments.map((i) => props.id === i.parentId ? ( -->
      </div>
      <div class="comment">
        <div>{i.text}</div>
        <button
          className="delete-button"
          onClick="{deleteCommentBtn}"
          id="{i.id}"
        >
          X
        </button>
      </div>

      <form v-if="commentButtonOpen" @submit.prevent="submit">
        <input autoFocus @change="nameComment" />
        <button type="submit">add comment</button>
      </form>

      <button v-on:click="commentOpen" class="comment-button">
        add comment
      </button>
    </div>
  </div>
</template>

<script>


import { v4 as uuidv4} from "uuid";
export default {
  name: "TodoTask",
  
  props: {
    title: {
      type: String,
      default: "name",
      required: true,
    },
    description: {
      type: String,
      default: "описание",
      required: true,
    },
    executor: {
      type: String,
      default: "исполнитель",
      required: true,
    },
    date: {
      type: String,
      default: "00:00",
      required: true,
    },
  },
  data() {
    return {
      commentButtonOpen: false,
      commentText: "text",
    };
  },
  computed: {
    columns() {
      const columns = [
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
      return columns;
    },
  },
  methods: {
    nameComment(e) {
      this.commentText = e.target.value;
    },
    submit() {
      //
    },
    commentOpen() {
      this.commentButtonOpen = !this.commentButtonOpen;
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
</style>