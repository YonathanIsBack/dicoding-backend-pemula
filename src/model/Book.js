import {read} from "node:fs";
import {nanoid} from "nanoid";

class Book {
    id;
    name;
    year;
    author;
    summary;
    publisher;
    pageCount;
    readPage;
    finished;
    reading;
    insertedAt;
    updatedAt;

    constructor(props) {
        this.updateData(props);

        this.insertedAt = new Date();
        this.updatedAt = new Date();
        this.id = nanoid(12);
    }

    updateData(newData) {
        const {name, year, author, summary, publisher, pageCount, readPage, reading} = newData;

        this.name = name;
        this.year = year;
        this.author = author;
        this.summary = summary;
        this.publisher = publisher;
        this.pageCount = pageCount;
        this.readPage = readPage;
        this.reading = reading;

        this.pageCount === this.readPage ? this.finished = true : this.finished = false;
    }

}

export default Book;