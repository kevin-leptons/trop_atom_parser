# @trop/atom_parser

Parse string to primitive types such as number, boolean. It is quite simple but useful, save you from bored coding.

## Tutorial

```js
const atom_parser = require('@trop/atom_parser')

let source = {
    name: 'Spider Man',
    age: '26',
    is_dead: 'false',
    stuffs: 'bag,spider,armor',
    address: {
        country: 'USA',
        country_code: '1'
    }
}
let schema = {
    'name': 'string',
    'age': 'number',
    'is_dead': 'boolean',
    'stuffs': 'array<string>',
    'address.country': 'string',
    'address.country_code': 'number'
}

atom_parser.apply(target, schema)
```

## APIs

### atom_parser.apply(target, schema)

* Input
    * `target` / `Object` - Contains attributes need to parse as primitive
      types
    * `schema` / `Object` - Contains key-value pairs which describes attribute
      and it's type, see argument path from lodash.set() for more information.
      Type can be one of:
         * `string` - Do nothing
         * `number` - Accept string contains digits and few special symbols
         * `boolean` - Accept string 'true' or 'false'
         * `array<string>` - Accept string contains items, each items is
           divide by comma
         * `array<number>`
         * `array<boolean>`
* Process
    * With each attributes which is specifics in schema, parse to target
      types.
    * If an attribute is undefined then do nothing
* Output
    * undefined - Parsed values is set to target immediately
* Exception
    * `TypeError` - Source value is not a string
    * `TypeError` - Invalid target type
    * `TypeError` - Invalid number format
    * `TypeError` - Invalid boolean format

## References

* [Changelog](changelog.md)
* [Contribution](contribution.md)
