import { createRouter, createWebHistory, onBeforeRouteUpdate } from 'vue-router';
import store from '@/store/index.js';

const Home = () => import('@/pages/HomePage.vue');
const NotFound = () => import('@/pages/NotFound.vue');
const TasksList = () => import('@/pages/AllTasksPage.vue');
const TaskDetail = () => import('@/pages/TaskPage.vue');
const NewTask = () => import('@/pages/NewTaskPage.vue');
const Employees = () => import('@/pages/PeoplePage.vue');
const Person = () => import('@/pages/PersonPage.vue');
const CreatePage = () => import('@/pages/CreatePage.vue');
const NewBoardPage = () => import('@/pages/NewBoardPage.vue');
const LoginPage = () => import('@/pages/LoginPage.vue');
const CreateProjectPage = () => import('@/pages/CreateProjectPage.vue');
const BoardPage = () => import('@/pages/BoardPage.vue');


const AddPersonForm = () => import('@/components/people/AddPersonForm.vue');
const PersonsList = () => import('@/components/people/PersonsList.vue');


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'board/test_board',
      // component: Home,
      component: BoardPage,
    },
    {
      path: '/create',
      component: CreatePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/tasks',
      component: TasksList,
    },
    {
      path: '/tasks/:id',
      props: true,
      component: TaskDetail,
    },
    {
      path: '/tasks/new',
      component: NewTask
    },
    {
      path: '/people',
      component: Employees,
      redirect: '/people/all', // Redirect to the default tab
      children: [
        {
          path: 'registration',
          name: 'registration',
          component: AddPersonForm,
        },
        {
          path: 'all',
          name: 'all',
          component: PersonsList,
        },
      ]
    },
    {
      path: '/people/:id',
      props: true,
      component: Person,
    },
    {
      path: '/project',
      children: [
        {
          path: '/project/new',
          component: CreateProjectPage,
        },
        {
          path: '/project/:id',
          props: true,
          component: CreateProjectPage,
        }
      ]
    },
    {
      path: '/board/new',
      component: NewBoardPage
    },
    {
      path: '/board/:id',
      props: true,
      component: BoardPage
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
});

// router.beforeEach(function (to, from, next) {
//   if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;