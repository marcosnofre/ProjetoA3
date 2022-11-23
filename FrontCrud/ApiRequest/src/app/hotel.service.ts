import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_PATH} from "../environments/environment";
import {InterfaceHotel} from "./InterfaceHoteis";

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private httpClient: HttpClient) { }

  obterTodosHoteis( ){
    return this.httpClient.get<InterfaceHotel[]>(`${API_PATH}hoteis`).toPromise()
  }

  obterHotelPorId(id: number){
    return this.httpClient.get<InterfaceHotel>(`${API_PATH}hoteis/${id}`).toPromise()
  }

  adicionarHotel(hotel: InterfaceHotel){
    return this.httpClient.post<InterfaceHotel>(`${API_PATH}hoteis/${hotel.hotel_id}`, hotel).toPromise()
  }

  atualizarHotel(id: number, hotel: InterfaceHotel){
    return this.httpClient.put<InterfaceHotel>(`${API_PATH}hoteis/${hotel.hotel_id}`, hotel).toPromise()
  }

  deletarHotel(id: number){
    return this.httpClient.delete<InterfaceHotel>(`${API_PATH}hoteis/${id}`).toPromise()
  }
}
