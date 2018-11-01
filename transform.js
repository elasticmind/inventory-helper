const fs = require('fs');
const pdf = require('pdf-parse');

const filePath = process.argv[2];

readPdf(filePath);

async function readPdf(filePath) {
    let dataBuffer = fs.readFileSync(filePath);

    pdf(dataBuffer).then(function (data) {
        fs.writeFileSync(
            filePath.replace(/pdf$/, 'json'),
            JSON.stringify(transformText(data.text), null, 2)
        );
    });
}

function transformText(text) {
    const originalLines = text.split('\n');
    const lines = dropPageSeparatorLines(originalLines);

    const result = [];
    var currentCategory = null;
    var skip = true;

    for (let index = 0; index < lines.length - 1; index++) {
        const line = lines[index];
        const nextLine = lines[index + 1];

        if (isCategoryEndLine(nextLine)) {
            currentCategory = null;
            index += 2;
            continue;
        }

        if (isDocumentEndLine(nextLine)) {
            break;
        }

        if (isCategoryStartLine(line)) {
            currentCategory = line;
            skip = false;
        } else if (!skip) {
            const { productId, productLabel } = parseProductLine(nextLine);
            const { productCount, productValue } = parseValueLine(line);
            const { categoryId, categoryPath } = parseCategoryLine(currentCategory);
            result.push({
                productId,
                productLabel,
                productCount,
                productValue,
                categoryId,
                categoryPath,
            });

            index += 1;
        }
    }

    return result;

    function parseCategoryLine(line) {
        const match = /^(\d{3,})(.*)$/.exec(line);
        return {
            categoryId: match[1],
            categoryPath: match[2].replace(/\\\\ /g, '\\ '),
        };
    }

    function parseProductLine(line) {
        const [productId, productLabel] = line.split('  ');
        return {productId, productLabel};
    }

    function parseValueLine(line) {
        const match = /\d{2}(-?\d+\.\d{3})-?\d+\.\d{2}-?\d+\.\d{2}(-?\d+\.\d{2})$/.exec(line);
        return {
            productCount: Number(match[1]),
            productValue: Number(match[2]),
        };
    }

    function dropPageSeparatorLines(lines) {
        var skip = false;

        return lines
            .reduce((result, line) => {
                if (isSkipStartLine(line)) {
                    skip = true;
                } else if (isSkipEndLine(line)) {
                    skip = false;
                    return result;
                }

                if (skip) {
                    return result;
                }

                return [...result, line];
            }, []);

        function isSkipStartLine(line) {
            return /^Készítette/.test(line);
        }
    
        function isSkipEndLine(line) {
            return /^Fogyasztói érték/.test(line);
        }
    }

    function isCategoryStartLine(line) {
        return /^\d{3,}[^.](?:[A-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ]+\\?\s?)+/.test(line);
    }

    function isCategoryEndLine(line) {
        return /^CS\.Összesen/.test(line);
    }

    function isDocumentEndLine(line) {
        return /^FR\.Összesen/.test(line);
    }
}