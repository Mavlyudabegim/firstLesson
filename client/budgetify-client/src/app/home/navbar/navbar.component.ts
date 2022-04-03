import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() isLoggedIn!: boolean;
  @Output() menuButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() loggedOutClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
  onClick(): boolean {
    this.loggedOutClicked.emit();
    return false;
  }
}
