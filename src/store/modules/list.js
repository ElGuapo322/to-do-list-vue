import { v4 as uuidv4 } from "uuid";


export default{
    state: {
        columns:[
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
        tasks:[],
        comments:[]
    },
  mutations: {
      createColumn(state, newColumn){
          state.columns.push(newColumn)
      },
      deleteColumn(state, id){
        const checkTasks = state.tasks.filter(
            (i) => i.parentId === id.id
          );
          if (checkTasks.length===0){
          let newColumns = state.columns.filter((i)=> i.id !== id.id);
          state.columns = newColumns;
        }
      },
      createTask(state, newTask){
          state.tasks.push(newTask);
          console.log(state.tasks)
      },
      deleteTask(state, id){
          console.log(id.id)
        let newTasks = state.tasks.filter((i)=> i.id !== id.id);
        state.tasks = newTasks;
      },
      createComment(state, newComment){
          state.comments.push(newComment);
          console.log(state.comments)
      },
      deleteComment(state, id){
          let newComments = state.comments.filter((i)=> i.id !== id.id)
          state.comments = newComments
      }
  },
  actions: {},
  getters:{
      showColumns(state){
          return state.columns
      },
      showTasks(state){
          return state.tasks
      },
      showComments(state){
          return state.comments
      }
  }
}