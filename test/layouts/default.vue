<template>
  <div>
    <AppHeader />
    <Nuxt />
  </div>
</template>

<style>

body {
  margin: 0;
  color: #2e323c;
  background: #ececec;
  position: relative;
  height: 100%;
}

.header {
  padding-bottom: 5rem;
}

.container {
  padding-top: 5rem;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
