# Design Patterns

## What Are Design Patterns?

Design patterns are proven and robust solutions for addressing common problems in software design and other contexts related to interaction and interfaces. These techniques provide structured and effective approaches to solving recurring challenges, promoting efficiency, reusability, and clarity in software development.

A design pattern is considered a mature and consolidated solution for a specific design problem. To earn the recognition of being a pattern, it must exhibit certain key characteristics. Firstly, it must have demonstrated its effectiveness in solving similar problems in previous situations. Additionally, a pattern should be highly reusable, meaning it is applicable in various contexts and design challenges.

## Types of Design Patterns

There are three main categories of design patterns, each focusing on a particular dimension of software design:

- **Creational Patterns:** These patterns center around how class instances and objects are created. They offer flexible solutions for object creation in various scenarios.
  - **Abstract factory**: Provides an interface for creating families of related or dependent objects without specifying their concrete classes. This pattern is useful when a system needs to be independent of how its objects are created.
  - **Builder:** Separates the construction of a complex object from its representation, allowing the same construction process to create different representations. It is helpful when an object needs to be constructed step-by-step or when there are many possible configurations of an object.
  - **Factory Method:** Defines an interface for creating an object but allows subclasses to alter the type of objects that will be created. This pattern is used when a class cannot anticipate the class of objects it must create.
  - **Prototype:** Specifies the kind of objects to create using a prototypical instance, and creates new objects by copying this prototype. This is useful for creating objects that are copies of a template object, especially when the object creation is costly.
  - **Singleton:** Ensures that a class has only one instance and provides a global point of access to that instance. It is commonly used in scenarios where exactly one object is needed to coordinate actions across the system
- **Structural Patterns:** Structural patterns deal with the composition of classes and objects to form larger structures. They facilitate the creation of efficient and flexible relationships between parts of the system.
  - **Adapter (composition):** Allows objects with incompatible interfaces to collaborate by wrapping the interface of one object with another compatible interface. It uses composition to achieve this, meaning it contains an instance of the class it adapts
  - **Adapter (inheritance):** Similar to the composition adapter, but it uses inheritance to adapt one interface to another. It involves creating a subclass that inherits the interface of one class and implements the interface of another class.
  - **Bridge:** Decouples an abstraction from its implementation so that the two can vary independently. It involves having separate class hierarchies for abstraction and implementation, allowing changes in one hierarchy to not affect the other.
  - **Composite:** Composes objects into tree structures to represent part-whole hierarchies. It allows clients to treat individual objects and compositions of objects uniformly.
  - **Decorator:** Dynamically adds responsibilities to objects by wrapping them in one or more decorator objects. This allows behavior to be added to individual objects without affecting the behavior of other objects from the same class.
  - **Facade:** Provides a unified interface to a set of interfaces in a subsystem. It simplifies the usage of complex systems by providing a higher-level interface.
  - **Flyweight:** Minimizes memory usage or computational expenses by sharing as much as possible with similar objects. It is useful when a large number of similar objects need to be created.
  - **Proxy:** Provides a surrogate or placeholder for another object to control access to it. It acts as an intermediary to control, enhance, or hide the real object's behavior.
- **Behavioral Patterns:** These patterns focus on the interaction between objects and how they communicate with each other. They help define workflows and collaborative behaviors.
  - **Chain of Responsability:** Allows multiple objects to handle a request without explicitly specifying the handler. The request is passed along a chain of objects until one of them handles it.
  - **Command:** Encapsulates a request as an object, thereby allowing parameterization of clients with queues, requests, and operations. It enables the invocation of operations without knowing the specific details of the operation or the receiver.
  - **Interpreter:** Defines a grammar for interpreting language syntax and provides an interpreter for evaluating expressions in that language. It is useful for creating domain-specific languages or implementing language parsers.
  - **Iterator:** Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. It decouples the traversal algorithm from the data structure, making it easier to change the traversal algorithm.
  - **Mediator:** Defines an object that encapsulates how a set of objects interact. It promotes loose coupling by keeping objects from referring to each other explicitly and allows for easier maintenance and modification of the system.
  - **Memento:** Captures and externalizes an object's internal state so that the object can be restored to this state later. It allows for the undo mechanism or the ability to revert an object's state to a previous state.
  - **Observer:** Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. It promotes loose coupling between objects.
  - **State:** Allows an object to alter its behavior when its internal state changes. It encapsulates state-specific behavior into separate classes and delegates the behavior to the current state object.
  - **Strategy:** Defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows the algorithm to vary independently of clients that use it.
  - **Template method:** Defines the skeleton of an algorithm in the superclass but allows subclasses to override specific steps of the algorithm without changing its structure. It promotes code reuse and allows for the customization of certain parts of an algorithm.
  - **Visitor:** Defines a new operation to a collection of objects without changing the objects themselves. It separates the algorithm from the object structure and allows for the addition of new operations without modifying the objects.

By understanding these types of design patterns, you can effectively address specific problems and apply proven solutions across various areas of software development.

## Select Your Language:
- JavaScript
- TypeScript
- Python
