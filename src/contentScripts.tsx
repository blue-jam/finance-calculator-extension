import React from 'react';
import ReactDOM from 'react-dom';
import FairValueComponent from './component/FairValueComponent';

const handleDividendString = (dividendString: string): number[] => {
    return dividendString.split('～').map((dividend) => parseFloat(dividend));
};

const unwrapStockId = (wrappedStockId: string): string => {
    const trimmed = wrappedStockId.trim();
    return trimmed.slice(1, trimmed.length - 1);
};

const run = (): void => {
    const stockValueTable = document.querySelector('.kabuNowStatus tr');
    if (!stockValueTable) {
        return;
    }

    const componentEntry = document.createElement('div');
    stockValueTable.appendChild(componentEntry);

    const stockIdNode = document.querySelector('h3 .normal');
    const dividendNode = document.querySelector('#MTB0_81 + th + td');

    if (!stockIdNode || !stockIdNode.textContent || !dividendNode || !dividendNode.textContent) {
        return;
    }

    const wrappedStockId = stockIdNode.textContent;
    const stockId = unwrapStockId(wrappedStockId);
    console.log('stock ID:', stockId);

    const dividendString = dividendNode.textContent;
    const dividendList = handleDividendString(dividendString);
    console.log('dividend = ', dividendList);

    ReactDOM.render(
        <FairValueComponent stockId={stockId} dividendList={dividendList} />,
        componentEntry
    );
};

run();
