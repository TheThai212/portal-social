import { Component } from '@angular/core';
import {MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-intro-and-rule-dialog',
  standalone: true,
  imports: [
    MatDialogClose,
    MatDialogContent,
    ReactiveFormsModule
  ],
  templateUrl: './intro-and-rule-dialog.component.html',
  styleUrl: './intro-and-rule-dialog.component.scss'
})
export class IntroAndRuleDialogComponent {

}
