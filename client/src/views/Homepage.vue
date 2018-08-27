<template>
    <div class="container">
      <blau/>
      <!-- <CardArtikel :articles="allArtikel"></CardArtikel> -->
    </div>
</template>

<script>
import axios from 'axios'
import blau from '@/components/Blau.vue'
export default {
  data(){
    return{
      allArtikel : []
    }
  },
  name: "homepage",
  components: {
    blau
  }, 
  methods: {
  },
  mounted() {
    axios.get('http://localhost:3000/artikel')
    .then((result) => {
      this.allArtikel = result.data.result
      
    })
    .catch((err) => {
      console.log(err);
      
    });
  },
};
</script>

<style>
</style>
