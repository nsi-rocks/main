<template>
  <div :class="['admonition', admotype, 'md:w-full', 'm-auto']">
    <div class="admonition-heading">
      <h5 class="flex flex-row items-center" v-if="props.type !== 'result'">
        <Icon class="admonition-icon" :name="icon" />
        <span>{{
          props.type == 'result'
            ? ''
            : props.type == 'consigne'
            ? 'Consigne'
            : props.title
          }}</span>
      </h5>
    </div>
    <div class="admonition-content">
      <slot name="content" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
});
const {type} = props;
const admotype = type ? 'admonition-' + type : '';

const svgMap = {
  warning: 'material-symbols:warning',
  important: 'ph:circle-wavy-warning-fill',
  caution: 'ri:fire-fill',
  success: 'clarity:lightbulb-solid',
  note: 'bi:info-circle-fill',
  result: '',
  consigne: 'mdi:fountain-pen-tip',
};

const icon = svgMap[type];
</script>

<style scoped>
.admonition {
  margin: 1rem 0;
  padding: 15px 30px 15px 15px;
  border-radius: 0.5rem;
  border-style: solid;
  border-width: 1px;
}

.admonition h5 {
  margin-top: 0;
  margin-bottom: 8px;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.admonition-icon {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2em;
}

.admonition-icon svg {
  display: inline-block;
  width: 22px;
  height: 22px;
  stroke-width: 0;
}

.admonition-content > :last-child {
  margin-bottom: 0;
}


/** native types */
.admonition-caution {
  background-color: rgba(230, 126, 34, 0.1);
  border-left: 8px solid #e67e22;
}

.admonition-caution h5 {
  color: #e67e22;
}

.admonition-caution .admonition-icon svg {
  stroke: #e67e22;
  fill: #e67e22;
}

.admonition-success {
  background-color: rgba(46, 204, 113, 0.1);
  border-color: #2ecc71;
}

.admonition-success h5 {
  color: #2ecc71;
}

.admonition-success .admonition-icon svg {
  stroke: #2ecc71;
  fill: #2ecc71;
}

.admonition-warning {
  background-color: rgba(231, 76, 60, 0.1);
  border-color: #e74c3c;
}

.admonition-warning h5 {
  color: #e74c3c;
}

.admonition-warning .admonition-icon svg {
  stroke: #e74c3c;
  fill: #e74c3c;
}

.admonition-important {
  background-color: rgba(52, 152, 219, 0.1);
  border-color: #3498db;
}

.admonition-important h5 {
  color: #3498db;
}

.admonition-important .admonition-icon svg {
  stroke: #3498db;
  fill: #3498db;
}

.admonition-note {
  background-color: rgba(241, 196, 15, 0.1);
  border-color: #f1c40f;
}

.admonition-note h5 {
  color: #f1c40f;
}

.admonition-note .admonition-icon svg {
  stroke: #f1c40f;
  fill: #f1c40f;
}

.admonition-consigne {
  background-color: rgba(52, 152, 219, 0.1);
  border-color: #3498db;
}

.admonition-consigne h5 {
  color: #3498db;
}

.admonition-consigne .admonition-icon svg {
  stroke: #3498db;
  fill: #3498db;
}
</style>