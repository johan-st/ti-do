import React from 'react';

const Nav = ({ children }) => {
  return (
    <div>
      <ul>
        {children.map((child, i) => (
          <li key={'navlink-' + i}>{child}</li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
