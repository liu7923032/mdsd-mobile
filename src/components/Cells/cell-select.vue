<template>
    <select class="weui_select" v-model="selected" v-if="isObj">
        <option  v-for="option in options" value="option.value">{{option.text}}</option>
    </select>
    <select class="weui_select" v-model="selected" v-else>
        <option  v-for="option in options" value="option" >{{option}}</option>
    </select>
</template>

<script>
export default {
  props: {
    selected: {
      type: null,
      required: true,
      twoWay: true
    },
    options: {
      type: Array,
      required: true
    },
    computed:{
        "newOptions":function(){
          return this.options.map((item)=>{
             if(typeof item =="string"){
                 return {
                     text:item,
                     value:item
                 };
             }     
             else{
                 return item;
             } 
          });
        }
    }
  },
  /*
    定义一个元素，判断该数组中的值是否是对象
  */
  data(){
      return {
          isObj:false
      }
  },
/*
    初始化,检查该数据是否是对象, 对象的内容是 {text:'',value:''}
*/  
  created(){
      var tempValue=this.options.length>0?this.options[0]:"";
      if(typeof tempValue=="object"){
          console.log("该数组是对象"+ tempValue.text)
          this.isObj=true;
      }
      console.log("该数组是value"+tempValue)
  }
  
}
</script>
