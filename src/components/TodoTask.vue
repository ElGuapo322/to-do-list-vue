<template>
  <div>
   <div :data-index="index" @dragover.prevent="taskDrop" 
   :droppable="true" :draggable="true" @dragstart="dragStart" @drop="drop" @dragend="dragEnd" 
   
   class="task" :id="id">

      <div className="task-title">
        <div>{{ title }}</div>

        <button
          class="delete-button"
          @click="deleteTaskBtn"
          :id="id"
        >
          X
        </button>

        <div class="task-info">
          <div>{{ description }}</div>
          <div>{{ executor }}</div>
          <div>{{ date }}</div>
        </div>

        <div v-for="i in showComments" :key="i.id">
          <div v-if="id===i.parentId">
      <div class="comment">
        <div>{{i.text}}</div>
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


import { v4 as uuidv4} from "uuid";
import {mapMutations} from "vuex"

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
    id:{
      type: String,
      
      required: true,
    },
    index:{
     default: "0",
    }
  },
  data() {
    return {
      commentButtonOpen: false,
      commentText: "",
    };
  },
  computed: {
    showComments(){
      return this.$store.getters.showComments
    },
  },
  methods: {
    drop(e) {
      let data = e.dataTransfer.getData("index");
      this.changeIndex({
        start: data,
        end: e.currentTarget.dataset.index,
      });
       console.log("data",data)
    },
    taskDrop(e){
      console.log(e.currentTarget.dataset.index);
      this.taskDropIndex = e.currentTarget.dataset.index
      
      e.dataTransfer.setData("items", e.currentTarget.dataset.index)
    },
    
    dragEnd(e){
      this.taskDropIndex = e.target.dataset.index
        this.handleDrag();  
    },
    dragStart(e){
     this.taskStartIndex = e.currentTarget.dataset.index
       console.log("взял",e.currentTarget.dataset.index)
       let elem = document.getElementById(e.currentTarget.id);
       e.dataTransfer.setData("index" , elem.dataset.index )
       console.log(e.dataTransfer)
     this.takeElemId(e.currentTarget.id);
    },
    
    ...mapMutations(["deleteTask", "createComment", "deleteComment", "takeElemId", "handleDrag", "changeIndex"]),
    nameComment(e) {
      this.commentText = e.target.value;
    },
    submit() {
      if(this.commentText ===""){
        return
      }
      this.createComment({
        id: uuidv4(),
        parentId: this.id,
        text: this.commentText,
      })
      this.commentText = "";
      this.commentButtonOpen = false;
    },
    commentOpen() {
      this.commentButtonOpen = !this.commentButtonOpen;
    },
    deleteTaskBtn(e){
      console.log(e.target.id)
      this.deleteTask({
        id: e.target.id
      })
    },
    deleteCommentBtn(e){
      this.deleteComment({
        id: e.target.id,
      })
    }
  },
  watch:{
taskDropIndex(val){
  console.log(val)
}
  },
  directives: {
  focus: {
    
    inserted: function (el) {
      el.focus()
    }
  }
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