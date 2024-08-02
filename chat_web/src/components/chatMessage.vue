<template>
  <div class="chat-message" :class="position === 'right' ? 'chat-message-position' : ''">
    <div class="img">I</div>
    <div class="mes" :class="position === 'right' ? 'mes_bg' : ''">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
defineProps({
  position: {
    type: String,
    default: "left"
  }
})
</script>
<style lang="scss" scoped>
.chat-message-position {
  flex-direction: row-reverse;
}

.chat-message {
  width: 100%;
  display: flex;
  gap: 20px;

  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: cadetblue;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    color: white;

  }

  .mes {
    min-width: 30px;
    max-width: 230px;
    height: auto;
    overflow-wrap: break-word;
    background-color: #d5dcff;
    position: relative;
    padding: 10px;
    border-radius: 10px;
    font-size: 12px;
    color: #666;
  }

  .mes_bg {
    background-color: #40ef40;
    color: black;
  }
}
</style>