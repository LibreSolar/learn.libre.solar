<template>
  <figure>
    <center>
      <img :src="imagesrc" :alt="caption" height="auto" width="auto" />
      <figcaption><b>Figure {{ num }}.</b> {{ caption }}.</figcaption>
    </center>
  </figure>
</template>

<script>
export default {
  props: ['src', 'caption', 'num'],
  computed: {
    imagesrc () {
      return this.$site.base + 'images/' + this.src
    }
  }
}
</script>
