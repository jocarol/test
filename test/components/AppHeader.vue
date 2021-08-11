<template>
  <header>
    <b-navbar toggleable="sm" type="light" class="navbar">
      <b-navbar-brand>
        <NuxtLink to="/">
          <img class="logo" src="https://i.imgur.com/YBA96aZ.png" alt="logo" />
        </NuxtLink>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav> -->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="auth">
            <!-- Using 'button-content' slot -->
            <template #button-content>Nom d'utilisateur</template>
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
</template>

<script>
export default {
  name: "appHeader",
  data() {
    return {
      auth: false,
    };
  },
  mounted() {
    this.$nuxt.$on("auth", (auth) => {
      console.log(auth)
      this.auth = auth;
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
</style>