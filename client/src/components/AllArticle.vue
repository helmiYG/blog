<template>

    <div class="container-fluid">
        <div class="row">
            <div v-for="(article, i) in articles" v-bind:key="i" style="margin-left: 55px">
                <div class="card" style="width: 18rem;" >
                    <img class="card-img-top" v-bind:src="article.image" alt="Card image cap" >
                    <div class="card-body">
                        <h5 class="card-title"> {{article.title}} </h5>
                        <p class="card-text"> {{article.category}} </p>
                        <router-link :to="`/stories/${article._id}`"><button class="btn btn-success">Read more..</button></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
    data(){
        return {
            articles: '',
        }
    },
  methods: {
      
  },
  moment(date) {
           return moment(date);
    },
   mounted() {
    axios.get('http://engahblog-api.helmiyogantara.club/artikel')
        .then((result) => {
        this.articles = result.data.result
        
        })
        .catch((err) => {
        console.log(err);
        
        });
  },
};
</script>

<style>
</style>
