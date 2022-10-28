import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addUser } from 'src/actions/user.actions';
import { AppState } from 'src/reducers';
import { UserInfo } from 'src/types';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { StorageMap } from '@ngx-pwa/local-storage';
import { getUsers } from 'src/selectors/user.selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'NgRx Material PWA';
  longText: string = 'Some random text will go here';
  users$: Observable<Array<UserInfo>>;
  storage$: Observable<any>;
  users: Array<UserInfo> = [];

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private storage: StorageMap
  ) {
    this.users$ = this.store.pipe(select(getUsers));
    this.storage$ = this.storage.get('appState.users');

  }

  openAddUserDialog(_event: Event) {
    const addUserDialog = this.dialog.open(AddUserDialogComponent);
    addUserDialog.afterClosed().subscribe((values: FormGroup) => {
      this.store.dispatch(addUser(values.value));

      console.table(values.value);
    });
  }
}
