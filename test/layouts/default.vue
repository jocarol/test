<template>
  <div>
    <header>
      <b-navbar toggleable="sm" type="light" class="navbar">
        <b-navbar-brand>
          <NuxtLink to="/">
            <img
              class="logo"
              src="https://i.imgur.com/YBA96aZ.png"
              alt="logo"
            />
          </NuxtLink>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="!auth">login</b-nav-item>
            <b-nav-item-dropdown right v-if="auth">
              <!-- Using 'button-content' slot -->
              <template #button-content>{{user.name}}</template>
              <b-dropdown-item>
                <NuxtLink to="profile" class="nav-link">Mon profile</NuxtLink>
              </b-dropdown-item>
              <b-dropdown-item>
                <a class="nav-link" @click="logout">Déconnection</a>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      auth: false,
      user: {},
    };
  },
  methods: {
    async logout() {
        await fetch("http://localhost:8000/api/logout", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      await this.$router.push('/login')
      this.auth = false
    }
  },
  mounted() {
    this.$nuxt.$on("auth", (auth) => {
      this.auth = auth;
    });
    this.$nuxt.$on("user", (user) => {
      this.user = user
    });
  },
};
</script>

<style>
.logo {
  width: 10rem;
}
header {
  margin-bottom: 3rem;
}

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

.profile{

}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
