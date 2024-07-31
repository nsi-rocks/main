export default defineNuxtRouteMiddleware((to, from) => {
    const store = useStore();
    console.log(to.fullPath);
    
    if(to.fullPath.split('/').includes('articlesx')) {
        console.log('X')
        store.field = 'X'
    }
})
