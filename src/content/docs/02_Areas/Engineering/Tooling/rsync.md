---
title: rsync
description: "Rsync is a powerful tool for synchronizing files and directories between two locations over a network or locally."
---

# How To Use Rsync to Sync Local and Remote Directories | DigitalOcean

### [Introduction](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#introduction)

[**Rsync**](https://rsync.samba.org/), which stands for **remote sync**, is a command-line tool for synchronizing files and directories locally and remotely. It uses a delta-transfer algorithm to minimize the amount of data copied by moving only the portions of files that have changed, making it highly efficient for tasks like backups and mirroring.

In this guide, you will learn how to use `rsync` for various file management tasks. We will cover its basic syntax, how to transfer files to and from a remote server, and how to use common options like `--delete` for mirroring and `--dry-run` for safe testing. You will also learn how to automate transfers with `cron` and troubleshoot frequent issues.

Deploy your frontend applications from GitHub using [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform). Let DigitalOcean focus on scaling your app.

**Key Takeaways:**

-   `rsync` is a file synchronization tool that efficiently copies local and remote directories by transferring only the changed portions of files.

-   The trailing slash (`/`) on the source path is critical, as it dictates whether `rsync` copies the contents of the directory or the directory itself.
-   Always test `rsync` commands with the `--dry-run` or `-n` flag to preview the outcome without making any actual changes to the files.

-   The `-a` (archive) flag is recommended for most use cases because it syncs recursively while preserving permissions, ownership, and modification times.
-   To create a true mirror, use the `--delete` option to remove files from the destination that are no longer present in the source directory.

-   For remote transfers, the `-z` flag compresses file data to reduce network usage, and the `-P` flag shows progress while allowing interrupted transfers to be resumed.
-   `rsync` uses [SSH](https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys) for secure remote operations, enabling you to “push” files to a remote system or “pull” files from it.

-   You can automate synchronization tasks with [`cron`](https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-ubuntu-1804), which requires using absolute paths in your command and configuring passwordless SSH key authentication.

## [Prerequisites](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#prerequisites)

In order to practice using `rsync` to sync files between a local and remote system, you will need two machines to act as your local computer and your remote machine, respectively. These two machines could be virtual private servers, virtual machines, containers, or personal computers as long as they’ve been properly configured.

If you plan to follow this guide using servers, it would be prudent to set them up with administrative users and to configure a firewall on each of them. To set up these servers, follow our [Initial Server Setup Guide](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-22-04).

Regardless of what types of machines you use to follow this tutorial, you will need to have created SSH keys on both of them. Then, copy each server’s public key to the other server’s `authorized_keys` file as outlined in [Step 2 — Copying the Public Key to Your Ubuntu Server](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-20-04#step-2-%E2%80%94-copying-the-public-key-to-your-ubuntu-server) of that guide.

## [Defining Rsync](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#defining-rsync)

**Rsync** is a command-line utility designed for efficient file and directory synchronization. It can be used to copy data between directories on a single machine or between different machines connected over a network. Due to its reliability and versatility, it is included by default on most [Linux and Unix-like operating systems](https://www.digitalocean.com/community/tags/linux).

The primary feature that distinguishes `rsync` from tools like `cp` or `scp` is its use of a delta-transfer algorithm. Before transferring, `rsync` compares the source and destination files. By default, it identifies changes by checking modification times and file sizes. If a file has been modified, the algorithm determines which specific parts of the file have changed and sends only those differences. In contrast, `scp` and `cp` copy the entire file every time. This delta-transfer method dramatically reduces the amount of data transferred, making `rsync` exceptionally fast for subsequent syncs or when updating large files with small modifications.

This efficiency makes `rsync` an ideal tool for a variety of tasks, including creating incremental backups, mirroring entire directory structures for redundancy, and deploying application code. It operates over SSH for secure remote transfers and provides a rich set of options, such as `--delete` for mirroring and `--exclude` for filtering, that give users precise control over the synchronization process.

## [Understanding Rsync Syntax](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#understanding-rsync-syntax)

The syntax for `rsync` operates similar to other tools, such as `ssh`, `scp`, and `cp`.

First, change into your home directory by running the following command:

```
cd ~

```

Then create a test directory:

```
mkdir dir1

```

Create another test directory:

```
mkdir dir2

```

Now add some test files:

```
touch dir1/file{1..100}

```

There’s now a directory called `dir1` with 100 empty files in it. Confirm by listing out the files:

```
ls dir1

```

```
Outputfile1    file18  file27  file36  file45  file54  file63  file72  file81  file90
file10   file19  file28  file37  file46  file55  file64  file73  file82  file91
file100  file2   file29  file38  file47  file56  file65  file74  file83  file92
file11   file20  file3   file39  file48  file57  file66  file75  file84  file93
file12   file21  file30  file4   file49  file58  file67  file76  file85  file94
file13   file22  file31  file40  file5   file59  file68  file77  file86  file95
file14   file23  file32  file41  file50  file6   file69  file78  file87  file96
file15   file24  file33  file42  file51  file60  file7   file79  file88  file97
file16   file25  file34  file43  file52  file61  file70  file8   file89  file98
file17   file26  file35  file44  file53  file62  file71  file80  file9   file99
```

You also have an empty directory called `dir2`. To sync the contents of `dir1` to `dir2` on the same system, you will run `rsync` and use the `-r` flag, which stands for “recursive” and is necessary for directory syncing:

```
rsync -r dir1/ dir2

```

Another option is to use the `-a` flag, which is a combination flag and stands for “archive”. This flag syncs recursively and preserves [symbolic links](https://www.digitalocean.com/community/tutorials/workflow-symbolic-links), special and device files, modification times, groups, owners, and permissions. It’s more commonly used than `-r` and is the recommended flag to use. Run the same command as the previous example, this time using the `-a` flag:

```
rsync -a dir1/ dir2

```

Please note that there is a trailing slash (`/`) at the end of the first argument in the syntax of the the previous two commands and highlighted here:

```
rsync -a dir1/ dir2

```

This trailing slash signifies the contents of `dir1`. Without the trailing slash, `dir1`, including the directory, would be placed within `dir2`. The outcome would create a hierarchy like the following:

```
~/dir2/dir1/[files]
```

Another tip is to double-check your arguments before executing an `rsync` command. Rsync provides a method for doing this by passing the `-n` or `--dry-run` options. The `-v` flag, which means “verbose”, is also necessary to get the appropriate output. You’ll combine the `a`, `n`, and `v` flags in the following command:

```
rsync -anv dir1/ dir2

```

```
Outputsending incremental file list
./
file1
file10
file100
file11
file12
file13
file14
file15
file16
file17
file18
. . .
```

Now compare that output to the one you receive when removing the trailing slash, as in the following:

```
rsync -anv dir1 dir2

```

```
Outputsending incremental file list
dir1/
dir1/file1
dir1/file10
dir1/file100
dir1/file11
dir1/file12
dir1/file13
dir1/file14
dir1/file15
dir1/file16
dir1/file17
dir1/file18
. . .
```

This output now demonstrates that the directory itself was transferred, rather than only the files within the directory.

## [Emphasize Testing with `--dry-run` to Prevent Mistakes](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#emphasize-testing-with-dry-run-to-prevent-mistakes)

Before executing any `rsync` command, especially those involving remote destinations or destructive options like `--delete`, it is crucial to perform a test run. `rsync` provides a safe and simple way to do this with the `--dry-run` flag (or its shorter version, `-n`).

A dry run simulates the entire synchronization process without making any actual changes. It will show you exactly which files would be copied, updated, or deleted.

To perform a dry run, simply add `-n` to your command. It is often combined with `-v` (verbose) to get a clear, human-readable list of actions.

```
rsync -anv --delete source_directory/ destination_directory/

```

**Example Output of a Dry Run:**

```
sending incremental file list
deleting old_file.txt
./
new_file.txt
updated_file.txt

sent 218 bytes  received 38 bytes  512.00 bytes/sec
total size is 1024  speedup is 4.00 (DRY RUN)
```

This output tells you that if you were to run the command for real, `rsync` would delete `old_file.txt`, create `new_file.txt`, and update `updated_file.txt`.

Always perform a dry run when:

-   Using the `--delete` flag for the first time on a specific task.

-   You have constructed a complex set of `--include` or `--exclude` rules.
-   You are syncing data to a critical location, like a production server.

Taking a few seconds to run a `--dry-run` can prevent irreversible data loss and save you from costly mistakes.

## [Pushing and Pulling Files: Local to Remote and Remote to Local](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#pushing-and-pulling-files-local-to-remote-and-remote-to-local)

To use `rsync` to sync files with a remote system, you need SSH access configured between your local and remote machines, as well as `rsync` installed on both systems. Once you have verified that you can connect via SSH, you can begin syncing files. The basic syntax is similar to `scp`, where the source is the first argument and the destination is the second.

### [Push: Syncing from a Local Machine to a Remote Machine](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#push-syncing-from-a-local-machine-to-a-remote-machine)

A “push” operation is when you send files from your local machine to a remote server. This is commonly used for deploying application code or backing up local data.

Let’s use the `dir1` directory we created earlier, which contains 100 empty files. We will sync this directory to a remote server. The command structure places the local directory as the source and the remote system as the destination.

In this example, we want to transfer the `dir1` directory itself, not just its contents, so we will omit the trailing slash on the source.

```
rsync -a ~/dir1 username@remote_host:destination_directory

```

Let’s break this down:

-   `-a`: The archive flag, which syncs recursively and preserves permissions, modification times, and other attributes.

-   `~/dir1`: The local source directory.
-   `username@remote_host`: The credentials for the remote system.

-   `:`: A colon that separates the remote host information from the file path.
-   `destination_directory`: The location on the remote server where you want to place the files. For example, `~/` would place it in the remote user’s home directory.

After running this command, a directory named `dir1` will exist inside `destination_directory` on the remote server.

### [Pull: Syncing from a Remote Machine to a Local Machine](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#pull-syncing-from-a-remote-machine-to-a-local-machine)

A “pull” operation does the opposite: it retrieves files from a remote server and copies them to your local machine. This is useful for downloading server logs or retrieving backups.

To perform a pull, you simply reverse the source and destination in the command. The remote system is now the source (the first argument), and the local system is the destination (the second argument).

Suppose the `dir1` directory was on the remote system instead of your local one. To pull it to your local machine, the syntax would be:

```
rsync -a username@remote_host:/path/to/remote/dir1 /path/to/local/destination

```

Here, `rsync` will connect to `remote_host`, go to the `/path/to/remote/dir1` directory, and copy its contents to `/path/to/local/destination` on your local computer.

### [The Critical Role of the Trailing Slash in Remote Syncing](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#the-critical-role-of-the-trailing-slash-in-remote-syncing)

Just like with local transfers, the trailing slash (`/`) on the source directory is critical because it dictates what gets copied.

Consider the “push” example again:

-   `rsync -a ~/dir1 remote_host:~/backups`: This command copies the **directory itself**. The result on the remote server is a new directory at `~/backups/dir1`.
    
-   `rsync -a ~/dir1/ remote_host:~/backups`: This command, with the trailing slash, copies only the **contents** of `~/dir1`. It places the files (file1, file2, etc.) directly inside `~/backups`. The `dir1` directory itself is not created in the destination.
    

Always double-check for the trailing slash on your source path to ensure you are transferring exactly what you intend to. A quick `--dry-run` test is highly recommended before executing a remote transfer.

## [Using Other Rsync Options](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#using-other-rsync-options)

Rsync provides many options for altering the default behavior of the utility, such as the flag options you learned about in the previous section.

### [Improving Transfer Speed and Resilience](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#improving-transfer-speed-and-resilience)

While the `-a` flag is the most common, a few others can improve the transfer process, especially over network connections.

-   If you’re transferring files that have not already been compressed, like text files, you can reduce the network transfer by adding compression with the `-z` option:
    
    ```
    rsync -az source destination
    
    ```
    
-   The `-P` flag is also helpful. It combines the flags `--progress` and `--partial`. This first flag provides a progress bar for the transfers, and the second flag allows you to resume interrupted transfers:
    
    ```
    rsync -azP source destination
    
    ```
    
    ```
    Outputsending incremental file list
    created directory destination
    source/
    source/file1
                  0 100%    0.00kB/s    0:00:00 (xfr#1, to-chk=99/101)
    sourcefile10
                  0 100%    0.00kB/s    0:00:00 (xfr#2, to-chk=98/101)
    source/file100
                  0 100%    0.00kB/s    0:00:00 (xfr#3, to-chk=97/101)
    source/file11
                  0 100%    0.00kB/s    0:00:00 (xfr#4, to-chk=96/101)
    source/file12
                  0 100%    0.00kB/s    0:00:00 (xfr#5, to-chk=95/101)
    . . .
    ```
    
    If you run the command again, you’ll receive a shortened output since no changes have been made. This illustrates Rsync’s ability to use modification times to determine if changes have been made:
    
    ```
    rsync -azP source destination
    
    ```
    
    ```
    Outputsending incremental file list
    sent 818 bytes received 12 bytes 1660.00 bytes/sec
    total size is 0 speedup is 0.00
    ```
    
    Say you were to update the modification time on some of the files with a command like the following:
    
    ```
    touch dir1/file{1..10}
    
    ```
    
    Then, if you were to run `rsync` with `-azP` again, you’ll notice in the output how Rsync intelligently re-copies only the changed files:
    
    ```
    rsync -azP source destination
    
    ```
    
    ```
    Outputsending incremental file list
    file1
                0 100%    0.00kB/s    0:00:00 (xfer#1, to-check=99/101)
    file10
                0 100%    0.00kB/s    0:00:00 (xfer#2, to-check=98/101)
    file2
                0 100%    0.00kB/s    0:00:00 (xfer#3, to-check=87/101)
    file3
                0 100%    0.00kB/s    0:00:00 (xfer#4, to-check=76/101)
    . . .
    ```
    

### [Mirroring Directories with --delete](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#mirroring-directories-with-delete)

In order to keep two directories truly in sync, it’s necessary to delete files from the destination directory if they are removed from the source. By default, `rsync` does not delete anything from the destination directory.

You can change this behavior with the `--delete` option. Before using this option, you can use `-n`, the `--dry-run` option, to perform a test to prevent unwanted data loss:

```
rsync -an --delete source destination

```

### [Advanced Filtering with `--exclude` and `--include`](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#advanced-filtering-with-exclude-and-include)

If you prefer to exclude certain files or directories located inside a directory you are syncing, you can do so with `rsync`’s powerful filtering capabilities. The key is that `rsync` evaluates these rules in the order you provide them; the first rule that matches a file is the one that is applied.

#### Excluding Files and Directories

You can use the `--exclude` flag to prevent specific files or directories from being transferred. You can use wildcard patterns (`*`) to match multiple files.

For example, to sync a project directory while excluding temporary files, log files, and a `dist/` build directory, you would run:

```
rsync -av --exclude='*.tmp' --exclude='*.log' --exclude='dist/' source_directory/ destination_directory/

```

-   `--exclude='*.tmp'` excludes all files ending in `.tmp`.

-   `--exclude='*.log'` excludes all files ending in `.log`.
-   `--exclude='dist/'` excludes the `dist` directory and its contents. The trailing slash ensures it only matches a directory, not a file named `dist`.

#### Including Files While Excluding Others

The `--include` flag is more complex and works in conjunction with `--exclude`. It’s often used to *override* an exclusion for a specific pattern.

Let’s refine the previous example. Suppose you want to exclude all files in the `config/` directory *except* for `config/production.json`. To achieve this, you must place the `--include` rule *before* the `--exclude` rule.

```
rsync -av --include='config/production.json' --exclude='config/*' source_directory/ destination_directory/

```

Here’s how `rsync` processes this:

1.  It checks `config/production.json`. The `--include='config/production.json'` rule matches, so `rsync` marks this file for transfer and stops processing rules for it.
2.  It then checks another file, like `config/development.json`. The include rule doesn’t match. It moves to the next rule, `--exclude='config/*'`, which *does* match. The file is excluded.

If the order were reversed, `--exclude='config/*'` would match all files in the `config` directory first, and they would be excluded before the `--include` rule ever had a chance to be evaluated.

### [Creating Backups with --backup](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#creating-backups-with-backup)

Finally, Rsync’s `--backup` option can be used to store backups of important files. It’s used in conjunction with the `--backup-dir` option, which specifies the directory where the backup files should be stored. When a file in the destination is updated or deleted, the old version is moved to the specified backup directory first:

```
rsync -a --delete --backup --backup-dir=/path/to/backups /path/to/source destination

```

## [Automating Transfers with Cron Jobs](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#automating-transfers-with-cron-jobs)

You can automate `rsync` tasks using `cron`, a time-based job scheduler standard in Unix-like operating systems. `cron` is a daemon (a background process) that runs commands at predefined schedules. This is especially useful for performing regular, unattended backups without manual intervention.

A `cron` job is a single command defined in a special file called a `crontab`. Each user on the system can have their own `crontab` to schedule jobs that will run with their permissions. To edit your user-specific `crontab`, run the following command:

```
crontab -e

```

A `crontab` entry consists of two parts: the schedule and the command to execute. The schedule is defined by five fields, representing time in a specific order.

```


# ┌───────────── minute (0 - 59)


# │ ┌───────────── hour (0 - 23)


# │ │ ┌───────────── day of the month (1 - 31)


# │ │ │ ┌───────────── month (1 - 12)


# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)


# │ │ │ │ │


# │ │ │ │ │


# * * * * * <command_to_execute>
```

An asterisk (`*`) is a wildcard, meaning “every”. Here are some example schedules to illustrate how it works:

-   `* * * * *` - Runs every minute of every day.

-   `30 * * * *` - Runs at 30 minutes past every hour.
-   `0 18 * * 1-5` - Runs at 6:00 PM (18:00) every weekday (Monday to Friday).

-   `0 4 * * 0` - Runs at 4:00 AM every Sunday.
-   `*/15 * * * *` - Runs every 15 minutes.

### [Example: A Daily Backup](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#example-a-daily-backup)

Let’s create a `cron` job that runs `rsync` every day at 3:00 AM to back up a local directory (`/var/www/html`) to a remote backup server.

Add the following line to your `crontab`:

```
0 3 * * * rsync -a --delete /var/www/html/ user@remote_host:/path/to/backups/
```

-   **The Schedule (`0 3 * * *`)**: This translates to “at minute 0 of hour 3 on every day, of every month, on every day of the week.”

-   **The Command (`rsync...`)**: This is the standard `rsync` command to mirror a directory.

### [Best Practices for `rsync` in Cron Jobs](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#best-practices-for-rsync-in-cron-jobs)

When running commands via `cron`, it’s important to remember they run in a non-interactive, minimal shell environment. To make your automated `rsync` jobs reliable, follow these best practices:

-   **Use Absolute Paths:** `cron` does not have the same `PATH` environment variable as your regular user shell. This means it might not know where the `rsync` executable is. You should always use the full path to executables and directories. You can find the path to `rsync` by running `which rsync` (it’s often `/usr/bin/rsync`). Likewise, use `/home/user/` instead of `~/`.
    
-   **SSH Key Authentication:** A cron job cannot prompt you for a password. Before automating an `rsync` transfer to a remote host, you **must** have passwordless SSH key authentication set up.
    
-   **Output Handling and Logging:** By default, `cron` emails any output from a command to the user who owns the crontab. To avoid receiving an email every time your backup runs successfully, you can manage the output.
    
    -   **Suppressing all output:** To discard all output (both successful output and errors), redirect it to `/dev/null`. This is good for simple, non-critical jobs. The syntax `> /dev/null 2>&1` means “redirect standard output to `/dev/null`, and then redirect standard error (`2`) to the same place as standard output (`&1`)”.
    -   **Logging to a file (Recommended):** A more robust approach is to log the output to a file. This way, you have a record of the transfer and can review it for errors. Using `>>` appends the output to the log file instead of overwriting it each time.

## [Troubleshooting Common Issues and Best Practices](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#troubleshooting-common-issues-and-best-practices)

This section is a problem-oriented guide to help you solve the most common `rsync` issues. Each topic describes a frequent problem, explains how to fix it, and then provides the best practice to prevent it from happening in the future.

### [1\. Command Did Not Behave as Expected](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#1-command-did-not-behave-as-expected)

-   **Common Issue:** “My `rsync` command did something unexpected!”
    
    You ran a command, and the result wasn’t what you intended, files were deleted when you didn’t want them to be, or data ended up in the wrong directory.
    
-   **Troubleshooting Steps:**
    
    To diagnose what went wrong, you need to see what `rsync` *thinks* you want to do. Rerun your command, but add the `-anv` flags (`archive`, `dry-run`, `verbose`). This will generate a report of the planned actions without making any changes.
    
    ```
    rsync -anv source/ destination/
    
    ```
    
    Review the verbose output carefully. It will show you exactly which files are being targeted, helping you find a typo in a path or a flaw in your logic.
    
-   **Best Practice:** Always Test with `--dry-run`
    
    The best way to avoid surprises is to always perform a simulation before executing any command that modifies data. The `--dry-run` flag (`-n`) is your most important safety net.
    

### [2\. An Extra Directory Was Created](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#2-an-extra-directory-was-created)

-   **Common Issue:** “An extra, unwanted directory was created on my destination.”
    
    You tried to copy the contents of your `source` directory into `backups`, but you ended up with an extra folder, like `backups/source/`.
    
-   **Troubleshooting Steps:**
    
    This is almost always caused by a missing trailing slash on the source path.
    
    -   **The Problem:** Your command was likely `rsync -a source backups`. Without a trailing slash, `rsync` is designed to copy the `source` directory *itself*.
    -   **The Solution:** Add a trailing slash to the source path to copy only its *contents*. The correct command is `rsync -a source/ backups`.
-   **Best Practice:** Master the Trailing Slash (`/`)
    
    Understanding the trailing slash is fundamental. Always double-check your source path: use `source/` to copy contents and `source` to copy the directory itself.
    

### [3\. Incorrect Permissions or “Permission Denied” Errors](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#3-incorrect-permissions-or-permission-denied-errors)

-   **Common Issues:**
    
    1.  “File permissions, owners, or timestamps are wrong on the destination server.”
    2.  The transfer fails with a “Permission denied” error.
-   **Troubleshooting Steps:**
    
    -   **For Incorrect Permissions:** You likely used `rsync -r` instead of `rsync -a`. The `-r` flag only handles recursion, while `-a` is needed to preserve permissions and other critical file metadata.
    -   **For “Permission Denied”:** This is a filesystem issue, not an `rsync` error. Confirm that the user running the command has read permissions on the source files and write permissions on the destination directory.
-   **Best Practice:** Use the Archive Flag (`-a`)
    
    To ensure a true and accurate sync, always use the `-a` (archive) flag. It preserves permissions, ownership, modification times, and symbolic links, ensuring the destination is a perfect replica of the source.
    

### [4\. Old Files Remain on the Destination](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#4-old-files-remain-on-the-destination)

-   **Common Issue:** “I deleted files from the source, but they are still on the destination.”
    
    You are trying to keep two directories perfectly mirrored, but the destination is cluttered with old files that no longer exist on the source.
    
-   **Troubleshooting Steps:**
    
    This is `rsync`’s default, safe behavior. It will only add or update files. To make the destination an exact mirror, you must explicitly add the `--delete` flag. This tells `rsync` to remove any files from the destination that are not present in the source.
    
-   **Best Practice:** Use `--delete` Intentionally for Mirroring
    
    Understand that `rsync` is not a mirroring tool by default. Use the `--delete` flag only when your goal is to make the destination an exact copy of the source, and always pair it with a `--dry-run` first to prevent accidental data loss.
    

### [5\. Problems with Automation (Cron Jobs & Scripts)](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#5-problems-with-automation-cron-jobs-scripts)

-   **Common Issues:**
    
    -   The script hangs or asks for a password.
    -   The cron job fails with a “command not found” error.
    -   The remote transfer is unexpectedly slow.
-   **Troubleshooting Steps:**
    
    -   **Hanging/Password Prompts:** Your SSH keys are not configured correctly for passwordless login. Test your connection manually (`ssh user@remote_host`) to confirm it connects without a password.
    -   **“Command not found”:** Cron runs with a minimal environment. Use the absolute path to the `rsync` executable in your script (e.g., `/usr/bin/rsync`).
    -   **Slow Transfers:** If you are transferring compressible data like text files, add the `-z` flag to enable on-the-fly compression and speed up the network transfer.
-   **Best Practice:** Be Explicit in Scripts
    
    For reliable automation, your scripts must be explicit. Always use absolute paths, ensure passwordless SSH key authentication is working, and log your output to a file for auditing and debugging.
    

## [FAQs](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#faqs)

### [1\. How do I sync a local directory to a remote server with Rsync?](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#1-how-do-i-sync-a-local-directory-to-a-remote-server-with-rsync)

To sync a local directory with a remote server, use the `rsync` command with the local path as the source and the remote path as the destination. The command includes options to preserve file attributes and compress data during transfer.

A standard command for this task is:

```
rsync -avz /path/to/local/dir/ user@remote_host:/path/to/remote/dir/

```

**Command Breakdown:**

-   `rsync`: The command-line utility.

-   `-a` (archive): This option preserves file metadata such as permissions, timestamps, and ownership. It is a convenient shorthand for several flags (`-rlptgoD`).
-   `-v` (verbose): Provides detailed output, listing the files as they are being transferred.

-   `-z` (compress): Compresses file data during the transfer, which can speed up the process on slower network connections.
-   `/path/to/local/dir/`: The source directory. The trailing slash (`/`) is important, as it tells `rsync` to copy the *contents* of the directory. Without it, the directory `dir` itself would be copied into the destination.

This command efficiently synchronizes the two directories. On subsequent runs, `rsync`’s delta-transfer algorithm ensures only new or modified files are sent, saving time and bandwidth.

### [2\. How do I copy files from a remote server to my local machine with Rsync?](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#2-how-do-i-copy-files-from-a-remote-server-to-my-local-machine-with-rsync)

To copy files from a remote server, reverse the source and destination arguments in the `rsync` command. The remote path becomes the source, and the local path becomes the destination.

The command structure is:

```
rsync -avz user@remote_host:/path/to/remote/dir/ /path/to/local/dir/

```

This command is useful for creating backups from a server or retrieving updated project files. Just like a local-to-remote transfer, `rsync` will only copy the differences between the source and destination, making it more efficient than `scp` for repeated downloads.

### [3\. What is the difference between `scp` and `rsync`?](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#3-what-is-the-difference-between-scp-and-rsync)

The primary difference is that `scp` copies entire files every time, whereas `rsync` uses a delta-transfer algorithm to copy only the changed portions of files. This makes `rsync` significantly more efficient for synchronizing directories or updating large files.

Feature

`scp` (Secure Copy)

`rsync` (Remote Sync)

**Transfer Method**

Copies the entire file on every transfer.

Copies only the blocks and bytes that have changed.

**Efficiency**

Best for one-time transfers.

Highly efficient for subsequent or incremental transfers.

**Primary Use Case**

Simple, secure file copying.

Directory synchronization, incremental backups, and mirroring.

**Flexibility**

Basic options for file transfer.

Advanced options for exclusion (`--exclude`), deletion (`--delete`), and testing (`--dry-run`).

While both utilities transfer files securely over SSH, `rsync` offers more flexibility and performance for recurring synchronization tasks.

### [4\. How do I use Rsync with SSH keys?](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#4-how-do-i-use-rsync-with-ssh-keys)

`rsync` uses SSH as its default transport mechanism, so it automatically integrates with your existing SSH key authentication. If your public key is authorized on the remote server, `rsync` will connect without requiring a password.

In most cases, where your SSH key is stored in the default location (e.g., `~/.ssh/id_rsa`), the command is straightforward:

```
rsync -avz /local/path user@remote_host:/remote/path

```

If you need to specify a non-standard identity file, use the `-e` option to pass a custom command to SSH:

```
rsync -avz -e "ssh -i ~/.ssh/custom_key" /local/path user@remote_host:/remote/path

```

This functionality is particularly useful for automating backups with scripts or cron jobs, as it allows `rsync` to run without manual intervention.

### [5\. How can I exclude certain files or directories from Rsync?](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#5-how-can-i-exclude-certain-files-or-directories-from-rsync)

To prevent specific files or directories from being transferred, use the `--exclude` option. You can specify patterns and use the option multiple times.

For example, to sync a software project while excluding the `node_modules` directory and all log files:

```
rsync -avz --exclude 'node_modules' --exclude '*.log' /local/path/ user@remote_host:/remote/path/

```

For managing multiple exclusion patterns, it is better to list them in a separate file (e.g., `exclude.txt`):

```
node_modules
*.log
.DS_Store
```

Then, reference this file using the `--exclude-from` option:

```
rsync -avz --exclude-from='exclude.txt' /local/path/ user@remote_host:/remote/path/

```

This approach keeps your commands clean and makes your exclusion rules easy to maintain, which is helpful when syncing complex codebases or datasets.

### [6\. What does the --delete option do in Rsync?](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#6-what-does-the-delete-option-do-in-rsync)

The `--delete` option instructs `rsync` to remove files from the destination directory if they do not exist in the source directory. This action ensures the destination becomes an exact mirror of the source.

**Caution:** This option permanently deletes files on the destination. It is recommended to perform a test run before using it in a production environment.

Consider this scenario:

-   **Source contains:** `file_A.txt`, `file_B.txt`

-   **Destination contains:** `file_A.txt`, `file_C.txt`

The command:

```
rsync -avz --delete /local/source/ user@remote_host:/remote/destination/

```

After execution, the destination will be modified to match the source exactly: `file_B.txt` will be added, and `file_C.txt` will be deleted.

### [7\. How do I test an rsync command without actually copying files?](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#7-how-do-i-test-an-rsync-command-without-actually-copying-files)

To preview the actions an `rsync` command will perform without making any changes, use the `--dry-run` option (or its alias, `-n`). A dry run simulates the transfer and reports which files would be created, updated, or deleted.

This is a safe way to verify your syntax, paths, and options before executing a command. It is especially important when using `--delete`.

Example of a dry run command:

```
rsync -avzn --delete /local/path/ user@remote_host:/remote/path/

```

The output will list all proposed changes. Once you have confirmed the actions are correct, you can run the command again without the `-n` flag to perform the actual synchronization.

## [Conclusion](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories#conclusion)

`rsync` is a versatile utility for managing files both locally and across networks. This guide covered its fundamental syntax, how to transfer files securely over SSH, and the use of important flags like `-a` to preserve file attributes and `--delete` to create an exact mirror of a directory. You also learned how to test commands safely with `--dry-run` and automate synchronization tasks using `cron`.

With these skills, you can build reliable and efficient file transfer workflows, design complex backup operations, and manage your data with greater control.

For further reading on related topics such as backup strategies and data migration, see the following tutorials:

-   [How To Choose an Effective Backup Strategy](https://www.digitalocean.com/community/tutorials/how-to-choose-an-effective-backup-strategy-for-your-vps)

-   [How To Migrate Linux Servers Part 2 - Transfer Core Data](https://www.digitalocean.com/community/tutorials/how-to-migrate-linux-servers-part-2-transfer-core-data)
-   [How To Move a MySQL Data Directory to a New Location on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-move-a-mysql-data-directory-to-a-new-location-on-ubuntu-20-04)

[![Creative Commons](https://www.digitalocean.com/api/static-content/v1/images?src=%2F_next%2Fstatic%2Fmedia%2Fcreativecommons.c0a877f1.png&width=384)](https://creativecommons.org/licenses/by-nc-sa/4.0/)This work is licensed under a Creative Commons Attribution-NonCommercial- ShareAlike 4.0 International License.

---
Source: [How To Use Rsync to Sync Local and Remote Directories | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories)