import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

import './options.scss';

const OptionPane: React.FC = () => {
    const [expectedRateOfReturnTopix, setERRT] = useState<number>(0);
    const [jpBondInterestRate, setJpBondInterestRate] = useState<number>(0);

    useEffect(
        () =>
            chrome.storage.sync.get(['expectedRateOfReturnTopix', 'jpBondInterestRate'], (data) => {
                setERRT(data.expectedRateOfReturnTopix);
                setJpBondInterestRate(data.jpBondInterestRate);
            }),
        []
    );

    const handleERRIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setERRT(e.target.valueAsNumber);
        chrome.storage.sync.set({ expectedRateOfReturnTopix: e.target.valueAsNumber });
    };
    const handleJpBondInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJpBondInterestRate(e.target.valueAsNumber);
        chrome.storage.sync.set({ jpBondInterestRate: e.target.valueAsNumber });
    };

    return (
        <React.Fragment>
            <h1>Finance Calculator Extension options</h1>
            <div>
                <label>
                    TOPIXの期待収益率(%):
                    <input
                        type="number"
                        value={expectedRateOfReturnTopix}
                        onChange={handleERRIChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    日本国債の期待収益率(%):
                    <input
                        type="number"
                        value={jpBondInterestRate}
                        onChange={handleJpBondInterestRateChange}
                    />
                </label>
            </div>
        </React.Fragment>
    );
};

ReactDOM.render(<OptionPane />, document.getElementById('app'));
