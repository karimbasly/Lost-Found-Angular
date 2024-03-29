import {Component, Inject} from "@angular/core";
import {User} from "@shared/models/user.model";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UserService} from "@shared/services/user.Service";
import {AuthService} from "@core/auth.service";

@Component({
  templateUrl: 'register-dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class registerDialogComponent{
  user:User
  title: string;
  password2:string
  error:boolean=false;
  oldEmail:string
  url:string;
  selectedFile:File=null;
  isAdmin:boolean;


  constructor(@Inject(MAT_DIALOG_DATA) data: User, private userService:UserService, private dialog:MatDialog,private authService:AuthService) {
    this.title = data? 'Update ': 'Create';
    this.isAdmin=this.authService.isAdmin();
    this.url= data? data.photo:'/assets/images/empty.jpg';
    this.user = data ? data : {email: undefined,familyName:undefined,photo:undefined,location:undefined,mobile:undefined,
      userName:undefined,password:undefined,role:undefined,id:undefined,registrationDate:undefined

    };
    this.password2="";
    this.oldEmail=data ? data.email:undefined;
  }

  isCreate(): boolean {
    return this.oldEmail === undefined;
  }

  create(): void {
    if (this.checkPassword(this.user.password, this.password2)) {
      this.user.photo = this.url;
      this.userService.create(this.user)
        .subscribe(()=> {
          this.dialog.closeAll();
    });
    } else {
      this.error = true;
    }
  }

  update(): void {
    this.user.photo = this.url;
    this.userService
      .update(this.oldEmail, this.user)
      .subscribe(() => this.dialog.closeAll());
  }
  onFileSelected(event) {
    if(event.target.files){
      this.selectedFile=event.target.files[0]
      const reader = new FileReader();

      reader.onload=(e:any)=>{
        this.url= e.target.result;
      }
        reader.readAsDataURL(this.selectedFile);
    }

  }


  invalid(): boolean {
    if(this.isCreate()) {
      return this.check(this.user.userName) || this.check(this.user.familyName) || this.check(this.user.password) || this.check(this.password2)
        || this.check(this.user.email);
    }
    else
      return this.check(this.user.userName) || this.check(this.user.familyName) || this.check(this.user.email);
  }
  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
  checkPassword(attr:string, attr2:string): boolean{
    return  attr===attr2;
  }
}
