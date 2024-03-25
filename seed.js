require("./config/database")
require("dotenv").config();
const axios = require('axios')
const Book = require("./models/Book")

const getBooks = async () => {
    const bookRes = await axios.get("https://www.googleapis.com/books/v1/volumes?q=churchill+secret&langRestrict=en")
    // console.log(bookRes.data.totalItems)

    for(let i = 0; i < bookRes.data.items.length; i++) {
        if(bookRes.data.items[i]) {
            // console.log(bookRes.data.items[i].volumeInfo.title);
            // console.log(bookRes.data.items[i].volumeInfo.imageLinks.thumbnail);
            // console.log(bookRes.data.items[i].volumeInfo.description);
            // console.log(bookRes.data.items[i].volumeInfo.publishedDate);
            // console.log(bookRes.data.items[i].volumeInfo.authors);
            if(
                bookRes.data.items[i].volumeInfo.title &&
                bookRes.data.items[i].volumeInfo.imageLinks.thumbnail &&
                bookRes.data.items[i].volumeInfo.description &&
                bookRes.data.items[i].volumeInfo.publishedDate &&
                bookRes.data.items[i].volumeInfo.authors
            ) {
                // let entryRes = await Book.create({
                //     title: bookRes.data.items[i].volumeInfo.title,
                //     image: bookRes.data.items[i].volumeInfo.imageLinks.thumbnail,
                //     description: bookRes.data.items[i].volumeInfo.description,
                //     pubYear: bookRes.data.items[i].volumeInfo.publishedDate,
                //     authors: bookRes.data.items[i].volumeInfo.authors
                // })
                // console.log(entryRes)
            }
        }
    }
}
// getBooks()
