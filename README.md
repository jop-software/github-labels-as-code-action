<div align="center">
    <h1>GitHub labels as code Action</h1>
    <p>Store your issue labels as code in your repository.</p>
</div>

## Inputs

| Name    | Description                                | Default                 |
|---------|--------------------------------------------|-------------------------|
| `token` | Token to use to authorize label changes. (See [_Github Tokens_](#github-tokens))   | `${{ github.token }}`   |
| `file`  | Path to the file you store your labels in. | `./.github/labels.json` |

## Example usage

```yaml
uses: jop-software/github-labels-as-code-action@v1.0
with:
  token: "${{ github.token }}"
  file: "./.github/labels.json"
```

**Note:** You need to execute this action *after* [actions/checkout](https://github.com/actions/checkout)

If you want to see a real example of this action, take a look at [the workflows from this repository](./.github/workflows/labels.yaml) 😉 

### Github Tokens

On Feb. 2, 2023 GitHub announced in [a blog post](https://github.blog/changelog/2023-02-02-github-actions-updating-the-default-github_token-permissions-to-read-only/) that new generated GHA Tokens in repository will be **read only by defaut**.  
Therefore, when you add the action to a repository created after _2023-02-02_ you need to make sure to provide a GitHub token that has **write access** to update issue labels. This can be toggled in the [repository settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#configuring-the-default-github_token-permissions).  
When you are using inheritence for repository permissions, please read the [GitHub Blog Post](https://github.blog/changelog/2023-02-02-github-actions-updating-the-default-github_token-permissions-to-read-only/) explaining that change.

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
