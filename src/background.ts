import fetchExpectedRateOfReturnTopix from './fetch/topix';
import { fetchJpBondInterestRate } from './fetch/jpBond';

chrome.runtime.onInstalled.addListener(function () {
    Promise.all([fetchExpectedRateOfReturnTopix(), fetchJpBondInterestRate()]).then(
        ([expectedRateOfReturnTopix, jpBondInterestRate]) => {
            chrome.storage.sync.set({ expectedRateOfReturnTopix, jpBondInterestRate }, function () {
                console.log('Expected Rate of return of TOPIX:', expectedRateOfReturnTopix);
                console.log('JP bond interest rate:', jpBondInterestRate);
            });
        }
    );
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: 'site3.sbisec.co.jp' },
                    }),
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);
    });
});
