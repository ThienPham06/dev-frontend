<template>
  <div
    class="dropdown"
    :class="{ open: isOpen }"
    @click="toggleDropDown"
    v-click-outside="closeDropDown"
  >
    <slot name="title">
      <a
        class="dropdown-toggle"
        data-toggle="dropdown"
        href="javascript:void(0)"
      >
        <em :class="icon"></em>
        <p class="notification">
          {{ title }}
          <strong class="caret"></strong>
        </p>
      </a>
    </slot>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "drop-down",
  props: {
    title: String,
    icon: String
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
    },
    closeDropDown() {
      this.isOpen = false;
    }
  }
};
</script>
