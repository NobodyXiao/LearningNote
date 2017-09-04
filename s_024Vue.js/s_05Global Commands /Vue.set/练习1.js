function add(){
	console.log("我已经执行了");
	// 不能通过下标改变数组的值时，Vue监测不到,这种办法不行
	// demo.arr[1]='ddd';
	Vue.set(demo.arr,1,"ddd");

}
var outData = {
	arr:["aaa","bbb","ccc"]
}
var demo = new Vue({
	el:"#app",
	data:outData
})