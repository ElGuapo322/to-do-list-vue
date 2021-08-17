<template>
  <div class="column">
    <div class="title">
      {{ title }}
      <button class="delete-button" id="{props.id}" onClick="{delButton}">
        X
      </button>
    </div>

    <button v-if="!setAddButtonOpen">AddButton</button>

    <form
      v-else
      id="{props.id}"
      @submit.prevent="
        {
          submit;
        }
      "
    >
      <input @change="setName" />
      <button id="{props.id}">create</button>
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
    };
  },
  methods: {
    setName(e) {
      this.name = e.target.value;
    },
    submit() {
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
</style>