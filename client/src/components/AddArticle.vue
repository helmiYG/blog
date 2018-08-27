<template>
     <div class="mystory">
        <hr>
        <div class="add-Story">
            <div class="story-title">
                <h2>Share your stories</h2>
            </div>
            <div>
                <table class="table">
                    <tr>
                        <th>Title</th>
                        <td><input type="text" name="title" id="title" v-model="title"></td>
                    </tr>
                     <tr>
                        <th>Category</th>
                        <td><input type="text" name="category" id="category" v-model="category"></td>
                    </tr>
                     <tr>
                        <th>Content</th>
                        <td> <textarea name="content" id="content" cols="100" rows="10" v-model="content"></textarea> </td>
                    </tr>
                    <tr>
                        <th>Image</th>
                        <td><input type="file" v-on:change="getImage($event)"></td>
                    </tr>
                    <button type="submit" class="btn btn-success" @click="insertArtikel" >Submit</button>
                   
                </table>
                
              
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
export default {
  data() {
    return {
      title: "",
      category: "",
      content: "",
      image: ""
    };
  },
  methods: {
    getImage(photo) {
      this.image = photo.target.files[0];
    },

    insertArtikel() {
      let formData = new FormData();
      let token = localStorage.getItem("token");

      formData.append("image", this.image);
      axios
        .post("http://localhost:3000/upload", formData)
        .then(result => {
          axios
            .post("http://localhost:3000/artikel", {
              title: this.title,
              category: this.category,
              content: this.content,
              image: result.data.link,
              token: token
            })
            .then(() => {
              swal("Good job!", "artcle inserted", "success");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
