<template>
<div>
  <div class="wrapper">
    <div class="search-area">
      <div style="padding-bottom: 10px;">Order by:</div>
      <div class="pure-menu pure-menu-horizontal" style="width: fit-content; padding-bottom: 10px">
        <ul class="pure-menu-list">
          <li class="pure-menu-item"><a @click="select('firstName')" href="#" class="pure-menu-link">First Name</a></li>
          <li class="pure-menu-item"><a @click="select('lastName')" href="#" class="pure-menu-link">Last Name</a></li>
        </ul>
      </div>
      <div style="padding-bottom: 10px;">Search for student by name:</div>
      <div class="search">
        <form class="pure-form">
          <i class="fas fa-search"></i><input v-model="searchText" />
        </form>
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

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 340px;
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
  name: 'Home',
  components: {
    StudentList
  },
    data() {
    return {
      searchText: '',
      sortBy: 'firstName',
    }
  },
  computed: {
    students() {
      return this.$root.$data.students
        .filter(student => (student.firstName + " " + student.lastName).toLowerCase().search(this.searchText.toLowerCase()) >= 0)
        .sort((a, b) => (a[this.sortBy] > b[this.sortBy]) ? 1 : -1);
    }
  },
  methods: {
    select(sortBy) {
      this.sortBy = sortBy;
    }
  }
}
</script>
