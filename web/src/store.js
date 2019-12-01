import { writable } from 'svelte/store';

console.log(localStorage.getItem('isAuthenticated'))

export const isAuthenticated = writable(localStorage.getItem('isAuthenticated') === 'true');
