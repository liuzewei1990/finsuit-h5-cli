<template>
  <div>
    <ModuleA></ModuleA>
    <ModuleB></ModuleB>
  </div>
</template>

<script>
import ModuleA from "./modules/module-1.vue"
import ModuleB from "./modules/module-2.vue"
export default {
    components:{ ModuleA,ModuleB }
}
</script>

<style lang="less" scoped>
</style>
