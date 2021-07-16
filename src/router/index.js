import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Shopbag = () => import('../views/shopbag/Shopbag')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import ('../views/detail/Detail')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopbag',
    component: Shopbag
  },
  {
    path: '/profile',
    component: Profile
  },
  { // 详情页的路由
    path: '/detail/:iid', // 动态路由在父路径后加上":var"
    component: Detail
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
