<template>
  <div class="page" transition="app">
    <x-header :left-options="{showBack: false}">
      <p>首页</p>
    </x-header>
    
    <div class="page-bd space">
      <div class="weui-tab-bd">
        <div v-show="selectIndex==0">
            <scroller lock-x scrollbar-y use-pulldown  :pulldown-status.sync="pulldownStatus" @pulldown:loading="loadMsg">
            <!--content slot-->
            <div class="box2">
               <cell  v-for="item in msgItems">
                  <div slot="after-title">
                    <span style="color: green">{{item.title}}</span>
                  </div>
                </cell>
            </div>

            <!--pulldown slot-->
            <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
              <span v-show="pulldownStatus === 'default'"></span>
              <span class="pulldown-arrow" v-show="pulldownStatus === 'down' || pulldownStatus === 'up'" :class="{'rotate': pulldownStatus === 'up'}">↓</span>
              <span v-show="pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
            </div>
          </scroller>
        </div>
        <div v-show="selectIndex==1" >
            <grids>
              <grid v-for="item in items" :router-link="{path: '/' + item.link}" :image-url="item.image" :label="item.text"></grid>
            </grids>
        </div>
        <div v-show="selectIndex==2">
            <Group title="个人基本信息">
            <cell title="工号" >
                <div slot="value">
                  <span style="color: green">{{user.GongHao}}</span>
                </div>
              </cell>
              <cell title="姓名" >
                <div slot="value">
                  <span style="color: green">{{user.UserName}}</span>
                </div>
              </cell>
              <cell title="部门" >
                <div slot="value">
                  <span style="color: green">{{user.DeptName}}</span>
                </div>
              </cell>
              <cell title="岗位" >
                <div slot="value">
                  <span style="color: green">{{user.PostName}}</span>
                </div>
              </cell>
              <cell title="年假" >
                <div slot="value">
                  <span style="color: green">{{user.YearDays}}</span>
                </div>
              </cell>
              <cell title="福利假" >
                <div slot="value">
                  <span style="color: green">{{user.ServiceDays}}</span>
                </div>
              </cell>
            </Group>
        </div>
      </div>
    </div>
      <tabbar>
        <tabbar-item selected>
          <img slot="icon" src="../assets/images/app/icon_nav_msg.png">
          <span slot="label">消息</span>
        </tabbar-item>
        <tabbar-item >
          <img slot="icon" src="../assets/images/app/icon_nav_actionSheet.png">
          <span slot="label">应用</span>
       </tabbar-item>
        <tabbar-item>
          <img slot="icon" src="../assets/images/app/icon_nav_cell.png">
          <span slot="label">我</span>
        </tabbar-item>
      </tabbar>
</div>
</template>

<script>

import { Grids,Grid } from '../components/'

import { Tabbar, TabbarItem,XHeader,Flexbox, FlexboxItem ,Scroller, Divider, Spinner ,Cell, Group} from 'vux'

export default {
  name: 'index',
  components: {
    Grids,
    Grid,
    Tabbar,
    TabbarItem,
    XHeader,
    Flexbox, FlexboxItem,
    Scroller, Divider, Spinner,
    Cell, Group
  },
  data () {
    return {
      items: [{
        link: 'project',
        image:'./static/images/app/icon_nav_cell.png',
        text: '项目',
      }, {
        link: 'worklog',
        image:'./static/images/app/icon_nav_icons.png',
        text: '日志'
      }, {
        link: 'flow',
        image:'./static/images/app/icon_nav_tab.png',
        text: '流程'
      }, {
        link: 'userinfo',
        image:'./static/images/app/icon_nav_article.png',
        text: '系统公告'
      }, {
        link: 'progress',
        image:'./static/images/app/icon_nav_dialog.png',
        text: '知识分享'
      }, {
        link: 'login',
        image:'./static/images/app/icon_nav_article.png',
        text: '客服'
      }],
      selectIndex:0,
      msgItems:[{
        type:"0",
        title:'我的测试一下'
      }],
      pulldownStatus:"default",
      user:{"UserName":'',"PostName":'',"DeptName":'',"GongHao":'',"YearDays":0,"ServiceDays":0}
    }
  },

  route: {
    data (transition) {
      this.getUserInfo();
    }
  },

  created () {
    // store.on('topstories-updated', this.update)
  },

  destroyed () {
    // store.removeListener('topstories-updated', this.update)
  },

  methods: {
    update () {
      // store.fetchItemsByPage(this.page).then(items => {
      //   this.items = items
      // })
    },
    //加载我的消息列表
    loadMsg(uuid){
      const _this = this;
      //1：加载数据了
      setTimeout(function () {
          _this.msgItems.push({
              type:"",
              title:'哈哈哈'
          });
        _this.$broadcast('pulldown:reset', uuid);
      }, 1000)
    },
    getUserInfo(){
      this.$http.get("UserInfo").then((success)=>{
        this.user=success.data;
              console.log(success.data);
      },(error)=>{

      })
    }
  },
  events:{
    'on-item-click':function(index){
      this.selectIndex=index;
      console.log(this.selectIndex);
    }
  },
  filters: {
  }
}
</script>

<style >
  .page-bd>.title{
    width: 100%;
    text-align: center;
    margin: 10px 0px;
  }

  .title>p{
    font-size: 12px;
  }


  .rotate {
      transform: rotate(-180deg);
  }
  .pulldown-arrow {
    display: inline-block;
    transition: all linear 0.2s;
    color: #666;
    font-size: 25px;
  }
</style>
