<template>
  <div>
    <h1>{{ msg }}</h1><hr/>
    <h2>{{$store.state.count}}-{{count}}</h2>
    <p>
      <button @click="add(1)">+</button>
      <button @click="reduce">-</button>
    </p>
    <p>
      <button @click="addAction">+</button>
      <button @click="reduceAction">-</button>
    </p>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      msg: 'Welcome to vuex page'
    }
  },
  store,
  // computed: {
  //   count1 () {
  //     return this.$store.state.count
  //   }
  // }
  // computed: mapState({
  //   count: state => state.count
  // })
  computed: {
    ...mapState(['count'])
    // count () {
    //   return this.$store.getters.count
    // }
  },
  methods: {
    ...mapMutations(['add', 'reduce']),
    ...mapActions(['addAction', 'reduceAction'])
  }
}
</script>

