import Home from '../views/home/Home'

const getProps = (route, routeName) => {
  return {
    _routeName: routeName,
    ...route.params
  }
}

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: (route) => {
      return getProps(route, 'Home')
    },
    meta: {
      breadName: (data) => `首页`,
      breadIcon: 'home'
    }
  },
  {
    path: '/home',
    name: 'Home2',
    redirect: {
      name: 'Home'
    }
  },
  {
    path: '/welcome',
    name: 'Welcome',
    redirect: {
      name: 'Home'
    }
  }
]
