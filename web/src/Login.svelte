<script>
import {isAuthenticated} from './store'

const login = async () => {
    isAuthenticated.set(true)
    localStorage.setItem('isAuthenticated', true)
    console.log($isAuthenticated)
};

const logout = async () => {
    isAuthenticated.set(false)
    localStorage.setItem('isAuthenticated', false)
    console.log($isAuthenticated)
};
</script>

{#if $isAuthenticated}
<button on:click={logout}>Logout
</button>
{:else}
<button on:click={login}>Login
</button>
{/if}
