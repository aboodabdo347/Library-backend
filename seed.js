const axios = require('axios')

const getBooks = async () => {
    const bookRes = await axios.get("https://www.googleapis.com/books/v1/volumes?q=atomic+habits&langRestrict=en")
    console.log(bookRes.data.items[0])

    // for(let i = 0; i < 20; i++) {
    //     if(bookRes.data.items[i]) {
    //         console.log(bookRes.data.items[i].volumeInfo.title);
    //         console.log(bookRes.data.items[i].volumeInfo.authors)
    //     }
    // }
}
getBooks()
