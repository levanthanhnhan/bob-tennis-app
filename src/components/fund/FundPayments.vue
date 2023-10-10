<template>
    <p>Danh sách các khoản chi</p>
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
          <button class="btn btn-success" @click="add()">THÊM MỚI</button>
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
            <td class="align-middle text-center col-3">
              <span class="text-secondary text-sm">{{
                this.payments[index].description
              }}</span>
            </td>
            <td class="align-middle text-center col-3">
              <span class="text-secondary text-sm">{{
                formatPrice(this.payments[index].amount)
              }}</span>
            </td>
            <td class="align-middle text-center col-3">
                <a
                  href=""
                  target="_blank"
                  style="margin-left: 15px"
                  ><img
                    src="../../assets/icons/icon_edit.png"
                    class="avatar avatar-xs me-3"
                /></a>
                <a
                  href=""
                  target="_blank"
                  style="margin-left: 15px"
                  ><img
                    src="../../assets/icons/icon_delete.png"
                    class="avatar avatar-xs me-3"
                /></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
        totalAmountPayments: 0
      };
    },
    methods: {
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