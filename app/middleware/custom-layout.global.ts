export default defineNuxtRouteMiddleware((to, from) => {
    setPageLayout(useRequestURL().hostname.split('.')[0] === 'rgb' ? 'app-layout' : 'default')
})
