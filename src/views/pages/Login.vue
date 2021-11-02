<template>
  <spinner :isLoading="data.isLoading" />
  <div class="login-page">
    <div
      class="card"
      :class="{ slideactive: isslideactive }"
      style="background-image: url('images/components/login/bg.jpg')"
    >
      <div class="left">
        <h3>Belum punya akun?</h3>
        <button type="button" class="register-btn" @click="slideactive">
          Register
        </button>
      </div>
      <div class="right">
        <h3>Sudah pernah register?</h3>
        <button type="button" @click="slideactive" class="login-btn">
          Login
        </button>
      </div>
      <div class="form">
        <div class="login-form" :class="{ formhidden: isslideactive }">
          <h3>Login</h3>
          <div class="form-group">
            <input
              type="text"
              v-model="data.email"
              class="form-control"
              placeholder="Email*"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="data.password"
              class="form-control"
              placeholder="Password*"
            />
          </div>
          <button type="button" @click="getLogin" class="submit-btn">
            Login
          </button>
        </div>

        <div class="register-form" :class="{ formhidden: !isslideactive }">
          <h3>Register</h3>
          <div class="form-group">
            <input type="number" class="form-control" placeholder="NIK*" />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Nama Lengkap*"
            />
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Email*" />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Password*"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Ulangi Password*"
            />
          </div>
          <button type="button" class="submit-btn">Daftar</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import spinner from "../../components/Spinner";

const router = useRouter();
const isslideactive = ref(false);

const slideactive = function () {
  isslideactive.value = !isslideactive.value;
};
const data = reactive({
  email: "",
  password: "",
  isLoading: false,
  url: process.env.VUE_APP_ROOT_API,
});

const getLogin = async () => {
  data.isLoading = true;
  const response = await fetch(process.env.VUE_APP_ROOT_API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  data.isLoading = false;
  if (response.status == 200) {
    localStorage.setItem("authenticated", "true");
    router.push("/");
  } else {
    console.log(response);
  }
};
</script>
