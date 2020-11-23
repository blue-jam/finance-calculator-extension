import readCsv from '../utility/readCsv';
import fetchWithCORSProxy from '../utility/fetchWithCORSProxy';

const sourceUrl = 'https://www.mof.go.jp/jgbs/reference/interest_rate/jgbcm.csv';

export const fetchJpBondInterestRate = (): Promise<number> => {
    return fetchWithCORSProxy(sourceUrl)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
            const decoder = new TextDecoder('shift-jis');
            const text = decoder.decode(arrayBuffer);
            const table = readCsv(text);
            const col = table[1].indexOf('1年');

            return parseFloat(table[table.length - 2][col]);
        });
};
