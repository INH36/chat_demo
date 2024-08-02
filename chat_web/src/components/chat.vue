<template>
  <div class="chat-main">
    <div class="chat_left">
      <div class="chat_name"> {{ data.data.username }}</div>
    </div>
    <div class="chat_right">
      <div class="chat-con">
        <div class="interface">
          <chatMes v-for="(item,index) in chatRecord" :key="index"
                   :position="item.seedid === data.data.userid ? 'right' : 'left'">
            {{ item.chat }}
          </chatMes>
        </div>
        <div class="input">
          <input class="input_text" ref="input" placeholder="请输入内容" type="text"/>
          <button class="input_btn" @click="handsend">发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import chatMes from './chatMessage.vue'
import WebSocketClient from "../api/webStocket.js";

import {useRoute} from "vue-router";
import {onMounted, onUnmounted, reactive, ref, watch, watchEffect} from "vue";

const input = ref(null)

const route = useRoute()
const data = JSON.parse(route.query.data)
console.log(data)

const chatRecord = reactive([
  {
    seedid: 100001, // 发送者id
    acceptid: 100002, // 接收者id
    chat: '你好啊'
  },
  {
    seedid: 100002,
    acceptid: 100001,
    chat: '我很好'
  }
])
// 监听chatRecord变化
watch(chatRecord, () => {
  console.log(chatRecord)
})

const ws = ref(null)
const initWebSocket = () => {
  ws.value = new WebSocketClient(`ws://localhost:3005`, {
    onOpen() {
      console.log('连接成功')
    },
    onMessage(mes) {
      const parseMessage = JSON.parse(mes)
      console.log('收到消息', parseMessage)
      chatRecord.push(parseMessage)
    },
    onError(err) {
      console.log('连接失败', err)
    },
    onClose() {
      console.log('连接关闭')
    }
  })
}

const handsend = () => {
  if (!input.value.value) return
  const mes = {
    seedid: data.data.userid,
    acceptid: data.data.userid === 100001 ? 100002 : 100001,
    chat: input.value.value
  };
  chatRecord.push(mes)
  input.value.value = ''
  ws.value.send(JSON.stringify(mes))
}
onMounted(()=>{
  initWebSocket()
})
onUnmounted(()=>{
  if (ws.value){
    ws.value.close()
  }
})

</script>

<style lang="scss" scoped>
.chat-main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 500px;
  background-color: aliceblue;
  border-radius: 10px;
  border: 1px solid #ccc;
  display: flex;
}

.chat_left {
  flex: 2;
  padding: 20px;
  border-right: 1px solid darkgray;
  display: flex;
  flex-direction: column;
}

.chat_name {
  width: 100%;
  height: 40px;
  border-radius: 6px;
  transition: all 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  &:active {
    background-color: cadetblue;
  }

  &:hover {
    background-color: cadetblue;
  }
}

.chat_right {
  flex: 7;
  padding: 20px;

  .chat-con {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .interface {
      flex: 8;
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      padding: 10px;
      gap: 20px;
      overflow-y: auto;
    }

    .input {
      flex: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .input_text {
        width: 80%;
        height: 40px;
        border-radius: 20px;
        border: none;
        padding-left: 20px;
        display: flex;
        align-items: center;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

        &:focus {
          outline: none;
        }

        &::placeholder {
          color: #ccc;
        }
      }

      .input_btn {
        width: 80px;
        height: 40px;
        border-radius: 20px;
        border: none;
        background-color: cadetblue;
        color: #fff;
        cursor: pointer;
        transition: all 0.2s ease-out;

        &:hover {
          background-color: #00B7FF;
        }
      }
    }
  }
}
</style>