// src/Components/EditContactModal.js
import React, { useState, useEffect } from 'react';
import '../CSS/ViewModal.css'; // Reuse styles from the AddContactModal or adjust as needed

const EditContactModal = ({ contact, onClose, onUpdate }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Pre-fill the form fields with contact data
    if (contact) {
      setName(contact.name);
      setNumber(contact.number);
      setEmail(contact.email);
      setAddress(contact.address);
    }
  }, [contact]);

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
      const updatedContact = {
        ...contact,
        name,
        number,
        email,
        address
      };
      onUpdate(updatedContact);
      onClose();
    }
  };

  return React.createElement(
    'div',
    { className: 'modal-overlay', onClick: onClose },
    React.createElement(
      'div',
      { className: 'modal-content', onClick: (e) => e.stopPropagation() },
      React.createElement(
        'div',
        { className: 'modal-header' },
        React.createElement('h3', null, 'Edit Contact'),
        React.createElement('button', { className: 'modal-close', onClick: onClose }, 'X')
      ),
      React.createElement(
        'form',
        { className: 'modal-body', onSubmit: handleSubmit },
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { htmlFor: 'name' }, 'Name:'),
          React.createElement('input', {
            id: 'name',
            type: 'text',
            value: name,
            onChange: (e) => setName(e.target.value),
            className: errors.name ? 'input-error' : ''
          }),
          errors.name && React.createElement('div', { className: 'error' }, errors.name)
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { htmlFor: 'number' }, 'Number:'),
          React.createElement('input', {
            id: 'number',
            type: 'text',
            value: number,
            onChange: (e) => setNumber(e.target.value),
            className: errors.number ? 'input-error' : ''
          }),
          errors.number && React.createElement('div', { className: 'error' }, errors.number)
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { htmlFor: 'email' }, 'Email:'),
          React.createElement('input', {
            id: 'email',
            type: 'text',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: errors.email ? 'input-error' : ''
          }),
          errors.email && React.createElement('div', { className: 'error' }, errors.email)
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { htmlFor: 'address' }, 'Address:'),
          React.createElement('input', {
            id: 'address',
            type: 'text',
            value: address,
            onChange: (e) => setAddress(e.target.value),
            className: errors.address ? 'input-error' : ''
          }),
          errors.address && React.createElement('div', { className: 'error' }, errors.address)
        ),
        React.createElement(
          'button',
          { type: 'submit', className: 'submit-btn' },
          'Update Contact'
        )
      )
    )
  );
};

export default EditContactModal;
