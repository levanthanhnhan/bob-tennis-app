<script setup>
const props = defineProps({
  show: Boolean,
});
</script>

<template>
  <Transition name="modal">
    <div class="modal-mask" v-if="show">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thông báo</h5>
            <button type="button" class="close" @click="$emit('close')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot name="body">
              <p style="font-size: 14px">Bạn có muốn cập nhật hồ sơ?</p>
              <p style="font-size: 14px; color: #e97191">
                Nếu thay đổi SĐT bạn phải đăng nhập lại bằng SĐT mới.
              </p>
            </slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="$emit('update')">CẬP NHẬT</button>
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
