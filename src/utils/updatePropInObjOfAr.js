export const updatePropInObjOfAr = (items, itemID, objPropName, newObjProps) => {
  return items.map(item => {
    return (item[objPropName] === itemID) ?
      { ...item, ...newObjProps } :
      item;
  }
  );
};