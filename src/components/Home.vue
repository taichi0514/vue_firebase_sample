<template>
    <div id="home">
      <h1>{{msg}}</h1>
      <button @click="googleLogin">login</button>
      <App/>
    </div>
</template>

<script>
    export default {
        name: "home",
      data(){
          return{
            msg:'yoissyo'
          }
      },
      methods:{
          googleLogin:function(){
            firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
          }
      }
    }
</script>

<style scoped>

</style>
