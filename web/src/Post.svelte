<script>
export let posts;

</script>

<ul>
{#each posts as post}
    <li>{post.title}</li>
{/each}
</ul>
