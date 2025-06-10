import { VerovioToolkit } from 'verovio/esm';
import createVerovioModule  from 'verovio/wasm';
import {readFileSync, writeFileSync}  from 'node:fs';

const verovioModule = await createVerovioModule();
const verovioToolkit = new VerovioToolkit(verovioModule);
verovioToolkit.setOptions({
    xmlIdSeed: 1,
})

try {
    const data = readFileSync('./test-verovio-grace.xml', 'utf8');
    verovioToolkit.loadData(data);
    const timeMap = verovioToolkit.renderToTimemap({
        includeMeasures: true,
        includeRests: true,
    });

    writeFileSync('./generated-timeMap.txt', JSON.stringify(timeMap,  null, 2));
    writeFileSync('./generated-svg.svg', verovioToolkit.renderToSVG(1));
} catch (err) {
    console.error(err);
}

try {
    const data = readFileSync('./test-verovio-grace.mei', 'utf8');
    verovioToolkit.loadData(data);
    const timeMap = verovioToolkit.renderToTimemap({
        includeMeasures: true,
        includeRests: true,
    });

    writeFileSync('./generated-timeMap-mei.txt', JSON.stringify(timeMap,  null, 2));
    writeFileSync('./generated-svg-mei.svg', verovioToolkit.renderToSVG(1));
} catch (err) {
    console.error(err);
}