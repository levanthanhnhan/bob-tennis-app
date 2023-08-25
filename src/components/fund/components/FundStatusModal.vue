<script setup>
const props = defineProps({
  show: Boolean,
  billing: Object,
});

import { VueSpinnerClip } from "vue3-spinners";
</script>

<template>
  <Transition name="modal">
    <div class="modal-mask" v-if="show">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Chi tiết</h5>
            <button type="button" class="close" @click="$emit('close')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot name="body">
              <p class="font-weight-bolder mb-3 pt-2">THÔNG TIN QUÝ {{ billing.quarter }}</p>
              <ul class="fund">
                <li class="content-fund">
                  <p style="font-size: 14px">
                    Tên:
                    <span style="font-weight: bold">{{
                      billing.member_name
                    }}</span>
                  </p>
                </li>
                <li class="content-fund">
                  <p style="font-size: 14px">
                    Số tiền:
                    <span style="font-size: 14px; font-weight: bold">{{
                      new Intl.NumberFormat().format(billing.amount)
                    }}₫</span>
                  </p>
                </li>
                <li v-if="billing.status == 0" class="content-fund">
                  <p style="font-size: 14px">
                    Tình trạng:
                    <span
                      style="font-size: 15px; font-weight: bold; color: #e97191"
                      >Chưa nạp</span
                    >
                  </p>
                </li>
                <li v-if="billing.status == 1" class="content-fund">
                  <p style="font-size: 14px">
                    Tình trạng:
                    <span
                      style="font-size: 15px; font-weight: bold; color: #48b86a"
                      >Đã nạp</span
                    >
                  </p>
                </li>
                <li class="content-fund">
                  <p style="font-size: 14px">
                    Ngày giờ:
                    <span style="font-size: 14px; font-weight: bold">{{
                      billing.transaction_time
                    }}</span>
                  </p>
                </li>
                <li class="content-fund">
                  <p style="font-size: 14px">
                    Nội dung:
                    <span style="font-size: 14px; font-weight: bold">{{
                      billing.description
                    }}</span>
                  </p>
                </li>
              </ul>
            </slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              @click="$emit('createOrder')"
              v-if="billing.status == 0"
            >
            NẠP QUỸ
            <!-- <VueSpinnerClip size="14" color="#fff" style="position: absolute !important;" />-->
            </button>
            
            <button
              style="margin-left: 10px"
              type="button"
              class="btn btn-outline-secondary"
              @click="$emit('close')"
            >
              ĐÓNG
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.fund {
  list-style-type: disc !important;
  padding-left: 1em !important;
  margin-left: 0.5em;
}
.content-fund {
  font-weight: lighter;
  color: rgb(80, 80, 80);
}
</style>
