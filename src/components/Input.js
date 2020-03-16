import React from 'react';

const InputInitial = () => (
  <div>
    <label htmlFor="input-email" data-testid="label-gravatar-email" >Email do gravatar:</label>
    <input id="input-email" data-testid="input-gravatar-email" />
    <label htmlFor="input-name" data-testid="label-player-name" >Nome do Jogador:</label>
    <input id="input-Name" data-testid="input-player-name" />
  </div>
);
export default InputInitial;
