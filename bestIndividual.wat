(module
  (table 0 anyfunc)
  (memory $0 1)
  (export "memory" (memory $0))
  (export "sumtwo" (func $sumtwo))
  (func $sumtwo (param $0 i32) (param $1 i32) (result i32)
    (i32.add
      (get_local $0)
      (get_local $1)
    )
  )
)