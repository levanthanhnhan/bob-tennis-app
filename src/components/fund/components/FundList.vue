<template>
  <p class="">Ngân sách</p>
  <div class="row removable">
    <div class="col-xl-3 col-sm-6 drop-zone">
      <div class="card draggable mb-4" draggable="true">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-2">
              <div
                class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md"
              >
                <i
                  class="fa fa-money text-lg opacity-10"
                  aria-hidden="true"
                  data-selected="selected-icon-hover"
                ></i>
              </div>
            </div>
            <div class="col-10">
              <div class="numbers">
                <p class="text-sm mb-0 font-weight-bold">
                  Thu chi Quý {{ getQuarter() }}
                </p>
                <h5 class="font-weight-bolder mb-0">
                  {{ formatPrice(funds.current) }}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-3 col-sm-6 drop-zone">
      <div class="card draggable mb-4" draggable="true">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-2">
              <div
                class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md"
              >
                <i
                  class="fa fa-chevron-circle-right text-lg opacity-10"
                  aria-hidden="true"
                  data-selected="selected-icon-hover"
                ></i>
              </div>
            </div>
            <div class="col-10">
              <div class="numbers">
                <p class="text-sm mb-0 font-weight-bold">
                  Tổng thu Quý {{ getQuarter() }}
                </p>
                <h5 class="font-weight-bolder mb-0">
                  {{ formatPrice(funds.in) }}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-3 col-sm-6 drop-zone">
      <div class="card draggable mb-4" draggable="true">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-2">
              <div
                class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md"
              >
                <i
                  class="fa fa-chevron-circle-left text-lg opacity-10"
                  aria-hidden="true"
                  data-selected="selected-icon-hover"
                ></i>
              </div>
            </div>
            <div class="col-10">
              <div class="numbers">
                <p class="text-sm mb-0 font-weight-bold">
                  Tổng chi Quý {{ getQuarter() }}
                </p>
                <h5 class="font-weight-bolder mb-0">
                  {{ formatPrice(funds.out) }}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-3 col-sm-6 drop-zone">
      <div class="card draggable mb-4" draggable="true">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-2">
              <div
                class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md"
              >
                <i
                  class="ni ni-money-coins text-lg opacity-10"
                  aria-hidden="true"
                  data-selected="selected-icon-hover"
                ></i>
              </div>
            </div>
            <div class="col-10">
              <div class="numbers">
                <p class="text-sm mb-0 font-weight-bold">Tổng quỹ</p>
                <h5 class="font-weight-bolder mb-0">
                  {{ formatPrice(funds.total) }}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      funds: {
        in: "38000",
        out: "20000",
        current: "58000",
        total: "158000",
      },
    };
  },
  methods: {
    getQuarter() {
      var month = new Date().getMonth();
      switch (month) {
        case (1, 2, 3):
          return "1";
        case (4, 5, 6):
          return "2";
        case (6, 7, 8):
          return "3";
        default:
          return "4";
      }
    },
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "₫";
    },
  },
};
</script>
<style>
.bg-gradient-primary {
  background-image: linear-gradient(310deg, #a78de1 0%, #6a38d9 100%);
}
</style>
