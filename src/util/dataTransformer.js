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

export function sortProducts(products, words = []) {
    return products.sort(comparatorGenerator(words));
}

function alphabetComparator(productA, productB) {
    return productA.label.toLowerCase().localeCompare(productB.label.toLowerCase());
}

function comparatorGenerator(words = []) {
    function weigh(product) {
        const productLabelWords = product.label.toLowerCase().split(' ');
        const joinedWords = [...words, ...productLabelWords];
        return joinedWords.length - (new Set(joinedWords)).size;
    }

    return function comparator(productA, productB) {
        return weigh(productB) - weigh(productA) || alphabetComparator(productA, productB);
    }
}

export function exportFormat(couplings, separator = ',', newLine = '\n') {
    var result = '';

    couplings.forEach((coupling) => {
        coupling.surplusProducts.forEach((product) => {
            result += formatProduct(product) + newLine;
        })
        coupling.shortageProducts.forEach((product) => {
            result += formatProduct(product) + newLine;
        })
        result += `${separator}${separator}${coupling.result}` + newLine;
        result += newLine;
    });

    return result;
    
    function formatProduct(product) {
        return `${product.id}${separator}${product.label}${separator}${product.count}`;
    }
}