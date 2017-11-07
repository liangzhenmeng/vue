var list = [
    {
        title:"吃饭打豆豆",
        isChecked:false, //状态为false，为不选中  任务未完成
        editing:false,
    },
    {
        title:"妙味课堂",
        isChecked:true,   //状态为true，为选中    任务完成
        editing:false
    }
];

new Vue({
    el:".main",
    data:{
        list:list,
        text:"",
        editText:{},//编辑
        beforeTitle:"",//暂存

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
        },


    },
    methods:{
        addtodo(ev){
            if(this.text == ""){
                return false;
            }
            this.list.push({
                title:this.text,
                isChecked:false,
                editing:false
            });
            this.text = "";
        },
        deletetodo(item){
            // console.log(this.list);
            // this.list.prototype;
            var index = this.list.indexOf(item);
            this.list.splice(index,1);

        },
        editItem(item){
            // this.focus();
            item.editing = true;
            this.beforeTitle = item.title;
            this.editText = item;

        },
        editItemed(todo){
            console.log(todo);
            if(this.editText.title != ""){
                todo.title = this.editText.title;
            }else{
                todo.title = this.beforeTitle;
            }
            this.editText = "";
        },
        giveUpItemed(item){
            item.title = this.beforeTitle;
            this.editText = "";
        }


    },
    directives:{
        "focus":{
            update(el,binding){
                if(binding){
                    el.focus();
                }
            }
        }
    }

})