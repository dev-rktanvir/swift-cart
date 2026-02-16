// Load All Products Data
const loadAllProducts = () => {
  const url = "https://fakestoreapi.com/products";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayTrendingProducts(data)
      displayCategoryProducts(data)
      removeActive();
      const allBtn = document.getElementById("btn-all");
      allBtn.classList.add("active");
    })
}

// Display Trending Products
const displayTrendingProducts = (products) => {
  // Target display location
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = ""

  // Sort by rating (High → Low)
  const topRatedProducts = products
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 3); // Take top 3

  // Loop Through
  topRatedProducts.forEach(product => {
    // Create Element
    const card = document.createElement("div");
    card.innerHTML = `
    <!-- Card -->
        <div class="border border-slate-200 rounded-2xl h-full">
          <!-- Image -->
          <div class="p-10 bg-slate-200 flex items-center justify-center rounded-t-2xl">
            <img class="w-72 h-72" src="${product.image}" alt="">
          </div>
          <!-- Content -->
          <div class="space-y-4 p-4">
            <!-- Category & Review -->
            <div class="flex items-center justify-between">
              <button class="text-primary font-semibold bg-primary/10 py-1 px-3 rounded-full">${product.category}</button>
              <div class="flex items-center gap-1">
                <i class="fa-solid fa-star text-yellow-500"></i>
                <p class="text-accent">${product.rating.rate} (${product.rating.count})</p>
              </div>
            </div>

            <h3 class="text-secondary font-semibold text-xl truncate w-11/12">${product.title}</h3>
            <p class="text-secondary font-bold text-2xl">$${product.price}</p>

            <!-- Buttons -->
            <div class="flex items-center gap-3">
              <button onclick="loadProductDetails(${product.id})"
                class="border border-slate-200 px-10 py-2 rounded-lg cursor-pointer hover:bg-primary hover:text-white">
                <i class="fa-regular fa-eye"></i> Details
              </button>
              <button
                class="border border-slate-200 px-10 py-2 rounded-lg cursor-pointer bg-primary text-white hover:bg-white hover:text-primary hover:border-primary">
                <i class="fas fa-cart-shopping"></i> Add
              </button>
            </div>
          </div>
        </div>
    `
    // Append Element
    productContainer.append(card);
  })

}

// Load Category Buttons
const loadCategoryButtons = () => {
  const url = "https://fakestoreapi.com/products/categories";
  fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryButtons(data))
}

// Display Category Buttons
const displayCategoryButtons = (buttons) => {
  // Target Display Location
  const categoryBtnContainer = document.getElementById("categoryBtnContainer");

  // Loop Through
  buttons.forEach(button => {
    // Create Element
    const btn = document.createElement("div");
    btn.innerHTML = `
        <button id="${button}" data-category="${button}" onclick="loadCategoryProducts(this.dataset.category)" class="border border-slate-300 px-5 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white">
           ${button}
        </button>
        `
    // Append Eement
    categoryBtnContainer.append(btn);
  })

}

// Load Category Products
const loadCategoryProducts = (category) => {
  const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayCategoryProducts(data)
      removeActive();
      const clickedBtn = document.getElementById(`${category}`)
      clickedBtn.classList.add("active")
    })
}

// Display category products
const displayCategoryProducts = (products) => {
  // Target Location
  const categoryProduct = document.getElementById("categoryProduct");
  categoryProduct.innerHTML = "";

  // Loop Through
  products.forEach(product => {
    // Create Element
    const div = document.createElement("div");
    div.innerHTML = `
    <!-- Card -->
        <div class="border border-slate-200 rounded-2xl h-full">
          <!-- Image -->
          <div class="p-10 bg-slate-200 flex items-center justify-center rounded-t-2xl">
            <img class="w-72 h-72" src="${product.image}" alt="">
          </div>
          <!-- Content -->
          <div class="space-y-4 p-4">
            <!-- Category & Review -->
            <div class="flex items-center justify-between">
              <button class="text-primary font-semibold bg-primary/10 py-1 px-3 rounded-full">${product.category}</button>
              <div class="flex items-center gap-1">
                <i class="fa-solid fa-star text-yellow-500"></i>
                <p class="text-accent">${product.rating.rate} (${product.rating.count})</p>
              </div>
            </div>

            <h3 class="text-secondary font-semibold text-xl truncate w-11/12">${product.title}</h3>
            <p class="text-secondary font-bold text-2xl">$${product.price}</p>

            <!-- Buttons -->
            <div class="flex items-center gap-3">
              <button onclick="loadProductDetails(${product.id})"
                class="border border-slate-200 px-10 py-2 rounded-lg cursor-pointer hover:bg-primary hover:text-white">
                <i class="fa-regular fa-eye"></i> Details
              </button>
              <button
                class="border border-slate-200 px-10 py-2 rounded-lg cursor-pointer bg-primary text-white hover:bg-white hover:text-primary hover:border-primary">
                <i class="fas fa-cart-shopping"></i> Add
              </button>
            </div>
          </div>
        </div>
    `
    // Append Element
    categoryProduct.append(div);
  })
}

// Remove active class
const removeActive = () => {
  const activeBtn = document.querySelectorAll(".active");
  activeBtn.forEach(btn => btn.classList.remove("active"));
}

// Hide & Show Section
const showSections = (clickedBtn, sectionIds) => {
  // Add Active class
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach(item => {
    item.classList.remove("active-page");
  });

  clickedBtn.classList.add("active-page");

  // Hide & show
  const sections = document.querySelectorAll(".page-section");

  sections.forEach(section => {
    section.classList.add("hidden");
  });

  sectionIds.forEach(id => {
    document.getElementById(id).classList.remove("hidden");
  });
};

// Load product details
const loadProductDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById("my_modal_5").showModal();
      displayProductDetails(data)
    })
}

// Display product details
const displayProductDetails = (product) => {
  // Target location
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = "";

  // Create element
  const div = document.createElement("div");
  div.innerHTML = `
  <!-- Card -->
        <div class="border border-slate-200 rounded-2xl h-full">
          <!-- Image -->
          <div class="p-10 bg-slate-200 flex items-center justify-center rounded-t-2xl">
            <img class="w-72 h-72" src="${product.image}" alt="">
          </div>
          <!-- Content -->
          <div class="space-y-4 p-4">
            <!-- Category & Review -->
            <div class="flex items-center justify-between">
              <button class="text-primary font-semibold bg-primary/10 py-1 px-3 rounded-full">${product.category}</button>
              <div class="flex items-center gap-1">
                <i class="fa-solid fa-star text-yellow-500"></i>
                <p class="text-accent">${product.rating.rate} (${product.rating.count})</p>
              </div>
            </div>

            <h3 class="text-secondary font-semibold text-xl">${product.title}</h3>
            <p class="text-justify mt-4 text-accent">$${product.description}</p>
            <p class="text-secondary font-bold text-2xl">$${product.price}</p>

            <!-- Buttons -->
            <div class="flex items-center gap-3">
              <button onclick="loadProductDetails(${product.id})"
                class="border border-slate-200 px-10 py-2 rounded-lg cursor-pointer hover:bg-primary hover:text-white">
                <i class="fa-solid fa-hand-holding-dollar"></i> Buy Now
              </button>
              <button
                class="border border-slate-200 px-10 py-2 rounded-lg cursor-pointer bg-primary text-white hover:bg-white hover:text-primary hover:border-primary">
                <i class="fas fa-cart-shopping"></i> Add
              </button>
            </div>
          </div>
        </div>
  `
  // append element
  detailsContainer.append(div);
}

loadAllProducts();
loadCategoryButtons();