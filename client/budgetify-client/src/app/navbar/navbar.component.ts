import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() public isLoggedIn: boolean = true;
  @Output() menuButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() loggedOutClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  public ngOnInit(): void {}
  public onClick(): boolean {
    this.loggedOutClicked.emit();
    return false;
  }
}
