<script>
    // import { setClient, getClient, query } from 'svelte-apollo';
    import Post from './Post.svelte'

    const posts = [{title: "Post 1"}, {title: "post 2"}, {title: "post 3"} ]
</script>

<h3>Posts</h3>
<Post posts={posts} />
