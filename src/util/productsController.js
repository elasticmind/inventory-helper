export function searchProducts(products, searchTerm) {
    const searchTexts = searchTerm
        .split(' ')
        .map((word) => word.toLowerCase());

    return products.filter((product) => {
        const label = product.productLabel.toLowerCase();
        return searchTexts.every((searchText) => label.includes(searchText));
    });
}

export function hasProducts(products, searchTerm) {
    return searchProducts(products, searchTerm).length > 0;
}