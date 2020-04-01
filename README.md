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

[![asciicast](https://asciinema.org/a/GkHONc8uetQm6VnbI7Pz6JkhF.svg)](https://asciinema.org/a/GkHONc8uetQm6VnbI7Pz6JkhF)

#### Plain
Plain output format display information for every affected row in plain text format. If object was fully changed it's displays as a 'complex value' string.

**Example**

Using same before.json and after.json files let's look on output:

[![asciicast](https://asciinema.org/a/bzfNsMi56QeKhq0vZkKZ47KhN.svg)](https://asciinema.org/a/bzfNsMi56QeKhq0vZkKZ47KhN)

#### JSON
JSON mode outputs reflects AST with following status:
* unchanged
* edited
* deleted
* added 

**Example**
```
gendiff before.json after.json --format json
[{"name":"common","type":"obj","status":"edited","value":"","valuePrevious":"","children":[[{"name":"setting1","type":"key","status":"unchanged","value":"Value 1","valuePrevious":"Value 1","children":[]},{"name":"setting2","type":"key","status":"deleted","valuePrevious":"200","children":[]},{"name":"setting3","type":"key","status":"edited","value":{"key":"value"},"valuePrevious":true,"children":[]},{"name":"setting6","type":"obj","status":"edited","value":"","valuePrevious":"","children":[[{"name":"key","type":"key","status":"unchanged","value":"value","valuePrevious":"value","children":[]},{"name":"ops","type":"key","status":"added","value":"vops","children":[]}]]},{"name":"follow","type":"key","status":"added","value":false,"children":[]},{"name":"setting4","type":"key","status":"added","value":"blah blah","children":[]},{"name":"setting5","type":"key","status":"added","value":{"key5":"value5"},"children":[]}]]},{"name":"group1","type":"obj","status":"edited","value":"","valuePrevious":"","children":[[{"name":"baz","type":"key","status":"edited","value":"bars","valuePrevious":"bas","children":[]},{"name":"foo","type":"key","status":"unchanged","value":"bar","valuePrevious":"bar","children":[]},{"name":"nest","type":"key","status":"edited","value":"str","valuePrevious":{"key":"value"},"children":[]}]]},{"name":"group2","type":"key","status":"deleted","valuePrevious":{"abc":"12345"},"children":[]},{"name":"group3","type":"key","status":"added","value":{"fee":"100500"},"children":[]}]

```

### Configuration format supports

gendiff supports json, yml, ini formats with nested structure.
You can easily add your own parser in parsers.js.
