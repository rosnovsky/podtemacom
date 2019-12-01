<script>
export let posts;
console.log(posts)

</script>

<ul>
{#each posts as post}
    <li>{post.title}</li>
{/each}
</ul>
