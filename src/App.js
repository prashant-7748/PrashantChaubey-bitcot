import React from 'react';
import './App.css';
import ContactList from './Components/ContactList'; // Import your ContactList component

function App() {
  return (
    <div className="App">
      <div className="App-content">
        {/* Render ContactList component */}
        <ContactList />
      </div>
    </div>
  );
}

export default App;
