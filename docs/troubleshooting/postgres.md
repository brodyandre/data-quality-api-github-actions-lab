# PostgreSQL Local

## Erro de porta 5432 ocupada

Se o `make up` falhar com mensagem de porta em uso, outro processo já está ocupando `5432`.

Passos rápidos:

1. identificar o processo ou container que usa a porta
2. encerrar o serviço conflitante, se fizer sentido
3. se não puder liberar a porta, ajustar `POSTGRES_PORT` no `.env`
4. atualizar `DATABASE_URL` para usar a mesma porta

Exemplo:

```env
POSTGRES_PORT=55432
DATABASE_URL=postgresql://app_user:app_password@localhost:55432/data_quality_db
```

## Erro de conexão recusada

Isso normalmente indica que o PostgreSQL ainda não ficou saudável ou que a API está usando host, porta ou credenciais erradas.

Verificações úteis:

```bash
make ps
make logs
```

Confirme também:

- se `POSTGRES_HOST=localhost`
- se `POSTGRES_PORT` bate com o mapeamento do container
- se o `DATABASE_URL` aponta para o mesmo host e porta

## Erro de senha ou usuário

Se aparecer erro de autenticação:

1. confira `POSTGRES_USER` e `POSTGRES_PASSWORD` no `.env`
2. confira se `DATABASE_URL` usa os mesmos valores
3. se o volume local já existia com credenciais antigas, resete o banco

## Como verificar containers

Use:

```bash
make ps
make logs
docker compose config
```

Se quiser acessar o banco por dentro do container:

```bash
make db-shell
```

## Como resetar banco

Para recriar o banco local do zero:

```bash
make reset-db
make migrate
make seed
```

Isso remove o volume local do PostgreSQL e cria um ambiente limpo novamente.
