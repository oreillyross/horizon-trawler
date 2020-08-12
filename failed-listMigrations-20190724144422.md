# Failed listMigrations at 2019-07-24T14:44:22.986Z
## RPC Input One Line
```json
{"id":1,"jsonrpc":"2.0","method":"listMigrations","params":{"projectInfo":"","sourceConfig":"datasource db {\n  provider = \"postgresql\"\n  url      = env(\"HEROKU_PG\")\n}\n\nmodel Keyword {\n  id          Int    @id\n  description String\n  keyword     String @unique\n}\n\nmodel Migration {\n  revision          Int       @id\n  applied           Int\n  databaseMigration String    @map(\"database_migration\")\n  datamodel         String\n  datamodelSteps    String    @map(\"datamodel_steps\")\n  errors            String\n  finishedAt        DateTime? @map(\"finished_at\")\n  name              String\n  rolledBack        Int       @map(\"rolled_back\")\n  startedAt         DateTime  @map(\"started_at\")\n  status            String\n\n  @@map(\"_Migration\")\n}"}}
```

## RPC Input Readable
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "listMigrations",
  "params": {
    "projectInfo": "",
    "sourceConfig": "datasource db {\n  provider = \"postgresql\"\n  url      = env(\"HEROKU_PG\")\n}\n\nmodel Keyword {\n  id          Int    @id\n  description String\n  keyword     String @unique\n}\n\nmodel Migration {\n  revision          Int       @id\n  applied           Int\n  databaseMigration String    @map(\"database_migration\")\n  datamodel         String\n  datamodelSteps    String    @map(\"datamodel_steps\")\n  errors            String\n  finishedAt        DateTime? @map(\"finished_at\")\n  name              String\n  rolledBack        Int       @map(\"rolled_back\")\n  startedAt         DateTime  @map(\"started_at\")\n  status            String\n\n  @@map(\"_Migration\")\n}"
  }
}
```


## RPC Response
```
null
```

## Stack Trace
```bash
thread 'main' panicked at 'Parsing of the provided connector url failed.: RelativeUrlWithoutBase', src/libcore/result.rs:997:5
stack backtrace:
   0: std::sys::unix::backtrace::tracing::imp::unwind_backtrace
             at src/libstd/sys/unix/backtrace/tracing/gcc_s.rs:39
   1: std::sys_common::backtrace::_print
             at src/libstd/sys_common/backtrace.rs:71
   2: std::panicking::default_hook::{{closure}}
             at src/libstd/sys_common/backtrace.rs:59
             at src/libstd/panicking.rs:197
   3: std::panicking::default_hook
             at src/libstd/panicking.rs:211
   4: std::panicking::rust_panic_with_hook
             at src/libstd/panicking.rs:474
   5: std::panicking::continue_panic_fmt
             at src/libstd/panicking.rs:381
   6: rust_begin_unwind
             at src/libstd/panicking.rs:308
   7: core::panicking::panic_fmt
             at src/libcore/panicking.rs:85
   8: core::result::unwrap_failed
   9: sql_migration_connector::SqlMigrationConnector::postgres_helper
  10: sql_migration_connector::SqlMigrationConnector::exists
  11: migration_core::connector_loader::load_connector
  12: migration_core::migration_engine::MigrationEngine::init
  13: <F as jsonrpc_core::calls::RpcMethodSimple>::call
  14: <F as jsonrpc_core::calls::RpcMethod<T>>::call
  15: <futures::future::lazy::Lazy<F,R> as futures::future::Future>::poll
  16: <futures::future::then::Then<A,B,F> as futures::future::Future>::poll
  17: <futures::future::map::Map<A,F> as futures::future::Future>::poll
  18: <futures::future::either::Either<A,B> as futures::future::Future>::poll
  19: futures::task_impl::std::set
  20: std::thread::local::LocalKey<T>::with
  21: futures::future::Future::wait
  22: jsonrpc_core::io::IoHandler<M>::handle_request_sync
  23: migration_core::rpc_api::RpcApi::handle
  24: migration_engine::main
  25: std::rt::lang_start::{{closure}}
  26: std::panicking::try::do_call
             at src/libstd/rt.rs:49
             at src/libstd/panicking.rs:293
  27: __rust_maybe_catch_panic
             at src/libpanic_unwind/lib.rs:87
  28: std::rt::lang_start_internal
             at src/libstd/panicking.rs:272
             at src/libstd/panic.rs:388
             at src/libstd/rt.rs:48
  29: main
  30: __libc_start_main
  31: _start

```
