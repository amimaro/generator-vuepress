<template>
<div class="button-counter">
  <button @click="increment()">+</button>
  <strong> {{ value }} </strong>
  <button @click="decrement()">-</button>
</div>
</template>

<script>
export default {
  props: [
    'start'
  ],
  data() {
    return {
      value: this.start
    }
  },
  methods: {
    increment() {
      this.value++;
    },
    decrement() {
      this.value--;
    }
  }
}
</script>
