import fetchWithCORSProxy from '../utility/fetchWithCORSProxy';

export const fetchStockBeta = (stockId: string): Promise<number> => {
    return fetchWithCORSProxy(`https://kabu-data.info/beta/beta_m_up/${stockId}_m.htm`)
        .then((response) => response.text())
        .then((text) => new DOMParser().parseFromString(text, 'text/html'))
        .then((document) => {
            const node = document.querySelectorAll('tbody tr');
            const row = node.item(2);
            const cell = row.querySelectorAll('td').item(22);

            if (!cell.textContent) {
                throw cell;
            }

            const number = parseFloat(cell.textContent);
            console.log(number);
            return number;
        });
};
