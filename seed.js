const { default: axios } = require("axios")

const getBooks = async () => {
    const bookRes = await axios.get("https://www.googleapis.com/books/v1/volumes?q=greene&langRestrict=en")
    console.log(bookRes.data.items)

}
getBooks();