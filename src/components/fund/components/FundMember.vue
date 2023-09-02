<script setup>
import FundStatusModal from "./FundStatusModal.vue";
import fundService from "../../../services/fund.service";
import billingService from "../../../services/billing.service";

</script>

<template>
  <p class="">Quỹ năm {{ new Date().getFullYear() }}</p>
  <div class="row removable">
    <div
      v-if="(isPaidFund != null) & (isPaidFund == 'PAID')"
      class="alert alert-success mb-4"
    >
      <span class="alert-success-content">Đã nạp quỹ thành công!</span>
    </div>
    <div
      class="alert alert-danger mb-4"
      v-if="(isPaidFund != null) & (isPaidFund != 'PAID')"
    >
      <span class="alert-danger-content"
        >Nạp quỹ không thành công. Vui lòng thực hiện lại!</span
      >
    </div>
    <table id="table" class="tg">
      <tbody id="tbody"></tbody>
    </table>
  </div>

  <FundStatusModal
    :show="isShowModal"
    :billing="billing"
    @close="isShowModal = false"
    @createOrder="createOrderPayOS"
  >
  </FundStatusModal>
</template>

<script>
import $ from "jquery";
import getDeviceType from "../../../common/device.common";
import dateTime from "../../../common/datetime.common";

export default {
  data() {
    return {
      members: [],
      deviceType: null,
      curentQuarter: null,
      payType: {
        NONE: 0,
        PAID: 1,
      },
      isShowModal: false,
      billing: {
        status: 0,
        amount: import.meta.env.VITE_FUND_PRICE,
        member_name: null,
      },
      cellId: null,
      isPaidFund: null,
    };
  },
  methods: {
    openModal(cellId, cellClass, cellName) {
      this.isShowModal = true;
      var params = cellId.split("-");
      var data = {
        member_id: params[0],
        quarter: params[1],
        year: params[2],
      };

      if (cellClass.includes("success")) {
        billingService
          .billingByMember(data)
          .then((response) => {
            if (response.data.length > 0) {
              this.billing = response.data[0];
              this.billing.member_name = cellName;
              this.billing.quarter = data.quarter;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.billing = {
          status: 0,
          amount: import.meta.env.VITE_FUND_PRICE,
          member_name: cellName,
          quarter: data.quarter,
        };
      }
    },
    async createOrderPayOS() {
      var orderCode = (await this.getMaxOrderCode()) + 1;
      var params = this.cellId.split("-");
      var data = {
        orderCode: orderCode,
        memberId: params[0],
        quarter: params[1],
        year: params[2],
      };
      fundService
        .createOrder(data)
        .then((response) => {
          if (response.data.code == 0) {
            var checkoutLink = response.data.desc;
            window.open(checkoutLink, "_blank");
            this.isShowModal = false;
          }
        })
        .catch((e) => {
          this.isShowModal = false;
          this.isPaidFund = "ERROR";
          console.log(e);
        });
    },
    async getMaxOrderCode() {
      var orderCode = await fundService
        .maxOrderCode()
        .then((response) => {
          if (response.data.length == 0) {
            return 0;
          } else {
            return response.data[0].order_code;
          }
        })
        .catch((e) => {
          this.isShowModal = false;
          this.isPaidFund = "ERROR";
          console.log(e);
        });

      return orderCode;
    },
    update() {},
    getMembers() {
      fundService
        .findFundMember()
        .then((response) => {
          this.members = response.data;
          this.drawCellBackground();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    pay() {
      fundService.payWithMoMo();
    },
    drawCellBackground() {
      var quarters = ["", "Quý 1", "Quý 2", "Quý 3", "Quý 4"];
      var NUMBER_ROW = this.members.length + 1;
      var NUMBER_CELL = quarters.length;
      $("#tbody").html("");

      // draw <tr>
      for (var i = 0; i < NUMBER_ROW; i++) {
        var tr = "<tr id=tr" + i + "></tr>";
        $("#tbody").append(tr);

        // draw <td>
        for (var j = 0; j < NUMBER_CELL; j++) {
          var td = "";

          // Draw Header Quarters
          if (i == 0 && j < NUMBER_CELL) {
            td =
              "<td id=" +
              i +
              "-" +
              j +
              " class='tg tg-0lax' style='font-weight: bold; background-color: #fff'>" +
              quarters[j] +
              "</td>";
          } else {
            // Check member is pay (0: none, 1: paid)
            if (j == dateTime.QuarterType.Q1) {
              td = this.drawContentCell(
                dateTime.QuarterType.Q1,
                this.members[i - 1].quarter1,
                i,
                j
              );
            } else if (j == dateTime.QuarterType.Q2) {
              td = this.drawContentCell(
                dateTime.QuarterType.Q2,
                this.members[i - 1].quarter2,
                i,
                j
              );
            } else if (j == dateTime.QuarterType.Q3) {
              td = this.drawContentCell(
                dateTime.QuarterType.Q3,
                this.members[i - 1].quarter3,
                i,
                j
              );
            } else if (j == dateTime.QuarterType.Q4) {
              td = this.drawContentCell(
                dateTime.QuarterType.Q4,
                this.members[i - 1].quarter4,
                i,
                j
              );
            }
          }

          // Draw Member Name
          if (i > 0 && j == 0) {
            var memberName =
              this.deviceType == "desktop"
                ? this.members[i - 1].member_name
                : this.members[i - 1].sort_name;
            td =
              "<td id=" +
              i +
              "-" +
              j +
              " class='tg tg-0lax' style='width: 200px; font-weight: bold; background-color: #fff'>" +
              memberName +
              "</td>";
          }

          $("#tr" + i).append(td);
        }
      }

      // Add event cell click
      var self = this;
      $("#table td").click(function () {
        var cellId = $(this).attr("id");
        var cellClass = $(this).attr("class");
        var cellName = $(this).attr("name");
        self.cellId = cellId;

        // If click cell empty is not show Modal
        if (!cellId.includes("-0-") && !cellClass.includes("none")) {
          self.openModal(cellId, cellClass, cellName);
        }
      });
    },
    drawContentCell(type, value, i, j) {
      var td =
        "<td id=" +
        this.members[i - 1].member_id +
        "-" +
        j +
        "-" +
        this.members[i - 1].year +
        " name='" +
        this.members[i - 1].member_name +
        "' class='tg tg-0lax tg-content error'></td>";

      // Check if current quarter is small Quarter1, 2, 3, 4
      if (this.curentQuarter < type) {
        td =
          "<td id=" +
          this.members[i - 1].member_id +
          "-" +
          j +
          "-" +
          this.members[i - 1].year +
          " name='" +
          this.members[i - 1].member_name +
          "' class='tg tg-0lax none'></td>";
      } else {
        // Check member is pay (0: none, 1: paid)
        if (value == this.payType.NONE) {
          td =
            "<td id=" +
            this.members[i - 1].member_id +
            "-" +
            j +
            "-" +
            this.members[i - 1].year +
            " name='" +
            this.members[i - 1].member_name +
            "' class='tg tg-0lax tg-content error'></td>";
        } else {
          td =
            "<td id=" +
            this.members[i - 1].member_id +
            "-" +
            j +
            "-" +
            this.members[i - 1].year +
            " name='" +
            this.members[i - 1].member_name +
            "' class='tg tg-0lax tg-content success'></td>";
        }
      }

      return td;
    },
    getParameters() {
      this.isPaidFund = new URLSearchParams(window.location.search).get(
        "status"
      );
    },
  },
  mounted() {
    this.getMembers();
    this.getParameters();
    this.deviceType = getDeviceType;
    this.curentQuarter = dateTime.getQuarter;
  },
};
</script>
<style>
table {
  box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
}
.tg .tg-0lax {
  text-align: center;
  vertical-align: top;
  background-repeat: no-repeat;
  background-size: 34px 34px;
  background-position: center;
}
.tg-content {
  cursor: pointer;
}
.success {
  background-color: #dffff4;
  background-image: url("https://img.icons8.com/dotty/80/12B886/ok.png");
}
.error {
  background-image: url("https://img.icons8.com/dotty/80/FA5252/cancel.png");
  background-color: #fdebeb;
}
.tg td {
  font-size: 15px;
  padding: 25px 12px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: normal;
  border-color: #cfcfcf;
  /* color: #669; */
  /* background-color: #fff; */
}
</style>
