$(function () {

    var app = $("#app");

    function renderBookDetails(bookDetails, data) {
        bookDetails
            .empty()
            .append("ID: " + data.id + "<br />")
            .append("Author: " + data.author + "<br />")
            .append("ISBN: " + data.isbn + "<br />")
            .append("Title: " + data.title + "<br />")
            .append("Publisher: " + data.publisher + "<br />")
            .append("Type: " + data.type + "<br />");
    }

    function renderBooks(books) {
        books.forEach(function(book) {
            var bookElement = $("<div>");
            var bookTitle = $("<div>");
            var bookDetails = $("<div>");
            bookElement.appendTo(app);
            bookTitle
                .text(book.title)
                .appendTo(bookElement);

            bookTitle.one("click", function () {
                bookDetails.text("...");
                $.ajax({
                    method: "GET",
                    url: "http://localhost:8282/books/" + book.id
                }).done(function (data) {
                    renderBookDetails(bookDetails, data)
                });
                bookDetails.appendTo(bookElement);
            });
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