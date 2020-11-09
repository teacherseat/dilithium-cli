import { route } from 'dilithium-js'
import PagesHome from 'views/pages/home'

routes =
  '/': PagesHome
route.prefix = ''
route document.body, '/', routes
