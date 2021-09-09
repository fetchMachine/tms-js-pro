# GIT

## Theory
- [why git](https://git-scm.com/book/ru/v2/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%9E-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B5-%D0%BA%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D1%8F-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B9)
- [stages](https://git-scm.com/book/ru/v2/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%A7%D1%82%D0%BE-%D1%82%D0%B0%D0%BA%D0%BE%D0%B5-Git%3F)
- [branches and pointers](https://git-scm.com/book/ru/v2/%D0%92%D0%B5%D1%82%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-Git-%D0%9E-%D0%B2%D0%B5%D1%82%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B8-%D0%B2-%D0%B4%D0%B2%D1%83%D1%85-%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%85)
- [git flow](https://www.atlassian.com/ru/git/tutorials/comparing-workflows/gitflow-workflow)

## Links

- [git book](https://git-scm.com/book/ru/v2/)
- [atlassian tutorials](https://www.atlassian.com/ru/git/tutorials/learn-git-with-bitbucket-cloud)

## Practice

### Install

[Get git](https://git-scm.com/)

```sh
git config --global user.name "your name"
git config --global user.email "your email"
git config --global core.editor "your editor"
```

Генерируем ssh ключи, публичный ключ из C:\Users\{yourUserName}\.ssh\*.pub заносим в github
```sh
ssh-keygen
```

### Start

| Command | Description |
| - | - |
| git init [-q] | |
| git clone [url] | |

### Romote hub

| Command | Description |
| - | - |
| git remote add [alis] [url] ||
| git push [-u] [-f] [origin] [branch] ||
| git fetch ||
| git pull | |

### Branch

| Command | Description |
| - | - |
| git branch [-m] [-r] [-D] | |
| git origin update | |
| git merge ||
| git rebase [-i] ||
| git cherry-pick ||
| git checkout [-b] [branchName / hash] |  |

### Commits

| Command | Description |
| - | - |
| git status |  |
| git diff |  |
| git add [.] |  |
| git commit [--ammend] [--no-edit] ||
| git log |  |
| git reset [soft / hard / mixed] |  |
| git revert |  |
| git stash [list] [pop] [drop] ||

## Misc

- .gitignore / .gitkeep (не документирован)
- merge conflicts (git checkout --theirs filePath)
- merge request
- brach visualisation (sourcetree / kraken / extensions / insights > network)
- fork
