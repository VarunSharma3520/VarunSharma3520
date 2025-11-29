---
title: 150 Neetcode Question
description: A list of 150 most important leetcode questions
---

This Question has a list of 150 most important question for cracking Google, Microsoft, Amazon, Netfilx, Salesforce and other fortune 500 companies. 

## 1. Contains Duplicate 

Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

**Example 1:**

**Input:** nums = [1,2,3,1]

**Output:** true

**Explanation:**

The element 1 occurs at the indices 0 and 3.

**Example 2:**

**Input:** nums = [1,2,3,4]

**Output:** false

**Explanation:**

All elements are distinct.

**Example 3:**

**Input:** nums = [1,1,1,3,3,4,3,2,4,2]

**Output:** true

**Constraints:**

- `1 <= nums.length <= 105`
- `-109 <= nums[i] <= 109`

<mark style="background: #FFB86CA6;">Note:</mark> check Contains Duplicate II and Contains Duplicate III

|Approach|Time|Space|When to use|
|---|---|---|---|
|**Brute Force**|O(n²)|O(1)|Never (only teaching)|
|**Sorting**|O(n log n)|O(1)|If you cannot use extra memory|
|**Hash Set**|**O(n)**|O(n)|**Best & recommended**|

## 2. Valid Anagram

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

**Example 1:**

**Input:** s = "anagram", t = "nagaram"

**Output:** true

**Example 2:**

**Input:** s = "rat", t = "car"

**Output:** false

**Constraints:**

- `1 <= s.length, t.length <= 5 * 104`
- `s` and `t` consist of lowercase English letters.

|Approach|Time|Space|When to use|
|---|---|---|---|
|**Brute Force (Sort & Compare all permutations)**|O(n!)|O(1)|Never (only for teaching — impractical)|
|**Sorting**|O(n log n)|O(1) or O(n) depending on sort implementation|When you **can’t use extra memory** or want a simple solution|
|**Hash Map / Frequency Count (Dictionary)**|**O(n)**|**O(1)** (26 letters fixed)|**Best general solution**, works for any char set|
|**Array Frequency Count (Fixed alphabet counts)**|**O(n)**|**O(1)** (only 26 integers)|**Most optimized approach** for lowercase English letters|

## 3. Two Sum

Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.

You may assume that each input would have **_exactly_ one solution**, and you may not use the _same_ element twice.

You can return the answer in any order.

**Example 1:**

**Input:** nums = [2,7,11,15], target = 9
**Output:** [0,1]
**Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**

**Input:** nums = [3,2,4], target = 6
**Output:** [1,2]

**Example 3:**

**Input:** nums = [3,3], target = 6
**Output:** [0,1]

**Constraints:**

- `2 <= nums.length <= 104`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
- **Only one valid answer exists.**

|Approach|Time|Space|When to use|
|---|---|---|---|
|**Brute Force**|O(n²)|O(1)|Never (only teaching) — try every pair|
|**Sorting + Two Pointers**|O(n log n)|O(1) or O(n) (if you store original indices)|If you cannot use extra memory, but note: **original indices must be tracked**|
|**Hash Map (Complement Map)**|**O(n)**|**O(n)**|**Best & recommended — optimal trade-off**|
|**Hash Set (Check complement)**|O(n)|O(n)|Useful for _existence check_, but **cannot get indices**, so not valid for this problem|

## 4.  Group Anagrams

Given an array of strings `strs`, group the anagrams together. You can return the answer in **any order**.

**Example 1:**

**Input:** strs = ["eat","tea","tan","ate","nat","bat"]

**Output:** [["bat"],["nat","tan"],["ate","eat","tea"]]

**Explanation:**

- There is no string in strs that can be rearranged to form `"bat"`.
- The strings `"nat"` and `"tan"` are anagrams as they can be rearranged to form each other.
- The strings `"ate"`, `"eat"`, and `"tea"` are anagrams as they can be rearranged to form each other.

**Example 2:**

**Input:** strs = [""]

**Output:** [[""]]

**Example 3:**

**Input:** strs = ["a"]

**Output:** [["a"]]

**Constraints:**

- `1 <= strs.length <= 104`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.

Let nnn = number of strings, kkk = maximum length of a string.

|Approach|Time|Space|When to use|
|---|---|---|---|
|**Brute Force (Compare every pair / check by sorting each pair)**|O(n² · k log k) or O(n² · k) depending on comparison method|O(1) (ignoring output)|Never in practice — only for teaching or tiny inputs.|
|**Sort each string + Hash Map (sorted string as key)**|O(n · k log k) (sorting every string)|O(n · k) (keys + groups) + output|Simple and easy — use when (k) is small or implementation speed matters over asymptotic optimality.|
|**Count-frequency signature (26-length count) + Hash Map**|O(n · k) (build frequency for each string)|O(n · k) (keys + groups) + output; key size is O(26) per string so effectively O(n)|**Best & recommended** for lowercase English letters — fastest and stable memory.|

## 5. Top K Frequent Elements

Given an integer array `nums` and an integer `k`, return _the_ `k` _most frequent elements_. You may return the answer in **any order**.

**Example 1:**

**Input:** nums = [1,1,1,2,2,3], k = 2

**Output:** [1,2]

**Example 2:**

**Input:** nums = [1], k = 1

**Output:** [1]

**Example 3:**

**Input:** nums = [1,2,1,2,1,2,3,1,3,2], k = 2

**Output:** [1,2]

**Constraints:**

- `1 <= nums.length <= 105`
- `-104 <= nums[i] <= 104`
- `k` is in the range `[1, the number of unique elements in the array]`.
- It is **guaranteed** that the answer is **unique**.

**Follow up:** Your algorithm's time complexity must be better than `O(n log n)`, where n is the array's size.

Let nnn be `nums.length` and mmm be the number of unique elements (m≤nm \le nm≤n).

|Approach|Time|Space|When to use|
|---|---|---|---|
|**Brute Force (count for each element by scanning array each time)**|O(n · m) ⇒ **O(n²)** worst-case|O(1) (ignoring output)|Never in practice — only for teaching / tiny inputs.|
|**Sorting (count frequencies → sort unique elements by frequency)**|O(n + m log m) ⇒ typically **O(n log n)** worst-case when m≈n|O(m) (frequency map + result) + output|Simple and clear — use if n is small or you need a straightforward implementation and O(n log n) is acceptable.|
|**Hash Map + Min-Heap (size k)**|O(n + m log k) ⇒ **O(n log k)**|O(m) for map + O(k) for heap ⇒ **O(m)** total|Use when k ≪ m (small k). Good memory/time trade-off in streaming/online contexts.|
|**Hash Map + Bucket Sort (bucket by frequency)**|**O(n)** (build map + fill buckets + gather top k)|O(n + m) ⇒ **O(n)** worst-case (buckets sized by frequency) + output|**Best & recommended** when frequencies are integers (this problem). Guarantees linear time and simple to implement.|

## 6. Product of Array Except Self

Given an integer array `nums`, return _an array_ `answer` _such that_ `answer[i]` _is equal to the product of all the elements of_ `nums` _except_ `nums[i]`.

The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in `O(n)` time and without using the division operation.

**Example 1:**

**Input:** nums = [1,2,3,4]
**Output:** [24,12,8,6]

**Example 2:**

**Input:** nums = [-1,1,0,-3,3]
**Output:** [0,0,9,0,0]

**Constraints:**

- `2 <= nums.length <= 105`
- `-30 <= nums[i] <= 30`
- The input is generated such that `answer[i]` is **guaranteed** to fit in a **32-bit** integer.

**Follow up:** Can you solve the problem in `O(1)` extra space complexity? (The output array **does not** count as extra space for space complexity analysis.)

Let n = `nums.length`

|Approach|Time|Space|When to use|
|---|---|---|---|
|**Brute Force** (for each i multiply all nums[j], j≠i)|O(n²)|O(1) (ignoring output)|Never in practice — only for teaching or tiny inputs.|
|**Prefix & Suffix arrays** (build prefix products and suffix products then multiply)|O(n)|O(n) (two extra arrays of size n)|Easy to implement and clear. Use when O(n) extra space is acceptable and you want straightforward logic.|
|**Optimized two-pass (Prefix in output array + suffix running product)**|**O(n)**|**O(1)** extra (output array excluded)|**Best & recommended** for this problem — meets O(n) time and O(1) extra space (the required optimal solution).|
|**Segment tree / Fenwick tree (range product queries)**|O(n log n) to build + O(log n) per query ⇒ O(n log n) total if querying every index|O(n)|Use when the array is **dynamic** (many updates + queries). Overkill for single snapshot problems.|

## 7. Valid Sudoku

Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated **according to the following rules**:

1. Each row must contain the digits `1-9` without repetition.
2. Each column must contain the digits `1-9` without repetition.
3. Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.

**Note:**

- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.

**Example 1:**

![](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

**Input:** board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
**Output:** true

**Example 2:**

**Input:** board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
**Output:** false
**Explanation:** Same as Example 1, except with the **5** in the top left corner being modified to **8**. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

**Constraints:**

- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit `1-9` or `'.'`.

|Approach|Time|Space|When to use|
|---|---|---|---|
|**Brute Force**|O(n³) (or O(1) for fixed 9×9)|O(1)|Never in practice — only for teaching / understanding constraints.|
|**Sorting**|O(n² log n) (still O(1) for fixed 9×9)|O(n) (temp array reused)|If you’re okay with a bit more time, but want simple logic without extra data structures.|
|**Hash Set / Bitmask (rows, cols, boxes)**|**O(n²)** (scan each cell once)|**O(1)** (27 sets / masks, max 9 digits each)|**Best & recommended** — clean, fast, and standard solution.|

## 8. Encode and Decode Strings

Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings.

Please implement `encode` and `decode`

**Example 1:**

```java
Input: ["neet","code","love","you"]

Output:["neet","code","love","you"]
```

**Example 2:**

```java
Input: ["we","say",":","yes"]

Output: ["we","say",":","yes"]
```

**Constraints:**

- `0 <= strs.length < 100`
- `0 <= strs[i].length < 200`
- `strs[i]` contains only UTF-8 characters.

Let nnn = number of strings and LLL = total length (sum of lengths) of all strings. Below are common approaches from naive → robust/optimized in the exact table format you asked for.

|Approach|Time|Space|When to use|
|---|---|---|---|
|**Brute force (find a delimiter not present then join)**|O(n·L) to scan and join|O(L)|Only if you can guarantee there _exists_ a character/sequence not present in any string (rare). Simple but fragile — fails if no safe delimiter.|
|**Escape + delimiter** (choose a delimiter `|`and escape all occurrences`\|`,` \` in strings)|O(n·L) for escaping + joining|O(L)|
|**Length-prefixed with text separator (`len#str`)** (e.g. `4#leet3#code`)|O(n·L) to encode/decode|O(L)|Very common in interviews / easy to implement. Works for arbitrary strings (including `#`) because length guides parsing. Use when portability/readability matters.|
|**Fixed-width length prefix** (store length as fixed k-digit decimal or binary int before each string)|O(n·L)|O(L)|When you want unambiguous parsing and compact representation (fixed-width decimal) or binary-safe (binary 32-bit length). Good for systems/protocols.|
|**Binary length-prefix (4-byte int + raw bytes)**|O(n·L)|O(L)|**Best & recommended** for robustness and performance in production/network protocols — handles arbitrary bytes/UTF-8 safely and decodes in a single pass.|

## 9. Longest Consecutive Sequence

Given an unsorted array of integers `nums`, return _the length of the longest consecutive elements sequence._

You must write an algorithm that runs in `O(n)` time.

**Example 1:**

**Input:** nums = [100,4,200,1,3,2]
**Output:** 4
**Explanation:** The longest consecutive elements sequence is `[1, 2, 3, 4]`. Therefore its length is 4.

**Example 2:**

**Input:** nums = [0,3,7,2,5,8,4,6,0,1]
**Output:** 9

**Example 3:**

**Input:** nums = [1,0,1,2]
**Output:** 3

**Constraints:**

- `0 <= nums.length <= 105`
- `-109 <= nums[i] <= 109`

Let n=n=n= `nums.length` and `range = max(nums)-min(nums)`.

|Approach|Time|Space|When to use|
|---|---|---|---|
|**Brute Force** (for each element walk + check presence by scanning array)|O(n²)|O(1) (ignoring input/output)|Never in practice — only for teaching or extremely small `n`.|
|**Sorting** (sort, deduplicate, scan consecutive runs)|O(n log n)|O(1) if sorting in-place (or O(n) to store uniques)|Simple and reliable when O(n log n) is acceptable or you cannot use hash tables.|
|**Hash Set — expand from sequence starts** (put all nums in a set; for each `x` where `x-1` not in set, count forward `x+1, x+2, ...`)|**O(n)** average, O(n²) worst if hashing degenerates|O(n)|**Best & recommended** for this problem — linear expected time, simple and memory-efficient.|
|**Hash Map — boundary-length merging** (for each num not seen, use map to store length of sequence at boundaries and merge: `left = map[x-1]`, `right = map[x+1]`, newLen = left+1+right`, update boundaries)|**O(n)** average|O(n)|Also **O(n)** and useful when you want to maintain lengths incrementally without extra scanning — elegant and avoids inner loop of the naive hash-set scan in some implementations.|
|**Union-Find (Disjoint Set)** (map value → node, union adjacent values, track component sizes)|O(n · α(n)) ≈ O(n)|O(n)|When you already use/discuss DSU or need to support dynamic unions/queries; more verbose but works.|

## 10. Valid Palindrome

A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` _if it is a **palindrome**, or_ `false` _otherwise_.

**Example 1:**

**Input:** s = "A man, a plan, a canal: Panama"
**Output:** true
**Explanation:** "amanaplanacanalpanama" is a palindrome.

**Example 2:**

**Input:** s = "race a car"
**Output:** false
**Explanation:** "raceacar" is not a palindrome.

**Example 3:**

**Input:** s = " "
**Output:** true
**Explanation:** s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.

**Constraints:**

- `1 <= s.length <= 2 * 105`
- `s` consists only of printable ASCII characters.

<mark style="background: #FFB86CA6;">Note:</mark> check Valid Palindrome II and Palindrome III

|Approach|Time|Space|When to use|
|---|---|---|---|
|**Brute Force (compare every character pair with repeated scanning / rebuild and compare each time)**|O(n²)|O(1)|Never in practice — only for teaching / tiny inputs.|
|**Filter & Reverse (build a cleaned string of only lowercase alphanumerics, then compare to its reverse)**|O(n)|O(n)|Simple and clear — use when you prefer straightforward code and extra linear space is fine.|
|**Two-pointer (one-pass, skip non-alphanumerics, compare lowercased chars in place)**|**O(n)**|**O(1)** (excluding input)|**Best & recommended** — optimal time, minimal extra space; canonical solution.|

## 11. 3 Sum

Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

**Example 1:**

**Input:** nums = [-1,0,1,2,-1,-4]
**Output:** [[-1,-1,2],[-1,0,1]]
**Explanation:** 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

**Example 2:**

**Input:** nums = [0,1,1]
**Output:** []
**Explanation:** The only possible triplet does not sum up to 0.

|Approach|Time|Space|When to use|
|---|---|---|---|
|**Brute Force** (check every triple i,j,k)|**O(n³)**|O(1)|Never in practice — only useful for teaching or tiny inputs.|
|**Sorting + Two pointers** (sort array, for each i do two-sum with two pointers skipping duplicates)|**O(n²)**|O(log n) (sorting) or O(1) extra|**Best & recommended** for interviews and production: simple, fast, deterministic, and easy to deduplicate.|
|**Hash-set per fixed i** (for each i do two-sum using a hash set to find complements; use a set of triplets to dedupe)|O(n²) average|O(n) per iteration (overall O(n) extra)|When you cannot/shouldn't sort the array (preserve original order) or prefer hashing; still O(n²) time but usually slightly slower than two-pointers and requires careful deduplication.|



















