const assert = require('assert')

const atom_parser = require('../lib')

describe('atom_parser.apply()', () => {
    let schema = {
        'name': 'string',
        'age': 'number',
        'is_dead': 'boolean'
    }

    it('with source value is a number', () => {
        let input = {
            name: 1
        }

        assert.throws(() => {
            atom_parser.apply(input, schema)
        }, {
            name: 'TypeError',
            message: 'Source value is not a string'
        })
    })

    it('with source value is true', () => {
        let input = {
            name: true
        }

        assert.throws(() => {
            atom_parser.apply(input, schema)
        }, {
            name: 'TypeError',
            message: 'Source value is not a string'
        })
    })

    it('with source value is false', () => {
        let input = {
            name: false
        }

        assert.throws(() => {
            atom_parser.apply(input, schema)
        }, {
            name: 'TypeError',
            message: 'Source value is not a string'
        })
    })

    it('with source value is an array', () => {
        let input = {
            name: [1, 2, 3]
        }

        assert.throws(() => {
            atom_parser.apply(input, schema)
        }, {
            name: 'TypeError',
            message: 'Source value is not a string'
        })
    })

    it('with source value is an object', () => {
        let input = {
            name: {}
        }

        assert.throws(() => {
            atom_parser.apply(input, schema)
        }, {
            name: 'TypeError',
            message: 'Source value is not a string'
        })
    })

    it('with source value is a function', () => {
        let input = {
            name: () => {}
        }

        assert.throws(() => {
            atom_parser.apply(input, schema)
        }, {
            name: 'TypeError',
            message: 'Source value is not a string'
        })
    })

    it('with invalid target type', () => {
        let input = {
            name: 'kevin'
        }

        assert.throws(() => {
            atom_parser.apply(input, {
                name: 'function'
            })
        }, {
            name: 'TypeError',
            message: 'Invalid target type'
        })
    })

    it('with target type is string', () => {
        let input = {
            name: 'kevin'
        }

        atom_parser.apply(input, schema)
        assert.equal(input.name, 'kevin')
    })

    it('with target type is number', () => {
        let input = {
            age: '18'
        }

        atom_parser.apply(input, schema)
        assert.equal(input.age, 18)
    })

    it('with target type is boolean', () => {
        let input = {
            true_value: 'true',
            false_value: 'false'
        }

        atom_parser.apply(input, {
            true_value: 'boolean',
            false_value: 'boolean'
        })
        assert.equal(input.true_value, true)
        assert.equal(input.false_value, false)
    })

    it('with target type is array<string>', () => {
        let input = {
            tools: 'laptop,mouse,keyboard,note-book'
        }

        atom_parser.apply(input, {
            tools: 'array<string>'
        })
        assert.equal(input.tools[0], 'laptop')
        assert.equal(input.tools[1], 'mouse')
        assert.equal(input.tools[2], 'keyboard')
        assert.equal(input.tools[3], 'note-book')
    })

    it('with target type is array<number>', () => {
        let input = {
            numbers: '128,128.000,128.256,-128,-128.256'
        }

        atom_parser.apply(input, {
            numbers: 'array<number>'
        })
        assert.equal(input.numbers[0], 128)
        assert.equal(input.numbers[1], 128.0)
        assert.equal(input.numbers[2], 128.256)
        assert.equal(input.numbers[3], -128)
        assert.equal(input.numbers[4], -128.256)
    })

    it('with target type is array<boolean>', () => {
        let input = {
            values: 'true,false,false,true,true'
        }

        atom_parser.apply(input, {
            values: 'array<boolean>'
        })
        assert.equal(input.values[0], true)
        assert.equal(input.values[1], false)
        assert.equal(input.values[2], false)
        assert.equal(input.values[3], true)
        assert.equal(input.values[4], true)
    })

    it('with valid and mixed schema', () => {
        let input = {
            name: 'kevin',
            age: '18',
            is_dead: 'false',
            stuffs: 'macbook,bag,bottle',
            cordinates: '1,-49,7',
            subjects: 'false,true,false'
        }
        atom_parser.apply(input, {
            name: 'string',
            age: 'number',
            is_dead: 'boolean',
            stuffs: 'array<string>',
            cordinates: 'array<number>',
            subjects: 'array<boolean>'
        })

        assert.equal(input.name, 'kevin')
        assert.equal(input.age, 18)
        assert.equal(input.is_dead, false)
        assert.equal(input.stuffs[0], 'macbook')
        assert.equal(input.stuffs[1], 'bag')
        assert.equal(input.stuffs[2], 'bottle')
        assert.equal(input.cordinates[0], 1)
        assert.equal(input.cordinates[1], -49)
        assert.equal(input.cordinates[2], 7)
        assert.equal(input.subjects[0], false)
        assert.equal(input.subjects[1], true)
        assert.equal(input.subjects[2], false)

    })

    it('with target value is invalid number', () => {
        let input = {
            number: '100.000.00'
        }

        atom_parser.apply(input, {
            number: 'number'
        }, {
            name: 'TypeError',
            message: 'Invalid number format'
        })
    })

    it('with target value is invalid boolean', () => {
        let input = {
            boolean: 'TRUE'
        }

        atom_parser.apply(input, {
            number: 'boolean'
        }, {
            name: 'TypeError',
            message: 'Invalid boolean format'
        })
    })
})
