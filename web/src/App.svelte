<script>
	import Posts from './Posts.svelte';
	import Login from './Login.svelte'

	import { user } from './store.js';

	import ApolloClient from 'apollo-boost';  
	import { setClient } from 'svelte-apollo';

	const client = new ApolloClient({ uri: 'https://h3yilaad.api.sanity.io/v1/graphql/production/default' });
	setClient(client);

	
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<h1>Evergreen Exclusive Content</h1>
	{#if $user}
		<h6>Only for {$user.name}!</h6>
		<Posts />
	{/if}
	<Login />
</main>
