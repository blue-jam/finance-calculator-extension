import React, { useEffect, useState } from 'react';
import { calcFairPrice } from '../calc/capm';
import { fetchStockBeta } from '../fetch/stockBeta';

import './FairValueComponent.scss';

interface Props {
    stockId: string;
    dividendList: number[];
}

const FairValueComponent: React.FC<Props> = ({ stockId, dividendList }: Props) => {
    const [beta, setBeta] = useState(0);
    const [expectedRateOfReturnOfIndex, setERRI] = useState<number | undefined>(undefined);
    const [riskFreeInterestRate, setRiskFreeInterestRate] = useState<number | undefined>(undefined);

    useEffect(() => {
        fetchStockBeta(stockId).then(setBeta);
    }, []);
    chrome.storage.sync.get(
        ['expectedRateOfReturnTopix', 'jpBondInterestRate'],
        ({ expectedRateOfReturnTopix, jpBondInterestRate }) => {
            console.log('Expected rate of return of TOPIX:', expectedRateOfReturnTopix);
            console.log('Interest rate of JP bonds:', jpBondInterestRate);
            setERRI(expectedRateOfReturnTopix);
            setRiskFreeInterestRate(jpBondInterestRate);
        }
    );

    let fairPriceText;
    if (beta && expectedRateOfReturnOfIndex && riskFreeInterestRate) {
        const fairPriceList = dividendList
            .map((dividend) =>
                calcFairPrice(dividend, beta, expectedRateOfReturnOfIndex, riskFreeInterestRate)
            )
            .map((value) => value.toFixed(1));
        fairPriceText =
            fairPriceList.length == 1
                ? fairPriceList[0]
                : `${fairPriceList[0]}〜${fairPriceList[1]}`;
    } else {
        fairPriceText = '未計算';
    }

    return (
        <td className="fm01">
            <div>公正価格: {fairPriceText}</div>
            <div>
                <label>
                    β:{' '}
                    <input
                        className="FairValueComponent-betaInput"
                        type="number"
                        step={0.01}
                        value={beta}
                        onChange={(e) => setBeta(e.target.valueAsNumber)}
                    />
                </label>
            </div>
        </td>
    );
};

export default FairValueComponent;
