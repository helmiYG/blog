<template>
    <div class="container">
        <div class="row" style="background-color : #f1f2f3; padding: 30px">
            <div class="col-md-4" >
                    <div style="padding-right: 5px">
                        <img v-bind:src="article.image" alt="article image" style="height : 300px; width:300px">  
                    </div>
            </div>
            <div class="col-md-8">
                    <div>
                        <h1> {{article.title}} </h1> 
                        <p> {{article.content}} </p>
                        <hr>                                                                                                                                                                                                                                                                                                  
                        author {{article.userId.name}}, <br>
                        {{ moment(article.createdAt).format("dddd, MMMM Do YYYY, h:mm") }}
                        <br><br>
                    </div>
            </div>
        </div>
        <br>
        <div v-if="article.comments.length > 0">
          <h3>All Comment</h3>
          <div class="row">
            <div class="col-md-12"  v-for="(comment, i) in article.comments" v-bind:key="i">
                      <div class="card">
                        <div class="card-header">
                        {{ moment(comment.Date).format("dddd, MMMM Do YYYY, h:mm") }} 
                        </div>
                        <div class="card-body">
                          <h5 class="card-title"> {{comment.comment}} </h5>
                          <p class="card-text"> {{comment.commenterName}} </p>
                          <a class="btn btn-danger" @click="deleteComment(comment._id)" v-if="comment.commenterName == userLogin || article.userId.name == userLogin">Delete</a>
                        </div>
                      </div>
            </div>
          </div>
        </div>
          <div v-else>
            <h3>No Comments Available</h3>
          </div>
           <div style="margin-top : 10px" v-if="token">
              <label> Input Comment </label><br>
              <input type="text" style="height : 40px; width : 900px" v-model="content">
              <button type="submit" class="btn btn-success" @click="addComment" >  Comment </button>
          </div>
    </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import moment from 'moment'
export default {
  data() {
    return {
      article: "",
      idArticle : '',
      token : '',
      content : '',
      userLogin : '',
    };
  },

  methods: {
    addComment(){
      let idArticle = this.idArticle
      axios({
            method: 'PUT',
            url: `http://localhost:3000/artikel/comments/${idArticle}`,
            headers: {
                token : this.token
            }, 
            data: {
              content : this.content
            }
      })
      .then(() => {
        this.$router.go()
      }).catch((err) => {
        console.log(err);
        
      });
    },
    getArticle(){
      
       this.idArticle = this.$router.history.current.params.id;
    axios
      .get(`http://localhost:3000/artikel/detailArticle/${this.idArticle}`)
      .then(result => {
        this.article = result.data;
      })
      .catch(err => {
        console.log(err);
      });
    },
    deleteComment(idComment){
      axios({
        method: "PUT",
        url: `http://localhost:3000/artikel/comments/${this.idArticle}/delete`,
        headers: {
            token: this.token
        },
        data: {
          idComment: idComment
        }, 

      })
      .then(() => {
         
      }).catch((err) => {
        console.log(err);
        
      });
    },
    getUserLogin(){
     axios({
      method: 'GET',
      url: `http://localhost:3000/users`,
      headers: {
          token : this.token
      },  
     })
     .then((result) => {
       this.userLogin = result.data.userLogin
       
     }).catch((err) => {
       console.log(err);
       
     });
    
    },
    moment(date) {
           return moment(date);
       },
  },
  mounted() {
    this.token = localStorage.getItem('token')
    this.getArticle()
    this.getUserLogin()

  },
  watch: {
     article: function(){
            this.getArticle()
        }
  }
};
</script>

<style>
</style>
