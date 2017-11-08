var store = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key))||[];
    }
}


var list = store.fetch("miaov") ;

var filter = {
    all(){
        return list;
    },
    unfinished(){
        return list.filter(function(item){
            return !item.isChecked;//未完成 false
        });
    },
    finished(){
        return list.filter(function(item){
            return item.isChecked;  //完成 true
        });
    }

}

var vm = new Vue({
    el:".main",
    data:{
        list:list,
        text:"",
        before:"",
        editText:"",
        visibility:"",
    },
    watch:{
        list:{
            handler(){
                store.save("miaov",this.list);
            },
            deep:true,
        }
    },
    computed:{
        noChecked(){
            return this.list.filter(function(item){
                return !item.isChecked;
            }).length;
        },
        isChecked(){
            return this.list.filter(function(item){
                return item.isChecked;
            }).length;
        },
        filteredList(){
            return filter[this.visibility]?filter[this.visibility](list):list;
        }
    },
    methods:{
        addtodo(){
            if(this.text == ""){
                return  false;
            }
            this.list.push({
                title:this.text,
                isChecked:false,//未完成
            });
            this.text = "";
        },
        deletetodo(item){
            this.list.splice(this.list.indexOf(item),1);
        },
        editItem(item){
            this.editText = item;
            this.before = item.title;
        },
        giveUpItemed(item){
            item.title = this.before;
            this.editText = '';
        },
        editItemed(item){
            this.editText = "";
        },

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
});
function watchHashChange(){
    var hash = window.location.hash.slice(1);
    vm.visibility = hash;
};
watchHashChange();
window.addEventListener("hashchange",watchHashChange);