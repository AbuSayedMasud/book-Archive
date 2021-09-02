// data catch area
document.getElementById('search-book').addEventListener('click', findValue = () => {
  const inputValue = document.getElementById('search-text');

  //load data
  const url = `http://openlibrary.org/search.json?q=${inputValue.value}`;

  // clear
  inputValue.value = ' ';

  //  fetch
  fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data))

})
// displaybook-area start
const displayBooks = books => {
  const numberOfBooks = books.docs;
  const booksDetails = document.getElementById('books-details');
  booksDetails.textContent = " ";
  // console.log(books);
  if (numberOfBooks.length === 0) {
    console.log("no data");
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    const h3 = document.createElement('h2');
    h3.innerText = `Opps results are not found`;
    resultDiv.appendChild(h3);
    booksDetails.appendChild(resultDiv);
  }
  else {
    numberOfBooks.slice(0, 26).forEach(book => {



      const div = document.createElement('div');

      console.log(book.cover_i);
      div.innerHTML = `
      
        <div class="row g-2">
              <div class="col-md-4 pb-2">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="w-100  mt-3 rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title fs-2 fw-bold">${book.title}</h5>
                  <p class="card-text fs-5 fw-normal"><span class="text-muted fs-3">By</span> ${book.author_name ? book.author_name[0] : 'Not Available'}</p>
                  <p class="card-text text-dark fs-6">Publisher  ${book.publisher ? book.publisher[0] : 'Not Available'}</p>
                  <p class="card-text text-dark fs-6">First published in ${book.first_publish_year ? book.first_publish_year : 'Not Available'}</p>
                
                </div>
             </div>  
        </div>
        
     
          `;

      div.classList.add('card');
      booksDetails.appendChild(div);


    });

  }
  // displaybook-area end

  // search result load
  const result = document.getElementById('result-area')
  result.textContent = " ";
  const resultDiv = document.createElement('div');
  resultDiv.classList.add('result');
  const h3 = document.createElement('h2');
  h3.innerText = `Search results ${books.numFound} are found`;
  resultDiv.appendChild(h3);
  result.appendChild(resultDiv);
}