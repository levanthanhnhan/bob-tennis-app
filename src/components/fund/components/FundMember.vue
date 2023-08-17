<template>
  <p class="">Quỹ năm {{ new Date().getFullYear() }}</p>
    <button class="btn btn-primary mb-4 draggable" draggable="true" @click="pay()">Pay</button>
  <div class="row removable">
    <table id="table" class="tg">
      <tbody id="tbody"></tbody>
    </table>
  </div>
</template>

<script>
import $ from 'jquery'
import service from '../../../services/fund.service'

export default {
  methods: {
    pay() {
      service.payWithMoMo()
    },
    drawCellBackground() {
      var NUMBER_ROW = 18;
      var NUMBER_CELL = 12;
      var array = [];
      $("#tbody").html("");

      // draw <tr>
      for (var i = 0; i < NUMBER_ROW; i++) {
        var tr = "<tr id=tr" + i + "></tr>";
        $("#tbody").append(tr);

        var cells = [];
        cells.push("");
        array.push(cells);

        // draw <td>
        for (var j = 0; j < NUMBER_CELL; j++) {
          var td = "<td id=" + i + "-" + j + " class='tg-0lax'></td>";
          $("#tr" + i).append(td);

          array[i].push("");
        }
      }
    },
  },
  mounted() {
    this.drawCellBackground();
  },
};
</script>
<style>
.tg .tg-0lax {
  text-align: left;
  vertical-align: top;
}
.tg td {
  font-family: Arial, sans-serif;
  font-size: 5px;
  padding: 15px 15px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: normal;
  border-color: #cfcfcf;
  /* color: #669; */
  /* background-color: #fff; */
}
</style>
