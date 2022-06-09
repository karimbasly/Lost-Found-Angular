import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  version: string;
  profile: string;
  backEndUser: string;
  backEndCore: string;
  backEndCustomerSupport: string;


  constructor() {

  }

}
