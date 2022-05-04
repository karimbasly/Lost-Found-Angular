import {Component, Inject} from "@angular/core";
import {LoginDialogComponent} from "@shared/dialogs/login-dialog.component";
import {userregister} from "@shared/models/user-register.model";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UserService} from "@shared/services/user.Service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'register-dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class registerDialogComponent{
  user:userregister
  title: string;
  password2:string
  error:boolean=false;
  url="/assets/images/empty.jpg";
  selectedFile:File=null;



  constructor(@Inject(MAT_DIALOG_DATA) data: userregister, private userService:UserService,private dialog:MatDialog,private snackBar: MatSnackBar) {
    this.title =  'Register';
    this.user = data ? data : {
      email: undefined,familyName:undefined,photo:undefined,
      userName:undefined,password:undefined,role:undefined,id:undefined,registrationDate:undefined

    };
    this.password2="";
  }

  create(): void {
    if(this.checkpass(this.user.password,this.password2)){
    this.user.photo=this.url;
    console.log(this.user);
    this.dialog.closeAll();
    }
    else {
      this.error=true;
    }
  /*this.userService.create(this.user)
    .subscribe(() => {
      this.dialog.closeAll();

    console.log(this.user);
    });*/



  }
  //
  onFileSelected(event) {
    console.log(event);
    //this.selectedFile=event.target.files[0]
    if(event.target.files){
      this.selectedFile=event.target.files[0]
      var reader = new FileReader();

      reader.onload=(e:any)=>{
        this.url= e.target.result;
      }
        reader.readAsDataURL(this.selectedFile);
    }

  }

  Upload() {

  }

  invalid(): boolean {
    return this.check(this.user.userName) || this.check(this.user.familyName) || this.check(this.user.password)|| this.check(this.password2)
      || this.check(this.user.email);
  }
  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
  checkpass(attr:string,attr2:string): boolean{
    return  attr===attr2;
  }
}
