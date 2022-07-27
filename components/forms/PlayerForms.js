import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createPlayers, updatePlayers } from '../../api/playerData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  playerName: '',
  position: '',
  playerImage: '',
  captian: false,
};

function PlayerForms({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj?.firebaseKey) {
      updatePlayers(formInput)
        .then(() => router.push('/team'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayers(payload).then(() => {
        router.push('/team');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Player</h2>
      <FloatingLabel controlId="floatingInput1" label="Player Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Player Name" name="playerName" value={formInput.playerName} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Player Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter Player Image" name="playerImage" value={formInput.playerImage} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Position" className="mb-3">
        <Form.Control type="text" placeholder="Position" name="position" value={formInput.position} onChange={handleChange} required />
      </FloatingLabel>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="captian"
        name="captian"
        label="captian?"
        checked={formInput.captian}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          captian: e.target.checked,
        }))}
      />
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player</Button>
    </Form>
  );
}

PlayerForms.propTypes = {
  obj: PropTypes.shape({
    playerName: PropTypes.string,
    playerImage: PropTypes.string,
    position: PropTypes.string,
    captian: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

PlayerForms.defaultProps = {
  obj: initialState,
};

export default PlayerForms;
