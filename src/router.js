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

const AllProjectsPage = () => import('@/pages/AllProjectsPage.vue');
const CreateProjectPage = () => import('@/pages/CreateProjectPage.vue');
const ProjectPage = () => import('@/pages/ProjectPage.vue');
const BoardPage = () => import('@/pages/BoardPage.vue');
const BoardsPage = () => import('@/pages/BoardsPage.vue');


const AddPersonForm = () => import('@/components/people/AddPersonForm.vue');
const PersonsList = () => import('@/components/people/PersonsList.vue');


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/boards/all',
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
      component: TasksList
    },
    {
      path: '/tasks',
      children: [
        {
          path: ':id',
          props: true,
          component: TaskDetail,
        },
        {
          path: 'new',
          name: 'newTask',
          component: NewTask
        }
      ]
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
        }
      ]
    },
    {
      path: '/profile/:id',
      props: true,
      component: Person,
    },

    {
      path: '/projects',
      children: [
        {
          path: 'all',
          name: 'all-projects',
          component: AllProjectsPage
        },
        {
          path: 'new',
          component: CreateProjectPage,
        },
        {
          path: ':id',
          props: true,
          component: ProjectPage,
        }
      ]
    },
    {
      path: '/boards',
      name: 'boards',
      children: [
        {
          path: 'new',
          name: 'newBoard',
          props: true,
          component: NewBoardPage
        },
        {
          path: ':id',
          name: 'boardDetails',
          props: true,
          component: BoardPage
        },
        {
          path: 'all',
          name: 'allBoards',
          component: BoardsPage
        }
      ]
    },

    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters['users/isAuthenticated']) {
    next('/login');
  } else {
    next();
  }
});

export default router;