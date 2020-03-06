$(function () {

    var app = $("#app");

    function renderBookDetails(bookDetails, data) {
        bookDetails
            .empty()
            .attr("book-id", data.id)
            .append("ID: " + data.id + "<br />")
            .append("Author: " + data.author + "<br />")
            .append("ISBN: " + data.isbn + "<br />")
            .append("Title: " + data.title + "<br />")
            .append("Publisher: " + data.publisher + "<br />")
            .append("Type: " + data.type + "<br />");
    }

    function renderBooks(books) {
        app.empty();
        books.forEach(function(book) {
            var bookElement = $("<div>");
            var bookTitle = $("<div>");
            var bookDetails = $("<div>");
            var deleteButton = $("<button>");
            bookElement.addClass("book").appendTo(app);
            bookTitle
                .addClass("book-title")
                .text(book.title)
                .appendTo(bookElement);

            bookTitle.one("click", function () {
                bookDetails.text("...");
                deleteButton
                    .addClass("delete-button")
                    .text("Delete")
                    .appendTo(bookTitle);
                $.ajax({
                    method: "GET",
                    url: "http://localhost:8282/books/" + book.id
                }).done(function (data) {
                    renderBookDetails(bookDetails, data)
                });
            });
            bookDetails.addClass("book-details").appendTo(bookElement);
        });
    }

    function fetchBooks() {
        $.ajax({
            method: "GET",
            url: "http://localhost:8282/books/"
        }).done(renderBooks);
    }

    function handleForm() {
        $("#bookForm").on("submit", function(e) {
            e.preventDefault();
            var data = {};
            $(this)
                .find("input")
                .each(function() {
                    var name = $(this).attr("name");
                    data[name] = $(this).val();
                });
            $.ajax({
                method: "POST",
                url: "http://localhost:8282/books/",
                contentType: "application/json",
                data: JSON.stringify(data)
            }).done(fetchBooks);
        });
    }

    fetchBooks();
    handleForm();
});