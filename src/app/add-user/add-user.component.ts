import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {PopupService} from "../service/popup.service";
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  addUserData = {
    email: '',
    firstName: '',
    lastName: '',
    jmbg: '',
    position: '',
    phoneNumber: '',
    active: true
  };

  constructor(private router: Router,
    private popupService: PopupService,
    private userService: UserService) {}

  onCreateAddUserPopup() {
    if (this.validateForm()) {


      this.userService.addUser(this.addUserData).subscribe(
        response => {
          alert('Successfully created user ' + JSON.stringify(this.addUserData));
          this.router.navigate(['/user/list']);
        },
        error => {
          alert('Error creating user:' + JSON.stringify(this.addUserData));
          // Handle error
        });
    }
  }

  onCancelAddUserPopup() {
    const confirmResult = confirm('Are you sure you want to cancel adding the user?');
     if (confirmResult) {
      this.router.navigate(['/user/list']);
     }
  }

  onCloseAddUserPopup() {
    const confirmResult = confirm('Are you sure you want to cancel adding the user?');
    if (confirmResult) {
      this.router.navigate(['/user/list']);
    }
   }


  private validateForm(): boolean {


    if (!this.addUserData.email || !this.isValidEmail(this.addUserData.email)) {
      this.popupService.openPopup("Error", "Email nije validan.");
      return false;
    }

    if (!this.addUserData.firstName) {
      this.popupService.openPopup("Error", "Name nije validan.");
      return false;
    }

    if (!this.addUserData.lastName) {
      this.popupService.openPopup("Error", "Surname nije validan.");
      return false;
    }

    if (!this.addUserData.jmbg || !this.isValidJMBG(this.addUserData.jmbg)) {
      this.popupService.openPopup("Error", "JMBG nije validan.");
      return false;
    }

    if (!this.addUserData.phoneNumber || !this.isValidPhoneNumber(this.addUserData.phoneNumber)) {
      this.popupService.openPopup("Error", "Broj telefona nije validan.");
      return false;
    }
    return true;
  }

  private isValidEmail(email: string): boolean {
    return email.includes('@');
  }

  private isValidJMBG(jmbg: string): boolean {
    return jmbg.length === 13;
  }

  private isValidPhoneNumber(phone: string): boolean {
    return /^\d+$/.test(phone);
  }

}
