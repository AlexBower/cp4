<template>
<div class="wrapper">
  <div class="students">
    <div class="student" v-for="student in students" :key="student.id">
      <div class="info">
        <h1>{{student.firstName}} {{student.lastName}}</h1>
        <p>{{student.gender}}</p>
        <p>{{student.species}}</p>
        <div class="gpa">
        <h2>GPA: {{student.gpa}}</h2>
        </div>
      </div>
      <div class="image">
        <img :src="'/images/animals/'+student.image">
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.students {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.student {
  margin: 10px;
  margin-top: 50px;
  width: 250px;
}

.student img {
  border: 2px solid #333;
  height: 250px;
  width: 250px;
  object-fit: cover;
}

.student .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: #05af98;
  color: #000;
  padding: 10px 30px;
  height: 120px;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  margin-bottom: 5px;
  font-size: 10px;
}


.gpa {
  display: flex;
}

.auto {
  margin-left: auto;
}
</style>

<script>
export default {
  name: 'StudentList',
  props: {
    students: Array
  }
}
</script>