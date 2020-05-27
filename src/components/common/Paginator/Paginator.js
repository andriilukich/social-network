import React, { useState } from 'react';
import classes from './PaginatorStyles.module.scss';
import classNames from 'classnames';

const Paginator = ({ totalItemsAmount, pageSize, currentPage, onPageChange, portionSize = 5 }) => {
  const pagesAmount = Math.ceil(totalItemsAmount / pageSize);
  const portionsAmount = Math.ceil(pagesAmount / portionSize);
  const [portionNum, setPortionNum] = useState(1);
  const leftPotionBorder = (portionNum - 1) * portionSize + 1;
  const rightPortionBorder = portionNum * portionSize;
  const pages = [];

  for (let i = 1; i <= pagesAmount; i++) pages.push(i);
  
  return (
    <div className={classes.Paginator}>
      {portionNum > 1 && (
        <button className={classes.Paginator__Btn} onClick={() => setPortionNum(portionNum - 1)}>back</button>
      )}
      <ul className={classes.Paginator__ItemList} >
        {pages
          .filter(p => p >= leftPotionBorder && p <= rightPortionBorder)
          .map(p => {
            return (
              <li
                className={classNames({
                  [classes.Paginator__Item_active]: currentPage === p
                }, classes.Paginator__Item)}
                key={p}
                onClick={() => onPageChange(p)}
              >
                {p}
              </li>
            )
          }
          )}
      </ul>
      {portionsAmount > portionNum && (
        <button className={classes.Paginator__Btn} onClick={() => setPortionNum(portionNum + 1)}>next</button>
      )}
    </div>
  );
};

export default Paginator;
