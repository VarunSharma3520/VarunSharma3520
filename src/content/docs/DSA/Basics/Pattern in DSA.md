---
title: Pattern in DSA
description: This is list of all important pattern in DSA
---

# Essential Data Structures & Algorithms Patterns

*Covering 70% of DSA Problems*

## 📋 Table of Contents
1. Binary Search](##1-binary-search)
2. Two Pointer
3. BFS
4. DFS
5. Backtracking
6. DP

---

## 1. Binary Search

### When to Use
- **Sorted arrays** or **monotonic functions**
- Finding elements in **O(log n)** time
- When you can **discard half** of the search space each iteration

### Common Problems
- Find element in sorted array
- Search in rotated sorted array
- Find peak element
- Capacity to ship packages

### Template
```python
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

---

## 2. Two Pointer

### When to Use
- **Sorted arrays** requiring O(n) solution
- Pair sum problems
- Removing duplicates
- Comparing elements from both ends

### Types
1. **Opposite Ends**: One pointer from start, one from end
2. **Same Direction**: Both move in same direction (sliding window)
3. **Fast & Slow**: Detect cycles, find middle

### Common Problems
- Two sum (sorted array)
- Container with most water
- Trapping rain water
- Remove duplicates
- Linked list cycle detection

### Template
```python
# Opposite ends
left, right = 0, len(nums) - 1
while left < right:
    # Process elements at left and right
    if condition:
        left += 1
    else:
        right -= 1

# Fast and slow
slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
```

---

## 3. BFS (Breadth-First Search)

### When to Use
- **Shortest path** in unweighted graphs
- Level order traversal
- Finding **minimum** steps/distance
- Social network connections

### Common Problems
- Level order traversal in trees
- Word ladder
- Rotting oranges
- Shortest path in binary matrix
- Course schedule

### Template
```python
from collections import deque

def bfs(start, target):
    queue = deque([start])
    visited = set([start])
    level = 0
    
    while queue:
        level_size = len(queue)
        
        for _ in range(level_size):
            node = queue.popleft()
            
            if node == target:
                return level
            
            for neighbor in get_neighbors(node):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        level += 1
    
    return -1
```

---

## 4. DFS (Depth-First Search)

### When to Use
- **Path finding** and exploration
- **Backtracking** problems
- Cycle detection
- When you need to explore **all possibilities**

### Common Problems
- Number of islands
- Path sum in trees
- Graph connectivity
- Generate parentheses
- Sudoku solver

### Template
```python
# Recursive DFS
def dfs(node, visited):
    if not node or node in visited:
        return
    
    visited.add(node)
    # Process node
    
    for neighbor in node.neighbors:
        dfs(neighbor, visited)

# Iterative DFS
def dfs_iterative(start):
    stack = [start]
    visited = set([start])
    
    while stack:
        node = stack.pop()
        # Process node
        
        for neighbor in node.neighbors:
            if neighbor not in visited:
                visited.add(neighbor)
                stack.append(neighbor)
```

---

## 5. Backtracking

### When to Use
- **Combinatorial problems**
- Generating **all possible solutions**
- When you need to **undo** choices
- Constraint satisfaction problems

### Common Problems
- N-Queens
- Sudoku solver
- Subsets
- Permutations
- Combination sum

### Template
```python
def backtrack(path, choices):
    if is_solution(path):
        result.append(path[:])
        return
    
    for choice in choices:
        if is_valid(choice):
            # Make choice
            path.append(choice)
            # Explore
            backtrack(path, new_choices)
            # Undo choice (backtrack)
            path.pop()
```

---

## 6. DP (Dynamic Programming)

### When to Use
- **Optimal substructure** (optimal solution contains optimal sub-solutions)
- **Overlapping subproblems**
- Counting or optimization problems
- When greedy approach fails

### Approaches
1. **Top-down**: Memoization (recursive)
2. **Bottom-up**: Tabulation (iterative)

### Common Problems
- Fibonacci sequence
- 0/1 Knapsack
- Longest common subsequence
- Coin change
- House robber
- Unique paths

### Template
```python
# Top-down (Memoization)
def dp_top_down(state, memo):
    if state in memo:
        return memo[state]
    
    if base_case(state):
        return base_value
    
    result = calculate(state, dp_top_down)
    memo[state] = result
    return result

# Bottom-up (Tabulation)
def dp_bottom_up(n):
    dp = [0] * (n + 1)
    dp[0], dp[1] = base_cases
    
    for i in range(2, n + 1):
        dp[i] = recurrence_relation(dp, i)
    
    return dp[n]
```

---

## 🎯 Pattern Recognition Guide

| Problem Type | Likely Pattern |
|-------------|----------------|
| **"Find in sorted array"** | Binary Search |
| **"Pair sum" / "Two elements"** | Two Pointer |
| **"Shortest path" / "Minimum steps"** | BFS |
| **"All possible" / "Generate all"** | Backtracking |
| **"Count ways" / "Maximum profit"** | Dynamic Programming |
| **"Path exists" / "Connected components"** | DFS |

## 💡 Pro Tips
1. **Identify the pattern** before coding
2. **Start with brute force**, then optimize
3. **Practice pattern recognition** - it's more important than memorizing solutions
4. **Master these 6 patterns** - they cover majority of interview questions
5. **Time complexity matters** - choose the pattern that gives optimal solution

*Practice consistently and focus on understanding when to apply each pattern!*