# @trop/atom_parser

Parse string to primitive types such as number, boolean. It is quite simple but useful, save you from bored coding.

## Tutorial

```js
const atom_parser = require('@trop/atom_parser')

let target = {
    name: 'Spider Man',
    age: '26',
    stuffs: 'bag,spider,armor',
    address: {
        country: 'USA',
        country_code: '1'
    }
}
let schema = [
    ['name', 'string'],
    ['age', 'number'],
    ['is_dead', 'boolean', false],
    ['stuffs', 'array<string>'],
    ['address.country', 'string'],
    ['address.country_code', 'number']
]

atom_parser.apply(target, schema)
```

## APIs

### atom_parser.apply(target, schema)

**Input**

* `target` / `Object` - Contains attributes need to parse as primitive types
* `schema` / `Array<Array<String, String, any>>` - Contains list of schemas
* `schema[][0]` / `String` - Path of attribute, see argument path from
  `lodash.set()` for mor information
* `schema[][1]` / `String` - Type of attribute, one of:
     * `string` - Do nothing
     * `number` - Accept string contains digits and few special symbols
     * `boolean` - Accept string 'true' or 'false'
     * `array<string>` - Accept string contains items, each items is divide by
       comma
     * `array<number>`
     * `array<boolean>`
* `schema[][2]` / `String` / `undefined` - Default value for attribute in
  case it is undefined

**Process**

* With each attributes which is specifics in schema, parse to target types
* Set parsed value to target immediately
* If an attribute is undefined then:
     * If default value is specifics then set it to default value
     * If default value is not specifics then do nothing

**Output**

* `undefined`   

**Exception**

* `TypeError` - Source value is not a string
* `TypeError` - Invalid target type
* `TypeError` - Invalid number format
* `TypeError` - Invalid boolean format

## References

* [Changelog](changelog.md)
* [Contribution](contribution.md)
