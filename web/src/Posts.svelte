<script context="module">
    import { gql } from 'apollo-boost';
    import { client, GET_POSTS } from './queries';
    export async function preload() {
        return {
        cache: await client.query({ query: GET_POSTS })
        };
    }
</script>

<script>
    import { getClient, query } from 'svelte-apollo'; 
    import Post from './Post.svelte'


    // 3. Execute the GET_BOOKS graphql query using the Apollo client
    //    -> Returns a svelte store of promises that resolve as values come in
    const posts = query(client, { query: GET_POSTS });

</script>

<h3>Posts!</h3>
{#await $posts}
    <li>Loading...</li>
    {:then result}
        <Post posts={result.data.allPosts} />
    {:catch error}
        <li>Error loading books: {error}</li>
    {/await}
