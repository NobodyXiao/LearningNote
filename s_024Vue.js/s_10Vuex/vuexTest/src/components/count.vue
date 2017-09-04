<template>
 <div>
   <h2>{{msg}}</h2><hr/>
   <h3>{{$store.state.count}}</h3>
   <p>
     <button @click="$store.commit('add')">+</button>
     <button @click="$store.commit('reduce')">-</button>
   </p>
 </div>
 
</template>

<script>
import store from '@/vuex/store.js'
export default {
  data () {
    return {
      msg: 'Hello vuex'
    }
  },
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
