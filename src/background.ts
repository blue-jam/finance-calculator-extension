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
});
