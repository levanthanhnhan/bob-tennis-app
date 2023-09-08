<template>
  <p>Lọc theo điều kiện</p>
  <div class="row">
    <div class="col-md-3 mb-3">
      <label for="txtType">Loại thu chi</label>
      <div class="form-input">
        <select class="form-select" id="txtType">
          <option v-for="type in types" :value="type.type_id">
            {{ type.type_name }}
          </option>
        </select>
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="txtYear">Năm</label>
      <div class="form-input">
        <select class="form-select" id="txtYear">
          <option v-for="year in years" :value="year.year_id">
            {{ year.year_name }}
          </option>
        </select>
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="txtQuarter">Quý</label>
      <div class="form-input">
        <select class="form-select" id="txtQuarter">
          <option v-for="quarter in quarters" :value="quarter.quarter_id">
            {{ quarter.quarter_name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quarters: [
        { quarter_id: 0, quarter_name: "-- Tất cả --" },
        { quarter_id: 1, quarter_name: 1 },
        { quarter_id: 2, quarter_name: 2 },
        { quarter_id: 3, quarter_name: 3 },
        { quarter_id: 4, quarter_name: 4 },
      ],
      years: this.getYearFilter(),
      types: [
        { type_id: 0, type_name: "-- Tất cả --" },
        { type_id: 1, type_name: "Thu" },
        { type_id: 2, type_name: "Chi" },
      ],
    };
  },
  methods: {
    getYearFilter() {
      const yearCount = new Date().getFullYear() - 2023;
      const years = [{ year_id: 0, year_name: "-- Tất cả --" }];
      for (let index = 0; index < yearCount + 1; index++) {
        years.push({ year_id: index + 1, year_name: 2023 + index });
      }

      return years;
    },
  },
};
</script>
