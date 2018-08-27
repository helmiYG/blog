<template>
     <div>
         <!-- {{article}} -->
        <div class="row">
            <div class="col-md-4">
                    <div>
                        <img v-bind:src="article.image" alt="article image" style="height : 300px; width:350px">  
                       </div>
            </div>
            <div class="col-md-8">
                    <div>
                        <h1> {{article.title}} </h1> 
                        <p> {{article.content}} </p>
                        <hr>                                                                                                                                                                                                                                                                                                  
                        author {{article.userId.name}}
                         {{ moment(article.createdAt).format("dddd, MMMM Do YYYY, h:mm") }} 
                        <br><br>
                        <router-link :to="`/myStory/${article._id}/edit`">
                        <button class="btn btn-success btn-xs">EDIT</button></router-link>  || 
                        <button class="btn btn-danger btn-xs" @click="deleteArticle(article._id)">DELETE</button>
                    </div>
            </div>
            <div>
                
            </div>

        </div>
        <br>
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
                        <a class="btn btn-danger" @click="deleteComment(comment._id)">Delete</a>
                      </div>
                    </div>
          </div>
        </div>
        <div style="margin-top : 10px">
            <label> Input Comment </label><br>
            <input type="text" style="height : 40px; width : 900px" v-model="content">
            <button type="submit" class="btn btn-success" @click="addComment" >  Comment </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
import moment from 'moment'
export default {
    data(){
        return {
            article : '',
            idArticle : '',
            token: '',
            content: ''
        }
    },
     methods: {
          addComment(){
            let idArticle = this.idArticle
            axios({
                    method: 'PUT',
                    url: `http://engahblog-api.helmiyogantara.club/artikel/comments/${idArticle}`,
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
        deleteArticle(id) {
            swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })
            .then(result => {
                if (result.value) {
                    let token = localStorage.getItem('token')
                    axios({
                        method: 'DELETE',
                        url: `http://engahblog-api.helmiyogantara.club/artikel/${id}`,
                        headers: {
                            token: token
                        }
                    })
                    .then(result => {
                        swal("Deleted!", "Your file has been deleted.", "success");
                        this.$router.push('/myStory')
                    })
                    .catch(err => {
                    console.log(err);
                    });
                }
            });
        },
        deleteComment(idComment){
            axios({
                method: "PUT",
                url: `http://engahblog-api.helmiyogantara.club/artikel/comments/${this.idArticle}/delete`,
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
        getOneArticle(){
            this.idArticle = this.$router.history.current.params.id
            axios.get(`http://engahblog-api.helmiyogantara.club/artikel/detailArticle/${this.idArticle}`)
            .then((result) => {
                this.article = result.data
            })
            .catch((err) => {
                console.log(err);
                
            });
        },
         moment(date) {
           return moment(date);
       },
               
    },
    mounted() {
        this.token = localStorage.getItem('token')
        if (!this.token) {
            this.$router.push('/login')
        }
        this.getOneArticle()
    },
    watch: {
        getOneArticleW: function(){
            this.getOneArticle()
        }
    }
}
</script>

<style>

</style>
