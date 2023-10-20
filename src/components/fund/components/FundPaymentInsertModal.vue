<script setup>
  const props = defineProps({
    show: Boolean,
    payment: Object,
  });
</script>

<template>
  <Transition name="modal">
    <div class="modal-mask" v-if="show">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thêm mới</h5>
            <button type="button" class="close" @click="$emit('close')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body border-dash">
            <slot name="body">
              <p class="font-weight-bolder mb-3 pt-4">
                KHOẢN CHI QUÝ {{ payment.quarter }} NĂM {{ payment.year }}
              </p>
              <div class="mb-3">
                <label for="txtAmount" class="form-label">Số tiền</label>
                <input type="text" class="form-control" id="txtAmount" placeholder="Số tiền" v-model="payment.amount">
              </div>
              <div class="mb-3">
                <label for="txtDescription" class="form-label">Nội dung</label>
                <textarea class="form-control" id="txtDescription" rows="3" v-model="payment.description"></textarea>
              </div>
            </slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn btn-success"
              onclick="this.classList.toggle('btn--loading')"
              @click="processPayment()"
            >
              <span class="btn__text">LƯU</span>
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

<script>
import paymentService from '../../../services/payment.service';

export default {
    data() {
      return {
      };
    },
    methods: {
      processPayment() {
        if (this.payment.isUpdate) {
          this.updatePayment()
        }
        else {
          this.createPayment();
        }
      },
      createPayment() {
        paymentService
          .insert(this.payment)
          .then((response) => {
            const result = {
              status: response.status,
              msg: "Thêm mới khoản chi quý " + this.payment.quarter + " năm " + this.payment.year + " thành công",
            }
            this.$emit("processPaymentResult", result)
            this.amount = 0
            this.description = null
          })
          .catch((e) => {
            console.log(e);
            const result = {
              status: e.response.status,
              msg: "Thêm mới khoản chi quý " + this.payment.quarter + " năm " + this.payment.year + " không thành công",
            }
            this.$emit("processPaymentResult", result)
            this.amount = 0
            this.description = null
          });
      },
      updatePayment() {
        paymentService
          .update(this.payment)
          .then((response) => {
            const result = {
              status: response.status,
              msg: "Cập nhật khoản chi quý " + this.payment.quarter + " năm " + this.payment.year + " thành công",
            }
            this.$emit("processPaymentResult", result)
            this.amount = 0
            this.description = null
          })
          .catch((e) => {
            console.log(e);
            const result = {
              status: e.response.status,
              msg: "Cập nhật khoản chi quý " + this.payment.quarter + " năm " + this.payment.year + " không thành công",
            }
            this.$emit("processPaymentResult", result)
            this.amount = 0
            this.description = null
          });
      },
    },
    mounted() {
    }
  };
</script>

<style>
.border-dash {
  border-top: 1px dashed #8f8f8f;
}

.fund {
  list-style-type: disc !important;
  padding-left: 1em !important;
  margin-left: 0.5em;
}
.content-fund {
  font-weight: lighter;
  color: rgb(80, 80, 80);
}

.btn {
  position: relative;
}

.btn__text {
  color: #ffffff;
  transition: all 0.2s;
}

.btn--loading .btn__text {
  visibility: hidden;
  opacity: 0;
}

.btn--loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: btn-loading-spinner 1s ease infinite;
}

@keyframes btn-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
