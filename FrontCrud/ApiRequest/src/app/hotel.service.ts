import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_PATH} from "../environments/environment";
import {InterfaceHotel} from "./InterfaceHoteis";
import {retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private httpClient: HttpClient) { }

  obterTodosHoteis( ){
    return this.httpClient.get<InterfaceHotel[]>(`${API_PATH}hoteis`).pipe(
      retry(1)
    )
  }

  obterHotelPorId(id: number){
    return this.httpClient.get<InterfaceHotel>(`${API_PATH}hoteis/${id}`).pipe(
      retry(1)
    )
  }

  adicionarHotel(hotel: InterfaceHotel){
    return this.httpClient.post<InterfaceHotel>(`${API_PATH}hoteis/${hotel.hotel_id}`, hotel).pipe(
      retry(1)
    )
  }

  atualizarHotel(id: number, hotel: InterfaceHotel){
    return this.httpClient.put<InterfaceHotel>(`${API_PATH}hoteis/${hotel.hotel_id}`, hotel).pipe(
      retry(1)
    )
  }

  deletarHotel(id: number){
    return this.httpClient.delete<InterfaceHotel>(`${API_PATH}hoteis/${id}`).pipe(
      retry(1)
    )
  }

  login(login: string, senha: string){
    return this.httpClient.post(`${API_PATH}login`, {login, senha}).pipe(
      retry(1)
    )
  }
}
