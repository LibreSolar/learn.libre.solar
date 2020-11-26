<template>
    <v-row no-gutters>
       <v-col cols="6">
        <v-subheader>{{ label }}</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field dense shaped  :max="max" :min="min"
        v-bind:value="value" v-on:input="$emit('input', $event)"
       :suffix="unit"/>
      </v-col>
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

