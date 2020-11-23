/*
 * expectedRateOfReturn: 期待収益率
 * riskFreeInterestRate: 無リスク金利
 * dividend: 配当金
 */

export const calcExpectedRateOfReturn = (
    beta: number,
    expectedRateOfReturnOfIndex: number,
    riskFreeInterestRate: number
): number => beta * (expectedRateOfReturnOfIndex - riskFreeInterestRate) + riskFreeInterestRate;

export const calcFairPrice = (
    dividend: number,
    beta: number,
    expectedRateOfReturnOfIndex: number,
    riskFreeInterestRate: number
): number =>
    dividend / calcExpectedRateOfReturn(beta, expectedRateOfReturnOfIndex, riskFreeInterestRate);
