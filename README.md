![GitHub Banners (15)](https://github.com/user-attachments/assets/256815f0-07b2-4a5d-aa67-14ca5d840e52)

> *Mastering design patterns leads to cleaner, more reusable, and efficient software architecture!*

Design patterns are proven solutions to common software design problems. They improve code reusability, maintainability, and scalability by providing structured approaches to problem-solving.  

## Creational Patterns (Object Creation)  
*These patterns focus on object instantiation while maintaining flexibility and efficiency.*  

### Abstract Factory
Creates families of related objects without specifying their concrete classes.  

<details>

<summary>Example:</summary>



</details>

### Builder
Constructs complex objects step-by-step for better readability and flexibility.  

<details>

<summary>Example:</summary>

<br/>

Think of it as a **recipe**: you follow steps to build the final product, and you can change or skip steps if needed.

#### When to Use It?
Use Builder when:  
1. You have a **complex object** with many optional parts.  
2. You want to **separate the construction from the representation**.  
3. You want your code to be **readable, flexible, and maintainable**.

#### Analogy:
Imagine building a **custom pizza**:  
1. Choose the crust  
2. Add sauce  
3. Add cheese  
4. Add toppings  

Each step is optional, and the pizza is built **step by step**.

#### Python Example:
```python
# Product
class Pizza:
    def __init__(self):
        self.crust = None
        self.sauce = None
        self.cheese = None
        self.toppings = []

    def describe(self):
        print(f"Crust: {self.crust}")
        print(f"Sauce: {self.sauce}")
        print(f"Cheese: {self.cheese}")
        print(f"Toppings: {', '.join(self.toppings)}")

# Builder
class PizzaBuilder:
    def __init__(self):
        self.pizza = Pizza()

    def set_crust(self, crust):
        self.pizza.crust = crust
        return self

    def set_sauce(self, sauce):
        self.pizza.sauce = sauce
        return self

    def set_cheese(self, cheese):
        self.pizza.cheese = cheese
        return self

    def add_topping(self, topping):
        self.pizza.toppings.append(topping)
        return self

    def build(self):
        return self.pizza

# Client code
builder = PizzaBuilder()
my_pizza = (builder.set_crust("Thin")
                   .set_sauce("Tomato")
                   .set_cheese("Mozzarella")
                   .add_topping("Mushrooms")
                   .add_topping("Olives")
                   .build())

my_pizza.describe()
```

#### Output:
```
Crust: Thin
Sauce: Tomato
Cheese: Mozzarella
Toppings: Mushrooms, Olives
```

</details>



### Factory Method
Defines an interface for object creation, allowing subclasses to determine the actual implementation.  

### Prototype
Creates new objects by copying an existing instance (useful for expensive object creation).  

### Singleton
Ensures only one instance of a class exists globally.  

---

## Structural Patterns (Class & Object Composition)  
*These patterns simplify the design by organizing object relationships efficiently.*  

### Adapter (Composition & Inheritance)
Converts one interface to another to enable compatibility.  

### Bridge
Decouples abstraction from implementation, allowing independent modifications.  

### Composite
Treats individual objects and groups of objects uniformly (tree structure).  

### Decorator
Dynamically adds new behavior to objects without altering existing code.  

### Facade
Provides a simple interface for complex subsystems.  

### Flyweight
Reduces memory usage by sharing common object instances.  

### Proxy
Controls access to an object, often used for security or performance optimizations.  

---

## Behavioral Patterns (Object Interaction)  
*These patterns focus on communication between objects and define workflows.*  

###  Chain of Responsibility
Passes a request along a chain of handlers until one handles it.  

### Command
Encapsulates requests as objects, enabling undo/redo functionality.  

### Interpreter
Defines a language grammar and an interpreter to process expressions.  

### Iterator
Provides a way to sequentially access elements without exposing the underlying structure.  

### Mediator
Centralizes communication between objects to reduce dependencies.  

### Memento
Captures an object’s state to restore it later (useful for undo mechanisms).  

### Observer
Establishes a one-to-many dependency where observers get notified of state changes.  

### State
Allows an object to change its behavior when its state changes.  

### Strategy
Defines interchangeable algorithms that can be selected dynamically.  

### Template Method
Defines a skeleton for an algorithm, allowing subclasses to modify specific steps.  

### Visitor
Adds new operations to an object structure without modifying its classes.
