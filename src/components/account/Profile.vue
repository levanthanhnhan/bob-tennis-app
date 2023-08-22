<script setup>
import Datepicker from "vuejs3-datepicker";
import { VueSpinnerDots } from "vue3-spinners";
</script>
<template>
  <input type="file" ref="myfile" id="inputOpenFile" v-bind:hidden="true" />
  <button id="btnUpload" v-bind:hidden="true" @click="upload"></button>
  <div class="row align-items-center">
    <div class="mx-auto text-center ms-3 mb-md-5">
      <img
        id="imgAvatar"
        :src="imgPath"
        width="100"
        height="100"
        class="pf-avatar mb-3"
        @click="openFile"
      />
      <div v-if="isUploading" class="mx-auto mb-1">
        <VueSpinnerDots size="40" color="#774dd3" />
      </div>
      <h4>{{ member.member_name }}</h4>
    </div>
  </div>
  <form @submit.prevent="update">
    <div class="row">
      <div class="col-md-3 mb-3">
        <label for="txtFullName">Họ tên</label>
        <input
        v-model="member.member_name"
          type="text"
          class="form-control"
          id="txtFullName"
          placeholder="Họ tên"
          required
        />
      </div>
      <div class="col-md-3 mb-3">
        <label for="txtSortName">Biệt danh</label>
        <input
          v-model="member.sort_name"
          type="text"
          class="form-control"
          id="txtSortName"
          placeholder="Biệt danh"
          required
        />
      </div>
      <div class="col-md-3 mb-3">
        <label for="txtPhoneNumber">Số điện thoại</label>
        <div class="form-input">
          <div class="input-group flex-nowrap">
            <span class="input-group-text">+84</span>
            <input
              v-model="member.phone_number"
              type="text"
              class="form-control"
              id="txtPhoneNumber"
              placeholder="Số điện thoại"
              required
            />
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <label for="txtBirthday">Ngày sinh</label>
        <div class="form-input">
          <Datepicker
            placeholder="Ngày sinh"
            v-model="member.birthday"
            @input="dateSelected"
            language="vn"
          ></Datepicker>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 mb-3">
        <label for="txtContact">Liên hệ (messenger)</label>
        <div class="form-input">
          <input
            v-model="member.contact"
            type="text"
            class="form-control"
            id="txtContact"
            placeholder="Liên hệ"
            required
          />
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <label for="txtLevel">Điểm trình</label>
        <div class="form-input">
          <select class="form-select" id="txtLevel">
            <option
              v-for="level in levels"
              :value="level.level_id"
              :selected="level.level_id == member.level_id"
            >
              {{ level.level_name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <label for="txtRole">Vai trò</label>
        <div class="form-input">
          <select class="form-select" id="txtRole">
            <option
              v-for="role in roles"
              value="role.role_id"
              :selected="role.role_id == member.role_id"
            >
              {{ role.role_name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="form-check">
        <input
          v-model="member.is_admin"
          class="form-check-input"
          type="checkbox"
          id="cbAdmin"
        />
        <label class="form-check-label" for="cbAdmin"> Quản trị viên </label>
      </div>
      <div class="form-check">
        <input
          v-model="member.is_active"
          class="form-check-input"
          type="checkbox"
          id="cbStatus"
        />
        <label class="form-check-label" for="cbStatus"> Đang hoạt động </label>
      </div>
    </div>
    <button class="btn btn-primary" type="submit">CẬP NHẬT</button>
  </form>
</template>

<script>
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import memberService from "../../services/member.service";
import roleService from "../../services/role.service";
import levelService from "../../services/level.service";

export default {
  data() {
    return {
      imgPath: "https://img.icons8.com/windows/128/user-male-circle.png",
      currentDate: new Date(),
      isUploading: false,
      member: {},
      roles: [],
      levels: [],
    };
  },
  mounted() {
    this.getMember();
    this.getLevels();
    this.getRoles();
    this.selectFile();
    this.imgAvatarLoaded();
  },
  methods: {
    update() {
        alert(this.member.member_name)
    },
    getMember() {
      memberService
        .findOne()
        .then((result) => {
          this.member = result.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRoles() {
      roleService
        .findAll()
        .then((result) => {
          this.roles = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLevels() {
      levelService
        .findAll()
        .then((result) => {
          this.levels = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    imgAvatarLoaded() {
      var self = this;
      document.getElementById("imgAvatar").onload = function () {
        self.isUploading = false;
      };
    },
    dateSelected(payload) {
      console.log("dateSelected", payload);
    },
    openFile() {
      document.getElementById("inputOpenFile").click();
    },
    selectFile() {
      document
        .getElementById("inputOpenFile")
        .addEventListener("change", function (e) {
          if (e.target.files[0]) {
            document.getElementById("btnUpload").click();
          }
        });
    },
    upload() {
      this.isUploading = true;
      const storageRef = ref(storage, `files/${this.makeCurentDate()}`);
      uploadBytes(storageRef, this.$refs.myfile.files[0]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          this.imgPath = url;
        });
      });
    },
    makeCurentDate() {
      const today = new Date();
      const date =
        today.getFullYear().toString() +
        (today.getMonth() + 1).toString() +
        today.getDate().toString();
      const time =
        today.getHours().toString() +
        today.getMinutes().toString() +
        today.getSeconds().toString();
      const dateTime = date + time;
      return dateTime;
    },
  },
};
</script>
<style>
.pf-avatar {
  cursor: pointer;
  border-radius: 50px;
  border: 3px solid #999;
}
.form-row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -5px;
  margin-left: -5px;
}
.form-row > .col,
.form-row > [class*="col-"] {
  padding-right: 5px;
  padding-left: 5px;
}
.vuejs3-datepicker__value {
  height: 40px;
}
.vuejs3-datepicker__icon {
  margin-top: -10px;
}
.vuejs3-datepicker__content {
  margin-top: -5px;
  font-size: 14px !important;
}
</style>
