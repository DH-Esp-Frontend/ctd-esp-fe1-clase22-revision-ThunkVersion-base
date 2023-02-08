import React from "react";

const VistaItem = (item:{ item:{ name:string, sprite:string } }) => {
  
  return (
    <div >
      <h4>Item: { item.item.name }</h4>
      <img src={ item.item.sprite } />
    </div>
  );
}

export default VistaItem;
