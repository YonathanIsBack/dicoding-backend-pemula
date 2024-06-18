import MainController from "../controller/MainController.js";

class Routes {
    routes;
    mainController;

    constructor(props) {
        this.mainController = new MainController();
        this.routes = [];
        this.routes.push(
            {
                method: 'POST',
                path: '/books',
                handler: (request, h) => {
                    try{
                        const {payload} = request;
                        const book = this.mainController.saveBook(payload);
                        const response = {
                            status: "success",
                            message: "Buku berhasil ditambahkan",
                            data: {
                                bookId: book.id
                            }
                        }

                        return h.response(response).code(201);
                    } catch (error) {
                        const response = {
                            status: "fail",
                            message: error.message
                        }
                        return h.response(response).code(400);
                    }
                }
            },{
                method: 'GET',
                path: '/books',
                handler: (request, h) => {
                    try{
                        const books = this.mainController.fetchAllBooks(request.query);
                        const response = {
                            status: "success",
                            data: {books}
                        }

                        return h.response(response).code(200);
                    } catch (error) {
                        const response = {
                            status: "fail",
                            message: error.message
                        }
                        return h.response(response).code(400);
                    }
                }
            },{
                method: 'GET',
                path: '/books/{bookId}',
                handler: (request, h) => {
                    try{
                        const {bookId} = request.params;
                        const book = this.mainController.fetchBookById(bookId);
                        const response = {
                            status: "success",
                            data: {book}
                        }

                        return h.response(response).code(200);
                    } catch (error) {
                        const response = {
                            status: "fail",
                            message: error.message
                        }
                        return h.response(response).code(404);
                    }
                }
            },{
                method: 'PUT',
                path: '/books/{bookId}',
                handler: (request, h) => {
                    try{
                        const {bookId} = request.params;
                        const {payload} = request;
                        this.mainController.updateBook(payload, bookId);
                        const response = {
                            status: "success",
                            message: "Buku berhasil diperbarui",
                        }

                        return h.response(response).code(200);
                    } catch (error) {
                        const response = {
                            status: "fail",
                            message: error.message
                        }
                        return h.response(response).code(error.errorCode);
                    }
                }
            },{
                method: 'DELETE',
                path: '/books/{bookId}',
                handler: (request, h) => {
                    try{
                        const {bookId} = request.params;
                        this.mainController.deleteBook(bookId);
                        const response = {
                            status: "success",
                            message: "Buku berhasil dihapus",
                        }

                        return h.response(response).code(200);
                    } catch (error) {
                        const response = {
                            status: "fail",
                            message: error.message
                        }
                        return h.response(response).code(error.errorCode);
                    }
                }
            }
        );
    }

    extractRoutes() {
        return this.routes
    }

}

export default Routes;