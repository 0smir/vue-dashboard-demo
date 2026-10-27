import { createRouter, createWebHistory, onBeforeRouteUpdate } from "vue-router";
import store from "@/store/index.js";

const Home = () => import("@/pages/HomePage.vue");
const NotFound = () => import("@/pages/NotFound.vue");
const TasksList = () => import("@/pages/AllTasksPage.vue");
const TaskDetail = () => import("@/pages/TaskPage.vue");
const NewTask = () => import("@/pages/NewTaskPage.vue");
const Employees = () => import("@/pages/PeoplePage.vue");
const Person = () => import("@/pages/PersonPage.vue");
const CreatePage = () => import("@/pages/CreatePage.vue");
const NewBoardPage = () => import("@/pages/NewBoardPage.vue");
const LoginPage = () => import("@/pages/LoginPage.vue");

const AllProjectsPage = () => import("@/pages/AllProjectsPage.vue");
const CreateProjectPage = () => import("@/pages/CreateProjectPage.vue");
const ProjectPage = () => import("@/pages/ProjectPage.vue");
const BoardPage = () => import("@/pages/BoardPage.vue");
const BoardsPage = () => import("@/pages/BoardsPage.vue");
const StatisticsPage = () => import("@/pages/StatisticsPage.vue");

const AddPersonForm = () => import("@/components/people/AddPersonForm.vue");

const router = createRouter({
  history: createWebHistory("/global-board/"),
  routes: [
    {
      path: "/:lang?",
      redirect: "/boards/all",
      // component: Home,
      component: BoardPage,
    },
    {
      path: "/create",
      component: CreatePage,
      meta: {
        requiresAuth: true,
        breadcrumb: {
          label: "pages.create.page_title"
        }
      },
     
    },
    {
      path: "/registration",
      name: "registration",
      component: AddPersonForm,
      meta: {
        breadcrumb: {
          label: "common.registration"
        }
      },
    },
    {
      path: "/login",
      component: LoginPage,
      meta: {
        breadcrumb: {
          label: "common.header.navigation.login_link"
        }
      },
    },
    {
      path: "/tasks",
      meta: {
        breadcrumb: {
          label: "common.sidebar.tasks_link"
        }
      },
      children: [
        {
          path: "",        
          name: "tasks",
          component: TasksList,
        },
        {
          path: ":id",
          props: true,
          component: TaskDetail,
          meta: {
            breadcrumb: {
              label: (route) => route.params.id
            }
          },
        },
        {
          path: "new",
          name: "newTask",
          component: NewTask,
          meta: {
            breadcrumb: {
              label: "pages.tasks.create_page_title"
            }
          },
        },
      ],
    },
    {
      path: "/people",
      component: Employees,
      name: "people",
      meta: {
        breadcrumb: {
          label: "pages.people.all_people"
        }
      }
    },
    {
      path: "/profile/:id",
      name: "profile",
      props: true,
      component: Person,
      meta: {
        breadcrumb: {
          label: "pages.profile.page_title"
        }
      },
    },

    {
      path: "/projects",
      meta: {
        breadcrumb: {
          label: "pages.projects.page_title"
        }
      },
      children: [
        {
          path: "all",
          name: "all-projects",
          component: AllProjectsPage,
          meta: {
            breadcrumb: {
              label: "all"
            }
          }
        },
        {
          path: "new",
          component: CreateProjectPage,
          meta: {
            breadcrumb: {
              label: "new"
            }
          }
        },
        {
          path: ":id",
          props: true,
          component: ProjectPage,
          meta: {
            breadcrumb: {
              label: (route) => route.params.id
            }
          }
        },
      ],
    },
    {
      path: "/boards",
      name: "boards",
      redirect: "/boards/all",
      meta: {
        breadcrumb: {
          label: "pages.boards.page_title"
        }
      },
      children: [
        {
          path: "all",
          name: "allBoards",
          component: BoardsPage,
        },
        {
          path: "new",
          name: "newBoard",
          props: true,
          component: NewBoardPage,
          meta: {
            breadcrumb: {
              label: "new"
            }
          }
        },
        {
          path: ":id",
          name: "boardDetails",
          props: true,
          component: BoardPage,
          meta: {
            breadcrumb: {
              label: (route) => route.params.id
            }
          }
        }
      ],
    },
    {
      path: "/statistic",
      name: "statistic",
      component: StatisticsPage,
      meta: {
        breadcrumb: {
          label: "common.sidebar.statistic_link"
        }
      },
    },

    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters["users/isAuthenticated"]) {
    next("/login");
  } else {
    next();
  }
});

export default router;
