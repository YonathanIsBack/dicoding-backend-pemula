import BookService from "../service/BookService.js";
import FailedUpdateBookError from "../error/FailedUpdateBookError.js";

class MainController {
    bookService;

    constructor(props) {
        this.bookService = new BookService();
    }

    saveBook(request) {
        const {name, year, author, summary, publisher, pageCount, readPage, reading} = request;
        const book = {name, year, author, summary, publisher, pageCount, readPage, reading}
        this.handleSaveValidation(book);

        return this.bookService.save(book);
    }

    handleSaveValidation(book) {
        if(book.name === '' || book.name === undefined) {
            throw new Error("Gagal menambahkan buku. Mohon isi nama buku");
        }

        if(book.readPage > book.pageCount) {
            throw new Error("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount");
        }
    }

    fetchAllBooks(query) {
        const books = this.bookService.findAll(query);

        return books.map(book => {
            const {id, name, publisher} = book;
            return {id, name, publisher};
        });
    }

    fetchBookById(id) {
        return this.bookService.findBookById(id);
    }

    updateBook(payload, bookId) {
        this.handleUpdateValidation(payload);
        this.bookService.updateBookById(payload, bookId);
    }

    handleUpdateValidation(book) {
        if(book.name === '' || book.name === undefined) {
            throw new FailedUpdateBookError("Gagal memperbarui buku. Mohon isi nama buku");
        }

        if(book.readPage > book.pageCount) {
            throw new FailedUpdateBookError("Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount");
        }
    }

    deleteBook(bookId) {
        this.bookService.deleteBookById(bookId);
    }
}

export default MainController;