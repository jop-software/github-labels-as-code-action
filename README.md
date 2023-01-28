# Issue labels as code Action

Store your issue labels as code in your repository

## Inputs

| Name    | Description                              | Default               |
|---------|------------------------------------------|-----------------------|
| `token` | Token to use to authorize label changes. | `${{ github.token }}` |

## Example usage

```yaml
uses: jop-software/issue-labels-as-code-action@v1.0
with:
  token: "${{ github.token }}"
```
