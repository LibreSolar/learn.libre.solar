# Version Control

A version control system (VCS) is probably the most important tool to collaborate on the same code base or a project in general. It provides:

- A structured overview of changes
- Possibility to go back in history (e.g. to a known working state)
- Methods to work on different features in parallel and merge them afterwards

Today, [git](https://git-scm.com/) is by far the most commonly used version control system. This chapter will give an introduction into some key aspects and describe how git is used in the context of the Libre Solar Project.

Git was originally developed by Linus Torvalds because of license concerns and performance issues with existing VCS used for the Linux Kernel development. Since then it has become the most popular version control system, probably also because of the success of social coding platforms like GitHub and GitLab.

Git is a distributed VCS, which means that all all changes are first applied to a local repository and only afterwards synchronized with a repository in the cloud. No permanent internet connection is required.


## Commits

A repository starts from an empty directory and is subsequently built by adding individual updates, called commits.

If you don't start from an existing repository, a folder can be turned into a git repository by calling `git init` in it.

Afterwards you can add files or changes in files to the next commit and finally apply it:

```bash
git add <list-of-your-files>
git commit
```

Every commit should contain an [atomic](https://en.wikipedia.org/wiki/Atomic_commit#Revision_control) update to the project and describes the update using a commit message.

::: tip
Once you have committed your changes, they are very well protected from being overwritten or accidentally deleted. Even if you do something wrong and e.g. delete a branch, you can still get back the commits by calling `git reflog` and afterwards `git checkout <your-commit>`.
:::


### Commit messages

As the commit log provides an overview of the change history for the developer, it is crucial that the commit messages are meaningful. Just using "Update" does not make any sense, as every commit updates something and it does not help to find a particular commit in the history.

The blog post [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) by Chris Beams summarizes most important aspects regarding commit messages.

A proper commit message might look like this:

```
DC/DC: Fix shut-off at low power

Previous implementation only considered the voltage and did not switch
off properly under all conditions. With this commit also the current
measurement is considered.

Tested with board xyz.
```

For the context of the Libre Solar project the most important rules are summarized below.

#### 1. A commit must be atomic

If a commit introduces a breaking change like renaming the function of a library, the same commit must also update all calls to that function. It is not allowed to split such a change into two separate commits, as otherwise it would not be possible to compile the firmware in the intermediate state.

This is especially important if you search for the commit that introduced a particular issue. With `git bisect` you can go through the commit history and find the "bad" commit using binary search. However, if the code does not compile for all commits, it's hard to check if the issue is present or not.

Also unrelated changes should not be combined in one commit like "Fix bug foo and update library bar". This makes a review of the different steps of changes more difficult.

#### 2. Precise summary in first line

The first line of the commit message contains the summary and starts with a capital letter. It does *not* end with a period, as it is the title of your change.

Imperative mood (e.g. fix, add, update) should be used instead of past tense (e.g. fixed, added, updated).

It should fit in about 50 characters.

#### 3. Additional explanation starting in line 3

If the summary is not sufficient to explain the purpose of the commit, additional explanations should be added in the following lines. One empty line has to be kept between the summary and further explanations.

Include line breaks so that the number of characters per line is around 72. It should never exceed 80 characters.

#### 4. Describe what and why, not how

Don't repeat what you can see from the code change itself. Instead, describe what the commit does and why the change was necessary.


## Push / Pull

A local repository can be synchronized with one or multiple `remotes`. If an existing repository is cloned with

```bash
git clone <repo-URL>
```

the original repository is already added as the remote called `origin`. All configured remotes can be listed with:

```
git remote -v
```

In order to upload local commits in the `main` branch to the `origin` remote, run:

```
git push origin main
```

Changes in the remote repository can be applied locally with:

```
git pull --ff-only origin main
```

The `--ff-only` makes sure that git does not automatically merge changes if your branch diverged from the remote branch (see section [Branching](#branching) below). It's always safe to call this command as it will not overwrite or touch any local changes.

You can also just call a more generic `git pull`, which fetches all remote branches. However, it is usually a good idea to specify exactly which branch you want to pull in order to avoid cluttering your local repository with unnecessary other branches from the remote repository.


## Branching

A key concept of git is that you can have multiple parallel streams of work, called branches.

Most projects have a `main` or `master` branch which is where releases are generated from. New features are developed in a dedicated feature branch and ongoing development might happen in an unstable `develop` branch. In order to create a new branch `my-new-feature` from the `main` branch call:

```bash
git branch my-new-feature
```

Now the branch has been created, but you still need to `switch` into that branch with

```bash
git switch my-new-feature
```

The short form for both above commands is:

```bash
git switch -c my-new-feature
```

In the new feature branch you can now implement changes and commit them. After that, the repository will look as shown in Figure 1.

<fig-caption src="development/git-branch.svg" caption="Git Branch: Develop a new feature in a new branch E" num="1" />

In parallel to the implementation of the feature, also the main branch has advanced. Two commits `C` and `D` were added, so both branches are diverged.

In order to combine both branches again, git provides the two different methods `merge` and `rebase`.


## Merge workflow

If you want to merge the feature branch into the main branch, you first have to switch into the main branch and call `git merge` from there, referencing the feature branch you want to merge:

```bash
git switch main
git merge <feature-branch-name>
```

If there were no changes in the main branch since the feature branch was created, `git` will perform a fast-forward merge, which means the commits from the feature branch are just added to the main branch as if they were added there in the first place.

However, if there were other changes in parallel, `git` will add the new new feature using an additional merge commit, as shown in Figure 2.

<fig-caption src="development/git-merge.svg" caption="Git Merge" num="2" />

::: tip
If a branch is merged using the GitHub web interface, a merge commit is created in any case, even if a fast-forward would be possible. That's because GitHub uses the `--no-ff` option.
:::

The merge commits can make the git history quite noisy, if mainly small changes like bug-fixes in a single commit are applied. In that case, a rebase workflow as described below could make more sense.


## Rebase workflow

A rebase rewrites the git history and applies the commits of one branch on top of new commits in another branch. As the base of the new commits has changed (hence the name rebase), they will get a new commit ID and a new date.

In contrast to the above `merge`, the `rebase` is called from the feature branch:

```bash
git switch <feature-branch-name>
git rebase main
```

After the rebase (and fixing potential conflicts if there were changes in the same files in both branches) you can fast-forward merge the feature branch into main, as the commits are now based on the HEAD of main.

```bash
git switch main
git merge <feature-branch-name>
```

Figure 3 shows the final result of a rebase merge. The new commit `E` ends up as a new commit on top of previous commits in the main branch without any merge commit.

<fig-caption src="development/git-rebase.svg" caption="Git Merge" num="3" />

The rebase workflow creates a linear history in the main branch, but it hides how different features were developed in parallel. This may not always be desirable. For Libre Solar we generally suggest to use the rebase workflow for rather small changes and the merge workflow for more complicated updates and complete feature additions.

::: warning
You should never rebase a branch which is used by multiple people, especially the `main` branch. If a branch is rebased and force-pushed to the remote repository, it cannot be pulled by others without conflicts anymore.
:::

## Pull Requests

Pull requests are a concept of GitHub, which allow to propose a change to a repository. You request the maintainer of the repository to pull your changes in. In GitLab this is called **Merge Request**.

In order to create a pull request you usually fork the repository to your own GitHub account first. In your own fork you can work on changes (preferably in dedicated branches) and push them back to the remote repository. Afterwards you can create a pull request via the GitHub user interface to propose updates to the original repository you created the fork from.

For Libre Solar we follow the approach to merge only clean pull requests. This means that fixes based on review comments should be addressed in the original commits instead of adding another commit with the fixes. This approach is also [followed by Zephyr](https://docs.zephyrproject.org/latest/contribute/index.html#contribution-workflow).

If you want to fix the last commit in the history, you can just add the fixes and ammend the last commit:

```bash
git add <fixed-file>
git commit --amend
```

However, if you want to fix an older commit, you need to use interactive rebase starting with the commit you want to change. If this is for example the second commit in the history, use the following command (with `-i` for interactive):

```bash
git rebase -i HEAD~2
```

Another way to jump to a specific commit is to look at the history first and afterwards reference a specific commit.

```bash
git log --oneline
git rebase -i <commit-id>^
```

Note the `^` a th the end. If it is omitted, the rebase will start after that commit and not include the commit itself.

The interactive rebase will ask you which commits in the list you want to edit. Afterwards you can `git add` any changes to the old commit. To finish editing a commit, call:

```bash
git rebase --continue
```

Now that the history has been rewritten, you can't just push this command to the remote repository like before, as git will complain about conflicting changes. Instead, you need to force-push to the feature branch:

```bash
git push --force origin feature-branch
```


## Submodules

A repository can contain submodules, which are basically other repositories integrated in a subfolder.

Keeping submodules in sync with the main repository can sometimes be a bit tricky.

If a repository with submodules is cloned via the command line (or downloaded directly from GitHub), the submodules are not pulled automatically and the directories will be empty. The following command should be used to clone a repository including all its submodules:

```bash
git clone --recursive <your-repo-URL>
```

If you cloned the repository already and want to pull the submodules, run:

```bash
git submodule update --init --recursive
```

If the submodule in your repository was updated and you pull the changes, the submodules need to be synchronized manually in an additional step by calling:

```bash
git submodule update
```

If you updated the submodule yourself and pushed the submodule from the submodule directory, you can point the main repository to the new status of the submodule similar to any normal file that has been changed.

```bash
git add <path-to-your-submodule>
git commit
```
