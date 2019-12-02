<script>
    import { onMount, beforeUpdate } from 'svelte';
    import {user} from './store'

    import { login, logout, handleAuthentication, isAuthenticated, getProfile } from "./auth"

        getProfile() ? user.set(getProfile()) : handleAuthentication();

    
</script>

{#if $user}
    <button on:click={logout}>Logout
    </button>
    {:else}
    <button on:click={login}>Login
    </button>
{/if}
