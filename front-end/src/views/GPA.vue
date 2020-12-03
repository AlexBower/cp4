<template>
<div>
  <div class="wrapper">
    <div class="search-area">
      <div style="padding-bottom: 10px;">Order by:</div>
      <div class="pure-menu pure-menu-horizontal" style="width: fit-content; padding-bottom: 10px">
        <ul class="pure-menu-list">
          <li class="pure-menu-item"><a @click="select('decrease')" href="#" class="pure-menu-link">Decreasing GPA</a></li>
          <li class="pure-menu-item"><a @click="select('increase')" href="#" class="pure-menu-link">Increasing GPA</a></li>
        </ul>
      </div>
      <div style="padding-bottom: 10px;"> Search for student by gpa</div>
      <div class="search-boxes">
        <div class="search-label">low:</div>
        <div class="search">
          <form class="pure-form">
            <i class="fas fa-search"></i><input v-model.number="low" type="number" step=".01">
          </form>
        </div>
        <div class="extra-space"></div>
        <div class="search-label">high:</div>
        <div class="search">
          <form class="pure-form">
            <i class="fas fa-search"></i><input v-model.number="high" type="number" step=".01">
          </form>
        </div>
      </div>
      
    </div>
  </div>
  <div>
    <StudentList :students="students" />
  </div>
</div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.extra-space {
  padding: 15px
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 115px;
}

.search-label {
  padding: 5px;
}

.search-boxes {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
</style>

<script>
import StudentList from "../components/StudentList.vue"
export default {
  name: 'GPA',
  components: {
    StudentList
  },
  data() {
    return {
      low: 2,
      high: 4,
      sortBy: 'decrease',
    }
  },
  computed: {
    students() {
      let filtered = this.$root.$data.students
        .filter(student => student.gpa >= this.low && student.gpa <= this.high);
      if (this.sortBy === "decrease") {
        return filtered.sort((a, b) => (a.gpa < b.gpa) ? 1 : -1);
      }
      else {
        return filtered.sort((a, b) => (a.gpa > b.gpa) ? 1 : -1);
      }
    }
  },
  methods: {
    select(sortBy) {
      this.sortBy = sortBy;
    }
  }
}
</script>