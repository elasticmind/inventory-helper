export function mapPureData(data) {
    return data.map((product) => ({ ...product, couplable: true }));
}

export function sortProducts(products, words = []) {
    return products.sort(comparatorGenerator(words));
}

function alphabetComparator(productA, productB) {
    return productA.productLabel.toLowerCase().localeCompare(productB.productLabel.toLowerCase());
}

function comparatorGenerator(words = []) {
    function weigh(product) {
        if (!words.length) {
            return 0;
        }

        const productLabelWords = product.productLabel.toLowerCase().split(' ');
        const joinedWords = [...words, ...productLabelWords];
        return joinedWords.length - (new Set(joinedWords)).size;
    }

    return function comparator(productA, productB) {
        return productB.couplable - productA.couplable
            || weigh(productB) - weigh(productA)
            || alphabetComparator(productA, productB);
    }
}

export function exportFormat(couplings, separator = ',', newLine = '\n') {
    var result = '';

    couplings
        .slice()
        .sort(categoryBasedSort)
        .forEach((coupling) => {
            coupling.surplusProducts.forEach((product) => {
                result += formatSurplusProduct(product) + newLine;
            })
            coupling.shortageProducts.forEach((product) => {
                result += formatShortageProduct(product) + newLine;
            })
            result += formatCouplingResult(coupling) + newLine;
        });

    return result;

    function categoryBasedSort(coupling1, coupling2) {
        function commonLengthCompare(string1, string2) {
            const smallerLength = Math.min(string1.length, string2.length);
            const sliced1 = string1.slice(0, smallerLength);
            const sliced2 = string2.slice(0, smallerLength);

            return sliced1.localeCompare(sliced2);
        }

        function categoryMin(products) {
            return products.reduce(
                (min, product) => commonLengthCompare(min, product.categoryId) <= 0 ? product.categoryId : min,
                products[0].categoryId
            );
        }

        const surplusCategoryMin1 = categoryMin(coupling1.surplusProducts);
        const surplusCategoryMin2 = categoryMin(coupling2.surplusProducts);

        coupling1.weight = surplusCategoryMin1;
        coupling2.weight = surplusCategoryMin2;

        return commonLengthCompare(surplusCategoryMin1, surplusCategoryMin2);
    }

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