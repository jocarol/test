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
                <NuxtLink to="logout" class="nav-link">Déconnection</NuxtLink>
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
  mounted() {
    this.$nuxt.$on("auth", (auth) => {
      this.auth = auth;
      console.log(this.auth)
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
