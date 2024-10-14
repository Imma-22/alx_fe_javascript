// Array of quote objects, each containing text and category
let quotes = [
    { text: "The best preparation for tomorrow is doing your best today.", category: "Inspiration" },
    { text: "Believe you can and you are half way there.", category: "Motivation" },
    { text: "The only thing we have to faer is fear itself.", category: "Life" }
  ];
  
 // Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    
    // Display the quote with its category
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - <em>${randomQuote.category}</em></p>`;
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