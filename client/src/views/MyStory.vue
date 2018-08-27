<template>
<div class="container">
    <h1>My Article</h1>
     <!-- <AddArticle></AddArticle> -->
    <router-view></router-view>
</div>
</template> 
<script>
import AddArticle from '@/components/AddArticle.vue'
   export default{
      components: {
        AddArticle
    },
   }
</script>
<script>
    
</script>


