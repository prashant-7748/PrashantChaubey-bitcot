import React from 'react';
import '../CSS/ViewModal.css'; // For custom styling

const ViewModal = ({ contact, onClose }) => {
  if (!contact) return null;

  return React.createElement(
    'div',
    { className: 'modal-overlay', onClick: onClose },
    React.createElement(
      'div',
      { className: 'modal-content', onClick: (e) => e.stopPropagation() },
      React.createElement(
        'div',
        { className: 'modal-header' },
        React.createElement('h3', null, 'Contact Details'),
        React.createElement('button', { className: 'modal-close', onClick: onClose }, 'X')
      ),
      React.createElement(
        'div',
        { className: 'modal-body' },
        React.createElement('p', null, React.createElement('strong', null, 'Name:'), ` ${contact.name}`),
        React.createElement('p', null, React.createElement('strong', null, 'Email:'), ` ${contact.email}`),
        React.createElement('p', null, React.createElement('strong', null, 'Number:'), ` ${contact.number}`),
        React.createElement('p', null, React.createElement('strong', null, 'Address:'), ` ${contact.address}`)
      )
    )
  );
};

export default ViewModal;
