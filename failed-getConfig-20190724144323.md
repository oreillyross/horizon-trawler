# Failed getConfig at 2019-07-24T14:43:23.872Z
## RPC Input One Line
```json
{"id":1,"jsonrpc":"2.0","method":"getConfig","params":{"projectInfo":"","datamodel":"datasource db {\n  provider = \"postgresql\"\n  url      = env(\"HEROKU_PG\")\n}\n\nmodel Keyword {\n  id          Int    @id\n  description String\n  keyword     String @unique\n}\n\nmodel Migration {\n  revision          Int       @id\n  applied           Int\n  databaseMigration String    @map(\"database_migration\")\n  datamodel         String\n  datamodelSteps    String    @map(\"datamodel_steps\")\n  errors            String\n  finishedAt        DateTime? @map(\"finished_at\")\n  name              String\n  rolledBack        Int       @map(\"rolled_back\")\n  startedAt         DateTime  @map(\"started_at\")\n  status            String\n\n  @@map(\"_Migration\")\n}"}}
```

## RPC Input Readable
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "getConfig",
  "params": {
    "projectInfo": "",
    "datamodel": "datasource db {\n  provider = \"postgresql\"\n  url      = env(\"HEROKU_PG\")\n}\n\nmodel Keyword {\n  id          Int    @id\n  description String\n  keyword     String @unique\n}\n\nmodel Migration {\n  revision          Int       @id\n  applied           Int\n  databaseMigration String    @map(\"database_migration\")\n  datamodel         String\n  datamodelSteps    String    @map(\"datamodel_steps\")\n  errors            String\n  finishedAt        DateTime? @map(\"finished_at\")\n  name              String\n  rolledBack        Int       @map(\"rolled_back\")\n  startedAt         DateTime  @map(\"started_at\")\n  status            String\n\n  @@map(\"_Migration\")\n}"
  }
}
```


## RPC Response
```
{
  "jsonrpc": "2.0",
  "error": {
    "code": 4466,
    "message": "An error happened. Check the data field for details.",
    "data": {
      "type": "DataModelErrors",
      "code": 1001,
      "errors": [
        "Environment variable not found: HEROKU_PG."
      ]
    }
  },
  "id": 1
}
```

## Stack Trace
```bash

```
