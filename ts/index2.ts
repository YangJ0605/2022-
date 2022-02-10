type AA =
  | {
      label: 'name'
      render: (v: string) => any
    }
  | {
      label: 'age'
      render: (v: number) => any
    }
  | {
      label: ['name']
      render: (v: string[]) => any
    }
  | {
      label: ['age']
      render: (v: number[]) => any
    }

const Aa: AA = {
  label: 'name',
  render(v) {}
}
