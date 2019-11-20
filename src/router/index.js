import Vue from 'vue';
import Router from 'vue-router';
const DashboardLayout = () =>
  import('../components/dashboardLayout.vue');
const login = () => 
  import('../components/login.vue');

function loadView(view) {
  return () =>
    import(`../components/dashboardContents/${view}.vue`);
}

function isAuthenticated() {
  if (localStorage.getItem('token') == null) {
    return true;
  }
}


const routes = [
  { 
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        name: 'userController',
        path: '/user',
        component: loadView('userController'),
        beforeEnter(to, from, next) {
          if (!isAuthenticated()) {
            next();
          } else {
            next('/');
            alert('Please Login to Continue!');
          }
        }
      },
      {
        name: 'branchController',
        path: '/branch',
        component: loadView('branchController'),
        beforeEnter(to, from, next) {
          if (!isAuthenticated()) {
            next();
          } else {
            next('/');
            alert('Please Login to Continue!');
          }
        }
      },
      {
        name: 'Dashboard',
        path: '/dashboard',
        component: loadView('dashboard'),
        beforeEnter(to, from, next) {
          if (!isAuthenticated()) {
            next();
          } else {
            next('/user');
          }
        }
      }
    ]
  },
  {
    path: '/',
    component: login,
    name: 'login',
       beforeEnter(to, from, next) {
          if (isAuthenticated()) {
            next();
          } else {
            next('/user');
          }
        }
  }
];
Vue.use(Router);
const router = new Router({ mode: 'history', routes: routes });
export default router;
