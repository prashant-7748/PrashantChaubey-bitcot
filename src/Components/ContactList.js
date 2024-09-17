import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API calls
import { FaEye, FaEdit, FaTrashAlt, FaPlusCircle, FaUserCircle } from 'react-icons/fa';
import '../CSS/ContactList.css'; // For custom styling
import ViewModal from './ViewModal'; // Import the ViewModal component
import AddContactModal from './AddContactModal'; // Import the AddContactModal component
import EditContactModal from './EditContactModal'; // Import the EditContactModal component

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch contacts from the API
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json'); // Replace with your API endpoint
        setContacts(response.data);
      } catch (err) {
        setError('Failed to fetch contacts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
  };

  const handleAdd = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const handleUpdate = (updatedContact) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container'>
      <div className='contact-list'>
        <div className='header'>
          <h2>All Contacts</h2>
          <button className='add-btn' onClick={() => setShowAddModal(true)}>
            <FaPlusCircle className='custom-icon' />
          </button>
        </div>

        <input
          type='text'
          placeholder='Search Contact'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-input'
        />

        <div className='contact-items'>
          {filteredContacts.map(contact => (
            <div key={contact.id} className='contact-item'>
              <span className='contact-id'>{contact.id}</span>
              <FaUserCircle className='custom-icon' />
              <div className='contact-details'>
                <span className='contact-name'>{contact.name}</span>
                <span className='contact-number'>{contact.number}</span>
              </div>
              <div className='contact-actions'>
                <FaEye className='icon' onClick={() => handleView(contact)} />
                <FaEdit className='icon' onClick={() => { setSelectedContact(contact); setShowEditModal(true); }} />
                <FaTrashAlt className='icon' onClick={() => handleDelete(contact.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedContact && (
        <ViewModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}

      {showAddModal && (
        <AddContactModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
        />
      )}

      {showEditModal && (
        <EditContactModal
          contact={selectedContact}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ContactList;
