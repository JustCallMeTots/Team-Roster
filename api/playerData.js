import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;


//GET PLAYERS
const getPlayers = (uid) => new Promise((resolve, reject) => {
    axios.get(`${dbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
      .then((response) => {
        if (response.data) {
          resolve(Object.values(response.data));
        } else {
          resolve([]);
        }
      })
      .catch((error) => reject(error));
  });
  
  // CREATE PLAYERS
  const createPlayers = (playerObj) => new Promise((resolve, reject) => {
    axios.post(`${dbUrl}/players.json`, authorObj)
      .then((response) => {
        const payload = { firebaseKey: response.data.name };
        axios.patch(`${dbUrl}/authors/${response.data.name}.json`, payload)
          .then(() => {
            getAuthors(playerObj.uid).then(resolve);
          });
      }).catch(reject);
  });

  // DELETE PLAYERS
const deletePlayers = (firebaseKey, uid) => new Promise((resolve, reject) => {
    axios.delete(`${dbUrl}/players/${firebaseKey}.json`)
      .then(() => {
        getAuthors(uid).then((playersArray) => resolve(playersArray));
      })
      .catch((error) => reject(error));
  });
  
  // UPDATE PLAYERS
  const updatePlayers = () => (uid, playerObj) => new Promise((resolve, reject) => {
    axios.patch(`${dbUrl}/players/${playerObj.firebaseKey}.json`, playerObj)
      .then(() => getAuthors(uid).then(resolve))
      .catch(reject);
  });