import * as m from 'mithril'
import PagesHome from 'views/pages/home'

routes =
  '/': PagesHome
m.route.prefix = ''
m.route document.body, '/', routes
