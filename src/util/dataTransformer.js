export function categorize(data) {
    function isLeafCategory(obj) {
        return obj.hasOwnProperty('products');
    }

    // TODO: Consider TCO-friendly approach
    function traverse(category, path = [], result = []) {
        if (isLeafCategory(category)) {
            var products = Object.keys(category.products).map((label) => {
                    return {
                        label,
                        ...category.products[label],
                    };
                });

            result.push({
                id: category.id,
                path,
                products,
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

    return traverse(data);
}