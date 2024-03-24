const axios = require('axios')

const getBooks = async () => {
    const bookRes = await axios.get("https://www.googleapis.com/books/v1/volumes?q=lawsofpower&langRestrict=en")
    // console.log(bookRes.data.totalItems)

    for(let i = 0; i < bookRes.data.items.length; i++) {
        if(bookRes.data.items[i]) {
            console.log(bookRes.data.items[i].volumeInfo.title);
            console.log(bookRes.data.items[i].volumeInfo.imageLinks.thumbnail);
            console.log(bookRes.data.items[i].volumeInfo.description);
            console.log(bookRes.data.items[i].volumeInfo.publishedDate);

            //this should go into authors table
            console.log(bookRes.data.items[i].volumeInfo.authors);

        }
    }
}
getBooks()
