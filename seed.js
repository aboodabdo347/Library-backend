const axios = require("axios")

const getBooks = async () => {
    const bookRes = await axios.get("https://www.googleapis.com/books/v1/volumes?q=48laws&langRestrict=en")
    // console.log(bookRes.data.items)

    for(let i = 0; i < 20; i++) {
        if(bookRes.data.items[i]) {
            console.log(bookRes.data.items[i].volumeInfo.title);
            console.log(bookRes.data.items[i].volumeInfo.authors)
        }
    }
}
getBooks();