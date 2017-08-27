import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  boards : any = {};
  title : string;
  content : string;
  id : any;

  constructor(private boardsService : BoardsService) { }

  ngOnInit() {
    this.boards = this.boardsService.getAllBoards().subscribe(boards => {
      this.boards = boards;
    });
  }

  addBoard(event){
    event.preventDefault();
    const newBoard = {
        title: this.title,
        content: this.content
    };

    this.boardsService.addBoard(newBoard)
        .subscribe(board => {
            this.boards.push(board);
            this.title = '';
            this.content = '';
        });
  }

  deleteBoard(id){
    const boards = this.boards;

    if (!confirm('삭제 하시겠습니까?')) {
      return;
    }

    this.boardsService.deleteBoard(id).subscribe(data => {
        if (data.n === 1) {
            for (let i = 0; i < boards.length; i++) {
                if ( boards[i]._id === id) {
                  boards.splice(i, 1);
                }
            }
        }
    });
  }

  updateBoard(){
      const _board = {
          _id : this.id,
          title : this.title,
          content : this.content
      };

      this.boardsService.updateBoard(_board).subscribe(data => {
        this.boards[data._id] = data;
        this.id = '';
        this.title = '';
        this.content = '';
  });
  }

  update(id) {

    for (const board of this.boards) {
      if (board._id === id) {
        this.id = board._id;
        this.title = board.title;
        this.content = board.content;
      }
    }
  }

  reset() {
    this.id = '';
    this.title = '';
    this.content = '';
  }
}
