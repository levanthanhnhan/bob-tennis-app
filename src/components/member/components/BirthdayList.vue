<template>
  <p class="">Sinh nhật trong tháng</p>
  <div class="row removable">
    <!-- v-for -->
    <div class="col-xl-3 col-md-6 mb-4" v-for="member in members">
      <div class="card">
        <div class="card-body p-3">
          <div class="d-flex align-items-center">
            <div>
              <img :src="member.img_path" class="avatar avata-sm" />
            </div>
            <div class="ms-3">
              <span class="h6 font-weight-bold mb-0">{{
                member.member_name
              }}</span>
              <p class="text-xs text-secondary mb-0">
                {{ toDateTime(member.birthday) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end v-for -->
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
    findBirthday() {
      service
        .findBirthday()
        .then((response) => {
          this.members = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    toDateTime(value) {
      return moment(value).format('DD/MM/YYYY');
    },
  },
  mounted() {
    this.findBirthday();
  },
};
</script>
