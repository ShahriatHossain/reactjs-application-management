import React from 'react';

import classes from '../Table.css';
import TableBodyCell from './TableBodyCell/TableBodyCell';

export const tableBody = (props) => {
    const rows = props.data.map(r => {
        // mapping column values as row's cell
        const cells = Object.keys(r).map((k, i) => {
            return k !== 'id' ? <TableBodyCell key={k + i} val={r[k]} /> : '';
        });

        // adding cells for each rows
        return <div key={r.id} className={classes.RespTableRow}>
            {cells}
        </div>
    })
    return (
        <div className={classes.RespTableBody}>
            {rows}
        </div>
    );
};

export default tableBody;