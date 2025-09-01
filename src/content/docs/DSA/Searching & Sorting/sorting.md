---
title: Sorting
description: Bubble, Selection, Insertion, Merge, and Quick Sort.
-----------------------------------------------------------------

# 🔃 Sorting in DSA with Python

Sorting = *Arranging the elements of a list in ascending or descending order.*
It makes searching, organizing, and analyzing data easier.

There are many sorting algorithms, but here we’ll study the most common ones:

1. **Bubble Sort** (Simple but inefficient)
2. **Selection Sort** (Simple, minimizes swaps)
3. **Insertion Sort** (Efficient for nearly sorted data)
4. **Merge Sort** (Divide and Conquer, stable, O(n log n))
5. **Quick Sort** (Efficient, in-place, widely used)

---

## 1️⃣ Bubble Sort

👉 **Idea**:

* Repeatedly compare adjacent elements.
* If they are in the wrong order, swap them.
* Largest element “bubbles” to the end in each pass.

📌 *Python Program*

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

# Driver code
arr = [64, 25, 12, 22, 11]
bubble_sort(arr)
print("Sorted array:", arr)
```

📌 *Output*

```
Sorted array: [11, 12, 22, 25, 64]
```

📌 *Complexity*

* Best Case: **O(n)** (already sorted)
* Worst Case: **O(n²)**
* Space: **O(1)**

📌 *Real-life Example:* Ranking students one-by-one by repeatedly swapping until sorted.

---

## 2️⃣ Selection Sort

👉 **Idea**:

* Find the minimum element in each pass.
* Swap it with the first unsorted element.
* Repeat until the array is sorted.

📌 *Python Program*

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

# Driver code
arr = [64, 25, 12, 22, 11]
selection_sort(arr)
print("Sorted array:", arr)
```

📌 *Output*

```
Sorted array: [11, 12, 22, 25, 64]
```

📌 *Complexity*

* Best Case: **O(n²)**
* Worst Case: **O(n²)**
* Space: **O(1)**

📌 *Real-life Example:* Choosing the smallest card repeatedly from a deck and placing it in order.

---

## 3️⃣ Insertion Sort

👉 **Idea**:

* Build the sorted part one element at a time.
* Pick the next element and insert it in the correct position in the already sorted part.

📌 *Python Program*

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

# Driver code
arr = [64, 25, 12, 22, 11]
insertion_sort(arr)
print("Sorted array:", arr)
```

📌 *Output*

```
Sorted array: [11, 12, 22, 25, 64]
```

📌 *Complexity*

* Best Case: **O(n)** (nearly sorted)
* Worst Case: **O(n²)**
* Space: **O(1)**

📌 *Real-life Example:* Sorting playing cards in your hand one by one.

---

## 4️⃣ Merge Sort

👉 **Idea**:

* Divide the list into two halves.
* Recursively sort both halves.
* Merge the sorted halves into a single sorted list.

📌 *Python Program*

```python
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left = arr[:mid]
        right = arr[mid:]

        merge_sort(left)
        merge_sort(right)

        i = j = k = 0
        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                arr[k] = left[i]
                i += 1
            else:
                arr[k] = right[j]
                j += 1
            k += 1

        while i < len(left):
            arr[k] = left[i]
            i += 1
            k += 1

        while j < len(right):
            arr[k] = right[j]
            j += 1
            k += 1

# Driver code
arr = [64, 25, 12, 22, 11]
merge_sort(arr)
print("Sorted array:", arr)
```

📌 *Output*

```
Sorted array: [11, 12, 22, 25, 64]
```

📌 *Complexity*

* Best Case: **O(n log n)**
* Worst Case: **O(n log n)**
* Space: **O(n)**

📌 *Real-life Example:* Merging two sorted sections of a magazine into one sorted sequence.

---

## 5️⃣ Quick Sort

👉 **Idea**:

* Choose a pivot element.
* Partition the array: elements smaller than pivot go left, larger go right.
* Recursively apply quicksort on left and right parts.

📌 *Python Program*

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# Driver code
arr = [64, 25, 12, 22, 11]
arr = quick_sort(arr)
print("Sorted array:", arr)
```

📌 *Output*

```
Sorted array: [11, 12, 22, 25, 64]
```

📌 *Complexity*

* Best Case: **O(n log n)**
* Average Case: **O(n log n)**
* Worst Case: **O(n²)** (rare with good pivot choice)
* Space: **O(log n)** (recursive stack)

📌 *Real-life Example:* Dividing guests into smaller groups around a table, then sorting each group individually.

---

# 📝 Comparison of Sorting Algorithms

| Algorithm      | Best Case  | Worst Case | Space    | Stable | Notes                                |
| -------------- | ---------- | ---------- | -------- | ------ | ------------------------------------ |
| Bubble Sort    | O(n)       | O(n²)      | O(1)     | Yes    | Educational, rarely used in practice |
| Selection Sort | O(n²)      | O(n²)      | O(1)     | No     | Minimizes swaps                      |
| Insertion Sort | O(n)       | O(n²)      | O(1)     | Yes    | Good for nearly sorted arrays        |
| Merge Sort     | O(n log n) | O(n log n) | O(n)     | Yes    | Stable, but uses extra space         |
| Quick Sort     | O(n log n) | O(n²)      | O(log n) | No     | Fastest in practice with good pivot  |

---

# ✅ Practice Questions for You

1. Write a Python program to sort an array using **Bubble Sort**.
2. Implement **Selection Sort** and count the number of swaps performed.
3. Write a program to sort a list using **Insertion Sort** and print each pass.
4. Implement **Merge Sort** and count the number of recursive calls.
5. Implement **Quick Sort** and try different pivot strategies (first, last, middle, random).

---

Would you like me to also make a **visual step-by-step dry run example** (like showing intermediate arrays for Bubble Sort and Insertion Sort)? That could make this even more beginner-friendly.
