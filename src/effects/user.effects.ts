import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';
import { addUser, getUsers } from 'src/actions/user.actions';
import { UserInfo } from 'src/types';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private storage: StorageMap) { }

  setUsers$ = createEffect(
    () => {
      console.log('========== Add User Effect ==========');
      return this.actions$.pipe(
        ofType(addUser),
        map((action) => {
          const users = this.storage.get('appState') as unknown as Array<UserInfo>;
          console.log(users, action);
          // this.storage
          //   .set('users', new Array(...users, action as UserInfo))
          //   .subscribe();
        })
      );
    },
    { dispatch: false }
  );

  getUsers$ = createEffect(
    () => {
      console.log('========== Get User Effect ==========');
      return this.actions$.pipe(
        ofType(getUsers),
        map((action) => {
          const storage = this.storage.get('appState.users') as unknown as Array<UserInfo>;
          console.log(storage, action);
        }));
    },
    { dispatch: false }
  )
}
