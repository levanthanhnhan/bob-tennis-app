<template>
  <div class="card p-3 mb-4 draggable" draggable="true">
    <div
      class="overflow-hidden position-relative border-radius-lg bg-cover h-100"
      style="
        background-image: url(https://demos.creative-tim.com/soft-ui-dashboard/assets/img/ivancik.jpg);
      "
    >
      <span class="mask bg-gradient-dark"></span>
      <div
        class="card-body position-relative z-index-1 d-flex flex-column h-100 p-3"
      >
        <h5 class="text-white font-weight-bolder mb-3 pt-2">NỘI QUY HỘI</h5>
        <ul class="rules">
          <li class="content-rules">Thời gian sinh hoạt từ 17h00 đến 19h00 các ngày: Thứ 2, Thứ 4, Thứ 6 và Chủ Nhật hàng tuần.</li>
          <li class="content-rules">Chi phí đóng quỹ 1,200,000đ/người/quý. Đóng vào đầu mỗi quý khi có thông báo từ CLB.</li>
          <li class="content-rules">Các trận đấu áp dụng thể thức bóng vàng (40).</li>
          <li class="content-rules">Đối với thành viên CLB, mỗi trận thua góp 10,000đ/người/trận, thua hầm (6-5 hoặc 6-0) góp 20,000đ/người/trận. Sử dụng để gửi chi phí nhặt bóng.</li>
          <li class="content-rules">Trường hợp không có người nhặt bóng thì đội thua ở trận trước đó phải nhặt bóng ở trận tiếp theo (ít nhất 1 trong 2 người đội thua phải nhặt đến khi trận đấu kết thúc).</li>
          <li class="content-rules">Các thành viên muốn bắt kèo đánh độ thì mức độ tối đa là 300,000đ/trận.</li>
          <li class="content-rules">Thành viên vắng mặt quá 3 lần không thông báo ở group B.O.B Tennis Bluc sẽ bị phạt một hộp bóng mới.</li>
        </ul>
      </div>
    </div>
    
    <img class="pinned" src="../../../assets/icons/icon_pin.png" width="35" height="35"/>
  </div>
</template>
<style>
.rules {
  list-style-type: disc !important;
  padding-left:1em !important;
  margin-left:1em;
}
.content-rules {
  font-weight: lighter;
  color: rgb(219, 219, 219);
}
.pinned {
  position: absolute;
  left: 35px;
  top: -5px;
}
</style>