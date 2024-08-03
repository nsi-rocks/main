export default defineNuxtRouteMiddleware((to) => {
    if(Object.keys(to.query).includes("print")) {
      setPageLayout('print');
    }
    else
      setPageLayout('print');
    return;
  })
  