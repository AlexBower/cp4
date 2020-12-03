<template>
<div>
  <div class="wrapper">
    <div class="search-area">
      <div style="padding-bottom: 10px;">Search for student by species:</div>
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
  name: 'Species',
  components: {
    StudentList
  },
    data() {
    return {
      searchText: '',
    }
  },
  computed: {
    students() {
      return this.$root.$data.students
        .filter(student => student.species.toLowerCase().search(this.searchText.toLowerCase()) >= 0)
        .sort((a, b) => (a.species > b.species) ? 1 : -1);
    }
  }
}
</script>
