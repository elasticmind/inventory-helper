export function listProducts(data) {
    function isLeafCategory(obj) {
        return obj.hasOwnProperty('products');
    }

    // TODO: Consider TCO-friendly approach
    function traverse(category, path = [], result = []) {
        if (isLeafCategory(category)) {
            Object.keys(category.products).forEach((label) => {
                result.push({
                    label,
                    ...category.products[label],
                    categoryId: category.id,
                    path,
                });
            });
        } else {
            Object.keys(category).forEach((subCategoryLabel) => {
                traverse(
                    category[subCategoryLabel],
                    [...path, subCategoryLabel],
                    result
                );
            });
        }
        return result;
    }

    return sortProducts(traverse(data));
}

export function sortProducts(products) {
    return products.sort((productA, productB) => {
        return productA.label.localeCompare(productB.label);
    });
}