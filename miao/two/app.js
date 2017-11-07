var list = [
    {
        title:"吃饭打豆豆",
        isChecked:false //状态为false，为不选中  任务未完成
    },
    {
        title:"妙味课堂",
        isChecked:true   //状态为true，为选中    任务完成
    }
];

new Vue({
    el:".main",
    data:{
        list:list,
        text:"",

    },
    computed:{
        noIsChecked(){
            return this.list.filter(function(item){
                return !item.isChecked
            }).length;
        },
        hasItem(){
            if(this.list.length>0){
                return true;
            }else{
                return false;
            }
        }


    },
    methods:{
        addtodo(ev){
            // console.log(this);
            // console.log(ev.keyCode);
            if(this.text == ""){
                return false;
            }
            this.list.push({
                title:this.text,
                isChecked:false,
            });
            this.text = "";
        },
        deletetodo(item){
            // console.log(this.list);
            // this.list.prototype;
            var index = this.list.indexOf(item);
            this.list.splice(index,1);

        },


    }
})