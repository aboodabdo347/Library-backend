require("./config/database")
require("dotenv").config();
const axios = require('axios')
const Book = require("./models/Book.js")

const getBooks = async () => {
    const bookRes = await axios.get("https://www.googleapis.com/books/v1/volumes?q=subject:fiction&langRestrict=en&maxResults=40")
    console.log(bookRes.data.items.length)
    console.log(bookRes.data.items[0].volumeInfo.imageLinks)

    // for(let i = 0; i < bookRes.data.items.length; i++) {
    //     if(
    //         (bookRes.data.items[i].volumeInfo.title) &&
    //         ('imageLinks' in bookRes.data.items[i].volumeInfo) &&
    //         (bookRes.data.items[i].volumeInfo.description) &&
    //         (bookRes.data.items[i].volumeInfo.publishedDate) &&
    //         (bookRes.data.items[i].volumeInfo.authors) &&
    //         (bookRes.data.items[i].volumeInfo.language === "en") &&
    //         ('industryIdentifiers' in bookRes.data.items[i].volumeInfo && (bookRes.data.items[i].volumeInfo.industryIdentifiers[0].type == "ISBN_10" || bookRes.data.items[i].volumeInfo.industryIdentifiers[0].type == "ISBN_13"))
    //     ) {
    //         Book.create({
    //             title: bookRes.data.items[i].volumeInfo.title,
    //             image: bookRes.data.items[i].volumeInfo.imageLinks.thumbnail,
    //             description: bookRes.data.items[i].volumeInfo.description,
    //             pubYear: bookRes.data.items[i].volumeInfo.publishedDate,
    //             authors: bookRes.data.items[i].volumeInfo.authors,
    //             isbn: bookRes.data.items[i].volumeInfo.industryIdentifiers[0].identifier
    //         })
    //     }
    // }
}
getBooks()
