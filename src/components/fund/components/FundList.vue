<template>
  <div class="row removable">
    <div class="row">
      <div class="col">
        <p class="">Thông tin Quỹ</p>
      </div>
      <div class="col">
        <router-link
          :to="`/fund/detail`"
          class="nav-link text-body p-0"
        >
          <p style="text-align: right; font-size: 13px; cursor: pointer">
            Xem chi tiết
          </p>
        </router-link>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 drop-zone">
      <div class="card bg-gradient-dark draggable mb-4" draggable="true">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-8">
              <div class="numbers">
                <p
                  class="text-sm mb-0 text-capitalize text-white font-weight-lighter"
                >
                  Tổng Quỹ
                </p>
                <h5 class="font-weight-bolder text-white mb-0">
                  {{ formatPrice(funds.total) }}
                </h5>
              </div>
            </div>
            <div class="col-4 text-end">
              <div
                class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md"
              >
                <i
                  class="ni ni-money-coins text-lg opacity-10"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 drop-zone">
      <div class="card bg-gradient-dark draggable mb-4" draggable="true">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-8">
              <div class="numbers">
                <p
                  class="text-sm mb-0 text-capitalize text-white font-weight-lighter"
                >
                  Tổng thu Quý {{ quarter }}
                </p>
                <h5 class="font-weight-bolder text-white mb-0">
                  {{ formatPrice(funds.in) }}
                </h5>
              </div>
            </div>
            <div class="col-4 text-end">
              <div
                class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md"
              >
                <i
                  class="ni ni-building text-lg opacity-10"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 drop-zone">
      <div class="card bg-gradient-dark draggable mb-4" draggable="true">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-8">
              <div class="numbers">
                <p
                  class="text-sm mb-0 text-capitalize text-white font-weight-lighter"
                >
                  Tổng chi Quý {{ quarter }}
                </p>
                <h5 class="font-weight-bolder text-white mb-0">
                  {{ formatPrice(funds.out) }}
                </h5>
              </div>
            </div>
            <div class="col-4 text-end">
              <div
                class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md"
              >
                <i class="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 drop-zone">
      <div class="card bg-gradient-dark draggable mb-4" draggable="true">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-8">
              <div class="numbers">
                <p
                  class="text-sm mb-0 text-capitalize text-white font-weight-lighter"
                >
                  Tổng Quỹ Quý {{ quarter }}
                </p>
                <h5 class="font-weight-bolder text-white mb-0">
                  {{ formatPrice(funds.current) }}
                </h5>
              </div>
            </div>
            <div class="col-4 text-end">
              <div
                class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md"
              >
                <i
                  class="fa fa-money text-lg opacity-10"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateTime from "../../../common/datetime.common.js";

export default {
  data() {
    return {
      quarter: null,
      funds: {
        in: "38000",
        out: "20000",
        current: "58000",
        total: "158000",
      },
    };
  },
  methods: {
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "₫";
    },
  },
  mounted() {
    this.quarter = dateTime.getQuarter;
  },
};
</script>
<style>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 1rem;
}
.bg-gradient-primary {
  background-image: linear-gradient(310deg, #7928ca, #ff0080);
}
.bg-gradient-dark {
  background-image: linear-gradient(310deg, #141727, #3a416f);
}
</style>
