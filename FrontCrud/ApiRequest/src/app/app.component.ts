import { Component } from '@angular/core';
import {HotelService} from "./hotel.service";
import {InterfaceHotel} from "./InterfaceHoteis";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ApiRequest';

  hoteis: any = [];

  constructor(public hotelService: HotelService) {}

  obterTodosHoteis(){
    this.hotelService.obterTodosHoteis()
      .subscribe(hoteis => {
        this.hoteis = hoteis;
        this.hoteis = this.hoteis.hoteis;
        console.log(hoteis)
      });
  }

  obterHotelPorId(id: number){
    this.hotelService.obterHotelPorId(id)
      .subscribe(hoteis => {
        this.hoteis = hoteis;
        this.hoteis = this.hoteis.hoteis;
        console.log(hoteis)});
  }

  adicionarHotel(id: number){
    const hotel: InterfaceHotel = {
      hotel_id: 3,
      nome: "Hotel Copacabana Palace",
      estrelas: 4,
      diaria: 100,
      cidade: "Rio de Janeiro"
    };
    this.hotelService.adicionarHotel(hotel)
      .subscribe(hotel => console.log("Hotel adicionado com sucesso!", hotel));
  }

  atualizarHotel(id: number){
    const hotel: InterfaceHotel = {
      hotel_id: 3,
      nome: "Hotel Copacabana Palace",
      estrelas: 4,
      diaria: 100,
      cidade: "Rio de Janeiro"
    };
    this.hotelService.atualizarHotel(id, hotel)
      .subscribe(hotel => console.log("Hotel atualizado com sucesso!", hotel));

  }

  deletarHotel(id: number){
    this.hotelService.deletarHotel(id)
      .subscribe(hotel => console.log("Hotel deletado com sucesso!", hotel));
  }
}
