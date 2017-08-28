import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  boards: any = [];
  title: string;
  content: string;
  id: any;

  constructor(private boardsService: BoardsService) { }

  ngOnInit() {
    this.boardsService.getAllBoards().subscribe(boards => {
      this.boards = boards;
    });
  }

  addBoard(event) {
    event.preventDefault();

    if (!confirm('등록 하시겠습니까?')) {
      return;
    }
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

  deleteBoard(id) {
    const boards = this.boards;

    if (!confirm('삭제 하시겠습니까?')) {
      return;
    }

    this.boardsService.deleteBoard(id).subscribe(data => {
        if (data.n === 1) {
          this.boards.splice(this.boards.findIndex((obj => obj._id = id)), 1);
        }
    });
  }

  updateBoard(event) {

    event.preventDefault();

    if (!confirm('수정 하시겠습니까?')) {
      return;
    }

    const _board = {
      _id : this.id,
      title : this.title,
      content : this.content
    };

    this.boardsService.updateBoard(_board).subscribe(data => {

      const itemIndex = this.boards.findIndex((obj => obj._id = this.id));

      this.boards[itemIndex] = data;

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

    return;
  }
}
