import React, { useState, useRef } from 'react';
import cn from 'classnames';

import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

import { Todo } from '../../types/Todo';

import { Context } from '../ContextProvider/ContextProvider';

interface Props {
  todo: Todo,
}

export enum KeyEnum {
  Enter = 'Enter',
  Escape = 'Escape',
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { removeTodo, editStatus, editTitle } = React.useContext(Context);
  const { id, title, completed } = todo;
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setEditing(true);
    if (inputRef.current) {
      inputRef.current.value = title;
    }
  };

  const handleTitleUpdate = () => {
    if (inputRef.current) {
      editTitle(id, inputRef.current.value);
    } else {
      removeTodo(id);
    }

    setEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === KeyEnum.Enter) {
      handleTitleUpdate();
    } else if (event.key === KeyEnum.Escape) {
      setEditing(false);
    }
  };

  return (
    <li className={cn({ completed, editing })}>
      <div className="view">
        <Input
          type="checkbox"
          className="toggle"
          id={`toggle-${id}`}
          checked={completed}
          onChange={() => editStatus(id)}
        />
        <label
          htmlFor={`toggle-${id}`}
          onDoubleClick={handleEdit}
        >
          {title}
        </label>
        <Button
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
    </li>
  );
};
