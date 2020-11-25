<template>
    <v-row left>
        <v-text-field dense shaped :label="label" :max="max" :min="min"
        v-bind:value="value" v-on:input="$emit('input', $event)"
       :suffix="unit" />
    </v-row>
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

