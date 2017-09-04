<template>
 <div>
   <h2>{{msg}}-{{$route.params.username}}</h2>
   <router-view></router-view>
 </div>
 
</template>

<script>
export default {
  name: 'Hi',
  data () {
    return {
      msg: 'I am Hi page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
