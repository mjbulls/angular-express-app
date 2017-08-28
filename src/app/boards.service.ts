import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BoardsService {

  constructor(private http: Http) { }

  getAllBoards() {
    return this.http.get('/api/boards')
    .map(res => res.json());
  }

  addBoard(board) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/board', JSON.stringify(board), { headers : headers })
    .map(res => res.json());
  }

  deleteBoard(id) {
    return this.http.delete('/api/board/' + id)
    .map(res => res.json());
  }

  updateBoard(board) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/board/' + board._id, JSON.stringify(board), { headers : headers })
    .map(res => res.json());
  }
}
