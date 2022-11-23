from flask_restful import Resource, reqparse
from models.hotel import HotelModel


# Criando um recurso
class Hoteis(Resource):
    def get(self):
        return {'hoteis': [hotel.json() for hotel in HotelModel.query.all()]}


# Criando Crud para API
class Hotel(Resource):
    argumentos = reqparse.RequestParser()
    argumentos.add_argument('nome', type=str, required=True, help="O campo 'nome' não pode ficar em branco.")
    argumentos.add_argument('estrelas', type=float, required=True, help="O campo 'estrelas' não pode ficar em branco.")
    argumentos.add_argument('diaria', type=float, required=True, help="O campo 'diaria' não pode ficar em branco.")
    argumentos.add_argument('cidade', type=str, required=True, help="O campo 'cidade' não pode ficar em branco.")

    def get(self, hotel_id):

        hotel = HotelModel.find_hotel(hotel_id)
        if hotel:
            return hotel.json()
        return {'message': 'Hotel não encontrado.'}, 404

    def post(self, hotel_id):
        if HotelModel.find_hotel(hotel_id):
            return {'message': f'Hotel com id {hotel_id} já existe.'}, 400

        dados = Hotel.argumentos.parse_args()
        hotel = HotelModel(hotel_id, **dados)  # usando o operador de desempacotamento Kwargs
        try:
            hotel.save_hotel()
        except:
            return {'message': 'Ocorreu um erro interno ao salvar o hotel.'}, 500
        return hotel.json(), 201

    def put(self, hotel_id):
        dados = Hotel.argumentos.parse_args()
        hotel_encontrado = HotelModel.find_hotel(hotel_id)
        if hotel_encontrado:
            hotel_encontrado.update_hotel(**dados)
            hotel_encontrado.save_hotel()
            return hotel_encontrado.json()
        hotel = HotelModel(hotel_id, **dados)
        try:
            hotel.save_hotel()
        except:
            return {'message': 'Ocorreu um erro interno ao salvar o hotel.'}, 500
        return hotel.json(), 201  # código de criação

    def delete(self, hotel_id):
        hotel = HotelModel.find_hotel(hotel_id)
        if hotel:
            try:
                hotel.delete_hotel()
            except:
                return {'message': 'Ocorreu um erro interno ao deletar o hotel.'}, 500
            return {'message': 'Hotel deletado com sucesso!.'}
        return {'message': 'Hotel não encontrado.'}, 404
