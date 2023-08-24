<script setup>
import FundStatusModal from "./FundStatusModal.vue";
import fundService from "../../../services/fund.service";
import memberService from "../../../services/member.service";
</script>

<template>
  <p class="">Quỹ năm {{ new Date().getFullYear() }}</p>
  <div class="row removable">
    <table id="table" class="tg">
      <tbody id="tbody"></tbody>
    </table>
  </div>

  <Teleport to="body">
    <FundStatusModal
      :show="isShowModal"
      @close="isShowModal = false"
      @update="update"
    >
      <template #header> </template>
    </FundStatusModal>
  </Teleport>
</template>

<script>
import $ from "jquery";
import getDeviceType from "../../../common/device.common";
import dateTime from "../../../common/datetime.common";
import payOS from "../../../common/payos.common";

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
    };
  },
  methods: {
    async createOrderPayOS(cellId) {
      var orderCode = (await this.getMaxOrderCode()) + 1;
      var signature = payOS.createSignature(orderCode);
      console.log(signature);
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

        // If click cell empty is not show Modal
        if (!cellId.includes("0") && !cellClass.includes("none")) {
          self.createOrderPayOS(cellId);
          //self.isShowModal = true;
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
        " class='tg tg-0lax tg-content error'></td>";

      // Check if current quarter is small Quarter1, 2, 3, 4
      if (this.curentQuarter < type) {
        td =
          "<td id=" +
          this.members[i - 1].member_id +
          "-" +
          j +
          "-" +
          this.members[i - 1].year +
          " class='tg tg-0lax none'></td>";
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
            " class='tg tg-0lax tg-content error'></td>";
        } else {
          td =
            "<td id=" +
            this.members[i - 1].member_id +
            "-" +
            j +
            "-" +
            this.members[i - 1].year +
            " class='tg tg-0lax tg-content success'></td>";
        }
      }

      return td;
    },
  },
  mounted() {
    this.getMembers();
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
