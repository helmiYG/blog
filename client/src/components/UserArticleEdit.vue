<template>

      <div>
        <hr>
        <div class="add-Story">
            <div class="story-title">
                <h2>Share your stories</h2>
            </div>
            <div>
                      <table class="table">
                    <tr>
                        <th>Title</th>
                        <td><input type="text" name="title" id="title" v-model="article.title"></td>
                    </tr>
                     <tr>
                        <th>Category</th>
                        <td><input type="text" name="category" id="category" v-model="article.category"></td>
                    </tr>
                     <tr>
                        <th>Content</th>
                        <td> <textarea name="content" id="content" cols="100" rows="10" v-model="article.content"></textarea> </td>
                    </tr>
                    <button type="submit" class="btn btn-success" @click="update" >Submit</button>
                </table>
                
              
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2';
export default {
    data(){
        return {
            article : {}
        }
    },
    methods: {
        update(){
            let token = localStorage.getItem('token')
            axios({
                method: 'PUT',
                url : `http://localhost:3000/artikel/${this.article._id}`,
                headers : {
                    token : token
                }, 
                data: {
                    title : this.article.title,
                    category: this.article.category,
                    content: this.article.content
                }
            })
            .then(() => {
                 swal("Good job!", "artcle updated", "success");
                 this.$router.push('/myStory')
            }).catch((err) => {
                console.log(err);
                
            });

        }
    },
    mounted() {
        let token = localStorage.getItem('token')
        if (!token) {
            this.$router.push('/login')
        }
        let id = this.$router.history.current.params.id
         axios.get(`http://localhost:3000/artikel/detailArticle/${id}`)
         .then((result) => {
             this.article = result.data
         })
         .catch((err) => {
             console.log(err);
             
         });
    },
}
</script>

<style>

</style>
