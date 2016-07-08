<template>
    <div class="page cservice">
        <x-header :left-options="{showBack:true,backText:'返回'}">
            <p>客服工作</p>
            <a slot="right"  href="/cservice/newcswork">新增</a>
        </x-header>
        <tab>
            <tab-item :selected="selectIndex === 0" @click="selectIndex = 0">
                待处理
            </tab-item>
            <tab-item :selected="selectIndex === 1" @click="selectIndex = 1">
                流程中
            </tab-item>
            <tab-item :selected="selectIndex === 2" @click="selectIndex = 2">
                已完结
            </tab-item>
        </tab>
        <div class="weui-tab-bd">
            <div v-show="selectIndex == 0">
                <group title="待处理">
                </group>
            </div>
            <div v-show="selectIndex == 1">
                <group title="流程中">
                </group>
            </div>
            <div v-show="selectIndex == 2">
                <group title="已完结">
                </group>
            </div>
          
        </div>
    </div>
</template>

<script lang="babel">
    	
    import	{ XHeader,Group,Cell,Tab, TabItem ,Scroller} from 'vux'

    export default {
        name:'cservice',
        //初始化数据
        data () {
            return {
                selectIndex:0
            }
        },
        methods:{
        },
        components:{
            XHeader,
            Group,
            Cell,
            Tab,
            TabItem,
            Scroller
        },

    }
</script>