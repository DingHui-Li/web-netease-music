
const routes = [
  {
    path: '/',
    component: () => import('../layout/index.vue'),
    children: [
      { path: '', redirect:'/find' },
      { path: '/find',component: () => import('pages/find')},
      { path: '/fm', component: () => import('pages/fm') },
      { path: '/song-list',name:'song-list',component: () => import('pages/songList') },
    ]
  }

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '*',
  //   component: () => import('pages/Error404.vue')
  // }
]

export default routes
