import React from 'react';
import PlayGameButton from '../components/PlayGameButton';
import InputInitial from '../components/Input';

const Start = () => {
  return (
    <div>
      <div>
        <InputInitial />
      </div>
      <div>
        <PlayGameButton />
      </div>
    </div>
  );
}

export default Start;
