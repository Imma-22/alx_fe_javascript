// Array of quote objects, each containing text and category
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The best preparation for tomorrow is doing your best today.", category: "Inspiration" },
    { text: "Believe you can and you are half way there.", category: "Motivation" },
    { text: "The only thing we have to faer is fear itself.", category: "Life" }
  ];

  // Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

const serverURL = 'https://jsonplaceholder.typicode.com/posts';

// Function to simulate fetching data from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(serverURL);
    const serverQuotes = await response.json();
    console.log("Fetched quotes from server:", serverQuotes);

    // Simulate merging server quotes with local quotes
    mergeServerQuotes(serverQuotes);
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
  }
}

// Function to simulate posting data to the server
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(serverURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quote)
    });

    const result = await response.json();
    console.log("Quote posted to server:", result);
  } catch (error) {
    console.error("Error posting quote to server:", error);
  }
}

// Function to periodically fetch quotes from the server and sync
function startDataSync() {
  setInterval(fetchQuotesFromServer, 10000);  // Sync every 10 seconds
}

// Merge server data with local quotes
function mergeServerQuotes(serverQuotes) {
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

  // Simple conflict resolution: the server data takes precedence
  serverQuotes.forEach(serverQuote => {
    const localQuote = localQuotes.find(q => q.text === serverQuote.text);

    if (!localQuote) {
      // If the quote does not exist locally, add it
      localQuotes.push(serverQuote);
    }
  });

  // Save the merged data back to local storage
  localStorage.setItem('quotes', JSON.stringify(localQuotes));
}

// Function to populate unique categories in the dropdown
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(quote => quote.category))];  // Get unique categories

  // Remove existing options except for "All Categories"
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // Dynamically populate categories
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Load the last selected filter from local storage, if any
  const lastSelectedCategory = localStorage.getItem('selectedCategory');
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
    filterQuotes();
  }
}


 // Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    
    // Display the quote with its category
    quoteDisplay.innerHTML = `<p>"${rAaandomQuote.text}" - <em>${randomQuote.category}</em></p>`;
  }
  
  // Function to add a new quote to the array and display it
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
    
    if (newQuoteText && newQuoteCategory) {
      // Add the new quote to the array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Clear input fields after adding
      document.getElementById("newQuoteText").value = '';
      document.getElementById("newQuoteCategory").value = '';
  
      alert("New quote added!");
    } else {
      alert("Please enter both quote text and category.");
    }
  }
  
  // Function to load the last viewed quote from session storage (optional)
function loadLastViewedQuote() {
  const lastViewed = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
  if (lastViewed) {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>"${lastViewed.text}" - <em>${lastViewed.category}</em></p>`;
  }
}

// Function to export quotes as JSON
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  link.click();

  URL.revokeObjectURL(url);  // Clean up the URL object
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);

      // Validate the imported data (should be an array of quotes)
      if (Array.isArray(importedQuotes) && importedQuotes.every(quote => quote.text && quote.category)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid JSON format. Please make sure it’s an array of quote objects.');
      }
    } catch (error) {
      alert('Error reading JSON file: ' + error.message);
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// Attach event listener for exporting quotes
document.getElementById("exportQuotes").addEventListener("click", exportQuotes);


  // Function to dynamically create the form for adding new quotes
  function createAddQuoteForm() {
    // Create form elements
    const formContainer = document.createElement('div');
    const newQuoteInput = document.createElement('input');
    const newCategoryInput = document.createElement('input');
    const addButton = document.createElement('button');
    
    // Set attributes and placeholders
    newQuoteInput.setAttribute('id', 'newQuoteText');
    newQuoteInput.setAttribute('type', 'text');
    newQuoteInput.setAttribute('placeholder', 'Enter a new quote');
    
    newCategoryInput.setAttribute('id', 'newQuoteCategory');
    newCategoryInput.setAttribute('type', 'text');
    newCategoryInput.setAttribute('placeholder', 'Enter quote category');
    
    addButton.setAttribute('id', 'addQuoteButton');
    addButton.innerText = 'Add Quote';
  
    // Append inputs and button to the form container
    formContainer.appendChild(newQuoteInput);
    formContainer.appendChild(newCategoryInput);
    formContainer.appendChild(addButton);
    
    // Append the form container to the body (or any specific location)
    document.body.appendChild(formContainer);
  
    // Attach event listener to add quote on button click
    addButton.addEventListener("click", addQuote);
  }
  
  // Event listener to show a random quote when the button is clicked
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Call the function to create the form on page load
  createAddQuoteForm();
  loadLastViewedQuote();
  // Populate the categories and load last filter on page load
  populateCategories();