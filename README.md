# clean-workspace-github-action
![Test][0]

This action cleans up the workspace when the workflow is finished.

This action executes the following commands

```sh
rm -rf ${{ github.workspace }}/*
```

## Usage
```yml
- name: Cleanup workspace
  uses: akiojin/clean-workspace-github-action@v1
```

## License
Any contributions made under this project will be governed by the [MIT License][1].

[0]: https://github.com/akiojin/clean-workspace-github-action/actions/workflows/test.yml/badge.svg
[1]: https://github.com/akiojin/clean-workspace-github-action/blob/main/LICENSE
