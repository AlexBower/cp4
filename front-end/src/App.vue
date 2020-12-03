<template>
<div id="app">
  <div id="menu">
    <div id="title">
      <H1>Animal Class</H1>
    </div>
    <div id="nav">
      <div class="menu-item">
        <router-link to="/">
          <button>Name</button>
        </router-link>
      </div>
      <div class="menu-buffer"></div>
      <div class="menu-item">
        <router-link to="/gpa">
          <button>GPA</button>
        </router-link>
      </div>
      <div class="menu-buffer"></div>
      <div class="menu-item">
        <router-link to="/species">
          <button>Species</button>
        </router-link>
      </div>
      <div class="menu-buffer"></div>
      <div class="menu-item">
        <router-link to="/teacher">
          <button>Teacher</button>
        </router-link>
      </div>
    </div>
  </div>
  <router-view />
  <footer>
    <a href="https://github.com/AlexBower/cp4" target="_blank">
    Link to Github Repository
    </a>
  </footer>

</div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 50px 100px;
}

#menu {
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

#title {
  display: flex;
  justify-content: center;
}

#nav {
  display: flex;
  justify-content: center;
}

.menu-item button {
  padding: 5px 10px;
  background-color: #8dc090;
  border-radius: 3px;
  border: solid black;
}

.menu-buffer {
  margin-left: 15px;
  margin-right: 15px;
}

#menu a {
  font-size: 25px;
  color: black;
  text-decoration: none;
}

footer {
  padding-top: 50px;
  width: 100%;
  display: flex;
}

footer a {
  text-align: center;
  width: inherit;
}
</style>
