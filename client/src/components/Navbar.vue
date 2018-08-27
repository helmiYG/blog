<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand">Engah Blog</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link dec">
          <router-link  class="dec" to="/">Homepage</router-link> <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
           <router-link to="/stories">Stories</router-link>
        </a>
      </li>
      <li class="nav-item" v-if="token">
        <a class="nav-link">
            <router-link to="/myStory">My Story</router-link>
        </a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0" v-if="!token">
        <router-link style="text-decoration : none " to="/login"><button class="btn btn-outline-success">Login</button></router-link>
        <button class="btn btn-outline-success"><router-link style="text-decoration : none " to="/register">Regsiter</router-link></button>
      </form>
       <form class="form-inline my-2 my-lg-0" v-else>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="logout" > Logout</button>
      </form>
  </div>
</nav>

</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  export default {
    name: 'navbar',
    data(){
      return {
        token : localStorage.getItem('token')
      }
    },
    methods: {
      logout(){
        localStorage.removeItem('token')
        this.$router.push('/')
      }
    },
    components: {
      Navbar
    },
    mounted() {
      let t = localStorage.getItem('token')
    },
  }
</script>
<style>
  .dec {
    text-decoration-line: none
  }
</style>

