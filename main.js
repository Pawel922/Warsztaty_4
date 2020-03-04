$(function () {

    var app = $("#app");

    function renderBooks(books) {
        books.forEach(function(book) {
            var bookElement = $("<div>");
            var bookTitle = $("<div>");
            var bookDetails = $("<div>");
            bookElement.appendTo(app);
            bookTitle
                .text(book.title)
                .appendTo(bookElement);
            bookDetails.appendTo(bookElement);
        });
    }

    function fetchBooks() {
        $.ajax({
            method: "GET",
            url: "http://localhost:8282/books/"
        }).done(renderBooks);
    }

    fetchBooks();
});