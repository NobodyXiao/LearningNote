<template>
 <div>
   <h2>{{msg}}</h2>
   <h2>{{$route.params.username}}</h2>
 </div>
</template>

<script>
export default {
  name: 'Hi1',
  data () {
    return {
      msg: 'I am Hi1 page belong to Hi page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
