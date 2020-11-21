import React, { useState } from 'react';

const ColorButton: React.FC = () => {
    const [color, setColor] = useState('#ffffff');

    chrome.storage.sync.get('color', function (data) {
        setColor(data.color);
    });

    const handleClick = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length < 1 || !tabs[0].id) {
                return;
            }
            chrome.tabs.executeScript(tabs[0].id, {
                code:
                    'document.body.style.backgroundColor = "' +
                    color +
                    '"; console.log("success");',
            });
        });
    };

    return (
        <button style={{ backgroundColor: color }} onClick={handleClick}>
            color
        </button>
    );
};

export default ColorButton;
