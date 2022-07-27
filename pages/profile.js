import React from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import User from '../components/User';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <User
        userName={user.userName}
        email={user.email}
        image={user.image}
      />
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
