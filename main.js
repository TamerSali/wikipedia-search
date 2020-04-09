
function handleSubmit(event) {
    // prevent page from reloading when form is submitted
    event.preventDefault();
    // get the value of the input field
    const input = document.querySelector('.search-input').value;
    // remove whitespace from the input
    const searchQuery = input.trim();
    // call `fetchResults` and pass it the `searchQuery`
    fetchResults(searchQuery);
}

function fetchResults(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const results = data.query.search;
            displayResults(results);
        })
        .catch(() => console.log('An error occurred'));
}

function displayResults(results) {
    // Store a reference to `.searchResults`
    const searchResults = document.querySelector('.searchResults');
    // Remove all child elements
    searchResults.innerHTML = '';
    // Loop over results array
    results.forEach(result => {
        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

        searchResults.insertAdjacentHTML('beforeend',
            `<div class="resultItem">
      <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">
        <h3 class="resultItem-title">
           ${result.title} 
        </h3>
        <span class="resultItem-snippet">${result.snippet}</span><br>
        </>
      </div>`
        );
    });
}


const form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);