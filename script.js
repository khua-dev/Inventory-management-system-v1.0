// Array to store products
let inventory = [];

// Function to add a product
function addProduct(event) {
  event.preventDefault();

  // Get input values
  const item = document.getElementById("item").value;
  const model = document.getElementById("model").value;
  const serialNumber = document.getElementById("serial-number").value;
  const date = document.getElementById("date").value;

  // Validate input values
  if (!item || !model || !serialNumber || !date) {
    alert("Please fill in all the fields.");
    return;
  }

  // Create a new product object
  const product = {
    item,
    model,
    serialNumber,
    date,
  };

  // Add the product to the inventory
  inventory.push(product);

  // Clear input fields
  document.getElementById("item").value = "";
  document.getElementById("model").value = "";
  document.getElementById("serial-number").value = "";
  document.getElementById("date").value = "";

  // Save the inventory to localStorage
  saveInventory();

  // Display the updated inventory
  displayInventory();
}

// Function to display the inventory
function displayInventory() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  if (inventory.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No products found.";
    productList.appendChild(message);
    return;
  }

  // Create the table element
  const table = document.createElement("table");
  table.className = "product-table";

  // Create the table header
  const tableHeader = document.createElement("tr");
  tableHeader.innerHTML = "<th>Item</th><th>Model</th><th>Serial Number</th><th>Date</th><th></th><th></th>";
  table.appendChild(tableHeader);

  // Create a table row for each product
  for (let i = 0; i < inventory.length; i++) {
    const product = inventory[i];

    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `<td>${product.item}</td><td>${product.model}</td><td>${product.serialNumber}</td><td>${product.date}</td><td><button onclick="editProduct(${i})">Edit</button></td><td><button onclick="deleteProduct(${i})">Delete</button></td>`;

    table.appendChild(tableRow);
  }

  // Append the table to the product list container
  productList.appendChild(table);
}

// Function to edit a product
function editProduct(index) {
  const product = inventory[index];

  const newItem = prompt("Enter the new item:", product.item);
  const newModel = prompt("Enter the new model:", product.model);
  const newSerialNumber = prompt("Enter the new serial number:", product.serialNumber);
  const newDate = prompt("Enter the new date:", product.date);

  // Validate input values
  if (!newItem || !newModel || !newSerialNumber || !newDate) {
    alert("Invalid input. Product not updated.");
    return;
  }

  // Update the product
  inventory[index] = {
    item: newItem,
    model: newModel,
    serialNumber: newSerialNumber,
    date: newDate,
  };

  // Save the inventory to localStorage
  saveInventory();

  // Display the updated inventory
  displayInventory();
}

// Function to delete a product
function deleteProduct(index) {
  // Remove the product from the inventory
  inventory.splice(index, 1);

  // Save the inventory to localStorage
  saveInventory();

  // Display the updated inventory
  displayInventory();
}

// Function to save the inventory to localStorage
function saveInventory() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
  alert(`Item has been added to the inventory.`);
}

// Retrieve the inventory data from localStorage or initialize an empty array
inventory = JSON.parse(localStorage.getItem("inventory")) || [];

// Display the inventory
displayInventory();

// Add event listener to the form
document.getElementById("product-form").addEventListener("submit", addProduct);
