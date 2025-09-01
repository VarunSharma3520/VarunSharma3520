---
title: Searching
description: Linear and Binary Searching.
---

# 🔎 Searching in DSA

Searching = *Finding whether an element exists in a data structure (like list, linked list, tree, etc.) and if yes, then at which position.*

There are mainly *two basic searching techniques* in arrays/lists:

1. *Linear Search (Sequential Search)*
2. *Binary Search (Divide & Conquer approach)*

Later, when you study advanced DSA, you’ll also learn searching in *trees, hash tables, graphs, etc.*

---

## 1️⃣ Linear Search (Simple Searching)

👉 Idea:

* Start from the first element of the list.
* Compare each element with the target.
* If found, return the index.
* If not, return -1.

📌 *Algorithm*

1. Input list and target element.
2. Loop through list from index `0` to `n-1`.
3. If `arr[i] == target`, return index `i`.
4. If loop ends → element not present.

📌 *Python Program*

```python
def linear_search(arr, key):
    for i in range(len(arr)):
        if arr[i] == key:
            return i   # found at index i
    return -1  # not found


# Driver code
arr = [10, 20, 30, 40, 50]
key = 30

result = linear_search(arr, key)

if result != -1:
    print(f"Element found at index {result}")
else:
    print("Element not found")
```

📌 *Output*

```
Element found at index 2
```

📌 *Complexity*

* Best Case: **O(1)** (if first element is match)
* Worst Case: **O(n)**
* Space: **O(1)**

📌 *Real-life Example:* Searching for your roll number in an *unsorted attendance sheet* by checking line by line.

---

## 2️⃣ Binary Search (Efficient Searching)

👉 Idea:

* Works *only on sorted lists*.
* Repeatedly divide list into halves.
* Compare middle element with target.
* If equal → found.
* If smaller → search right half.
* If greater → search left half.

📌 *Algorithm*

1. Input sorted list and target.
2. Initialize `low = 0`, `high = n-1`.
3. While `low <= high`:

   * Find `mid = (low + high) // 2`
   * If `arr[mid] == key`, return `mid`.
   * If `arr[mid] < key`, search right (`low = mid+1`).
   * Else, search left (`high = mid-1`).
4. If not found, return -1.

📌 *Python Program*

```python
def binary_search(arr, key):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        if arr[mid] == key:
            return mid
        elif arr[mid] < key:
            low = mid + 1
        else:
            high = mid - 1

    return -1  # not found


# Driver code
arr = [10, 20, 30, 40, 50]  # must be sorted
key = 40

result = binary_search(arr, key)

if result != -1:
    print(f"Element found at index {result}")
else:
    print("Element not found")
```

📌 *Output*

```
Element found at index 3
```

📌 *Complexity*

* Best Case: **O(1)**
* Worst Case: **O(log n)**
* Space: **O(1)**

📌 *Real-life Example:* Searching for a word in a *dictionary* (already sorted). Instead of checking every word, you jump to middle pages.

---

🔎 **Recursive Binary Search in Python**

📌 Concept
Binary Search works by dividing the list in half each time.
Instead of using a loop, we call the function recursively with updated `low` and `high` values.

📌 Algorithm

* Base case: if `low > high`, element not found → return -1.
* Find middle index `mid = (low + high)//2`.
* If `arr[mid] == key`, return `mid`.
* If `arr[mid] > key`, search left half.
* If `arr[mid] < key`, search right half.

📌 *Python Program*

```python
def binary_search_recursive(arr, low, high, key):
    if low > high:
        return -1  # element not found

    mid = (low + high) // 2

    if arr[mid] == key:
        return mid
    elif arr[mid] > key:
        return binary_search_recursive(arr, low, mid - 1, key)
    else:
        return binary_search_recursive(arr, mid + 1, high, key)


# Driver code
arr = [10, 20, 30, 40, 50, 60]
key = 40

result = binary_search_recursive(arr, 0, len(arr) - 1, key)

if result != -1:
    print(f"Element found at index {result}")
else:
    print("Element not found")
```

📌 *Output*

```
Element found at index 3
```

---

# 📝 Comparison of Linear vs Binary Search

| Feature     | Linear Search     | Binary Search        |
| ----------- | ----------------- | -------------------- |
| Works on    | Unsorted + Sorted | Only Sorted          |
| Complexity  | O(n)              | O(log n)             |
| Ease of use | Simple            | Requires sorted data |
| Example     | Attendance sheet  | Dictionary           |

---

# ✅ Practice Questions for You

1. Write a Python program to search an element in an unsorted list using **linear search**.
2. Modify binary search code to work using **recursion** instead of loop.
3. Write a program that first sorts an unsorted list and then applies **binary search**.
4. In a list of size `n`, all elements are unique except one which repeats. Use **linear search** to find the duplicate.
5. Implement searching of a student roll number in a **sorted list of roll numbers** using binary search.

---