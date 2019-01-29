<template>
  <div class="hello"> 
    <div class="holder">
      <modal name="edit-color" transition="pop-out" :width="400" :height="400">
          <h2> Edit Color </h2>
            <div>
                <form @submit.prevent="fetchUpdate">
                    <p class="select">
                      <select class="colors" v-model="color">
                        <option value="red">red</option>
                        <option value="orange">orange</option>
                        <option value="yellow">yellow</option>
                        <option value="green">green</option>
                        <option value="indego">indego</option>
                      </select>
                    </p>
                  <button type="submit">Change</button>
                </form>
            </div>
      </modal>
      <form @submit.prevent="addColor">
        <p class="select">
          <select class="colors" v-model="color">
            <option value="red">red</option>
            <option value="orange">orange</option>
            <option value="yellow">yellow</option>
            <option value="green">green</option>
            <option value="indego">indego</option>
          </select>
        </p>
        <button type="sumbit">Add</button>
      </form>
        <ul>
          <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
            <li v-for="(data) in rainbow" :key='data.id'>{{data.color}}
              <i class="fa fa-plus-circle" v-on:click="showEdit(data.id)"></i>
              <i class="fa fa-minus-circle" v-on:click="remove(data.id)"></i>
            </li>
          </transition-group>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created() {
      axios({
        url:'http://localhost:4000/api/rainbow'
      })
      .then(res => {
        this.rainbow = res.data
      })
  },
  data() {
    return {
     color:"",
     rainbow: [],
     id: 0,
     updateId: 0
    }
  },
  methods: {
    addColor() {
      const index = this.rainbow.length
      const color = this.color
      let id = ++this.id
      axios({
        method: 'post',
        url:'http://localhost:4000/api/add',
        data: {
          index,
          id,
          color
        }
      })
      .then(res => {
        this.rainbow = res.data.colors
      })
    },
    remove(id) {
      const index = this.rainbow.map((obj) => obj.id ).indexOf(id)
      axios({
        method: 'delete',
        url: `http://localhost:4000/api/delete/${index}`
      })
      .then(res => {
        this.rainbow = res.data.newRainbow
      })
    },
    showEdit(id) {
      this.updateId = id
      this.$modal.show('edit-color')
    },
    fetchUpdate() {
      const id = this.updateId
      const color = this.color
      const index = this.rainbow.map((obj) => obj.id ).indexOf(id)
      axios({
        method: 'put',
        url: `http://localhost:4000/api/edit/${index}`,
        data: { id,
          color } 
      })
      .then(res => {
        this.rainbow = res.data.colors
      })
    }
  }
}
</script>
<style scoped>

  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css";
  @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

  .another-class {
    border: 5px solid black;
  }
  .holder {
    background: #fff;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }

  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
  }

  .container {
    box-shadow: 0px 0px 40px lightgray;
  }
  
i {
  float: right; 
}

</style>
