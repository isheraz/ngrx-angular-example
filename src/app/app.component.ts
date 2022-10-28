import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserInfo } from 'src/types';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'NgRx Material PWA';
  longText: string = 'Some random text will go here';
  users: Array<UserInfo> = [];

  constructor( public dialog: MatDialog){}


  openAddUserDialog (_event: Event) {
    const addUserDialog = this.dialog.open(AddUserDialogComponent);
    addUserDialog.afterClosed().subscribe((values: FormGroup) => {
      console.table(values.value)
    })

  }
}
