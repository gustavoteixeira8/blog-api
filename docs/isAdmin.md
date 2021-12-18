# Reposta de error para rotas de administradores

**Código HTTP**: `403 Forbidden`

- Para chegar a esse erro, é preciso enviar o token to usuário.

- O usuário não possui permissão para acessar o recurso desejado.

**Exemplo de resposta** :
```json
{
	"body": {
		"errors": [
			"You do not have access to this feature"
		]
	},
	"status": 403
}
```
