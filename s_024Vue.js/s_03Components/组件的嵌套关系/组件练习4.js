var city = {
    template:`
        <div>{{name}} is from siChina of China</div>
    `,
    props:["name"]
}
var China = {
    template:`<div>
       <div>panda from China</div> 
       <city :name="animal"></city>
       </div>
    `,
    components:{
        "city":city
    },
    data:function(){
        return{
            "animal":"panda"
        }
    }
}


var demo = new Vue({
    el:"#app",
    components:{
        "China":China
    }
})