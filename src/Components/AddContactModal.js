import React, { useState } from 'react';
import '../CSS/ViewModal.css'; // For custom styling

const AddContactModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!number || !/^\d{10}$/.test(number)) newErrors.number = 'Valid number is required';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (!address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newContact = {
        name,
        number,
        email,
        address
      };
      onAdd(newContact); // Add the new contact
      onClose(); // Close the modal
    }
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h3>Add Contact</h3>
          <button className='modal-close' onClick={onClose}>X</button>
        </div>
        <form className='modal-body' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <div className='error'>{errors.name}</div>}
          </div>
          <div className='form-group'>
            <label htmlFor='number'>Number:</label>
            <input
              id='number'
              type='text'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className={errors.number ? 'input-error' : ''}
            />
            {errors.number && <div className='error'>{errors.number}</div>}
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <div className='error'>{errors.email}</div>}
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Address:</label>
            <input
              id='address'
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={errors.address ? 'input-error' : ''}
            />
            {errors.address && <div className='error'>{errors.address}</div>}
          </div>
          <button type='submit' className='submit-btn'>
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;
