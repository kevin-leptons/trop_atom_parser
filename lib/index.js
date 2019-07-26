const numeral = require('numeral')
const lodash = require('lodash')

// Input
// * target / Object - Contains attributes need to parse as primitive types
// * schema / Object - Contains key-value pairs which describes attribute and
//   it's type, see argument path from lodash.set() for more information. Type
//   can be one of:
//      * string - Do nothing
//      * number - Accept string contains digits and few special symbols
//      * boolean - Accept string 'true' or 'false'
//      * array<string> - Accept string contains items, each items is divide by
//        comma
//      * array<number>
//      * array<boolean>
//
// Process
// * With each attributes which is specifics in schema, parse to target types.
// * If an attribute is undefined then do nothing
//
// Output
// * undefined - Parsed values is set to target immediately
//
// Exception
// * TypeError - Source value is not a string
// * TypeError - Invalid target type
// * TypeError - Invalid number format
// * TypeError - Invalid boolean format
function apply(target, schema) {
    for (let key of Object.keys(schema)) {
        _parse_attribute(target, key, schema[key])
    }
}

module.exports = {
    apply
}

// private members

function _parse_attribute(target, key, type) {
    let source_value = lodash.get(target, key)
    if (source_value === undefined) {
        return
    }
    if (typeof source_value !== 'string') {
        throw TypeError('Source value is not a string')
    }

    switch (type) {
        case 'string':
            break
        case 'number':
            _parse_number_type(target, key, source_value, type)
            break
        case 'boolean':
            _parse_boolean_type(target, key, source_value, type)
            break
        case 'array<string>':
            _parse_array_string_type(target, key, source_value, type)
            break
        case 'array<number>':
            _parse_array_number_type(target, key, source_value, type)
            break
        case 'array<boolean>':
            _parse_array_boolean_type(target, key, source_value, type)
            break
        default:
            throw TypeError('Invalid target type')
    }
}

function _parse_number_type(target, key, source_value, type) {
    let target_value = _string_to_number(source_value)
    lodash.set(target, key, target_value)
}

function _parse_boolean_type(target, key, source_value, type) {
    let target_value = _string_to_boolean(source_value)
    lodash.set(target, key, target_value)
}

function _parse_array_string_type(target, key, source_value, type) {
    let array_str = source_value.split(',')
    lodash.set(target, key, array_str)
}

function _parse_array_number_type(target, key, source_value, type) {
    let array_str = source_value.split(',')
    let target_array = array_str.map(str => _string_to_number(str))

    lodash.set(target, key, target_array)
}

function _parse_array_boolean_type(target, key, source_value, type) {
    let array_str = source_value.split(',')
    let target_array = array_str.map(str => _string_to_boolean(str))

    lodash.set(target, key, target_array)
}

function _string_to_number(str) {
    let number = numeral(str).value()

    if (typeof number !== 'number') {
        throw TypeError('Invalid number format')
    }
    return number
}

function _string_to_boolean(str) {
    switch (str) {
        case 'true':
            return true
        case 'false':
            return false
        default:
            throw TypeError('Invalid boolean format')
    }
}
