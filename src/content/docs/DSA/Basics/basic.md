---
title: Basic Python
description: Quick overview in python.
---

Here is the basic reference of python

## 1️ Variables

A **variable** is a name given to a memory location that stores data. Python is dynamically typed, so you don’t need to declare types explicitly.

```python
x = 10          # int
y = 3.14        # float
name = "Alice"  # str
is_active = True # bool

print(x, type(x))
print(y, type(y))
print(name, type(name))
print(is_active, type(is_active))
```

**Output:**

```
10 <class 'int'>
3.14 <class 'float'>
Alice <class 'str'>
True <class 'bool'>
```

---

## 2️ Strings

A **string** is a sequence of characters enclosed in single, double, or triple quotes.

```python
s1 = "Hello"
s2 = 'World'
s3 = """This is 
a multi-line string."""
print(s1, s2)
print(s3)
```

**Output:**

```
Hello World
This is 
a multi-line string.
```

---

## 3️ String Methods

```python
s = "  python is Fun  "

print(s.upper())        # Converts to uppercase → '  PYTHON IS FUN  '
print(s.lower())        # Converts to lowercase → '  python is fun  '
print(s.strip())        # Removes leading/trailing spaces → 'python is Fun'
print(s.replace("Fun", "Awesome"))  # Replaces substring → '  python is Awesome  '
print(s.split())        # Splits into list by spaces → ['python', 'is', 'Fun']
print("Python".startswith("Py"))    # Checks prefix → True
print("Python".endswith("on"))      # Checks suffix → True
print(len(s))           # Returns length → 17

# Additional methods
txt = "Hello World"

print(txt.capitalize())  # Capitalizes first letter → 'Hello world'
print(txt.title())       # Title case → 'Hello World'
print(txt.swapcase())    # Swaps case → 'hELLO wORLD'
print(txt.find("World")) # Index of substring (first occurrence) → 6
print(txt.count("l"))    # Counts occurrences of substring → 3
print(txt.isalpha())     # Checks if all characters are alphabets → False
print("Python".isalpha()) # True
print("12345".isdigit()) # True
print("123abc".isalnum()) # True
print("   ".isspace())   # True (only spaces)
print("Hello".center(20, "-"))  # Centers text → '-------Hello--------'
print(",".join(["a", "b", "c"])) # Joins list into string → 'a,b,c'
print("HELLO".isupper()) # True
print("hello".islower()) # True
```

---

## 4️ f-Strings

Introduced in Python 3.6, **f-strings** provide a concise way to format strings.

```python
name = "Alice"
age = 25

print(f"My name is {name} and I am {age} years old.")
print(f"Next year, I will be {age + 1}.")
```

**Output:**

```
My name is Alice and I am 25 years old.
Next year, I will be 26.
```

---

## 5️ Lists

A **list** is an ordered, mutable collection.

```python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])   # apple
fruits[1] = "mango"
print(fruits)      # ['apple', 'mango', 'cherry']
```

---

## 6️ List Methods

```python
numbers = [3, 1, 4]

numbers.append(5)       
numbers.insert(1, 2)    
numbers.remove(3)       
numbers.sort()          
numbers.reverse()       
print(numbers)          # [5, 4, 2, 1]

print(len(numbers))     
print(numbers.index(4)) 
```

---

## 7️ Tuples

Tuples are immutable sequences.

```python
colors = ("red", "green", "blue")
print(colors[0])  # red
```

---

## 8️ Tuple Methods

```python
nums = (1, 2, 3, 2, 2, 4)
print(nums.count(2))   # 3
print(nums.index(3))   # 2
```

---

## 9️ Dictionaries

Dictionaries store **key-value pairs**.

```python
student = {
    "name": "Alice",
    "age": 20,
    "grade": "A"
}

print(student["name"])      # Alice
student["age"] = 21         
student["city"] = "London"  
print(student)
```

---

## 10 Dictionary Methods

```python
student = {"name": "Bob", "age": 22}

print(student.keys())     
print(student.values())   
print(student.items())    

student.pop("age")        
student.update({"grade": "B"})
print(student)
```

---

## 1️1 Lambda Functions

A **lambda** is an anonymous (unnamed) function.

```python
square = lambda x: x * x
print(square(5))  # 25

add = lambda a, b: a + b
print(add(3, 4))  # 7

nums = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, nums))
print(doubled)  # [2, 4, 6, 8, 10]
```

---

## 1️2️ Math Module

```python
import math

print(math.sqrt(16))     
print(math.pow(2, 3))    
print(math.factorial(5)) 
print(math.pi)           
print(math.floor(3.7))   
print(math.ceil(3.2))    
```

---

## 1️3️ Random Module

```python
import random

print(random.randint(1, 10))    
print(random.choice(["red", "blue", "green"]))  
print(random.sample([1,2,3,4,5], 3))  
```

---

## 1️4️ File Handling

```python
# Writing
with open("example.txt", "w") as f:
    f.write("Hello, Python!\n")

# Reading
with open("example.txt", "r") as f:
    content = f.read()
    print(content)
```

---

# 🐍 Object-Oriented Programming (OOP) in Python

OOP is a programming paradigm that organizes code into **objects** containing **data (attributes)** and **behavior (methods)**.

The **4 pillars of OOP** are:

1. **Encapsulation**
2. **Abstraction**
3. **Inheritance**
4. **Polymorphism**

---

## 1️5 Classes and Objects

* **Class** → Blueprint for creating objects.
* **Object** → An instance of a class.

```python
class Person:
    def __init__(self, name, age):  # constructor
        self.name = name
        self.age = age

    def greet(self):  # method
        return f"Hello, my name is {self.name} and I am {self.age} years old."

p1 = Person("Alice", 25)   # Object creation
print(p1.greet())
```

**Output:**

```
Hello, my name is Alice and I am 25 years old.
```

---

## 16 Constructors and Destructors

* **Constructor (`__init__`)** → Called when an object is created.
* **Destructor (`__del__`)** → Called when an object is deleted.

```python
class Demo:
    def __init__(self):
        print("Object created")

    def __del__(self):
        print("Object destroyed")

d = Demo()
del d
```

**Output:**

```
Object created
Object destroyed
```

---

## 17 Inheritance

Inheritance allows one class to **reuse the properties and methods** of another.

### (a) Single Inheritance

```python
class Parent:
    def display(self):
        return "I am the parent"

class Child(Parent):
    def show(self):
        return "I am the child"

c = Child()
print(c.display())
print(c.show())
```

**Output:**

```
I am the parent
I am the child
```

---

### (b) Multiple Inheritance

```python
class Father:
    def skills(self):
        return "Gardening"

class Mother:
    def skills(self):
        return "Cooking"

class Child(Father, Mother):
    pass

c = Child()
print(c.skills())  # Resolves using Method Resolution Order (MRO)
```

**Output:**

```
Gardening
```

---

### (c) Multilevel Inheritance

```python
class Grandparent:
    def greet(self):
        return "Hello from grandparent"

class Parent(Grandparent):
    pass

class Child(Parent):
    pass

c = Child()
print(c.greet())
```

**Output:**

```
Hello from grandparent
```

---

### (d) Hierarchical Inheritance

```python
class Parent:
    def greet(self):
        return "Hello from parent"

class Child1(Parent):
    pass

class Child2(Parent):
    pass

print(Child1().greet())
print(Child2().greet())
```

**Output:**

```
Hello from parent
Hello from parent
```

---

### (e) Hybrid Inheritance

Hybrid = Combination of different inheritance types.
Handled using **MRO (Method Resolution Order)** in Python.

```python
class A:
    def greet(self):
        return "Hello from A"

class B(A):
    pass

class C(A):
    pass

class D(B, C):  # Hybrid (Multiple + Hierarchical)
    pass

d = D()
print(d.greet())
print(D.mro())  # Shows method resolution order
```

**Output:**

```
Hello from A
[<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>]
```

---

## 18 Encapsulation

Encapsulation = **Restricting access** to class attributes and methods.

```python
class Student:
    def __init__(self, name, marks):
        self.name = name        # public
        self._marks = marks     # protected
        self.__grade = "A"      # private

    def get_grade(self):
        return self.__grade

s = Student("Alice", 90)
print(s.name)          # Public
print(s._marks)        # Accessible but should be treated as protected
print(s.get_grade())   # Access private via method
```

**Output:**

```
Alice
90
A
```

---

## 19 Abstraction

Abstraction = **Hiding implementation details**, showing only essentials.
Implemented using **abstract classes** with the `abc` module.

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def start(self):
        pass

class Car(Vehicle):
    def start(self):
        return "Car starts with a key"

class Bike(Vehicle):
    def start(self):
        return "Bike starts with a kick"

v1 = Car()
v2 = Bike()
print(v1.start())
print(v2.start())
```

**Output:**

```
Car starts with a key
Bike starts with a kick
```

---

## 20 Polymorphism

Polymorphism = **same function/method behaving differently** depending on the object.

### 1 Method Overriding

```python
class Bird:
    def fly(self):
        return "Some birds can fly"

class Sparrow(Bird):
    def fly(self):
        return "Sparrow flies high"

class Penguin(Bird):
    def fly(self):
        return "Penguins cannot fly"

birds = [Bird(), Sparrow(), Penguin()]
for b in birds:
    print(b.fly())
```

**Output:**

```
Some birds can fly
Sparrow flies high
Penguins cannot fly
```

---

### 2 Operator Overloading

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):  # Overload +
        return Point(self.x + other.x, self.y + other.y)

    def __str__(self):
        return f"({self.x}, {self.y})"

p1 = Point(1, 2)
p2 = Point(3, 4)
print(p1 + p2)
```

**Output:**

```
(4, 6)
```

---

## 21 Summary of OOP in Python

| Concept           | Description                                           | Example                   |
| ----------------- | ----------------------------------------------------- | ------------------------- |
| **Class**         | Blueprint for creating objects                        | `class Person:`           |
| **Object**        | Instance of a class                                   | `p = Person()`            |
| **Constructor**   | Special method `__init__` to initialize object        | `def __init__():`         |
| **Inheritance**   | Reuse code across classes                             | `class Child(Parent)`     |
| **Encapsulation** | Restricting access to attributes/methods              | Private variables `__var` |
| **Abstraction**   | Hiding implementation using abstract classes          | `class Shape(ABC)`        |
| **Polymorphism**  | Same interface, different behavior                    | Overriding `fly()`        |
| **Overloading**   | Operator overloading using dunder methods (`__add__`) | `(p1 + p2)`               |

---

## 22 Advanced Concepts

### 1. List Comprehensions

A concise way to create lists.

```python
nums = [1, 2, 3, 4, 5]
squares = [x * x for x in nums]
print(squares)  # [1, 4, 9, 16, 25]
```

### 2. Generators

Functions that use `yield` to return values lazily.

```python
def count_up_to(n):
    i = 1
    while i <= n:
        yield i
        i += 1

for num in count_up_to(5):
    print(num)
```

### 3. Decorators

Functions that modify other functions.

```python
def decorator(func):
    def wrapper():
        print("Before function call")
        func()
        print("After function call")
    return wrapper

@decorator
def say_hello():
    print("Hello!")

say_hello()
```

**Output:**

```
Before function call
Hello!
After function call
```

### 4. Exception Handling

```python
try:
    num = int("abc")
except ValueError:
    print("Invalid number")
finally:
    print("Execution finished")
```

### 5. Modules and Packages

* **Module** → A Python file (`math.py`)
* **Package** → A folder with multiple modules

```python
import math
print(math.sqrt(25))  # 5.0
```

---
