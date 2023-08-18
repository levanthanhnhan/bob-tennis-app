<script setup>
import FundList from "./components/FundList.vue";
import FundMember from "./components/FundMember.vue";
</script>

<template>
  <div class="alert alert-danger" role="alert">
    Chưa đóng Quỹ quý 1
    <button
      type="button"
      class="btn btn-danger btn-sm"
      style="float: right; margin-top: -3px"
    >
      NẠP
    </button>
  </div>
  <FundList />
  <FundMember />
</template>
