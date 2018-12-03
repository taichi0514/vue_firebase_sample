import Vue from 'vue';
import VueRouter from 'vue-router';
import Top from "./views/Top";
import Terms from "./views/Terms";
import Editor from "./components/Editor";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "top",
    component: Top
  },
  {
    path: "/terms",
    name: "terms",
    component: Terms
  },
  {
    path: "/editor/:user_id",
    name: "editor",
    component: Editor
  }
];

export default new VueRouter({
  routes: routes
});
