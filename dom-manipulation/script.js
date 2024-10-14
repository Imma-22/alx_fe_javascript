// Array of quote objects, each containing text and category
let quotes = [
    { text: "The bset preparation for tomorrow is doing your best today.", category: "Inspiration" },
    { text: "Believe you can and you are half way there.", category: "Motivation" },
    { text: "The only thing we have to faer is fear itself.", category: "Life" }
  ];
  
  // Function to display a random quote from the quotes array
  function showRandomQuote() {
    // Get a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    // Find the div with id 'quoteDisplay' and display the random quote
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
      <p>"${randomQuote.text}"</p>
      <p><strong>Category:</strong> ${randomQuote.category}</p>
    `;
  }
  
  // Function to add a new quote based on user input
  function addQuote() {
    // Get the values from the input fields
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    // Check if inputs are not empty
    if (newQuoteText && newQuoteCategory) {
      // Add the new quote to the quotes array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Clear the input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Show confirmation or update message
      alert('New quote added successfully!');
    } else {
      alert('Please fill out both fields.');
    }
  }
  
  // Event listener to show a new random quote when the "Show New Quote" button is clicked
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  