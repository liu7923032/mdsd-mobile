<template>
    <div class="page newwork">
        <x-header :left-options="{showBack:true,backText:'返回'}">
            新建工作
        </x-header>
        <div class="weui-tab-bd">
            <group title="基本信息">
                <datetime :value.sync="ReceiveTime" format="YYYY-MM-DD HH:mm" title="来电时间" confirm-text="完成" cancel-text="取消"></datetime>
                <datetime :value.sync="CompleteTime" format="YYYY-MM-DD HH:mm" title="完成时间" confirm-text="完成" cancel-text="取消"></datetime>
                <cell is-link  title="医院名称"  @click="loadHosps" :value.sync="hospName"> </cell>
                <cell is-link  title="产品名称" @click="loadProducts" :value.sync="strProduct"></cell>
                <cell is-link  title="联系人" @click="loadUsers" :value.sync="contactUser"></cell>
                <popup-picker title="故障类别" :data="categorys" :value.sync="category" ></popup-picker>
                <selector title="处理方式" :options="methods" :value.sync="execMethod"  ></selector>
            </group>
            <group title="问题描述">
                <x-textarea :max="200" placeholder="详细问题描述'" :value.sync="desc"  :height="100" >
                </x-textarea>
            </group>
            <group title="解决方案">
                <x-textarea :max="500" placeholder="详细解决方案" :value.sync="solution"  :height="150" >
                </x-textarea>
            </group>
             <cell >
                 <uploader slot="after-title" :count="fileCount" :maxlength="1" @change="chooseFile($event)">
                    <span slot="title">文件上传</span>
                    <uploader-files slot="uploader-files" v-show="showfile" :image-url="imgPath">
                    </uploader-files>
                </uploader>
            </cell>
            <box gap="10px 10px" v-show="!showFlow">
                <x-button @click="addData" type="primary">新增</x-button>
            </box>
            <box gap="10px 10px" v-show="showFlow">
                <x-button @click="saveData" type="primary">保存</x-button>
            </box>
             <box gap="10px 10px" v-show="showFlow">
                <x-button @click="sendFlow" type="primary">发起流程</x-button>
            </box>
        </div>

        <!--选择医院的popup-->
        <popup :show.sync="showHosp" height="80%">
            <div class="popup" >
                 <tab>
                     <tab-item :selected="hospIndex==0" @click="hospIndex=0">
                         我的医院
                     </tab-item>
                     <tab-item :selected="hospIndex==1" @click="hospIndex=1">
                         所有医院
                     </tab-item>
                 </tab>
                 <div class="weui-tab-bd">
                     <div v-show="hospIndex==0">
                         <group>
                            <cell v-for="item in MyHosp" @click="selectHosp(item.HospId,item.HospName)" :title="item.HospName">
                            </cell>
                        </group>
                     </div>
                     <div v-show="hospIndex==1">
                         <search @result-click="resultClick" @on-submit="getResult" placeholder="输入关键字后回车" cancel-text="取消" :results="result" :value.sync="hospKey"></search>
                     </div>
                 </div>
            </div>
        </popup>
        <!--产品-->
        <popup :show.sync="showProduct" height="80%">
            <div class="popup">
                <group>
                    <box gap="10px 10px">
                        <x-button @click="selectProduct" type="primary">确定选择</x-button>
                    </box>
                    <checklist title="选择产品" :options="productList" :value.sync="Product" ></checklist>
                </group>
            </div>
        </popup>

        <!--医院联系人-->
        <popup :show.sync="showUser" height="80%">
            <div class="popup" >
                <group title="医院联系人">
                    <radio :options="Users" @on-change="selectUser"></radio>
                </group>
            </div>
        </popup>

        
    </div>
</template>

<script lang="babel">
import	{ XHeader,Group,Cell,Tab, TabItem ,Scroller,PopupPicker,
    Datetime,XInput,XTextarea,Box,XButton,Popup,Checklist,Radio,Selector,Search} from 'vux'
import 	{ Uploader, UploaderFiles, UploaderFile } from '../../components';
import common from '../utils/common.js'
    export default {
        name:'newcswork',
        data () {
            return {
                dispNo:"",
                ReceiveTime:"",
                CompleteTime:"",
                Hospital:[],
                MyHosp:[],
                // 医院
                showHosp:false,
                hospIndex:0,
                HospId:0,
                hospName:'',
                hospKey:'',
                result:[],
                // 产品
                showProduct:false,
                Product:[],
                strProduct:"",
                productList:[],
                // 医院联系人
                showUser:false,
                Users:[],
                contactUser:"",
                // 故障类别
                categorys:[["故障报修","系统巡检"]],
                category:[],
                // 处理方式
                methods:[{value:'现场处理',key:'CLFS0002'},{value:'远程处理',key:'CLFS0001'}],
                execMethod:"",
                // 附件上传
                fileCount:0,
                showfile:false,
                imgPath:'',
                // 问题描述
                desc:'',
                // 解决方案
                solution:'',
                // 附件
                attachFile:'',
                // 发起流程
                showFlow:false,
                temp:""
            }
        },
        ready () {
            
        },
        methods : {
            selectHosp (hospId,hospName) {
                this.HospId=hospId;
                
                this.hospName=hospName;
                this.showHosp=false;
            },
            // 选择产品
            selectProduct (){
                this.showProduct=false;
                //设置名称
                this.strProduct=this.Product.map((item)=>{
                    return item;
                }).join(',')
            },
            selectUser (value) {
                console.log(value);
                this.contactUser=value;
                this.showUser=false;
            },
            chooseFile (e) {
                	//显示加载的文件
				this.showfile=true;
				var _this=this;
				//获取加载后的文件
				var file=event.target.files[0];
				if(!file){
					return false;
				}
				_this.attachFile=file;
				//读取上传的文件信息
				var reader = new FileReader();
				reader.onload = (evt)=>{
					var temp= evt.target.result
					_this.imgPath=temp;
					_this.fileCount=1;
				}
				var loaded = 0,total=file.size;  
				//每次读取1M  
			
				reader.onprogress=(e)=>{
					loaded += e.loaded;  
					//更新进度条  
					var temp = (loaded / total) * 100;  
				}
				reader.readAsDataURL(file);
            },
            //加载医院信息
            loadHosps () {
                this.showHosp=true;
                if(this.MyHosp.length==0){
                    this.$http.get("Hospital/GetMyCSHosp").then((response)=>{
                        this.MyHosp=response.data;
                    },(error)=>{

                    })
                }
            },
            resultClick (item) {
              
                this.HospId=item.hospId;
                this.hospName=item.title;
                this.showHosp=false;
            },
            getResult (value) {
                //从hosp中查询数据
                this.$http.get("Hospital/GetHospByKey/"+value).then((success)=>{
                    var resData=success.data;
                    //加载
                    var tempData=resData.map((item)=>{
                        return {
                            title:item.HospName,
                            hospId:item.HospId
                        }
                    });
                    this.result=tempData;
                })
                
                
            },
            // 加载产品信息
            loadProducts () {
                this.showProduct=true
                if(this.productList.length==0){
                    this.$http.get("SysDict/产品线").then((response)=>{
                        this.productList=response.data.map((item)=>{
                            return item.DictName;
                        });
                    },(error)=>{
                        
                    })
                }
            },
            // 加载联系人
            loadUsers () {
                var hospId=this.HospId;
                this.showUser=true;
                if(hospId==0){
                    //弹出错误提示
                    this.$root.toast = { show: true, type: 'cancel', text: '请先选择医院信息' };
                    return false;
                }
             
                if(this.Users.length==0&&hospId!=0){
                    this.$http.get("CService/GetContactUsers/"+hospId).then((response)=>{
                        this.Users=response.data;
                    },(error)=>{

                    });
                }
            },
            // 获取formData;
            getFormData () {
                var formData=new  FormData();
                var postData = {
                    "Category":this.category[0],
                    "ContactUser":this.contactUser,
                    "HospId":this.HospId,
                    "ProblemDesc":this.desc,
                    "Solution":this.solution,
                    "ProductIds":this.strProduct,
                    "ReceiveTime":this.ReceiveTime,
                    "CompleteTime":this.CompleteTime,
                    "ExecMethod":this.execMethod
                };
                var formData=new FormData();
                for (var key of Object.keys(postData)) {
                    formData.append(key,postData[key]);
                    console.log(key + ": " + postData[key]);
                }
                if(this.attachFile){
                      formData.append("upfile",this.attachFile);
                }
                return formData;
            },
            // 编辑信息保存
            saveData () {
                var formData=this.getFormData();
                var that=this;
                this.$http.post("CService/SaveRecord/"+this.dispNo,formData).then((response)=>{
                    that.$root.toast={show:false,type:'ok',text:'保存成功'};
                   
                   
                },(error)=>{

                })
            },
            // 新增记录
            addData () {
                var formData=this.getFormData();
                var that=this;
                this.$http.post("CService/AddRecord",formData).then((response)=>{
                    that.$root.toast={show:false,type:'ok',text:'新增成功'};
                    //调整到指定页面
                    that.$router.go({path:'/cservice'});
                    // common.procResult(response,(resData)=>{
                    // });
                },(error)=>{

                })
            },
            // 发起流程
            sendFlow () {
                var formData={aa:'11',text:'11'};
				var postData={
					WFNo:'ccc019c9-0797-4288-bfa5-4f2e3ec0ff20',
					SourcePK:'',
					FlowNo:'',
					FlowName:'流程标题',
					FlowJson:JSON.stringify(formData),
					FlowMemo:'备注嘻嘻你',
					FlowStatus:'0',
					SubUserId:'10685',
					NextUser:'',
					NextStepNo:'',
					Comment:'我统一'
				}
				this.$http.post("WFlow/SaveForm",JSON.stringify(postData)).then((success)=>{

				},(error)=>{

				})
            }
        },
        route:{
            data (transition) {
                var dispNo=transition.to.query.dispNo;
                if(!dispNo||dispNo==''){
                    return false;
                }
                this.dispNo=dispNo;
                //显示流程信息
                this.showFlow=true;
                //加载基本信息
                this.$http.get("CService/GetRecordByNo/"+this.dispNo).then((res)=>{
                    var obj=res.data.Data[0] || undefined;
                    if(!obj){
                        return false;
                    }
                    console.log(obj);
                    this.ReceiveTime=obj.ReceiveTime; 
                    this.CompleteTime=obj.CompleteTime; 
                    this.HospId=obj.HoptalId;
                    this.hospName=obj.HospName;
                    this.strProduct=obj.ProductIds;
                    this.contactUser=obj.ContactUser; 
                   
                    var tempExec=[],tempCate=[];
                    tempCate.push(obj.Category)
                    this.category=tempCate;
                    
                    this.execMethod=obj.ExecMethod;
                    this.solution=obj.Solution;
                    this.desc=obj.ProblemDesc;
                    if( obj.FileUrl.length>0 ) {
                        console.log(obj.FileUrl);
                        //替换 E:\PMIS_DOC
                        var fileUrl=obj.FileUrl.replace('E:\/',"http://e.mdsd.cn:9000");
                        this.imgPath=fileUrl;
                        this.showfile=true;
                        this.fileCount=1;
                    }
                },()=>{

                })
            }
        },
        components:{
            XHeader,
            Cell,
            Tab,
            TabItem,
            Scroller,
            Datetime,
            Group,
            Popup,
            XButton,
            Checklist,
            Box,
            Radio,
            PopupPicker,
            Uploader, UploaderFiles, UploaderFile,
            XTextarea,
            Selector,
            Search
        },
    }
</script>

<style>
    li{
        list-style: none;
    }

    .popup{
        height: 100%;
        overflow: auto;
    }
</style>
