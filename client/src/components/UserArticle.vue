<template>
<div>
    <p>
        <a class="btn btn-success" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            Add Article
        </a>
    </p>
        <div class="collapse" id="collapseExample">
        <div class="card card-body">
                <AddArticle/>
             </div>
        </div>
    
    <div class="container-fluid">
        <div class="row">
            <div v-for="(article, i) in userArticle" v-bind:key="i" style="margin-left: 55px">
                <div class="card" style="width: 18rem;" >
                    <img class="card-img-top" v-bind:src="article.image" alt="Card image cap" >
                    <div class="card-body">
                        <h5 class="card-title"> {{article.title}} </h5>
                        <p class="card-text"> {{article.category}} </p>
                        <router-link :to="`/myStory/${article._id}`"><button class="btn btn-success">Read more..</button></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import AddArticle from '@/components/AddArticle.vue'
export default {
    data(){
        return{
            userArticle : '',
        }
    },
    methods: {
        getArticles() {
            let token = localStorage.getItem('token')
            axios({
            method: 'GET',
            url : 'http://engahblog-api.helmiyogantara.club/artikel/userArtikel',
            headers : {
                token : token
            }
            })
            .then((result) => {
                
            this.userArticle = result.data.result
            })
            .catch((err) => {
                console.log(err);
                
            });
        }
    },
    components: {
        AddArticle
    },
    mounted() {
        let token = localStorage.getItem('token')
        if (!token) {
            this.$router.push('/login')
        }
        this.getArticles()

    },
    watch: {
        userArticle: function(){
            this.getArticles()
        }
 }
}
</script>

<style>
.blogShort{ border-bottom:1px solid #ddd;}
.add{background: #333; padding: 10%; height: 300px;}

.nav-sidebar { 
    width: 100%;
    padding: 8px 0; 
    border-right: 1px solid #ddd;
}
.nav-sidebar a {
    color: #333;
    -webkit-transition: all 0.08s linear;
    -moz-transition: all 0.08s linear;
    -o-transition: all 0.08s linear;
    transition: all 0.08s linear;
}
.nav-sidebar .active a { 
    cursor: default;
    background-color: #34ca78; 
    color: #fff; 
}
.nav-sidebar .active a:hover {
    background-color: #37D980;   
}
.nav-sidebar .text-overflow a,
.nav-sidebar .text-overflow .media-body {
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis; 
}

.btn-blog {
    color: #ffffff;
    background-color: #37d980;
    border-color: #37d980;
    border-radius:0;
    margin-bottom:10px
}
.btn-blog:hover,
.btn-blog:focus,
.btn-blog:active,
.btn-blog.active,
.open .dropdown-toggle.btn-blog {
    color: white;
    background-color:#34ca78;
    border-color: #34ca78;
}
article h2{color:#333333;}
h2{color:#34ca78;}
 .margin10{margin-bottom:10px; margin-right:10px;}
</style>
