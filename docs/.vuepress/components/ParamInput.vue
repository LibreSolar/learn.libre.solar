<template>
  <q-item style="padding: 0px">
    <q-item-section><q-item-label>{{ label }}</q-item-label></q-item-section>
    <q-item-section side>
      <q-input dense outlined class="input-right" type="number" :step="step" :max="max" :min="min"
        v-bind:value="value" v-on:input="$emit('input', $event)"
       :suffix="unit" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    label: String,
    unit: String,
    step: { type: [String, Number], default: 1 },
    max: [String, Number],
    min: [String, Number],
    value: [String, Number]
  }
}
</script>

<style>
.input-right {
  width: 110px;
}
.input-right input {
  text-align: right;
}
</style>
