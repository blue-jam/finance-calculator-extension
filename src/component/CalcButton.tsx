import React from 'react';
import run from '../pageAction/index';

const CalcButton: React.FC = () => {
    const handleClick = () => {
        chrome.storage.sync.get(
            ['expectedRateOfReturnTopix', 'jpBondInterestRate'],
            ({ expectedRateOfReturnTopix, jpBondInterestRate }) => {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (tabs.length < 1 || !tabs[0].id) {
                        return;
                    }
                    console.log(expectedRateOfReturnTopix, jpBondInterestRate);

                    const code = `(${run.toString()})(${expectedRateOfReturnTopix}, ${jpBondInterestRate});`;

                    chrome.tabs.executeScript(tabs[0].id, {
                        code,
                    });
                });
            }
        );
    };

    return <button onClick={handleClick}>calc</button>;
};

export default CalcButton;
