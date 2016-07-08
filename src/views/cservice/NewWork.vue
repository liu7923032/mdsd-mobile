<template>
    <div class="page newwork">
        <x-header :left-options="{showBack:true,backText:'返回'}">
            新建工作
        </x-header>
        <div class="weui-tab-bd">
            <group>
                <datetime :value.sync="ReceiveTime" format="YYYY-MM-DD HH:mm" title="来电时间" confirm-text="完成" cancel-text="取消"></datetime>
                <cell is-link link="" title="医院名称"></cell>
                <cell is-link link="" title="产品名称"></cell>
                <cell title="联系人" :value=""></cell>
            </group>
        </div>
    </div>
</template>

<script lang="label">
import	{ XHeader,Group,Cell,Tab, TabItem ,Scroller,PopupPicker,Datetime,XInput,XTextarea,Box,XButton} from 'vux'
import 	{ Uploader, UploaderFiles, UploaderFile } from '../../components';
    export default {
        data () {
            return {
                ReceiveTime:"",
                Hospital:[],
                ContactUser:'',
                ProductIds:'',
                ContackTel:'',
                

            }
        },
        ready () {
            
        }
    }
</script>