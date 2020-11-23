const readCsv = (text: string): string[][] => {
    return text.split('\n').map((line) => line.split(','));
};

export default readCsv;
