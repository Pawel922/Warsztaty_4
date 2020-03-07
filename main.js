$(function () {

    var app = $("#app");

    function renderBookDetails(data) {
        var bookId = data.id;
        var detailsDiv = $("div[data-id=" + bookId + "]").next();

        detailsDiv
            .empty()
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
                .attr("data-id", book.id)
                .addClass("book-title")
                .text(book.title)
                .appendTo(bookElement);

            bookTitle.one("click", function () {
                bookDetails.text("...");
                deleteButton
                    .attr("data-method", "DELETE")
                    .attr("data-id", book.id)
                    .addClass("delete-button")
                    .text("Delete")
                    .appendTo(bookTitle);
                makeRequestForElement($(this), renderBookDetails)
            });
            bookDetails.addClass("book-details").appendTo(bookElement);
        });
    }

    function fetchBooks() {
        makeRequestForElement(app, renderBooks);
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
            makeRequestForElement($(this), fetchBooks, data);
        });
    }

    app.on("click", ".delete-button", function (e) {
        makeRequestForElement($(e.target),fetchBooks);
    });
    
    function makeRequestForElement(element, functionName, data) {
        var requestMethod = element.attr("data-method");
        var urlAddress = "http://localhost:8282/books/";
        var bookId = element.attr("data-id");
        if (typeof bookId !== "undefined"){
            urlAddress += bookId;
        }
        if (requestMethod !== "POST"){
            $.ajax({
                method: requestMethod,
                url: urlAddress
            }).done(functionName);
        } else {
            $.ajax({
                method: requestMethod,
                url: urlAddress,
                contentType: "application/json",
                data: JSON.stringify(data)
            }).done(functionName);
        }
    }

    fetchBooks();
    handleForm();
});