import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import firebase from 'firebase/app';
import 'firebase/database';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks();
  }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data: DataSnapshot) => {
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
        }
      );
  }

  getSingleBook(id: number) {
    return new Promise<Book>(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookE1) => {
        if(bookE1 === book) {
          return true;
        } else {
          return false;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
}
