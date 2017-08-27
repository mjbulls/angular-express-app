// Imports commented out for brevity
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

import { PostsService } from './posts.service';
import { BoardsComponent } from './boards/boards.component';
import { BoardsService } from './boards.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'boards',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path : 'boards',
    component : BoardsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    BoardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [PostsService, BoardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
