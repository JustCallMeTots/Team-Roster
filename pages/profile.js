import React from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function profile() {
  return (
    <div>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
