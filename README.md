# Issue labels as code Action

Store your issue labels as code in your repository

## Inputs

| Name         | Description                                                                | Default |
|--------------|----------------------------------------------------------------------------|---------|
| `repo-token` | Token to use to authorize label changes. Typically the GITHUB_TOKEN secret | `N/A`   |

## Example usage

```yaml
uses: jop-software/issue-labels-as-code-action@v1.0
with:
  repo-token: "${{ secrets.GITHUB_TOKEN }}"
```
