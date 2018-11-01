export function sortProducts(products, words = []) {
    return products.sort(comparatorGenerator(words));
}

function alphabetComparator(productA, productB) {
    return productA.productLabel.toLowerCase().localeCompare(productB.productLabel.toLowerCase());
}

function comparatorGenerator(words = []) {
    function weigh(product) {
        const productLabelWords = product.productLabel.toLowerCase().split(' ');
        const joinedWords = [...words, ...productLabelWords];
        return joinedWords.length - (new Set(joinedWords)).size;
    }

    return function comparator(productA, productB) {
        return words.length
            ? weigh(productB) - weigh(productA) || alphabetComparator(productA, productB)
            : alphabetComparator(productA, productB);
    }
}

export function exportFormat(couplings, separator = ',', newLine = '\n') {
    var result = '';

    couplings.forEach((coupling) => {
        coupling.surplusProducts.forEach((product) => {
            result += formatSurplusProduct(product) + newLine;
        })
        coupling.shortageProducts.forEach((product) => {
            result += formatShortageProduct(product) + newLine;
        })
        result += formatCouplingResult(coupling) + newLine;
    });

    return result;

    function formatSurplusProduct(product) {
        return `${product.productLabel}${separator}\
${Math.abs(product.productCount)}${separator}\
${separator}\
${Math.abs(product.productValue)}${separator}\
${separator}\
${separator}`;
    }

    function formatShortageProduct(product) {
        return `${product.productLabel}${separator}\
${separator}\
${Math.abs(product.productCount)}${separator}\
${separator}\
${Math.abs(product.productValue)}${separator}\
${separator}`;
    }

    function formatCouplingResult(coupling) {
        return `Összesen${separator}\
${Math.abs(coupling.result.surplusCountSum)}${separator}\
${Math.abs(coupling.result.shortageCountSum)}${separator}\
${Math.abs(coupling.result.surplusValueSum)}${separator}\
${Math.abs(coupling.result.shortageValueSum)}${separator}\
${coupling.result.valueDiff}`
    }
}