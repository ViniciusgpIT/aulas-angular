import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-header-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-nav.html',
  styleUrl: './header-nav.scss',
})
export class HeaderNav {

}
