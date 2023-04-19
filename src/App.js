import React, { useState, useEffect } from 'react';
import './App.css';
import CRUD from './CRUD';
import List from './List';
import Sort from './Sort';
import Filter from './Filter';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function App() {
  const [key, setKey] = useState(localStorage.getItem('selectedTab') || 'task');

  const handleSelect = (selectedKey) => {
    setKey(selectedKey);
    localStorage.setItem('selectedTab', selectedKey);
  }

  return (
    <div className="App">
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={handleSelect} className="mb-3">
        <Tab eventKey="task" title="1" unmountOnExit>
          <List />
        </Tab>
        <Tab eventKey="task2" title="2">
         <Filter />
        </Tab>
        <Tab eventKey="task3" title="3">
          <Sort />
        </Tab>
        <Tab eventKey="task4" title="4">
          <CRUD />
        </Tab>
      </Tabs> 
    </div>
  );
}

export default App;
