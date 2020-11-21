import ReactDOM from 'react-dom';
import React from 'react';

import './style/options.scss';

const OptionPane: React.FC = () => {
    const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

    return (
        <React.Fragment>
            <div id="butonDiv">
                {kButtonColors.map((color) => (
                    <button
                        key={color}
                        style={{ backgroundColor: color }}
                        onClick={() =>
                            chrome.storage.sync.set({ color }, () => console.log('color is', color))
                        }
                    />
                ))}
            </div>
            <div>
                <p>Choose a different background color!</p>
            </div>
        </React.Fragment>
    );
};

ReactDOM.render(<OptionPane />, document.getElementById('app'));
