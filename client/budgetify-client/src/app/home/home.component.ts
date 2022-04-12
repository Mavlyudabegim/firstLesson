import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class HomeComponent implements OnInit {
  public userId: any = this.route.snapshot.paramMap.get('userId');
  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {}
}
