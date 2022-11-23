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

  constructor(private hotelService: HotelService) {}

  obterTodosHoteis(){
    this.hotelService.obterTodosHoteis()
      .then(hoteis => console.log(hoteis))
      .catch(erro => console.log(erro));
  }

  obterHotelPorId(id: number){
    this.hotelService.obterHotelPorId(id)
      .then(hotel => console.log(hotel))
      .catch(erro => console.log(erro));
  }

  adicionarHotel(id: number){
    const hotel: InterfaceHotel = {
      hotel_id: 4,
      nome: "Hotel Serhs",
      estrelas: 4.5,
      diaria: 500,
      cidade: "Natal"
    };
    this.hotelService.adicionarHotel(hotel)
      .then(hotel => console.log("Hotel adicionado com sucesso!", hotel))
      .catch(erro => console.log(erro));
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
      .then(hotel => console.log("Hotel atualizado com sucesso!", hotel))
      .catch(erro => console.log(erro));

  }

  deletarHotel(id: number){
    this.hotelService.deletarHotel(id)
      .then(hotel => console.log("Hotel deletado com sucesso!", hotel))
      .catch(erro => console.log(erro));
  }
}
