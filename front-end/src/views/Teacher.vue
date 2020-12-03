<template>
<div class="teacher">
  <h1>Teachers only!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add a student</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="firstname" placeholder="Firstname">
        <p></p>
        <input v-model="lastname" placeholder="Lastname">
        <p></p>
        <input v-model="species" placeholder="Species">
        <p></p>
        <input v-model="gender" placeholder="Gender">
        <p></p>
        <input v-model.number="gpa" type="number" step=".01">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addStudent">
        <h2>{{addStudent.firstname}}</h2>
        <h2>{{addStudent.lastname}}</h2>
        <h2>{{addStudent.species}}</h2>
        <h2>{{addStudent.gender}}</h2>
        <h2>{{addStudent.gpa}}</h2>
        <img :src="addStudent.path" />
      </div>
    </div>
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Remove a Student</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findName" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectStudent(s)">
            {{s.firstname}} {{s.lastname}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findStudent">
        <input v-model="findStudent.firstname" placeholder="Firstname">
        <p></p>
        <input v-model="findStudent.lastname" placeholder="Lastname">
        <p></p>
        <input v-model="findStudent.species" placeholder="Species">
        <p></p>
        <input v-model="findStudent.gender" placeholder="Gender">
        <p></p>
        <input v-model.number="findStudent.gpa" type="number" step=".01">
        <p></p>
        <img :src="findStudent.path" />
      </div>
      <div class="actions" v-if="findStudent">
        <button @click="deleteStudent(findStudent)">Delete</button>
        <button @click="editStudent(findStudent)">Edit</button>
      </div>
    </div>
</div>
</template>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Teacher',
  data() {
    return {
      firstname: "",
      lastname: "",
      species: "",
      gender: "",
      gpa: 4,
      file: null,
      addStudent: null,
      findName: "",
      findStudent: null,
    }
  },
  computed: {
    suggestions() {
      return this.$root.$data.students
        .filter(student => (student.firstname + " " + student.lastname).toLowerCase().search(this.findName.toLowerCase()) >= 0)
        .sort((a, b) => (a[this.sortBy] > b[this.sortBy]) ? 1 : -1);
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/students', {
          firstname: this.firstname,
          lastname: this.lastname,
          species: this.species,
          gender: this.gender,
          gpa: this.gpa,
          path: r1.data.path
        });
        this.addStudent = r2.data;
        this.$root.getStudents();
      } catch (error) {
        console.log(error);
      }
    },
    selectStudent(student) {
      this.findName = "";
      this.findStudent = student;
    },
    async deleteStudent(student) {
      try {
        await axios.delete("/api/students/" + student._id);
        this.findStudent = null;
        this.$root.getStudents();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editStudent(student) {
      try {
        await axios.put("/api/students/" + student._id, {
          firstname: this.findStudent.firstname,
          lastname: this.findStudent.lastname,
          species: this.findStudent.species,
          gender: this.findStudent.gender,
          gpa: this.findStudent.gpa,
        });
        this.findStudent = null;
        this.$root.getStudents();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

