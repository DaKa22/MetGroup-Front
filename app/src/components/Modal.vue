<script setup>
const props = defineProps({
  open: Boolean,
  width: String,
  height: String,
});
const emit = defineEmits(['update:open', 'hide'])

const hide = () => {
  emit('hide')
  emit('update:open', false)
};
</script>

<template>
  <div>
    <div class="modal" @click="hide" v-if="props.open">
      <div>
        <div class="content" @click.stop :style="{ width: `${props.width ?? '50%'}`, height: `${ height ?? '50vh'}` }">
          <div class="header">
            <h3 class="title">
              <slot name="header"></slot>
            </h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" @click="hide">
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
            </svg>
          </div>

          <div class="body">
            <slot name="body"></slot>
          </div>

          <div class="footer">
            <div class="footer-content">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  background-color: #000000a7;
  min-width: 100%;
  min-height: 100vh;
}

.modal > div {
  position: relative;
  width: 100%;
  position: absolute;
  inset: 0;
  margin: auto;
}

.content {
  background-color: #fff;
  position: absolute;
  inset: 0;
  margin: auto;
}

.body {
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
}

.header svg {
  margin-top: 1rem;
  margin-right: 1.2rem;
  margin-left: auto;
  width: 1rem;
  cursor: pointer;
  background-color: #fff;
  padding: .6rem .9rem;
  border-radius: 50%;
  transition: all .2s ease-in-out;
}

.header svg:hover {
  background-color: #222121;
  fill: #fff;
}

.title {
  align-self: center;
  margin-bottom: 0;
  margin-left: 2rem;
}

.body {
  margin-left: 2rem;
  margin-right: 2rem;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.footer-content {
  padding: 1rem 2rem;
}
</style>