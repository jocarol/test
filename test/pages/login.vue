<template>
<main class="form-signin">
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal mt-50">Login</h1>

    <div class="form-floating">
      <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email</label>
    </div>
    <div class="form-floating">
      <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Se souvenir de moi
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Connection</button>
  </form>
</main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: "login",
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async submit() {
            await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                })
            })
            await this.$router.push("/")
        }
    }
})
</script>

<style>

.form-signin {
    margin-top: 10rem;
}

</style>