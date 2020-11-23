import fetchWithCORSProxy from '../utility/fetchWithCORSProxy';
import readCsv from '../utility/readCsv';

const jpxBaseUrl = 'https://www.jpx.co.jp';
const topixDataPageURL = `${jpxBaseUrl}/markets/indices/related/ratio/index.html`;

const fetchExpectedRateOfReturnTopix = (): Promise<number> => {
    const domParser = new DOMParser();

    return fetchWithCORSProxy(topixDataPageURL)
        .then((response) => response.text())
        .then((text) => domParser.parseFromString(text, 'text/html'))
        .then((document) => {
            const csvIconNode = document.querySelector('img[title="icon-csv"]');

            if (!csvIconNode || !csvIconNode.parentElement) {
                throw csvIconNode;
            }

            const linkNode = csvIconNode.parentElement;
            if (!linkNode) {
                throw linkNode;
            }

            const csvUrl = jpxBaseUrl + linkNode.getAttribute('href');

            return fetchWithCORSProxy(csvUrl);
        })
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
            const decoder = new TextDecoder('shift-jis');
            const text = decoder.decode(arrayBuffer);
            const table = readCsv(text);
            const col = table[0].indexOf('"１２ヶ月前の月末終値との比較"');

            return parseFloat(table[1][col].replace('"', ''));
        });
};

export default fetchExpectedRateOfReturnTopix;
