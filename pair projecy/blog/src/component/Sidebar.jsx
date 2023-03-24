import React, { useState } from 'react';
import '../component/css/SideBar.css'
function Sidebar() {
  const [links, setLinks] = useState([
    { name: 'Group 1', url: '/groups/1' },
    { name: 'Group 2', url: '/groups/2' },
    { name: 'Page 1', url: '/pages/1' },
    { name: 'Page 2', url: '/pages/2' },
  ]);

  return (
    <div className="sidebar">
      <h2>Popular Groups & Pages</h2>
      <ul>
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;


