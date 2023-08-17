<template>
  <p class="">Danh sách hội viên</p>
  <div class="card mb-4">
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Tên
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Ngày sinh
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Số điện thoại
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Điểm trình
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Trạng thái
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Liên lạc
              </th>
              <th class="text-secondary opacity-7" v-bind:hidden="true"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in members">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img :src="member.img_path" class="avatar avatar-sm me-3" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ member.member_name }}</h6>
                    <p class="text-xs text-secondary mb-0">
                      {{ member.role_name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ toDateTime(member.birthday) }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  member.phone_number
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  member.level_name
                }}</span>
              </td>
              <td class="align-middle text-center text-sm">
                <span
                  class="badge badge-sm bg-gradient-success"
                  v-if="member.is_active"
                  >Online</span
                >
                <span class="badge badge-sm bg-gradient-secondary" v-else
                  >Offline</span
                >
              </td>
              <td class="align-middle text-center">
                <a
                  :href="member.contact"
                  target="_blank"
                  style="margin-left: 15px"
                  ><img
                    src="../../../assets/icons/icon_messenger.png"
                    class="avatar avatar-xs me-3"
                /></a>
              </td>
              <td class="align-middle" v-bind:hidden="true">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-original-title="Edit member"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import service from "../../../services/member.service.js";

export default {
  data() {
    return {
      members: [],
    };
  },
  methods: {
    findAll() {
      service
        .findAll()
        .then((response) => {
          this.members = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    toDateTime(value) {
        return moment(value).format('DD/MM/YYYY');
    }
  },
  mounted() {
    this.findAll();
  },
};
</script>

<style>
.bg-gradient-success {
  background-image: linear-gradient(310deg, #17ad37, #98ec2d);
}
.bg-gradient-secondary {
  background-image: linear-gradient(310deg, #627594, #a8b8d8);
}
.badge,
.btn {
  text-transform: uppercase;
}
.badge {
  display: inline-block;
  padding: 0.55em 0.9em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.45rem;
}
</style>
