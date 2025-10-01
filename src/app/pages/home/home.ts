import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Hero } from "../../components/hero/hero";
import { SelectCourt } from "../../components/select-court/select-court";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-home',
  imports: [Header, Hero, SelectCourt, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
