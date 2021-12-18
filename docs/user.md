# Rotas de usuários

- Os métodos http disponíveis para as rotas de usuários são: POST, GET, PUT e DELETE.

## Criação de usuário

Rota usada para criar novos usuários na API.

**URL** : `/user`

**Método** : `POST`

**Precisa de autenticação** : [`SIM`](./authRequired.md)

**Precisa de permissão especial** : [`SIM`](./isAdmin.md)

### Parâmetros

**Body** :

Campos requeridos e validações

```json
{
	"fullName": "[Deve ter entre 2 e 255 caracteres]",
	"email": "[Deve ser um email sintaticamente válido -> email@yourdomain.com]",
	"username": "[Deve ter entre 2 e 255 caracteres sem espaços]",
	"password": "[Deve ter pelo menos 8 caracteres entre maiúsculos, minúsculos, símbolos e números]"
}
```

Os campos ID, isAdmin, isVerifiedEmail e timestamps são definidos automaticamente pela API.

### Resposta de sucesso

**Código HTTP** : `201 Created`

**Exemplo de resposta** :
```json
{
	"body": {
		"message": "Your account has been successfully created"
	},
	"status": 201
}
```

**Resultado** : Com a resposta de sucesso, um email será enviado para o novo usuário e um novo registro será adicionado no banco de dados.

### Resposta de erro

**Código HTTP** : `400 Bad Request`

- Alguma campo do BODY não foi enviado ou o valor enviado não passou nas [validações](#corpo-da-requisição-body).

- **Email** ou **username** já existe no banco de dados.

**Exemplo de resposta** :
```json
{
	"body": {
		"errors": [
			"Name must be between 2 and 255 characters",
			"Invalid email",
			"Username must be between 2 and 255 characters with no spaces",
			"Password must have at least 8 characters between uppercase, lowercase, symbols and numbers"
		]
	},
	"status": 400
}
```
```json
{
	"body": {
		"errors": [
			"Email already exists: email@yourdomain.com"
		]
	},
	"status": 400
}
```
```json
{
	"body": {
		"errors": [
			"Username already exists: example"
		]
	},
	"status": 400
}
```

<br>

## Exibição de usuário pelo ID

Rota usada para exibir usuários cadastrados na API.

**URL** : `/user/:userId`

**Método** : `GET`

**Precisa de autenticação** : [`SIM`](authRequired.md)

**Precisa de permissão especial** : `NÃO`

### Parâmetros

**Parâmetro de URL** : `/user/:userId`

### Resposta de sucesso

**Código HTTP** : `200 Ok`

**Exemplo de resposta** :
```json
{
	"body": {
		"user": {
			"id": "RANDOM_UUID",
			"username": "EXAMPLE"
		}
	},
	"status": 200
}
```

### Resposta de erro

**Código HTTP** : `404 Not Found`

- O ID enviado não pertence a nenhum usuário cadastrado.

**Exemplo de resposta** :
```json
{
	"body": {
		"errors": [
			"User not found"
		]
	},
	"status": 404
}
```
