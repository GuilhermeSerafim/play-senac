import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Hero } from "../../components/hero/hero";
import { SelectCourt } from "../../components/select-court/select-court";

@Component({
  selector: 'app-home',
  imports: [Header, Hero, SelectCourt],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
