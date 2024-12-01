import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/pages/HomePage.vue');
const NotFound = () => import('@/pages/NotFound.vue');
const TasksList = () => import('@/pages/AllTasksPage.vue');
const TaskDetail = () => import('@/pages/TaskPage.vue');
const NewTask = () => import('@/pages/NewTaskPage.vue');
const Employees = () => import('@/pages/PeoplesPage.vue');
const Person = () => import('@/pages/PersonPage.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
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
    },
    {
      path: '/people/:id',
      props: true,
      component: Person,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
});

export default router;