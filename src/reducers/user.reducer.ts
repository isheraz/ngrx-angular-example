import { Action, createReducer, on } from '@ngrx/store';
import { addUser, getUsers } from 'src/actions/user.actions';
import { UserInfo } from 'src/types';

export const usersStorageKey = 'users';

export interface UsersState {
  users: Array<UserInfo>;
}

export const initialState: UsersState = {
  users: []
};

const userReducer = createReducer(
  initialState,
  on(addUser, (state, action) => {
    const {type, ...userInfo} = action;
    initialState.users.push(userInfo as UserInfo);
    return ({ ...state, users: initialState.users });
  }),
);

export function reducer(state: UsersState | undefined, action: Action) {
  return userReducer(state, action);
}
