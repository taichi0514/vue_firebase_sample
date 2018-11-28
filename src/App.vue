<template>
  <div id="app">
      <Home v-if="!isLogin"/>
      <Editor v-if="isLogin" :user="userData"/>
  </div>
</template>

<script>
  import Home from "./components/Home";
import Editor from "./components/Editor";
export default {
  name: 'app',
  components: {
    Home:Home,
    Editor:Editor
  },
  data () {
    return {
      isLogin:false
    };
  },
  created: function(){
    firebase.auth().onAuthStateChanged(user =>{
      console.log(user);
      console.log("login ok±—")
      if(user){
        this.isLogin = true;
      }else{
        this.isLogin = false;
      };
    });
  }
}
</script>

<style lang="scss">

</style>
