import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Hero } from "../../components/hero/hero";

@Component({
  selector: 'app-home',
  imports: [Header, Hero],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
