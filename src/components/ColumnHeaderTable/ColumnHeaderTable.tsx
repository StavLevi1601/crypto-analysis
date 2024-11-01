import React from 'react';
import Tooltip from '../Tooltip/Tooltip'
import { RxQuestionMarkCircled } from 'react-icons/rx';
import style from "./style.module.scss"

export const ColumnHeaderTable: React.FC<{ title: string; tooltipText: string }> = ({ title, tooltipText }) => {
    return (
        <div className={style.columnHeader}>
            <Tooltip title={tooltipText}>
                <span className={style.iconDetails}><RxQuestionMarkCircled style={{ marginRight: '5px' }} /></span>
            </Tooltip>
            {title}
        </div>
    );
};

export default ColumnHeaderTable;
