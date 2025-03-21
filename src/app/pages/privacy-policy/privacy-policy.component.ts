import { Component } from '@angular/core';
import {HeroComponent} from "../dashboard/hero/hero.component";

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    HeroComponent
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}
