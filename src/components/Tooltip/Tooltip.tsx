import React, { useState } from 'react';
import style from './style.module.scss';

type TooltipProps = {
    title: string;
    children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className={style.tooltipContainer}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && <div className={style.tooltip}>{title}</div>}
        </div>
    );
};

export default Tooltip;
