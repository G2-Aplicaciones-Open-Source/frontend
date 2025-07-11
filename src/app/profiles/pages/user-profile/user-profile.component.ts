import { Component, OnInit } from '@angular/core';
import { UserService, UserProfile } from '../../services/user.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    TranslatePipe
  ],
})
export class UserProfileComponent implements OnInit {
  user: UserProfile = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    roles: [],
  };

  showSuccessMessage = false;
  photoUrl: string = 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png'; // Imagen por defecto

  constructor(
    private userService: UserService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    const idString = localStorage.getItem('userId');
    const id = idString ? parseInt(idString, 10) : 0;

    if (id > 0) {
      this.userService.getUserById(id).subscribe({
        next: (data) => (this.user = data),
        error: (err) => console.error('Error fetching user', err),
      });
    }
  }

  onSave() {
    this.showSuccessMessage = true;
    setTimeout(() => (this.showSuccessMessage = false), 3000);
    // Aquí puedes implementar PUT al backend si deseas actualizar los datos
  }

  onChangePhoto() {
    alert(this.translate.instant('PROFILE.CHANGE_PHOTO_ALERT'));
  }
}
