<template>
    <div>
        <h1>Login</h1>
        <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
        </div>
        <button type="submit" class="btn btn-success" @click.prevent="login" >LOGIN</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data(){
    return {
      email : '',
      password: '',
    }
  },
  methods: {
    login(){
      axios.post('http://localhost:3000/login', {
        email : this.email,
        password : this.password
      })
      .then((result) => {
        localStorage.setItem('token', result.data.token)
          swal({
            position: "top",
            type: "success",
            title: "Login Succes",
            timer: 1500
          });
          this.$router.push('/')
          this.$router.go('/')
      })
      .catch((err) => {

          swal({
            type: "error",
            title: "Oops...",
            text: "Username / password wrong",
          });
      });
    }
  }
};
</script>

<style>

</style>
