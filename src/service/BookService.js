import Book from "../model/Book.js";
import BookNotFoundError from "../error/BookNotFoundError.js";

class BookService {
    books;

    constructor(props) {
        this.books = [];
    }

    save(book) {
        const newBook = new Book(book);
        this.books.push(newBook);

        return newBook;
    }

    findAll(query) {
        const {reading, finished, name} = query;

        if(reading !== undefined && reading !== ''){
            return this.books.filter(book => book.reading === Boolean(Number(reading)));
        }if(finished !== undefined && finished !== ''){
            return this.books.filter(book => book.finished === Boolean(Number(finished)));
        }if(name !== undefined && name !== ''){
            return this.books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));
        }

        return this.books;
    }

    findBookById(id) {
        const book = this.books.find(book => book.id === id);
        if(book === undefined) throw new Error('Buku tidak ditemukan');

        return book;
    }

    updateBookById(payload, bookId) {
        const book = this.books.find(book => book.id === bookId);
        if(book === undefined) throw new BookNotFoundError('Gagal memperbarui buku. Id tidak ditemukan');

        book.updateData(payload);
    }

    deleteBookById(bookId) {
        const book = this.books.find(book => book.id === bookId);
        if(book === undefined) throw new BookNotFoundError('Buku gagal dihapus. Id tidak ditemukan');

        this.books = this.books.filter(book => book.id !== bookId);
    }
}

export default BookService;