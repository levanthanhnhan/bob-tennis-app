<script setup>
import FundPaymentInsertModal from "./components/FundPaymentInsertModal.vue";
import FundPaymentDeleteModal from "./components/FundPaymentDeleteModal.vue";

</script>
<template>
    <p>Danh sách các khoản chi</p>
    <div
      class="alert alert-success mb-4"
      role="alert"
      v-if="paymentResult.status != 0 && paymentResult.msg != null && paymentResult.status == 200"
    >
      <span class="alert-success-content">{{ paymentResult.msg }}</span>
    </div>
    <div class="alert alert-danger" role="alert" v-else-if="paymentResult.status != 0 && paymentResult.msg != null">
      <span class="alert-danger-content"
        > {{ paymentResult.msg }}</span
      >
    </div>
    <div class="row">
      <div class="col-md-2">
        <label for="txtYear">Năm</label>
        <div class="form-input">
          <select class="form-select" id="txtYear" @change="cbxYearChanges($event)">
            <option v-for="year in years" :value="year.year_id" :selected="year.year_name == this.curYear">
              {{ year.year_name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-2">
        <label for="txtQuarter">Quý</label>
        <div class="form-input">
          <select class="form-select" id="txtQuarter" @change="cbxQuarterChanges($event)">
            <option v-for="quarter in quarters" :value="quarter.quarter_id" :selected="quarter.quarter_id == this.curQuarter">
              {{ quarter.quarter_name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md">
        <label for="txtSearch">&nbsp;</label>
        <div class="form-input">
          <button class="btn btn-primary" @click="search()" style="margin-right: 10px;">TÌM KIẾM</button>
          <button class="btn btn-success" @click="openInsertModal()">THÊM MỚI</button>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <table class="table table-bordered align-items-center mb-0">
        <thead>
          <tr class="table-fund-bg">
            <th
              class="text-center text-uppercase text-xs font-weight-bolder"
            >
            STT
            </th>
            <th
              class="text-center text-uppercase text-xs font-weight-bolder"
            >
              Khoản Chi
            </th>
            <th
              class="text-center text-uppercase text-xs font-weight-bolder"
            >
              Số tiền
            </th>
            <th
              class="text-center text-uppercase text-xs font-weight-bolder"
            >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in this.payments">
            <td class="align-middle text-center col-1">
              <span class="text-secondary text-sm">{{
                index + 1
              }}</span>
            </td>
            <td class="align-middle text-center col-6">
              <span class="text-secondary text-sm">{{
                this.payments[index].description
              }}</span>
            </td>
            <td class="align-middle text-center col-3">
              <span class="text-secondary text-sm">{{
                formatPrice(this.payments[index].amount)
              }}</span>
            </td>
            <td class="align-middle text-center col-2">
              <img
                    style="cursor: pointer;"
                    src="../../assets/icons/icon_edit.png"
                    class="avatar avatar-xs me-3"
                    @click="openEditModal(item)"
                />
                <img
                    style="cursor: pointer;"
                    src="../../assets/icons/icon_delete.png"
                    class="avatar avatar-xs me-3"
                    @click="openDeleteModal(item)"
                />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <FundPaymentInsertModal
      :show="isShowModal"
      :payment="paymentProps"
      @close="isShowModal = false"
      @processPaymentResult = "processPaymentResult"
    >
    </FundPaymentInsertModal>

    <FundPaymentDeleteModal
      :show="isShowDeleteModal"
      :payment="paymentProps"
      @close="isShowDeleteModal = false"
      @processPaymentResult = "processPaymentResult"
    >
    </FundPaymentDeleteModal>

  </template>
  
  <script>
  import dateTime from "../../common/datetime.common";
  import paymentService from "../../services/payment.service"
  
  export default {
    data() {
      return {
        quarters: [
          { quarter_id: 1, quarter_name: 'Quý 1' },
          { quarter_id: 2, quarter_name: 'Quý 2' },
          { quarter_id: 3, quarter_name: 'Quý 3' },
          { quarter_id: 4, quarter_name: 'Quý 4' },
        ],
        years: this.getYearFilter(),
        payments: [],
        totalFundCount: 0,
        curQuarter: null,
        curYear: null,
        totalAmountPayments: 0,
        isShowModal: false,
        isShowDeleteModal: false,
        paymentProps: {
          year: 0,
          quarter: 0,
          amount: 0,
          description: null,
          isUpdate: false,
        },
        paymentResult: {
          status: 0,
          msg: null
        }
      };
    },
    methods: {
      processPaymentResult(result) {
        this.isShowModal = false
        this.isShowDeleteModal = false
        this.getPayments();
        this.paymentResult = result
      },
      openInsertModal() {
        this.paymentProps = {
          year: this.curYear,
          quarter: this.curQuarter,
          amount: 0,
          description: null,
          isUpdate: false,
        }
        this.isShowModal = true;
      },
      openEditModal(payment) {
        this.paymentProps = {
          payment_id: payment.payment_id,
          year: payment.year,
          quarter: payment.quarter,
          amount: payment.amount,
          description: payment.description,
          isUpdate: true,
        }
        this.isShowModal = true;
      },
      openDeleteModal(payment) {
        this.paymentProps = {
          payment_id: payment.payment_id,
          year: payment.year,
          quarter: payment.quarter,
          isUpdate: false,
        }
        this.isShowDeleteModal = true;
      },
      cbxYearChanges(event) {
        this.curYear = event.target.value;
      },
      cbxQuarterChanges(event) {
        this.curQuarter = event.target.value;
      },
      formatPrice(value) {
        if (value == "") return
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "₫";
      },
      getYearFilter() {
        const yearCount = new Date().getFullYear() - 2023;
        const years = [];
        for (let index = 0; index < yearCount + 1; index++) {
          years.push({ year_id: 2023 + index, year_name: 2023 + index });
        }
  
        return years;
      },
      async getPayments() {
        await paymentService
          .find(this.curYear, this.curQuarter)
          .then((response) => {
            this.payments = response.data.filter((item) => {
                this.totalAmountPayments += item.amount;
                return item.quarter.toString() == this.curQuarter && item.year == this.curYear;
            });
          })
          .catch((e) => {
            console.log(e);
          });
      },
      async search() {
        this.totalAmountPayments = 0;
        await this.getPayments();
      }
    },
    async mounted() {
      this.curQuarter = dateTime.getQuarter;
      this.curYear = new Date().getFullYear();
      this.paymentProps = {
          quarter: this.curQuarter,
          year: this.curYear,
          amount: 0,
          description: null
        }
      await this.search()
    }
  };
  </script>
  <style>
  .table-fund-bg {
    background-color: #ededed;
  }
  .text-receipts {
    color: #1c9be7;
  }
  .text-payments {
    color: #f7a200;
  }
  </style>