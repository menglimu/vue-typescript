<template>
  <div class="msg-detail">
    <div>
      <p class="msg-center">
        <b>{{ msg['messageTitle'] }}</b>
      </p>
      <div class="msg-right">
        <span>{{ userNamePrefix }}{{ msg['userName'] }}</span>
        <span>{{ msg['sendTime'] }}</span>
      </div>
    </div>
    <div v-html="messageContent"></div>
  </div>
</template>

<script>
export default {
  name: 'MessageDetail',
  props: {
    msg: {
      type: Object,
      default() {
        return {}
      }
    },
    userNamePrefix: {
      type: String,
      default: '来源：'
    }
  },
  data() {
    return {}
  },
  computed: {
    messageContent() {
      return this.msg.messageContent || ''
    }
  }
}
</script>
<style lang="scss">
.msg-detail {
  width: 100%;
  :first-child {
    overflow: auto;
  }
  .msg-center {
    margin: 0 auto;
    text-align: center;
  }
  .msg-right {
    float: right;
    font-size: 12px;
  }
}
</style>
