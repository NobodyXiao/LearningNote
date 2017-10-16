new Vue({
  el: '#list-complete-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },//取得一个小于总长的随机数
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },//在随机位置，插入一个最大数字加1的数值
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    }//在随机位置删除一个，无替换
  }
})