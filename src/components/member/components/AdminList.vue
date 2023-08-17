<template>
  <p class="">Quản trị viên</p>
  <div class="row removable">
    <!-- v-for -->
    <div class="col-xl-3 col-md-6 mb-4" v-for="admin in admins">
      <div class="card">
        <div class="card-body p-3">
          <div class="d-flex align-items-center">
            <div>
              <img :src="admin.img_path" class="avatar avata-sm" />
            </div>
            <div class="ms-3">
              <span class="h6 font-weight-bold mb-0">{{
                admin.member_name
              }}</span>
              <p class="text-xs text-secondary mb-0">
                {{ admin.role_name }}
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
import service from "../../../services/member.service.js";

export default {
  data() {
    return {
      admins: [],
    };
  },
  methods: {
    findAdmins() {
      service
        .findAdmins()
        .then((response) => {
          this.admins = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.findAdmins();
  },
};
</script>
