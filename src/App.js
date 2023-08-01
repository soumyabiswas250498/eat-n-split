import { useState } from 'react';
import { FriendList } from './Components/FriendList';
import { FormAddFriend } from './Components/FormAddFriend';
import { FormSplitBill } from './Components/FormSplitBill';

const demoFriends = [
  {
    id: 118836,
    name: 'Demo User1',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Demo User2',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Demo User3',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];
const data = JSON.parse(localStorage.getItem('userData'));
let initialFriends = [];
if (data) {
  initialFriends = data;
} else {
  initialFriends = demoFriends;
}
console.log(data);
function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFirend] = useState(null);
  const showFriendHandler = () => {
    setShowAddFriend(show => !show);
  };
  const addFriendHandler = newFriend => {
    setFriends(curFriends => [...curFriends, newFriend]);
  };
  const selectFriendHandler = friend => {
    // setSelectedFirend(friend);
    setSelectedFirend(curSelected =>
      curSelected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  };
  function splitBillHandler(value) {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFirend(null);
  }
  localStorage.setItem('userData', JSON.stringify(friends));
  return (
    <>
      <div className="header">
        <h1>Split The Bill</h1>
      </div>

      <div className="app">
        <div className="sidebar">
          <FriendList
            friends={friends}
            selectedFriend={selectedFriend}
            onSelectFriend={selectFriendHandler}
          />
          {showAddFriend && <FormAddFriend onAddFriend={addFriendHandler} />}

          <Button onClick={showFriendHandler}>
            {showAddFriend ? 'close' : 'Add Friend'}
          </Button>
        </div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={splitBillHandler}
          />
        )}
      </div>
    </>
  );
}

export function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
