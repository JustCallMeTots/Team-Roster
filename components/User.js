import React from 'react';
import { PropTypes } from 'prop-types';

export default function User({
  image, userName, email,
}) {
  return (
    <>
      <header><img src={image} alt={userName} /></header>
      <h1>Howdy do {userName}</h1>
      <h3>{email}</h3>
    </>
  );
}

User.propTypes = {
  image: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

// User.defaultProps = {
//     image: https://lh3.googleusercontent.com/a-/AFdZucrawiC0B1GCtkf-_1xHgeaMX8suQaBc3ibHY1tczQ=s96-c-rg-br100,
//     userName: 'Tots',
//     email: 'Leowyatt09@gmail.com',
//     lastLogin: "Yesterday",
// }
