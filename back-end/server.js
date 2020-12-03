const express = require('express');
const bodyParser = require("body-parser");

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/animal-school', {
  useNewUrlParser: true
});

// Create a scheme for Students
const studentSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  species: String,
  gender: String,
  gpa: Number,
  path: String,
});

// Create a model for Students.
const Student = mongoose.model('Student', studentSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a student
app.post('/api/students', async (req, res) => {
  const student = new Student({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    species: req.body.species,
    gender: req.body.gender,
    gpa: req.body.gpa,
    path: req.body.path,
  });
  try {
    await student.save();
    res.send(student);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the students.
app.get('/api/students', async (req, res) => {
  try {
    let students = await Student.find();
    res.send(students);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    let student = await Student.findOne({
      _id: req.params.id
    });
    student.title = req.body.title;
    student.firstname = req.body.firstname,
    student.lastname = req.body.lastname,
    student.species = req.body.species,
    student.gender = req.body.gender,
    student.gpa = req.body.gpa,
    await student.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));