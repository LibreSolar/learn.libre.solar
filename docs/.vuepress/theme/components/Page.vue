<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
    <div class="footer">
      Content provided by <a href="https://libre.solar">Libre Solar</a> under <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode">CC-BY-SA 4.0 License</a> | <a href="https://libre.solar/about/contact/">Contact / Impressum</a>
    </div>
  </main>
</template>

<script>
import PageEdit from '@parent-theme/components/PageEdit.vue'
import PageNav from '@parent-theme/components/PageNav.vue'
export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '~@parent-theme/styles/wrapper.styl'
.page
  padding-bottom 2rem
  display block
.footer
  border-top 1px #ccc solid
  padding-top 15px
  text-align center
</style>
