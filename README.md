# Gendiff
[![Maintainability](https://api.codeclimate.com/v1/badges/f8ca90582ad843ef1981/maintainability)](https://codeclimate.com/github/wesydi/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f8ca90582ad843ef1981/test_coverage)](https://codeclimate.com/github/wesydi/frontend-project-lvl2/test_coverage)
![build](https://github.com/wesydi/frontend-project-lvl2/workflows/build/badge.svg)

## About project
Gendiff is a CLI utility compares two configuration files and shows a difference.

## Usage
Use `gendiff --help` to show help page
```
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:

  -V, --version        output the version number
  -f, --format [type]  output format
  -h, --help           output usage information
```

## Examples

```
gendiff before.json after.json

{
  common: {
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
       key: value
    }
    setting6: {
      key: value
    + ops: vops
    }
  + follow: false
  + setting4: blah blah
  + setting5: {
       key5: value5
    }
  }
  group1: {
  - baz: bas
  + baz: bars
    foo: bar
  - nest: {
       key: value
    }
  + nest: str
  }
- group2: {
     abc: 12345
  }
+ group3: {
     fee: 100500
  }
}

```

```
gendiff before.json after.json --format plain
Property common.follow was added with value: 'false'                                                                         
Property common.setting2 was deleted
Property common.setting3 was changed from 'true' to '[complex value]'
Property common.setting4 was added with value: 'blah blah'
Property common.setting5 was added with value: '[complex value]'
Property common.setting6.ops was added with value: 'vops'
Property group1.baz was changed from 'bas' to 'bars'
Property group1.nest was changed from '[complex value]' to 'str'
Property group2 was deleted
Property group3 was added with value: '[complex value]'  
```

### Options

Gendiff supports different output formats:
* nested (default)
* plain
* JSON

Use -f flag to set required output format.
`-f, --format [type]  output format`

### Output formats description

#### Nested
Nested output format is a hierarchical tree. Affected key:value pairs are marked by '+' or '-' means option was added or deleted from resulting file. If value was modified it represents two rows with '+' new value and '-' old value. Unmodified pairs displays as is.

**Examples**

[![asciicast](https://asciinema.org/a/qAqCMvGjjWq8TNWdDJ2itSw5R.svg)](https://asciinema.org/a/qAqCMvGjjWq8TNWdDJ2itSw5R)

#### Plain
Plain output format display information for every affected row in plain text format. If object was fully changed it's displays as a 'complex value' string.

**Example**

Using same before.json and after.json files let's look on output:

[![asciicast](https://asciinema.org/a/OGeCGNZMylQvs6LtZZPS5QVgm.svg)](https://asciinema.org/a/OGeCGNZMylQvs6LtZZPS5QVgm)

#### JSON
JSON mode outputs reflects AST with following status:
* unchanged
* edited
* deleted
* added 

**Example**
```
gendiff before.json after.json --format json
[{"name":"common","status":"hasChildren","children":[{"name":"setting1","oldValue":"Value 1","newValue":"Value 1","status":"unchanged"},{"name":"setting2","oldValue":"200","status":"deleted"},{"name":"setting3","oldValue":true,"newValue":{"key":"value"},"status":"edited"},{"name":"setting6","status":"hasChildren","children":[{"name":"key","oldValue":"value","newValue":"value","status":"unchanged"},{"name":"ops","newValue":"vops","status":"added"}]},{"name":"follow","newValue":false,"status":"added"},{"name":"setting4","newValue":"blah blah","status":"added"},{"name":"setting5","newValue":{"key5":"value5"},"status":"added"}]},{"name":"group1","status":"hasChildren","children":[{"name":"baz","oldValue":"bas","newValue":"bars","status":"edited"},{"name":"foo","oldValue":"bar","newValue":"bar","status":"unchanged"},{"name":"nest","oldValue":{"key":"value"},"newValue":"str","status":"edited"}]},{"name":"group2","oldValue":{"abc":"12345"},"status":"deleted"},{"name":"group3","newValue":{"fee":"100500"},"status":"added"}]

```

### Configuration format supports

gendiff supports json, yml, ini formats with nested structure.
You can easily add your own parser in parsers.js.
