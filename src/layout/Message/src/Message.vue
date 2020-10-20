<template>
  <div class="navbar-message">
    <c-popover v-model="popVisible" width="300" popper-class="msg-el-pop" @show="getData">
      <message-list :list-data="listData" @click="showMessageDetails"></message-list>
      <c-badge slot="reference" :value="msgvalue" :hidden="badgeHidden" class="user-msg">
        <i class="el-icon-bell" />
      </c-badge>
    </c-popover>
    <dialog title="消息详情" :visible.sync="dialogVisible" :nofooter="true">
      <message-detail :msg="msgDetailData"></message-detail>
    </dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WS from '@/utils/ws'
import request from '@/utils/request'
import Dialog from '@/components/Dialog/src/Dialog.vue'
import MessageList from './MessageList'
import MessageDetail from './MessageDetail'

export default {
  name: 'Message',
  components: {
    Dialog,
    MessageList,
    MessageDetail
  },
  data() {
    return {
      popVisible: false,
      dialogVisible: false,
      badgeHidden: true,
      getMessageList: '/v1/message/index/getMessageList',
      msgvalue: 0,
      listData: [],
      msgDetailData: {}
    }
  },
  computed: {
    ...mapGetters(['name', 'userId'])
  },
  mounted() {
    this.ws = new WS({
      url: 'websocket/{userNo}/{msgType}',
      data: {
        userNo: this.userId,
        msgType: '0001'
      }
    })
    this.ws.on('message', (data, _e) => {
      this.msgDetailData = data
      if (data.messageCount > 0) {
        this.badgeHidden = false
        this.msgvalue = data.messageCount
      } else {
        this.badgeHidden = true
      }
    })
  },
  methods: {
    getData() {
      request({
        url: this.getMessageList,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        this.listData = res.data
      })
    },
    showMessageDetails(item) {
      this.dialogVisible = true
      this.popVisible = false
      this.msgDetailData = item
      //   console.log("showMessageDetails::::", item)
      this.ws.send({
        userNo: this.userId,
        msgType: '0002',
        messageId: item.messageId
      })
    }
  }
}
</script>

<style lang="scss">
.navbar-message {
  display: inline-block;
  .user-msg {
    color: #fff;
    font-size: 22px;
    line-height: 16px;
    margin-right: 40px;
    cursor: pointer;
  }
}
.msg-el-pop {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
