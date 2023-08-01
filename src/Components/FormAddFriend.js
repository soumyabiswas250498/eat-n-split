import { useState } from 'react';
import { Button } from '../App';

export function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');
  const submitHandler = e => {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?u=${id}`,
      balance: 0,
      id,
    };
    onAddFriend(newFriend);
  };
  return (
    <form className="form-add-friend" onSubmit={submitHandler}>
      <label>Friend Name </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>Image URL 📸</label>
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
      />
      {/* <button className="button">Select</button> */}
      <Button>Add</Button>
    </form>
  );
}
