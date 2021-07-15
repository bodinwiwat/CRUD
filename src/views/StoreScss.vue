<template>
  <div>
    <TableStoreScss/>
  </div>
</template>

<script>
import TableStoreScss from "../components/TableStoreScss.vue";
export default {
  components: {
    TableStoreScss,
  },
  computed: {
    products() {
      return this.$store.getters.availableProducts;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>