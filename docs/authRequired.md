# Resposta de erro para rotas com autenticação obrigatória

**Código HTTP**: `401 Unauthorized`

- O token de autenticação não foi enviado ou é inválido

**Exemplo de resposta** :
```json
{
	"body": {
		"errors": [
			"Authorization must me provided"
		]
	},
	"status": 401
}
```
```json
{
	"body": {
		"errors": [
			"Invalid token"
		]
	},
	"status": 401
}
```
