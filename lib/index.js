const numeral = require('numeral')
const lodash = require('lodash')

// Input
// * target / Object - Contains attributes need to parse as primitive types
// * schema / Array<Array<String, String, any>> - Contains list of schemas
// * schema[][0] / String - Path of attribute, see argument path from
//   lodash.set() for mor information
// * schema[][1] / String - Type of attribute, one of:
//      * string - Do nothing
//      * number - Accept string contains digits and few special symbols
//      * boolean - Accept string 'true' or 'false'
//      * array<string> - Accept string contains items, each items is divide by
//        comma
//      * array<number>
//      * array<boolean>
// * schema[][2] / String / undefined - Default value for attribute in
//   case it is undefined
//
// Process
// * With each attributes which is specifics in schema, parse to target types
// * Set parsed value to target immediately
// * If an attribute is undefined then:
//      * If default value is specifics then set it to default value
//      * If default value is not specifics then do nothing
//
// Output
// * undefined
//
// Exception
// * TypeError - Source value is not a string
// * TypeError - Invalid target type
// * TypeError - Invalid number format
// * TypeError - Invalid boolean format
function apply(target, schema) {
    for (let attr_schema of schema) {
        _parse_attribute(target, attr_schema)
    }
}

module.exports = {
    apply
}

// private members

function _parse_attribute(target, schema) {
    let = [path, type, default_value] = schema
    let source_value = lodash.get(target, path)

    if (source_value === undefined) {
        _set_default_value(target, path, default_value)
        return
    }
    if (typeof source_value !== 'string') {
        throw TypeError('Source value is not a string')
    }

    _parse_attribute_type(target, path, source_value, type)
}

function _set_default_value(target, path, default_value) {
    if (default_value === undefined) {
        return
    }
    lodash.set(target, path, default_value)
}

function _parse_attribute_type(target, path, source_value, type) {
    switch (type) {
        case 'string':
            break
        case 'number':
            _parse_number_type(target, path, source_value, type)
            break
        case 'boolean':
            _parse_boolean_type(target, path, source_value, type)
            break
        case 'array<string>':
            _parse_array_string_type(target, path, source_value, type)
            break
        case 'array<number>':
            _parse_array_number_type(target, path, source_value, type)
            break
        case 'array<boolean>':
            _parse_array_boolean_type(target, path, source_value, type)
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

    if (typeof number !== 'number' || Number.isNaN(number)) {
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
