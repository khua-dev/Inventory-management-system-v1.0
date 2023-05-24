// Function to display the inventory
function displayInventory() {
    var productList = document.getElementById("product-list");
    productList.innerHTML = "";
  
    // Create the table element
    var table = document.createElement("table");
    table.className = "product-table";
  
    // Create the table header
    var tableHeader = document.createElement("tr");
    tableHeader.innerHTML = "<th>Item</th><th>Model</th><th>Serial Number</th><th>Date</th>";
    table.appendChild(tableHeader);
  
    // Create a table row for each product
    for (var i = 0; i < inventory.length; i++) {
      var product = inventory[i];
  
      var tableRow = document.createElement("tr");
      tableRow.innerHTML = `<td>${product.item}</td><td>${product.model}</td><td>${product.serialNumber}</td><td>${product.date}</td>`;
  
      table.appendChild(tableRow);
    }
  
    // Append the table to the product list container
    productList.appendChild(table);
  }
  
  // Retrieve the inventory data from localStorage or initialize an empty array
  var inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  
  // Display the inventory
  displayInventory();
  

  
  function searchItems() {
    var input = document.getElementById('search-input').value.toLowerCase();
    var table = document.getElementById('inventory-table');
    var similarTable = document.getElementById('similar-items-table');
    var similarTableBody = document.getElementById('similar-items-body');
    var totalItems = 0;

    similarTable.style.display = 'none'; // Hide the similar items table by default
    similarTableBody.innerHTML = ''; // Clear the previous rows from the similar items table

    for (var i = 1; i < table.rows.length; i++) { // Start from 1 to skip the table header row
      var itemName = table.rows[i].cells[0].innerHTML.toLowerCase();

      if (itemName.includes(input)) {
        // Show the similar items table if it contains at least one match
        similarTable.style.display = 'table';

        // Clone the row and add it to the similar items table body
        var cloneRow = table.rows[i].cloneNode(true);
        similarTableBody.appendChild(cloneRow);
        totalItems++;
      }
    }

    document.getElementById('total-items').innerText = 'Total items: ' + totalItems;
  }

