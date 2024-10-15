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