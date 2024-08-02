<template>
  <div class="login">
      <div class="login_con">
        <div class="login_title">
          <h3 class="login_text">Login</h3>
        </div>
        <span class="line"></span>
        <div class="login_from">
          <div class="login_input">
            <label class="name">姓名:</label>
            <input ref="input" class="input" type="text" placeholder="请输入姓名">
          </div>
          <button class="login_btn" @click="handleLogin">立即登录</button>
        </div>
      </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import response from "../api/response.js";

const input = ref(null)
const route = useRouter()
const handleLogin = async () =>{
  if(input.value.value){
    const res = await response.post('/chat/login',{name:input.value.value})
    console.log(res.data)
    if(res.data.code === 200){
      await route.push({
        name:"chat",
        query:{
          data: JSON.stringify(res.data)
        }
      })
    }else {
      alert("用户名已存在")
    }
  }else {
    alert("请输入姓名")
  }
}
</script>

<style scoped lang="scss">
.login{
  width: 100vw;
  height: 100vh;
  background: url("../assets/bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_con{
    width: 600px;
    height: 400px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    align-items: center;
    .line{
      width: 98%;
      height: 1px;
      background-color: #ccc;
      position: absolute;
      border-radius: 1px;
      top: 32%;
    }
    .login_title{
      flex: 3;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 24px;
      letter-spacing: 2px;
      color: #fff;
      .login_text{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #fff;
        margin-top: 20px;
      }
    }
    .login_from{
      flex: 7;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 30px;
      .login_input{
        width: 300px;
        background-color: white;
        height: 40px;
        border-radius: 20px;
        display: flex;
        gap: 10px;
        align-items: center;
        padding-left: 20px;
        .name{
          color: #000;
          font-size: 18px;
          font-weight: 500;
          height: 30px;
          line-height: 30px;
        }
        .input{
          height: 30px;
          width: 200px;
          border: none;
          display: flex;
          align-items: center;
          line-height: 30px;
          &:focus{
            outline: none;
          }
        }
      }
    }
    .login_btn{
      width: 100px;
      height: 30px;
      color: #fff;
      border-radius: 10px;
      border: none;
      background-color: #00B7FF;
      cursor: pointer;
    }
  }
}
</style>