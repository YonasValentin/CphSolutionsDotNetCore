import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: () => {
      return { path: '/projects' }
    },    
  },
  {
    path: "/dashboard",
    name: "dashboardPage",
    component: () => import("@/pages/DashboardPage.vue"),
  },
    {
    path: "/projects",
    name: "projectsPage",
    component: () => import("@/pages/ProjectsPage.vue"),
  },
  {
    path: "/project/:id",
    name: "projectPage",    
    component: () => import("@/pages/ProjectPage.vue"),
  }, 
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
