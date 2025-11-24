// Render Recommendations Section
//must be an async function to use await
async function renderRecommendations(container) {
  try {
    // Creating the custom featured products that will be used in the Recommendations section
    const featuredProducts = [
      {
        id: 101,
        title: "Pampers Size 1 Diapers",
        price: 4.99,
        image: "jpg/Pampers-Size-1.jpg"
      },
      {
        id: 102,
        title: "Huggies Natural Care Wipes",
        price: 5.49,
        image: "jpg/Baby-Wipes.jpg"
      },
      {
        id: 103,
        title: "Johnson's Baby Shampoo",
        price: 2.99,
        image: "jpg/Johnsons-Baby-Shampoo.jpg"
      }
    ];

    // Fetching products from Fake Store API
    const res = await fetch("https://fakestoreapi.com/products/category/women's%20clothing?limit=3");
    const apiProducts = await res.json();

    // Building the HTML For Recommendations Section
    container.innerHTML = `
      <h2>Product Recommendations</h2>

      <!-- Featured Products - aka Custom products -->
      <h4>Featured Products</h4>
      <div class="row g-4 mb-5">
        ${featuredProducts.map(p => `
          <div class="col-md-4">
            <div class="card h-100 border-primary shadow-sm">
              <img src="${p.image}" class="card-img-top p-3 product-card">
              <div class="card-body">
                <h6 class="card-title">${p.title}</h6>
                <p class="text-primary fw-bold">£${p.price}</p>
                <a href="#" class="btn btn-primary btn-sm">View</a>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

        <!-- API Products -->
      <h4>More Recommendations For Mom</h4>
      <div class="row g-4 mb-5">
        ${apiProducts.map(p => `
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <img src="${p.image}" class="card-img-top p-3 api-card">
              <div class="card-body">
                <h6 class="card-title">${p.title}</h6>
                <p class="text-primary fw-bold">£${p.price}</p>
                <a href="#" class="btn btn-outline-primary btn-sm">View</a>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  } catch (error) {
    container.innerHTML = `<p class="text-danger">Failed to load product recommendations.</p>`;
  }
}

// Default inventory values
const defaultInventory = [
  { name: "Diapers- Size 1", have: 0, need: 500 },
  { name: "Diapers- Size 2", have: 0, need: 600 },
  { name: "Diapers- Size 3", have: 0, need: 400 },
  { name: "Newborn Onesies", have: 0, need: 25 },
  { name: "0-3 Month Onesies", have: 0, need: 25 },
  { name: "Bottles", have: 0, need: 12 },
  { name: "Pacifiers", have: 0, need: 10 }
];

// Load saved inventory if available, otherwise default
let inventory = JSON.parse(localStorage.getItem("babyInventory")) || structuredClone(defaultInventory);


let chart;

// Main renderer for Home/Inventory Section
function renderHome(container) {
  container.innerHTML = "";

  container.innerHTML = `
  <div class="inventory-container">
    <!-- LEFT: Inventory Section -->
    <div class="flex-grow-1 me-4">
      <div class="card shadow-sm p-4 mb-4">
        <div class="text-center mb-4">
          <h1>Baby Prep Inventory</h1>
          <p class="text-muted">Track what you have and what you still need before baby arrives</p>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h4 >Your Inventory</h4>
          <div class="d-flex gap-2">
            <button id="addItemBtn">+ Add Item</button>
            <button id="saveInventoryBtn">Save</button>
            <button id="resetInventoryBtn">Reset</button>
          </div>
        </div>
        <table class="table table-bordered align-middle bg-white">
          <thead class="table-light">
            <tr>
              <th>Item</th>
              <th>Current Stock</th>
              <th>Total Needed</th>
              <th>Still to Buy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="inventoryTable"></tbody>
        </table>
      </div>
    </div>

    <!-- RIGHT: Chart Sidebar -->
    <div id="chartSidebar" class="card shadow-sm p-4">
      <h5>Inventory Stock Progress</h5>
      <canvas id="stockChart"></canvas>
    </div>
  </div>
  `;

  //opted to use innerHTML to keep actual HTML program as stripped down as possible

  updateInventoryTable();
  drawChart();

  // Add item button handler
  document.getElementById("addItemBtn").addEventListener("click", () => showAddModal());
  // Save inventory button handler
  document.getElementById("saveInventoryBtn").addEventListener("click", () => {
    localStorage.setItem("babyInventory", JSON.stringify(inventory));
    alert("Inventory saved! It will stay the same even after reloading.");
  });

  //Reset inventory button handler - restores to default values
  document.getElementById("resetInventoryBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset to the original inventory?")) {
      localStorage.removeItem("babyInventory");
      inventory = structuredClone(defaultInventory);
      updateInventoryTable();
      drawChart();
      alert("Inventory has been reset to default.");
    }
  });
}


// Rendering inventory table
function updateInventoryTable() {
  const tbody = document.getElementById("inventoryTable");
  tbody.innerHTML = "";

  inventory.forEach((item, index) => {
    const remaining = item.need - item.have;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.have}</td>
      <td>${item.need}</td>
      <td class="${remaining > 0 ? "text-danger" : "text-success"}">
        ${remaining > 0 ? remaining + " left" : "Complete!"}
      </td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editItem(${index})">Edit</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Draw doughnut chart
function drawChart() {

  //variables to define stock and what's still needed for the donught chart
  //included logic so that if one category is over stocked it doesn't inflate the visual
  //an excess of stock in one category doesn't make the overall look more complete than reality

  const totalNeed = inventory.reduce((sum, i) => sum + i.need, 0);
  const totalHave = inventory.reduce((sum, i) => sum + Math.min(i.have, i.need), 0);
  const ctx = document.getElementById("stockChart").getContext("2d");

  const displayedStock = Math.min(totalHave, totalNeed);
  const displayedNeeded = Math.max(totalNeed - totalHave, 0);

  // Aesthetics of the chart - legend, colors, labels
  if (chart) chart.destroy();

  const image = new Image();
  image.src = 'jpg/donut-pic.png';

  //this plugin is specifically for the image in the center of the stock donut chart
const plugin = {
  id: 'prettyDoughnut',
  beforeDraw: (chartInstance) => {
    if (image.complete) {
      const ctx = chartInstance.ctx;
      const { top, left, width, height } = chartInstance.chartArea;

      //adjusting the size of the image using scale to fit within doughnut
      const scale = 0.3;
      const imgWidth = width * scale;
      const imgHeight = height * scale;

      //centering using scaled dimensions
      const x = left + (width / 2) - (imgWidth / 2);
      const y = top + (height / 2) - (imgHeight / 2);

      ctx.drawImage(image, x, y, imgWidth, imgHeight);
    } else {
      image.onload = () => chartInstance.draw();
    }
  }
};

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Stocked", "Still Needed"],
      datasets: [{
        data: [displayedStock, displayedNeeded],
        backgroundColor: ["#07d1d1ff", "#dee2e6"],
        hoverOffset: 6
      }]
    },
    options: {
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          //This is altering the labels when hovering over donought
          //so that it doesn't display the total stocked and still needed counts anymore
          callbacks: {
            label: function () { return ''; }
          }
        }
      }
    },
    plugins: [plugin]
  });
}

// Modal builder
function showAddModal(editIndex = null) {
  const existing = document.getElementById("itemModal");
  if (existing) existing.remove();

  const modalHTML = document.createElement("div");
  modalHTML.className = "modal fade";
  modalHTML.id = "itemModal";
  modalHTML.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${editIndex === null ? "Add Item" : "Edit Item"}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form id="itemForm">
            <div class="mb-3">
              <label class="form-label">Item Name</label>
              <input type="text" class="form-control" id="itemName" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Have</label>
              <input type="number" class="form-control" id="itemHave" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Need</label>
              <input type="number" class="form-control" id="itemNeed" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Save Item</button>
          </form>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalHTML);

  const modal = new bootstrap.Modal(modalHTML);
  modal.show();

  // If editing, pre-fill form fields
  if (editIndex !== null) {
    const item = inventory[editIndex];
    modalHTML.querySelector("#itemName").value = item.name;
    modalHTML.querySelector("#itemHave").value = item.have;
    modalHTML.querySelector("#itemNeed").value = item.need;
  }

  // Form submission handler
  modalHTML.querySelector("#itemForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = modalHTML.querySelector("#itemName").value.trim();
    const have = parseInt(modalHTML.querySelector("#itemHave").value);
    const need = parseInt(modalHTML.querySelector("#itemNeed").value);
    
    if (editIndex !== null) {
      inventory[editIndex] = { name, have, need };
    } else {
      inventory.push({ name, have, need });
    }

    updateInventoryTable();
    drawChart();

    modal.hide();
    setTimeout(() => modalHTML.remove(), 500);
  });
}


// Edit item handler
function editItem(index) { showAddModal(index); }
