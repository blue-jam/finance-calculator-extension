import { fetchStockBeta } from '../fetch/stockBeta';
import { calcFairPrice } from '../calc/capm';

const handleDividendString = (dividendString: string): number[] => {
    return dividendString.split('～').map((dividend) => parseFloat(dividend));
};

const unwrapStockId = (wrappedStockId: string): string => {
    const trimmed = wrappedStockId.trim();
    return trimmed.slice(1, trimmed.length - 1);
};

const run = (expectedRateOfReturnOfIndex: number, riskFreeInterestRate: number): void => {
    const stockIdNode = document.querySelector('h3 .normal');
    const dividendNode = document.querySelector('#MTB0_81 + th + td');
    console.log(stockIdNode, dividendNode);

    if (!stockIdNode || !stockIdNode.textContent || !dividendNode || !dividendNode.textContent) {
        return;
    }

    const wrappedStockId = stockIdNode.textContent;
    const stockId = unwrapStockId(wrappedStockId);

    const dividendString = dividendNode.textContent;
    const dividendList = handleDividendString(dividendString);

    fetchStockBeta(stockId).then((beta) => {
        console.log('stock ID:', stockId);
        console.log('beta =', beta);
        console.log(
            `expected rate of return of index = ${expectedRateOfReturnOfIndex},\n` +
                `risk free interest rate = ${riskFreeInterestRate}`
        );

        const fairPriceList = dividendList.map((dividend) =>
            calcFairPrice(dividend, beta, expectedRateOfReturnOfIndex, riskFreeInterestRate)
        );
        const fairPriceText =
            fairPriceList.length == 1
                ? fairPriceList[0]
                : `${fairPriceList[0]}〜${fairPriceList[1]}`;
        console.log('Fair price =', fairPriceText);
    });
};

export default run;
