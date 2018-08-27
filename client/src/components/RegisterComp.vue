<template>
    <div class="container">
        <h2>Register</h2>
        <form>
            <div class="form-group">
                <label for="name">Name</label><br>
                <input type="text" class="form-control" placeholder="Input Your Name" name="name" id="name" v-model="name">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
            </div>
            <button type="submit" class="btn btn-success" @click.prevent="register" >Submit</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:3000/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => {
          swal({
            position: "top",
            type: "success",
            title: "Yeay, you have regsitered",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push('/login')
        })
        .catch(() => {
          swal({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "<a href>Why do I have this issue?</a>"
          });
        });
    }
  }
};
</script>

<style>

</style>
