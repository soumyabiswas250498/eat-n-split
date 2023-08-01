import { useState } from 'react';
import { Button } from '../App';

export function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setbill] = useState('');
  const [paidUser, setPaidUser] = useState('');
  const paidByFriend = bill ? bill - paidUser : '';
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  function splitSubmitHandler(e) {
    e.preventDefault();
    if (!bill || !paidUser) return;
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidUser);
  }
  return (
    <form className="form-split-bill" onSubmit={splitSubmitHandler}>
      <h2>Split a bill with 👯‍♂️ {selectedFriend.name}</h2>

      <label>Bill Value 💰</label>
      <input
        type="number"
        value={bill}
        onChange={e => setbill(Number(e.target.value))}
      />

      <label>Your Expense 💳</label>
      <input
        type="number"
        value={paidUser}
        onChange={e =>
          setPaidUser(
            Number(e.target.value) > bill ? paidUser : Number(e.target.value)
          )
        }
      />

      <label>{selectedFriend.name}'s Expense 🤑</label>
      <input type="number" disabled value={paidByFriend} />

      <label> Who 🤔 is paying the bill ?</label>
      <select
        value={whoIsPaying}
        onChange={e => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
