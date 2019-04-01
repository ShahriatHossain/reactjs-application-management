import React from 'react';

import classes from '../../Table.css';

export const tableBodyCell = (props) => {
    return (
        <div className={classes.TableBodyCell}>
            {props.val}
        </div>
    );
};

export default tableBodyCell;