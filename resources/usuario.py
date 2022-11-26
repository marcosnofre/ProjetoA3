from flask_restful import Resource, reqparse

from blocklist import BLOCKLIST
from models.usuario import UserModel
from flask_jwt_extended import create_access_token, get_jwt, jwt_required

import hmac

atributos = reqparse.RequestParser()
atributos.add_argument('login', type=str, required=True, help="O campo 'login' nao pode ficar em branco.")
atributos.add_argument('senha', type=str, required=True, help="O campo 'senha' nao pode ficar em branco.")


class User(Resource):
    # /usuarios/{user_id}
    def get(self, user_id):
        user = UserModel.find_user(user_id)
        if user:
            return user.json()
        return {'message': 'Usuario nao encontrado.'}, 404

    @jwt_required()
    def delete(self, user_id):
        user = UserModel.find_user(user_id)
        if user:
            try:
                user.delete_user()
            except:
                return {'message': 'Ocorreu um erro ao deletar o usuario.'}, 500
            return {'message': 'Usuario deletado com Sucesso!'}
        return {'message': 'Usuario nao encontrado.'}, 404


class UserRegister(Resource):
    # /cadastro
    def post(self):
        dados = atributos.parse_args()

        if UserModel.find_by_login(dados['login']):
            return {"message": f"O login \'{dados['login']}\' ja existe."}  # procura o login no banco de dados

        user = UserModel(**dados)  # desempacotamento de dados
        user.save_user()
        return {'message': f"Usuario \'{dados['login']}\' criado com sucesso!"}, 201


class UserLogin(Resource):
    # /login
    @classmethod
    def post(cls):
        dados = atributos.parse_args()

        user = UserModel.find_by_login(dados['login'])

        if user and hmac.compare_digest(user.senha, dados['senha']):
            token_de_acesso = create_access_token(identity=user.user_id)
            return {'access_token': token_de_acesso}, 200
        return {'message': 'O usuario ou senha invalidos.'}, 401


class UserLogout(Resource):
    # /logout
    @jwt_required()
    def post(self):
        jwt_id = get_jwt()['jti']  # JWT identificador do token
        BLOCKLIST.add(jwt_id)
        return {'message': 'Deslogado com sucesso!'}, 200
