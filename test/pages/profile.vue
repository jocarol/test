<template>
  <div class="container" align="center" v-if="auth">
    <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
      <div class="account-settings">
        <div class="user-profile">
          <div class="user-avatar">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="Maxwell Admin"
            />
          </div>
          <h5 class="user-name">{{ user.name }}</h5>
          <h6 class="user-email">{{ user.email }}</h6>
          <h6 class="user-email">{{ user.phone }}</h6>
        </div>
      </div>

      <main class="form-signin">
        <form @submit.prevent="submit">
          <div class="card h-100">
            <div class="card-body">
              <div class="row gutters">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 class="mb-2 text-primary">Informations</h6>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="fullName">Nom</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="user.name"
                      readonly
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="website">Identifiant</label>
                    <input
                      class="form-control"
                      type="text"
                      :placeholder="user.id"
                      readonly
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="eMail">Email</label>
                    <input
                      v-model="email"
                      type="email"
                      class="form-control"
                      id="eMail"
                      :placeholder="user.email"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="phone">Téléphone</label>
                    <input
                      v-model="phone"
                      type="text"
                      class="form-control"
                      id="phone"
                      :placeholder="user.phone"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="phone">Mot de passe</label>
                    <input
                      v-model="password"
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
              <div class="row gutters">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="text-right">
                    <button
                      type="submit"
                      id="submit"
                      name="submit"
                      class="btn btn-primary"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      user: {},
      auth: false,
      phone: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async submit() {
      try {
        await fetch("http://localhost:8000/api/edit", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: this.email,
            phone: this.phone,
            password: this.password,
          }),
        });
        this.user.email = this.email || this.user.email;
        this.user.phone = this.phone || this.user.phone;
      } catch (error) {
        console.error("Erreur lors de la requête");
      }
    },
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const user = await response.json();
      this.user = user;
      if (user.statusCode === 401) {
        throw new Error("Erreur lors de la requête");
      }
      this.$nuxt.$emit("auth", true);
      this.$nuxt.$emit("user", this.user);
      this.auth = true;
    } catch (error) {
      this.$nuxt.$emit("auth", false);
      this.$router.push("/login");
    }
  },
});
</script>


<style>
.form-signin {
  margin-top: 0rem !important;
}
.account-settings .user-profile {
  margin: 0 0 1rem 0;
  padding-bottom: 1rem;
  text-align: center;
}
.account-settings .user-profile .user-avatar {
  margin: 0 0 1rem 0;
}
.account-settings .user-profile .user-avatar img {
  width: 90px;
  height: 90px;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
}
.account-settings .user-profile h5.user-name {
  margin: 0 0 0.5rem 0;
}
.account-settings .user-profile h6.user-email {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 400;
  color: #9fa8b9;
}
.account-settings .about {
  margin: 2rem 0 0 0;
  text-align: center;
}
.account-settings .about h5 {
  margin: 0 0 15px 0;
  color: #007ae1;
}
.account-settings .about p {
  font-size: 0.825rem;
}
.form-control {
  border: 1px solid #cfd1d8;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  font-size: 0.825rem;
  background: #ffffff;
  color: #2e323c;
}

.card {
  background: #ffffff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: 0;
  margin-bottom: 1rem;
}
</style>