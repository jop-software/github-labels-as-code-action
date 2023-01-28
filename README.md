<div align="center">
    <h1>Issue labels as code Action</h1>
    <p>Store your issue labels as code in your repository.</p>
</div>

## Inputs

| Name    | Description                                | Default                 |
|---------|--------------------------------------------|-------------------------|
| `token` | Token to use to authorize label changes.   | `${{ github.token }}`   |
| `file`  | Path to the file you store your labels in. | `./.github/labels.json` |

## Example usage

```yaml
uses: jop-software/github-labels-as-code-action@v1.0
with:
  token: "${{ github.token }}"
  file: "./.github/labels.json"
```

**Note:** You need to execute this action *after* [actions/checkout](https://github.com/actions/checkout)

## JSON Format

The expected JSON format follows the _Body parameters_ from the 
[Create a label](https://docs.github.com/de/rest/issues/labels?apiVersion=2022-11-28#create-a-label) GitHub Rest API endpoint.

See the following example:

```json5
[
  {
    "name": "Bug",                            // <- String
    "description": "Something isn't working", // <- String (max 100 chars, optional)
    "color": "d73a4a"                         // <- String (hexadecimal color code without the leading #) 
  }
  // ...
]
```

## Professional Support 

Professional support is available, contact [support@jop-software.de](mailto:support@jop-software.de) for more information.

<div align="center">
    <span>&copy; 2023, jop-software Inh. Johannes Przymusinski</span>
</div>
