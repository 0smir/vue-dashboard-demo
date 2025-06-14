<template>
  <div class="success-messasge">
    <div :class="['success-messasge__icon-border', isMounted ? 'animate' : '']">
      <div class="success-messasge__icon-wrapper">
        <SvgIcon name="check" :class="['icon', isMounted ? 'animate' : '']" />
      </div>
    </div>
    <div v-if="options.type === 'project'">
      <h1 class="success-messasge__title">
        Project {{ options.title }} successfully created!
      </h1>
      <p class="success-messasge__text small">You can see more details on 
        <router-link class="success-messasge__link" :to="linkToItem">Project page</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import SvgIcon from './SvgIcon.vue';

export default {
  props: ["options"],
  data() {
    return {
      isMounted: false
    }
  },
  computed: {
    linkToItem() {
      let { type, id } = this.options;
      return '/' + type + '/' + id;
    }
  },
  mounted() {
    this.isMounted = true;
  }
    
}
</script>

<style lang="scss" scoped>
@property --fill {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
@property --scale {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}
.success-messasge {
  display: flex;
  flex-direction: column;

  &__icon-border {
    position: relative;
    display: flex;
    overflow: hidden;
    margin: 20px auto 10px;
    width: 150px;
    height: 150px;
    --fill: 0%;
    background: conic-gradient(green var(--fill), white 0%);
    border-radius: 50%;
    transform: rotate(-32deg);
    &.animate {
      animation: loading 0.75s ease-out forwards;
    }
  }

  &__icon-wrapper {
    position: absolute;
    inset: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: white;
    object-fit: contain;
    transform: rotate(32deg);
    
    .icon {
      display: block;
      height: 90%;
      width: 90%;
      color: green;
      --scale: 0;
      transform:  scale( var(--scale));
      &.animate {
        animation: grows 0.5s ease-in 0.75s forwards;
      }
    }
  }

  &__title,
  &__text {
    color: green;
    text-align: center;
  }
  &__text.small{
    font-size: 16px;
  }
  &__link {
    color: green;
    font-weight: 500;
  }

  @keyframes loading {
    from {
      --fill: 0%;
    }
    to {
      --fill: 100%;
    }
  }
  
  @keyframes grows {
    from {
      --scale: 0;
    }
    50%{
      --scale: 1.75; 
    }
    to {
      --scale: 1;
    }
  }
}

</style>