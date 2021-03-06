import {RouterModule, PreloadAllModules} from "@angular/router";
import {NotFoundComponent} from "./shared-components/not-found/not-found.component";
import {PreloadSelectedModuledsList} from "./shared/preload-router-list";

const indexRoute = {path: '', redirectTo: 'home', pathMatch: 'full'};
const fallbackRoute = {path: '**', component: NotFoundComponent};
const routes = [
  {path: 'legacy-url', redirectTo: '/home', pathMatch: 'prefix'},
  {path: 'home', loadChildren: 'app/home/home.module', name: 'Home'},
  {path: 'heros', loadChildren: 'app/heros/heros.module', name: 'Heros', data: {preload: true}},
  {path: 'contact', loadChildren: 'app/contact/contact.module', name: 'Contact', data: {preload: true}},
  {path: 'message', loadChildren: 'app/message/message.module', name: 'Message'},
  {path: 'playground', loadChildren: 'app/playground/playground.module', name: 'Playground'},
  {path: 'realtime', loadChildren: 'app/realtime/realtime.module', name: 'Realtime'},
  {path: 'wiki-path', loadChildren: 'app/auxroute/auxroute.module', name: 'WikiDetail', outlet: 'wiki'},
  {path: 'courses', loadChildren: 'app/courses/courses.module', name: 'Courses'},
  indexRoute,
  fallbackRoute,
];

export default RouterModule.forRoot(routes, {
  useHash: true,
  preloadingStrategy: PreloadSelectedModuledsList
  //preloadingStrategy: PreloadAllModules
});
