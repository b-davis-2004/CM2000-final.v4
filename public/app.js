// Render Recommendations Section
//must be an async function to use await
async function renderRecommendations(container) {
  try {
    // Creating the custom featured products that will be used in the Recommendations section
    const featuredProducts = [
      {
        id: 101,
        title: "Pampers Size 1 Diapers",
        price: 5.25,
        image: "jpg/Pampers-Size-1.jpg",
        view: "https://www.amazon.co.uk/Pampers-Premium-Protection-Nappies-2kg-5kg/dp/B08KPXS82J/ref=sr_1_17_uk_f3_0o_morri?crid=1HBL3QJDDJ896&dib=eyJ2IjoiMSJ9.yBwIta3b3h4ybxMgeqzk5pVFFe6NA61wVBzzWplBwH2EjSg70SIGWC442u0Fp34dtfijX9YKixkzun5fhSS9HumqHPxMHtOdqhBVtTNkHooRQHvGWoovUdmmMG1TInjZafhOdDu_3CNXTi3p2LdPWQEatCDXBPuNv12dpuzUB6LgHZXj1Z1hczajpmFhV399Xu0hFhFXHrDmAkINNvQ9PC64yw05Uf4IOyHVFklQ41P0iUm1QuNZu_6CsWQBMz8vodSw6w7jKEH4LOt8jTmrgbAes5UkwSr1m2TbYWlkllc.5bIvADXlnMZutccYjgFz5bjYTepOUAFsvl2r2oLBs7I&dib_tag=se&keywords=pampers+size+1&qid=1763985466&sprefix=pampers%2Caps%2C280&sr=8-17"
      },
      {
        id: 102,
        title: "Huggies Natural Care Wipes",
        price: 5.49,
        image: "jpg/Baby-Wipes.jpg",
        view: "https://www.amazon.co.uk/Huggies-Natural-Care-Quads-Wipes/dp/B01C2LQINW/ref=sr_1_8?crid=2LYFOJVBD69II&dib=eyJ2IjoiMSJ9.q820LXMxC1KZy3tMmIXRiGmNGFlj_81dijrXmMipIaO4IfUGQi1Aa-tMSpvzXXgQllm56R6j0lX07O_6btrEXFxMMeLYa6TfqNRlbUMgkrjo6-gVRBiF7zwz_4urBeS9AZk9tDZOXZku8aWhHG61TlLhJsky1qCqlPPvelPAV4CLlavyffwQy7z3lbj4ZjyplSoWJMKmEx4SpO1Mm_N_PQLniz-LcNJr6bZolRQ9XYw0T7fcwHKWh2y1Bk92-XC7dLSvb7Gy9WeU4r3QfT8yWzObmrUw184DbExGZ0PgxmE.Iji3HVi5OBTMaLa8y-mWhbFRQZKiJUEgWoR0IoRQPYE&dib_tag=se&keywords=huggies+natural+care+baby+wipes+56+count&qid=1763985579&sprefix=huggies+natural+care+baby+wipes+56+count%2Caps%2C181&sr=8-8"
      },
      {
        id: 103,
        title: "Johnson's Baby Shampoo",
        price: 5.60,
        image: "jpg/Johnsons-Baby-Shampoo.jpg",
        view: "https://www.amazon.co.uk/3574660453072-Johnsons-Baby-Shampoo-50/dp/B00WURKEZW/ref=sr_1_6?crid=3QJ43HWJQ6LQP&dib=eyJ2IjoiMSJ9.AdcIO_5QdOtGwm4qfC4tQqHxh8DUMqvKeszoYsWCtk2x1DJsHGREspWrtpPyOb_Zb08JqIVftWd9LwEBcU6spDWKibw1QzRQ-ZGUOW009GOt9OXtQLpMfeeTFxC_xaX5AHMb9DdEOamFZSjgjBy1JTiv5tYM10XsXMyU-q_cSQLpqVDibZW11kHCIgLiIUxSiugGIjSLIiQHkBX1JQxJJQqxrNhsiGChHc8x-zZpLgVxK0pDl1nH5AV3fstX7kisXO4M1Na0sS2awIbdNfH5U_dzR8agGyXuDsF3g2eCwi0.R8jePjL0GYZPhQsuyT5l0YpAp1MajapwOP_sSsYrupw&dib_tag=se&keywords=johnsons+baby+shampoo&qid=1763985617&sprefix=johnsons+baby%2Caps%2C183&sr=8-6"
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
                <a href="${p.view}" class="btn btn-primary btn-sm">View</a>
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
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    //error handling for API specifically
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
