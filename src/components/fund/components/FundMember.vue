<template>
  <p class="">Quỹ năm {{ new Date().getFullYear() }}</p>
  <div class="row removable">
    <table id="table" class="tg">
      <tbody id="tbody"></tbody>
    </table>
  </div>
</template>

<script>
import $ from "jquery";
import fundService from "../../../services/fund.service";
import memberService from "../../../services/member.service.js";
import deviceType from "../../../common/device.common.js";
import dateTime from '../../../common/datetime.common.js'

export default {
  data() {
    return {
      members: [],
      deviceType: null,
      curentQuarter: null,
      payType: {
            NONE: 0,
            PAID: 1,
        }
    };
  },
  methods: {
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
            td = "<td id=" + i + "-" + j + " class='tg tg-0lax' style='font-weight: bold'>" + quarters[j] + "</td>";
          } else {
            // Check member is pay (0: none, 1: paid)
            if (j == dateTime.QuarterType.Q1) {
                td = this.drawContentCell(dateTime.QuarterType.Q1, this.members[i - 1].quarter1, i, j);
            }
            else if (j == dateTime.QuarterType.Q2) {
                td = this.drawContentCell(dateTime.QuarterType.Q2, this.members[i - 1].quarter2, i, j);
            }
            else if (j == dateTime.QuarterType.Q3) {
                td = this.drawContentCell(dateTime.QuarterType.Q3, this.members[i - 1].quarter3, i, j);
            }
            else if (j == dateTime.QuarterType.Q4) {
                td = this.drawContentCell(dateTime.QuarterType.Q4, this.members[i - 1].quarter4, i, j);
            }
          }

          // Draw Member Name
          if (i > 0 && j == 0) {
            var memberName = this.deviceType == "desktop" ? this.members[i - 1].member_name : this.members[i - 1].sort_name
            td = "<td id=" + i + "-" + j + " class='tg tg-0lax' style='width: 200px; font-weight: bold'>" + memberName + "</td>";
          }

          $("#tr" + i).append(td);
        }
      }
    },
    drawContentCell(type, value, i, j) {
        var td = "<td id=" + i + "-" + j + " class='tg tg-0lax error'></td>";

        // Check if current quarter is small Quarter1, 2, 3, 4
        if (this.curentQuarter < type) {
            td = "<td id=" + i + "-" + j + " class='tg tg-0lax'></td>";
        }
        else {
            // Check member is pay (0: none, 1: paid)
            if (value == this.payType.NONE) {
                td = "<td id=" + i + "-" + j + " class='tg tg-0lax error'></td>";
            }
            else {
                td = "<td id=" + i + "-" + j + " class='tg tg-0lax success'></td>";
            }
        }

        return td;
    },
  },
  mounted() {
    this.getMembers();
    this.deviceType = deviceType;
    this.curentQuarter = dateTime.getQuarter;
  },
};
</script>
<style>
.tg .tg-0lax {
  text-align: center;
  vertical-align: top;
  background-repeat: no-repeat;
  background-size: 34px 34px;
  background-position: center;
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
