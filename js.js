// Danh sách sản phẩm với thông tin giá, loại và tên
const products = [
    { name: 'Sản phẩm 1', price: 10, category: 'Loại 1' },
    { name: 'Sản phẩm 2', price: 20, category: 'quan' },
    { name: 'Sản phẩm 2', price: 30, category: 'ao' },
    { name: 'Sản phẩm 2', price: 15, category: 'giay' },
    { name: 'Sản phẩm 5', price: 25, category: 'Loại 2' }
];

// Lấy các phần tử DOM
const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const priceInput = document.getElementById('priceInput');
const searchButton = document.getElementById('searchButton');
const noResults = document.getElementById('noResults');

// Hàm hiển thị danh sách sản phẩm
function displayProducts(products) {
    productList.innerHTML = '';
    noResults.classList.add('hidden');
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - Giá: $${product.price} - Loại: ${product.category}`;
        productList.appendChild(listItem);
    });
}

// Hàm kiểm tra xem một sản phẩm có phù hợp với tiêu chí tìm kiếm hay không
function isMatchingProduct(product, searchTerm, selectedCategory, maxPrice) {
    const productName = product.name.toLowerCase();
    const productCategory = product.category.toLowerCase();
    const productPrice = product.price;

    const nameMatch = productName.includes(searchTerm);
    const categoryMatch = selectedCategory === '' || productCategory === selectedCategory;
    const priceMatch = isNaN(maxPrice) || productPrice <= maxPrice;

    return nameMatch && categoryMatch && priceMatch;
}

// Ban đầu, hiển thị tất cả sản phẩm
displayProducts(products);

// Lắng nghe sự kiện tìm kiếm
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    const maxPrice = parseFloat(priceInput.value);

    const filteredProducts = products.filter(product => isMatchingProduct(product, searchTerm, selectedCategory, maxPrice));

    // Hiển thị sản phẩm tìm kiếm hoặc thông báo không tìm thấy
    if (filteredProducts.length > 0) {
        displayProducts(filteredProducts);
    } else {
        productList.innerHTML = '';
        noResults.classList.remove('hidden');
    }
});

