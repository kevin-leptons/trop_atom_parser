const assert = require('assert')

const atom_parser = require('../lib')

describe('atom_parser.apply()', () => {
    let general_schema = [
        ['name', 'string'],
        ['age', 'number'],
        ['is_dead', 'boolean']
    ]

    it('with source value is a number', () => {
        let target = {
            name: 1
        }

        assert.throws(() => {
            atom_parser.apply(target, general_schema)
        }, {
            name: 'TypeError',
            message: 'Source value is not a string'
        })
    })

    it('with source value is true', () => {
        let target = {
            name: true
        }

        assert.throws(() => {
            atom_parser.apply(target, general_schema)
        }, {
            name: 'TypeError',
            message: 'Source value is not a string'
        })
    })

    it('with source value is false', () => {
        let target = {
            name: false
        }

        assert.throws(() => {
            atom_parser.apply(target, general_schema)
        }, {
            name: 'TypeError',
            message: 'Source value is not a string'
        })
    })

    it('with source value is an array', () => {
        let target = {
            name: [1, 2, 3]
        }

        assert.throws(() => {
            atom_parser.apply(target, general_schema)
        }, {
            name: 'TypeError',
            message: 'Source value is not a string'
        })
    })

    it('with source value is an object', () => {
        let target = {
            name: {}
        }

        assert.throws(() => {
            atom_parser.apply(target, general_schema)
        }, {
            name: 'TypeError',
            message: 'Source value is not a string'
        })
    })

    it('with source value is a function', () => {
        let target = {
            name: () => {}
        }

        assert.throws(() => {
            atom_parser.apply(target, general_schema)
        }, {
            name: 'TypeError',
            message: 'Source value is not a string'
        })
    })

    it('with invalid target type', () => {
        let target = {
            name: 'kevin'
        }
        let schema = [
            ['name', 'function']
        ]

        assert.throws(() => {
            atom_parser.apply(target, schema)
        }, {
            name: 'TypeError',
            message: 'Invalid target type'
        })
    })

    it('with target type is string', () => {
        let target = {
            name: 'kevin'
        }

        atom_parser.apply(target, general_schema)
        assert.equal(target.name, 'kevin')
    })

    it('with target type is number', () => {
        let target = {
            age: '18'
        }

        atom_parser.apply(target, general_schema)
        assert.equal(target.age, 18)
    })

    it('with target type is boolean', () => {
        let target = {
            true_value: 'true',
            false_value: 'false'
        }
        let schema = [
            ['true_value', 'boolean'],
            ['false_value', 'boolean']
        ]

        atom_parser.apply(target, schema)
        assert.equal(target.true_value, true)
        assert.equal(target.false_value, false)
    })

    it('with target type is array<string>', () => {
        let target = {
            tools: 'laptop,mouse,keyboard,note-book'
        }
        let schema = [
            ['tools', 'array<string>']
        ]

        atom_parser.apply(target, schema)
        assert.equal(target.tools[0], 'laptop')
        assert.equal(target.tools[1], 'mouse')
        assert.equal(target.tools[2], 'keyboard')
        assert.equal(target.tools[3], 'note-book')
    })

    it('with target type is array<number>', () => {
        let target = {
            numbers: '128,128.000,128.256,-128,-128.256'
        }
        let schema = [
            ['numbers', 'array<number>']
        ]

        atom_parser.apply(target, schema)
        assert.equal(target.numbers[0], 128)
        assert.equal(target.numbers[1], 128.0)
        assert.equal(target.numbers[2], 128.256)
        assert.equal(target.numbers[3], -128)
        assert.equal(target.numbers[4], -128.256)
    })

    it('with target type is array<boolean>', () => {
        let target = {
            values: 'true,false,false,true,true'
        }
        let schema = [
            ['values', 'array<boolean>']
        ]

        atom_parser.apply(target, schema)
        assert.equal(target.values[0], true)
        assert.equal(target.values[1], false)
        assert.equal(target.values[2], false)
        assert.equal(target.values[3], true)
        assert.equal(target.values[4], true)
    })

    it('with valid and mixed schema', () => {
        let target = {
            name: 'kevin',
            age: '18',
            is_dead: 'false',
            stuffs: 'macbook,bag,bottle',
            cordinates: '1,-49,7',
            subjects: 'false,true,false'
        }
        let schema = [
            ['name', 'string'],
            ['age', 'number'],
            ['is_dead', 'boolean'],
            ['stuffs', 'array<string>'],
            ['cordinates', 'array<number>'],
            ['subjects', 'array<boolean>']
        ]

        atom_parser.apply(target, schema)
        assert.equal(target.name, 'kevin')
        assert.equal(target.age, 18)
        assert.equal(target.is_dead, false)
        assert.equal(target.stuffs[0], 'macbook')
        assert.equal(target.stuffs[1], 'bag')
        assert.equal(target.stuffs[2], 'bottle')
        assert.equal(target.cordinates[0], 1)
        assert.equal(target.cordinates[1], -49)
        assert.equal(target.cordinates[2], 7)
        assert.equal(target.subjects[0], false)
        assert.equal(target.subjects[1], true)
        assert.equal(target.subjects[2], false)

    })

    it('with target value is invalid number', () => {
        let target = {
            number: '100.000.00'
        }
        let schema = [
            ['number', 'number']
        ]

        assert.throws(() => {
            atom_parser.apply(target, schema)
        }, {
            name: 'TypeError',
            message: 'Invalid number format'
        })
    })

    it('with target value is invalid boolean', () => {
        let target = {
            boolean: 'TRUE'
        }
        let schema = [
            ['boolean', 'boolean']
        ]

        assert.throws(() => {
            atom_parser.apply(target, schema)
        }, {
            name: 'TypeError',
            message: 'Invalid boolean format'
        })
    })
})
