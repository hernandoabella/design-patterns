import { Boxes, Zap, Layout, Fingerprint, Hammer, History, Settings, Layers, UserCheck, Copy, Box, Database, ShieldAlert, ChevronRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type Language = "python" | "javascript" | "java";
export const LANGUAGES: Language[] = ["python", "javascript", "java"];

export interface PatternRole {
    title: string;
    description: string;
    icon: LucideIcon; // Esto quita el error de 'any' en el icono
}

export interface PatternData {
    id: string;
    name: string;
    category: "Creational" | "Structural" | "Behavioral";
    tagline: string;
    description: string;
    diagram: string;
    roles: PatternRole[];
    code: Record<Language, string>;
}

export const PATTERNS_REGISTRY: Record<string, PatternData> = {
    "abstract-factory": {
        id: "abstract-factory",
        name: "Abstract Factory",
        category: "Creational",
        tagline: "The Factory of Factories.",
        description: "Provides an interface for creating families of related or dependent objects without specifying their concrete classes.",
        diagram: `classDiagram
      class FurnitureFactory { <<interface>> +createChair() Chair +createSofa() Sofa }
      class ModernFactory { +createChair() ModernChair +createSofa() ModernSofa }
      class VictorianFactory { +createChair() VictorianChair +createSofa() VictorianSofa }
      class Chair { <<interface>> +sitOn() }
      class Sofa { <<interface>> +layOn() }
      FurnitureFactory <|-- ModernFactory
      FurnitureFactory <|-- VictorianFactory
      Chair <|-- ModernChair
      Chair <|-- VictorianChair
      Sofa <|-- ModernSofa
      Sofa <|-- VictorianSofa`,
        roles: [
            {
                title: "Abstract Factory",
                description: "Declares a set of methods for creating each of the abstract products.",
                icon: Boxes
            },
            {
                title: "Concrete Factory",
                description: "Implements the creation methods of the abstract factory. Each concrete factory corresponds to a specific variant of products.",
                icon: Zap
            },
            {
                title: "Abstract Product",
                description: "Declares interfaces for a set of distinct but related products that make up a product family.",
                icon: Layout
            },
            {
                title: "Concrete Product",
                description: "Specific implementations of abstract products, grouped by variants.",
                icon: Fingerprint
            }
        ],
        code: {
            python: `from abc import ABC, abstractmethod

# --- 1. ABSTRACT PRODUCTS ---
class Chair(ABC):
    @abstractmethod
    def sit_on(self): pass

class Sofa(ABC):
    @abstractmethod
    def lay_on(self): pass

# --- 2. CONCRETE PRODUCTS (Modern Family) ---
class ModernChair(Chair):
    def sit_on(self): return "Sitting on a modern chair."

class ModernSofa(Sofa):
    def lay_on(self): return "Lying on a modern sofa."

# --- 3. ABSTRACT FACTORY ---
class FurnitureFactory(ABC):
    @abstractmethod
    def create_chair(self) -> Chair: pass
    @abstractmethod
    def create_sofa(self) -> Sofa: pass

# --- 4. CONCRETE FACTORIES ---
class ModernFurnitureFactory(FurnitureFactory):
    def create_chair(self): return ModernChair()
    def create_sofa(self): return ModernSofa()

# --- 5. CLIENT CODE ---
def client_code(factory: FurnitureFactory):
    chair = factory.create_chair()
    print(chair.sit_on())

client_code(ModernFurnitureFactory())`,
            javascript: `// Concrete Products
class VictorianChair { sitOn() { return "Sitting on Victorian chair"; } }
class VictorianSofa { layOn() { return "Lying on Victorian sofa"; } }

// Concrete Factory
class VictorianFurnitureFactory {
  createChair() { return new VictorianChair(); }
  createSofa() { return new VictorianSofa(); }
}

// Client
const factory = new VictorianFurnitureFactory();
const chair = factory.createChair();
console.log(chair.sitOn());`,
            java: `interface Chair { void sitOn(); }
interface Sofa { void layOn(); }

interface FurnitureFactory {
    Chair createChair();
    Sofa createSofa();
}

class ModernFactory implements FurnitureFactory {
    public Chair createChair() { return new ModernChair(); }
    public Sofa createSofa() { return new ModernSofa(); }
}

class ModernChair implements Chair {
    public void sitOn() { System.out.println("Modern Chair Sit"); }
}`
        }
    },

    "factory-method": {
        id: "factory-method",
        name: "Factory Method",
        category: "Creational",
        tagline: "Define once, instantiate anywhere.",
        description: "Provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.",
        diagram: `classDiagram
      class Creator { <<abstract>> +factoryMethod() Product }
      class ConcreteCreatorA { +factoryMethod() ProductA }
      class ConcreteCreatorB { +factoryMethod() ProductB }
      class Product { <<interface>> +doStuff() }
      Creator <|-- ConcreteCreatorA
      Creator <|-- ConcreteCreatorB
      Product <|-- ConcreteProductA
      Product <|-- ConcreteProductB
      Creator ..> Product`,
        roles: [
            {
                title: "Creator",
                description: "Declares the factory method that returns objects of type Product. This class may also provide a default implementation.",
                icon: Boxes
            },
            {
                title: "Concrete Creator",
                description: "Overrides the factory method to return an instance of a specific concrete product.",
                icon: Zap
            },
            {
                title: "Product",
                description: "Defines the interface of the objects that the factory method creates.",
                icon: Layout
            },
            {
                title: "Concrete Product",
                description: "Distinct implementations of the product interface.",
                icon: Fingerprint
            }
        ],
        code: {
            python: `from abc import ABC, abstractmethod

# --- 1. PRODUCT INTERFACE ---
class Transport(ABC):
    @abstractmethod
    def deliver(self) -> str: pass

# --- 2. CONCRETE PRODUCTS ---
class Truck(Transport):
    def deliver(self): return "Deliver by land in a box."

class Ship(Transport):
    def deliver(self): return "Deliver by sea in a container."

# --- 3. CREATOR (BASE CLASS) ---
class Logistics(ABC):
    @abstractmethod
    def create_transport(self) -> Transport: pass

    def plan_delivery(self):
        # Call the factory method to create a product object
        transport = self.create_transport()
        return f"Logistics: {transport.deliver()}"

# --- 4. CONCRETE CREATORS ---
class RoadLogistics(Logistics):
    def create_transport(self): return Truck()

class SeaLogistics(Logistics):
    def create_transport(self): return Ship()

# --- 5. CLIENT CODE ---
road = RoadLogistics()
print(road.plan_delivery())`,
            javascript: `// --- PRODUCT INTERFACE ---
class Transport {
  deliver() { throw new Error("Method not implemented"); }
}

// --- CONCRETE PRODUCTS ---
class Truck extends Transport {
  deliver() { return "Delivering by land."; }
}

// --- CREATOR ---
class Logistics {
  createTransport() { throw new Error("Subclasses must implement this"); }
  plan() {
    const transport = this.createTransport();
    return transport.deliver();
  }
}

// --- CONCRETE CREATORS ---
class RoadLogistics extends Logistics {
  createTransport() { return new Truck(); }
}

const logistics = new RoadLogistics();
console.log(logistics.plan());`,
            java: `// --- PRODUCT ---
interface Transport {
    String deliver();
}

// --- CONCRETE PRODUCT ---
class Truck implements Transport {
    public String deliver() { return "Land delivery."; }
}

// --- CREATOR ---
abstract class Logistics {
    public abstract Transport createTransport();
    public void plan() {
        Transport t = createTransport();
        System.out.println(t.deliver());
    }
}

// --- CONCRETE CREATOR ---
class RoadLogistics extends Logistics {
    @Override
    public Transport createTransport() { return new Truck(); }
}`
        }
    },
    "prototype": {
        id: "prototype",
        name: "Prototype",
        category: "Creational",
        tagline: "Cloning of instances.",
        description: "Allows copying existing objects without making your code dependent on their classes, delegating the cloning process to the objects themselves.",
        diagram: `classDiagram
      class Prototype { <<interface>> +clone() Prototype }
      class ConcretePrototype { -field1 +clone() Prototype }
      class SubPrototype { -field2 +clone() Prototype }
      Prototype <|-- ConcretePrototype
      ConcretePrototype <|-- SubPrototype`,
        roles: [
            {
                title: "Prototype",
                description: "Declares the methods for cloning (usually a single 'clone' method).",
                icon: Copy
            },
            {
                title: "Concrete Prototype",
                description: "Implements the cloning method by copying all the data from the original object into the new instance.",
                icon: Fingerprint
            },
            {
                title: "Client",
                description: "Creates a copy of an object by calling the clone method on a prototype instance.",
                icon: Layout
            }
        ],
        code: {
            python: `import copy

class Prototype:
    def __init__(self):
        self.objects = []
    def clone(self):
        # deepcopy ensures nested objects are also cloned
        return copy.deepcopy(self)

# Usage
p1 = Prototype()
p1.objects.append("Initial Data")
p2 = p1.clone()
print(p1.objects == p2.objects) # True
print(p1 is p2) # False`,
            javascript: `// In JS, objects are linked to prototypes by default
const prototype = {
  name: "Original",
  data: [1, 2, 3],
  clone() {
    // Simple deep clone technique
    return JSON.parse(JSON.stringify(this));
  }
};

// Using Object.create for differential inheritance
const instance = Object.create(prototype);
instance.name = "Clone";

// Or using the clone method for a disconnected copy
const copy = prototype.clone();`,
            java: `abstract class Shape implements Cloneable {
    public String type;
    public abstract void draw();
    
    @Override
    public Object clone() {
        Object clone = null;
        try {
            clone = super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return clone;
    }
}

class Circle extends Shape {
    public Circle() { type = "Circle"; }
    public void draw() { System.out.println("Drawing Circle"); }
}`
        }
    },
    "singleton": {
        id: "singleton",
        name: "Singleton",
        category: "Creational",
        tagline: "Global unique instance.",
        description: "Ensures that a class has only one instance and provides a global point of access to it.",
        diagram: `classDiagram
      class Singleton {
          -Singleton instance$
          -Singleton()
          +getInstance()$ Singleton
      }
      note for Singleton "Constructor is private"`,
        roles: [
            {
                title: "Singleton",
                description: "Declares the static method that returns the same instance of its own class.",
                icon: Box
            },
            {
                title: "Private Constructor",
                description: "Prevents other objects from using the 'new' operator with the Singleton class.",
                icon: ShieldAlert
            },
            {
                title: "Static Instance",
                description: "Stores the unique instance in a private static field.",
                icon: Database
            }
        ],
        code: {
            python: `class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Singleton, cls).__new__(cls)
            # Resource initialization here
            cls._instance.data = "Shared Resource"
        return cls._instance

# Usage
s1 = Singleton()
s2 = Singleton()
print(s1 is s2)  # True`,
            javascript: `const Singleton = (function () {
    let instance;

    function createInstance() {
        return { data: "Shared Database Connection" };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2); // true`,
            java: `public class Singleton {
    private static Singleton instance;

    private Singleton() { } // Private constructor

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}`
        }
    },
    "builder": {
        id: "builder",
        name: "Builder",
        category: "Creational",
        tagline: "Step-by-step construction.",
        description: "Separates the construction of a complex object from its representation so that the same construction process can create different representations.",
        diagram: `classDiagram
      class Director { +make(builder) }
      class Builder { <<interface>> +reset() +buildStepA() +buildStepB() +getResult() }
      class ConcreteBuilder { -product +reset() +buildStepA() +buildStepB() +getResult() }
      class Product { +parts }
      Director o-- Builder
      Builder <|-- ConcreteBuilder
      ConcreteBuilder ..> Product`,
        roles: [
            {
                title: "Director",
                description: "Defines the order in which to execute the building steps to create specific configurations of the product.",
                icon: UserCheck
            },
            {
                title: "Builder",
                description: "Interface that declares the product construction steps common to all types of builders.",
                icon: Hammer
            },
            {
                title: "Concrete Builder",
                description: "Provides specific implementations of the construction steps. It also provides a method for retrieving the final product.",
                icon: Zap
            },
            {
                title: "Product",
                description: "The complex object resulting from the construction process.",
                icon: Box
            }
        ],
        code: {
            python: `class House:
    def __init__(self):
        self.walls = None
        self.roof = None

class HouseBuilder:
    def __init__(self):
        self.house = House()
    def build_walls(self):
        self.house.walls = "Brick walls"
        return self
    def build_roof(self):
        self.house.roof = "Tile roof"
        return self
    def get_result(self):
        return self.house

# Usage (Fluent Interface)
builder = HouseBuilder()
my_house = builder.build_walls().build_roof().get_result()
print(f"House with: {my_house.walls} and {my_house.roof}")`,
            javascript: `class CarBuilder {
  constructor() {
    this.reset();
  }
  reset() { this.car = {}; }
  setSeats(n) { this.car.seats = n; return this; }
  setEngine(e) { this.car.engine = e; return this; }
  setGPS() { this.car.gps = true; return this; }
  build() {
    const product = this.car;
    this.reset();
    return product;
  }
}

const builder = new CarBuilder();
const sportsCar = builder.setSeats(2).setEngine("V8").setGPS().build();
console.log(sportsCar);`,
            java: `class User {
    private final String name; // Required
    private final int age;    // Optional

    private User(UserBuilder builder) {
        this.name = builder.name;
        this.age = builder.age;
    }

    public static class UserBuilder {
        private String name;
        private int age;

        public UserBuilder(String name) { this.name = name; }
        public UserBuilder age(int age) { this.age = age; return this; }
        public User build() { return new User(this); }
    }
}

// Usage
User user = new User.UserBuilder("John").age(30).build();`
        }
    },
    "adapter": {
        id: "adapter",
        name: "Adapter",
        category: "Structural",
        tagline: "Making incompatible interfaces compatible.",
        description: "Allows objects with incompatible interfaces to collaborate by wrapping one of them in an adapter that translates the calls.",
        diagram: `classDiagram
      class Client
      class Target { <<interface>> +request() }
      class Adapter { -adaptee: Adaptee +request() }
      class Adaptee { +specificRequest() }
      Client --> Target
      Target <|-- Adapter
      Adapter --> Adaptee`,
        roles: [
            {
                title: "Target",
                description: "Defines the domain-specific interface that the client code expects and uses.",
                icon: Layout
            },
            {
                title: "Adapter",
                description: "Adapts the Adaptee's interface to the Target interface through composition or inheritance.",
                icon: Settings
            },
            {
                title: "Adaptee",
                description: "Defines an existing interface that needs to be adapted to be compatible with the client.",
                icon: Box
            }
        ],
        code: {
            python: `class Target:
    """The interface expected by the client."""
    def request(self) -> str:
        return "Target: Standard behavior."

class Adaptee:
    """The class that has an incompatible interface."""
    def specific_request(self) -> str:
        return ".metpda ametsis led ogidóC"

class Adapter(Target):
    """The adapter makes the Adaptee's interface compatible."""
    def __init__(self, adaptee: Adaptee):
        self.adaptee = adaptee

    def request(self) -> str:
        # Translates or processes the response from the Adaptee
        result = self.adaptee.specific_request()[::-1]
        return f"Adapter: (TRANSLATED) {result}"

# Usage
adaptee = Adaptee()
adapter = Adapter(adaptee)
print(adapter.request())`,
            javascript: `// Expected interface (Target)
class NewLogger {
  log(message) { console.log("New Logger: " + message); }
}

// Old/Incompatible interface (Adaptee)
class LegacyLogger {
  oldLog(msg) { console.log("LEGACY: " + msg); }
}

// Adapter
class LoggerAdapter extends NewLogger {
  constructor(legacyLogger) {
    super();
    this.legacyLogger = legacyLogger;
  }
  
  log(message) {
    // Translates the 'log' call to 'oldLog'
    this.legacyLogger.oldLog(message);
  }
}

const logger = new LoggerAdapter(new LegacyLogger());
logger.log("System running");`,
            java: `// The Target Interface
interface Target {
    void request();
}

// The Adaptee (Incompatible)
class Adaptee {
    public void specificRequest() {
        System.out.println("Call to legacy system.");
    }
}

// The Adapter
class Adapter implements Target {
    private Adaptee adaptee;

    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    @Override
    public void request() {
        // Delegating the call
        this.adaptee.specificRequest();
    }
}`
        }
    }, "bridge": {
        id: "bridge",
        name: "Bridge",
        category: "Structural",
        tagline: "Decouples abstraction from implementation.",
        description: "Splits a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.",
        diagram: `classDiagram
      class Abstraction { -imp: Implementor +feature() }
      class RefinedAbstraction { +feature() }
      class Implementor { <<interface>> +method() }
      class ConcreteImpA { +method() }
      class ConcreteImpB { +method() }
      Abstraction <|-- RefinedAbstraction
      Abstraction o-- Implementor
      Implementor <|-- ConcreteImpA
      Implementor <|-- ConcreteImpB`,
        roles: [
            {
                title: "Abstraction",
                description: "Defines the high-level control logic and maintains a reference to an implementation object.",
                icon: Layers
            },
            {
                title: "Implementor",
                description: "Defines the common interface for all concrete implementations (platforms/devices).",
                icon: Settings
            },
            {
                title: "Refined Abstraction",
                description: "Provides variants of the control logic (e.g., an advanced remote control with extra features).",
                icon: Zap
            },
            {
                title: "Concrete Implementor",
                description: "Contains platform-specific or device-specific code.",
                icon: Box
            }
        ],
        code: {
            python: `class Device:
    def set_volume(self, percent): pass

class Radio(Device):
    def set_volume(self, percent): 
        print(f"Radio volume set to {percent}%")

class RemoteControl:
    def __init__(self, device):
        self.device = device
    
    def volume_up(self):
        self.device.set_volume(50)

# Usage
radio = Radio()
remote = RemoteControl(radio)
remote.volume_up()`,
            javascript: `// Implementor (Devices)
class TV {
  setPower(on) { console.log(on ? "TV On" : "TV Off"); }
}

// Abstraction (Remotes)
class Remote {
  constructor(device) { this.device = device; }
  togglePower() { this.device.setPower(true); }
}

const myTV = new TV();
const myRemote = new Remote(myTV);
myRemote.togglePower();`,
            java: `interface Device { void setEnabled(boolean status); }

class Radio implements Device {
    public void setEnabled(boolean status) { /* logic */ }
}

class RemoteControl {
    protected Device device;
    public RemoteControl(Device d) { this.device = d; }
    public void togglePower() {
        device.setEnabled(true);
    }
}`
        }
    }, "composite": {
        id: "composite",
        name: "Composite",
        category: "Structural",
        tagline: "Uniform tree structures.",
        description: "Lets you compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.",
        diagram: `classDiagram
      class Component { <<interface>> +execute() }
      class Leaf { +execute() }
      class Composite { -children: List~Component~ +add(c) +remove(c) +execute() }
      Component <|-- Leaf
      Component <|-- Composite
      Composite o-- Component`,
        roles: [
            {
                title: "Component",
                description: "The common interface for all elements in the tree, both simple and complex. It declares the operations common to both.",
                icon: Layers
            },
            {
                title: "Leaf",
                description: "A basic element of the tree that doesn't have sub-elements. Usually, leaf components end up doing most of the real work.",
                icon: Box
            },
            {
                title: "Composite",
                description: "A container that has sub-elements (leaves or other composites). It doesn't know the concrete classes of its children; it talks to them via the component interface.",
                icon: Boxes
            }
        ],
        code: {
            python: `class Graphic:
    def draw(self): pass

class Dot(Graphic):
    def draw(self): print("Drawing a dot")

class CompoundGraphic(Graphic):
    def __init__(self):
        self.children = []
    
    def add(self, child):
        self.children.append(child)
        
    def draw(self):
        for child in self.children:
            child.draw()

# Usage
tree = CompoundGraphic()
tree.add(Dot())
tree.add(CompoundGraphic()) # A group inside another group
tree.draw()`,
            javascript: `// Common interface (Component)
class FileSystemItem {
  getSize() { throw "Not implemented"; }
}

// Leaf
class File extends FileSystemItem {
  constructor(size) { super(); this.size = size; }
  getSize() { return this.size; }
}

// Composite
class Folder extends FileSystemItem {
  constructor() { 
    super(); 
    this.children = []; 
  }
  add(item) { this.children.push(item); }
  getSize() {
    return this.children.reduce((acc, child) => acc + child.getSize(), 0);
  }
}

const root = new Folder();
root.add(new File(100));
const sub = new Folder();
sub.add(new File(200));
root.add(sub);
console.log(root.getSize()); // 300`,
            java: `interface Component { void execute(); }

class Leaf implements Component {
    public void execute() { System.out.println("Leaf work"); }
}

class Composite implements Component {
    private List<Component> children = new ArrayList<>();
    
    public void add(Component c) { children.add(c); }
    
    public void execute() {
        for (Component child : children) {
            child.execute();
        }
    }
}`
        }
    }, "decorator": {
        id: "decorator",
        name: "Decorator",
        category: "Structural",
        tagline: "Dynamically adding responsibilities.",
        description: "Allows behavior to be added to an individual object, either statically or dynamically, without affecting the behavior of other objects from the same class. It uses a wrapper approach.",
        diagram: `classDiagram
      class Component { <<interface>> +execute() }
      class ConcreteComponent { +execute() }
      class BaseDecorator { -wrapper: Component +execute() }
      class ConcreteDecoratorA { +execute() }
      class ConcreteDecoratorB { +execute() }
      Component <|-- ConcreteComponent
      Component <|-- BaseDecorator
      BaseDecorator o-- Component
      BaseDecorator <|-- ConcreteDecoratorA
      BaseDecorator <|-- ConcreteDecoratorB`,
        roles: [
            {
                title: "Component",
                description: "The common interface for both the objects being wrapped and the wrappers themselves.",
                icon: Layers
            },
            {
                title: "Concrete Component",
                description: "The basic object being wrapped, which defines the fundamental behavior.",
                icon: Box
            },
            {
                title: "Base Decorator",
                description: "Maintains a reference to a wrapped component and delegates all operations to it.",
                icon: ShieldAlert
            },
            {
                title: "Concrete Decorator",
                description: "Adds extra state or behavior to the component dynamically by overriding methods.",
                icon: Zap
            }
        ],
        code: {
            python: `class Notifier:
    def send(self, message):
        return f"Sending SMS: {message}"

class BaseDecorator(Notifier):
    def __init__(self, wrapper):
        self._wrapper = wrapper
    def send(self, message):
        return self._wrapper.send(message)

class SlackDecorator(BaseDecorator):
    def send(self, message):
        return f"Slack notification: {message} + " + super().send(message)

# Usage
stack = Notifier()
stack = SlackDecorator(stack)
print(stack.send("Alert!"))`,
            javascript: `// Basic component
class Coffee {
  cost() { return 10; }
}

// Milk Decorator
const withMilk = (coffee) => {
  const cost = coffee.cost();
  return {
    ...coffee,
    cost: () => cost + 2
  };
};

// Sugar Decorator
const withSugar = (coffee) => {
  const cost = coffee.cost();
  return {
    ...coffee,
    cost: () => cost + 1
  };
};

let myCoffee = new Coffee();
myCoffee = withMilk(myCoffee);
myCoffee = withSugar(myCoffee);
console.log(myCoffee.cost()); // 13`,
            java: `interface DataSource { void writeData(String data); }

class FileDataSource implements DataSource {
    public void writeData(String data) { /* write to file */ }
}

class EncryptionDecorator implements DataSource {
    private DataSource wrapper;
    public EncryptionDecorator(DataSource ds) { this.wrapper = ds; }
    
    public void writeData(String data) {
        String encrypted = "XYZ" + data; // dummy encryption
        wrapper.writeData(encrypted);
    }
}`
        }
    }, "facade": {
        id: "facade",
        name: "Facade",
        category: "Structural",
        tagline: "Simplified interface for complex systems.",
        description: "Provides a simplified interface to a library, a framework, or any other complex set of classes.",
        diagram: `classDiagram
      class Client
      class Facade { +simpleOperation() }
      class SubsystemA { +operation1() }
      class SubsystemB { +operation2() }
      class SubsystemC { +operation3() }
      Client --> Facade
      Facade --> SubsystemA
      Facade --> SubsystemB
      Facade --> SubsystemC`,
        roles: [
            {
                title: "Facade",
                description: "Knows which subsystem classes are responsible for a request and delegates the work appropriately.",
                icon: Layout
            },
            {
                title: "Complex Subsystem",
                description: "A set of classes that perform specialized tasks. They have no knowledge of the facade and operate independently.",
                icon: Settings
            },
            {
                title: "Client",
                description: "Uses the facade instead of calling the subsystem objects directly, reducing coupling.",
                icon: UserCheck
            }
        ],
        code: {
            python: `class CPU:
    def freeze(self): print("Freezing CPU...")
    def execute(self): print("Executing instructions...")

class Memory:
    def load(self, position, data): print(f"Loading {data} to {position}")

class HardDrive:
    def read(self, lba, size): return "Boot Data"

class ComputerFacade:
    def __init__(self):
        self.cpu = CPU()
        self.ram = Memory()
        self.hd = HardDrive()

    def start(self):
        self.cpu.freeze()
        self.ram.load("0x00", self.hd.read(100, 1024))
        self.cpu.execute()

# Usage
computer = ComputerFacade()
computer.start()`,
            javascript: `// Complex Subsystems
class VideoFile {}
class AudioMixer { fix(video) { return "Audio Fixed"; } }
class BitrateReader { read(file, codec) { return "Buffer"; } }

// Facade for the user
class VideoConverter {
  convert(filename, format) {
    const file = new VideoFile(filename);
    const reader = new BitrateReader().read(file, format);
    const result = new AudioMixer().fix(reader);
    return "Video Processed Successfully";
  }
}

const converter = new VideoConverter();
converter.convert("holiday_vlog.mp4", "avi");`,
            java: `class ComplexSystem {
    public void step1() { /* ... */ }
    public void step2() { /* ... */ }
}

class Facade {
    private ComplexSystem system = new ComplexSystem();
    
    public void simpleAction() {
        system.step1();
        system.step2();
    }
}`
        }
    }, "flyweight": {
        id: "flyweight",
        name: "Flyweight",
        category: "Structural",
        tagline: "Massive memory optimization.",
        description: "Allows fitting more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.",
        diagram: `classDiagram
      class FlyweightFactory { -flyweights: Map +getFlyweight(state) }
      class Flyweight { +operation(extrinsicState) }
      class Context { -extrinsicState -flyweight +operation() }
      FlyweightFactory o-- Flyweight
      Context o-- Flyweight
      Client --> FlyweightFactory
      Client --> Context`,
        roles: [
            {
                title: "Flyweight Factory",
                description: "Creates and manages flyweight objects, ensuring that they are shared correctly and reused if they already exist.",
                icon: Boxes
            },
            {
                title: "Flyweight",
                description: "Contains the portion of the original object's state that can be shared among multiple instances (Intrinsic State).",
                icon: Fingerprint
            },
            {
                title: "Context",
                description: "Contains the extrinsic state, which is unique across all original objects (e.g., coordinates, unique identifiers).",
                icon: Layout
            }
        ],
        code: {
            python: `class TreeType:
    """Intrinsic State: Shared by many trees (species, color, texture)."""
    def __init__(self, name, color, texture):
        self.name = name
        self.color = color
        self.texture = texture

class TreeFactory:
    """Factory that decides whether to reuse an existing type or create a new one."""
    _types = {}
    @classmethod
    def get_type(cls, name, color, texture):
        key = (name, color, texture)
        if key not in cls._types:
            cls._types[key] = TreeType(name, color, texture)
        return cls._types[key]

class Tree:
    """Context: Extrinsic State (unique X, Y coordinates)."""
    def __init__(self, x, y, type):
        self.x = x
        self.y = y
        self.type = type`,
            javascript: `// The shared object (Flyweight)
class Color {
  constructor(name) {
    this.name = name;
    console.log(\`Creating color object: \${name}\`);
  }
}

// The Factory
const ColorFactory = (() => {
  const colors = {};
  return {
    get: (name) => {
      if (!colors[name]) colors[name] = new Color(name);
      return colors[name];
    }
  };
})();

// Usage: Millions of points, but only 1 color object
const points = [];
for(let i=0; i<1000000; i++) {
  points.push({ 
    x: i, 
    y: i, 
    color: ColorFactory.get("Red") 
  });
}`,
            java: `class Flyweight {
    private String sharedState;
    public Flyweight(String state) { this.sharedState = state; }
}

class FlyweightFactory {
    private Map<String, Flyweight> cache = new HashMap<>();
    
    public Flyweight getFlyweight(String key) {
        if (!cache.containsKey(key)) {
            cache.put(key, new Flyweight(key));
        }
        return cache.get(key);
    }
}`
        }
    }, "proxy": {
        id: "proxy",
        name: "Proxy",
        category: "Structural",
        tagline: "Access control and intermediation.",
        description: "Provides a substitute or placeholder for another object to control access to it, allowing you to perform something either before or after the request reaches the original object.",
        diagram: `classDiagram
      class Subject { <<interface>> +request() }
      class RealSubject { +request() }
      class Proxy { -realSubject: RealSubject +request() +checkAccess() }
      Subject <|-- RealSubject
      Subject <|-- Proxy
      Proxy o-- RealSubject`,
        roles: [
            {
                title: "Subject",
                description: "Common interface for both the Real Object and the Proxy, allowing the proxy to stand in for the real object.",
                icon: Layers
            },
            {
                title: "Real Subject",
                description: "The real object containing the primary business logic that the proxy protects or manages.",
                icon: Box
            },
            {
                title: "Proxy",
                description: "Controls access to the real object and can manage its lifecycle, permissions, or caching.",
                icon: ShieldAlert
            }
        ],
        code: {
            python: `class VideoInterface:
    def download(self): pass

class RealVideo(VideoInterface):
    def download(self):
        print("Downloading heavy video from the cloud...")

class CachedProxy(VideoInterface):
    def __init__(self, service):
        self.service = service
        self.cache = None

    def download(self):
        if self.cache is None:
            print("First download...")
            self.cache = self.service.download()
        else:
            print("Retrieving video from local cache.")
        return self.cache

# Usage
proxy = CachedProxy(RealVideo())
proxy.download() # Real download
proxy.download() # Uses cache`,
            javascript: `// In JS, the Proxy object is a built-in feature
const target = {
  message: "Sensitive Information"
};

const handler = {
  get: function(obj, prop) {
    if (prop === "message") {
      console.log("LOG: Access denied to " + prop);
      return "Restricted Access";
    }
    return obj[prop];
  }
};

const proxy = new Proxy(target, handler);
console.log(proxy.message); // Restricted Access`,
            java: `interface Database { void query(String sql); }

class RealDatabase implements Database {
    public void query(String sql) { System.out.println("Executing SQL..."); }
}

class DatabaseProxy implements Database {
    private RealDatabase db = new RealDatabase();
    private boolean isAdmin;

    public void query(String sql) {
        if (isAdmin) {
            db.query(sql);
        } else {
            System.out.println("Error: Administrators only.");
        }
    }
}`
        }
    },
    "chain-of-responsibility": {
        id: "chain-of-responsibility",
        name: "Chain of Responsibility",
        category: "Behavioral",
        tagline: "Delegable sequential processing.",
        description: "Allows passing requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.",
        diagram: `classDiagram
      class Handler { <<interface>> +setNext(h) +handle(request) }
      class BaseHandler { -next: Handler +setNext(h) +handle(request) }
      class ConcreteHandlerA { +handle(request) }
      class ConcreteHandlerB { +handle(request) }
      Handler <|-- BaseHandler
      BaseHandler o-- Handler
      BaseHandler <|-- ConcreteHandlerA
      BaseHandler <|-- ConcreteHandlerB`,
        roles: [
            {
                title: "Handler",
                description: "Common interface for all concrete handlers. It usually includes a method for setting the next link in the chain.",
                icon: Layers
            },
            {
                title: "Base Handler",
                description: "Optional class where standard boilerplate for chaining is implemented to avoid code duplication.",
                icon: Settings
            },
            {
                title: "Concrete Handlers",
                description: "Contain the actual processing logic. If they cannot handle the request, they delegate it further down the line.",
                icon: Zap
            }
        ],
        code: {
            python: `class Handler:
    def __init__(self, next_handler=None):
        self._next = next_handler

    def handle(self, request):
        if self._next:
            return self._next.handle(request)
        return None

class AuthHandler(Handler):
    def handle(self, request):
        if request['user'] == 'admin':
            print("Auth: OK")
            return super().handle(request)
        print("Auth: FAILED")
        return "403 Forbidden"

class DataHandler(Handler):
    def handle(self, request):
        print(f"Processing data: {request['data']}")
        return "200 OK"

# Usage
chain = AuthHandler(DataHandler())
chain.handle({'user': 'admin', 'data': 'Secret Info'})`,
            javascript: `class Middleware {
  setNext(handler) {
    this.next = handler;
    return handler;
  }

  handle(request) {
    if (this.next) return this.next.handle(request);
    return null;
  }
}

class Logger extends Middleware {
  handle(request) {
    console.log("Log: Request received");
    return super.handle(request);
  }
}

class Validator extends Middleware {
  handle(request) {
    if (request.isValid) return super.handle(request);
    return "Error: Invalid";
  }
}

const app = new Logger();
app.setNext(new Validator());
console.log(app.handle({ isValid: true }));`,
            java: `abstract class Handler {
    protected Handler next;
    public void setNext(Handler h) { this.next = h; }
    public abstract void handle(String request);
}

class SupportLevel1 extends Handler {
    public void handle(String request) {
        if (request.equals("simple")) {
            System.out.println("L1 handled the issue.");
        } else if (next != null) {
            next.handle(request);
        }
    }
}`
        }
    },
    "command": {
        id: "command",
        name: "Command",
        category: "Behavioral",
        tagline: "Encapsulation of actions.",
        description: "Turns a request into a stand-alone object that contains all information about the request. This transformation lets you pass requests as a method arguments, delay or queue a request's execution, and support undoable operations.",
        diagram: `classDiagram
      class Command { <<interface>> +execute() +undo() }
      class ConcreteCommand { -receiver -state +execute() +undo() }
      class Receiver { +operation() }
      class Invoker { -command: Command +setCommand(c) +executeCommand() }
      Command <|-- ConcreteCommand
      ConcreteCommand --> Receiver
      Invoker o-- Command`,
        roles: [
            {
                title: "Command",
                description: "Interface that declares the method for executing the operation and, optionally, for undoing it.",
                icon: Layers
            },
            {
                title: "Concrete Command",
                description: "Defines the link between a Receiver object and an action. Implements execution by calling the corresponding methods of the Receiver.",
                icon: Zap
            },
            {
                title: "Invoker",
                description: "The object that asks the command to carry out the request (e.g., a button or a queue manager).",
                icon: UserCheck
            },
            {
                title: "Receiver",
                description: "The class that contains the actual business logic; it knows how to perform the work.",
                icon: Box
            }
        ],
        code: {
            python: `class Light:
    """The Receiver"""
    def on(self): print("Light on")
    def off(self): print("Light off")

class Command:
    def execute(self): pass
    def undo(self): pass

class LightOnCommand(Command):
    def __init__(self, light):
        self.light = light
    def execute(self): self.light.on()
    def undo(self): self.light.off()

class RemoteControl:
    """The Invoker"""
    def __init__(self):
        self.history = []
    def submit(self, command):
        command.execute()
        self.history.append(command)
    def undo(self):
        if self.history:
            command = self.history.pop()
            command.undo()`,
            javascript: `// Receiver
const Calculator = {
  value: 0,
  add(v) { this.value += v; },
  sub(v) { this.value -= v; }
};

// Concrete Command
class AddCommand {
  constructor(value) { this.value = value; }
  execute() { Calculator.add(this.value); }
  undo() { Calculator.sub(this.value); }
}

// Invoker
const invoker = {
  history: [],
  do(cmd) {
    cmd.execute();
    this.history.push(cmd);
  },
  undo() {
    const cmd = this.history.pop();
    if (cmd) cmd.undo();
  }
};

invoker.do(new AddCommand(10));
invoker.undo();`,
            java: `interface Command { void execute(); void undo(); }

class Editor {
    public void insertText(String t) { /* logic */ }
    public void deleteText() { /* logic */ }
}

class InsertCommand implements Command {
    private Editor editor;
    private String text;
    public InsertCommand(Editor e, String t) { this.editor = e; this.text = t; }
    
    public void execute() { editor.insertText(text); }
    public void undo() { editor.deleteText(); }
}`
        }
    },
    "interpreter": {
        id: "interpreter",
        name: "Interpreter",
        category: "Behavioral",
        tagline: "Grammar evaluation engine.",
        description: "Defines a representation for a language's grammar along with an interpreter that uses the representation to interpret sentences in the language.",
        diagram: `classDiagram
      class Expression { <<interface>> +interpret(context) }
      class TerminalExpression { +interpret(context) }
      class NonTerminalExpression { -expression: Expression +interpret(context) }
      class Context { +input +output }
      Expression <|-- TerminalExpression
      Expression <|-- NonTerminalExpression
      NonTerminalExpression o-- Expression`,
        roles: [
            {
                title: "Abstract Expression",
                description: "Declares an interface for executing the interpretation operation.",
                icon: Layers
            },
            {
                title: "Terminal Expression",
                description: "Implements interpretation for basic symbols of the grammar (e.g., numbers, variables).",
                icon: Fingerprint
            },
            {
                title: "Non-Terminal Expression",
                description: "Represents complex grammatical rules that combine other expressions (e.g., sums, conditions).",
                icon: Boxes
            },
            {
                title: "Context",
                description: "Contains global information that is necessary for the interpreter (e.g., variable values).",
                icon: Database
            }
        ],
        code: {
            python: `class Expression:
    def interpret(self, context): pass

class Number(Expression):
    def __init__(self, value):
        self.value = value
    def interpret(self, context):
        return self.value

class Add(Expression):
    def __init__(self, left, right):
        self.left = left
        self.right = right
    def interpret(self, context):
        return self.left.interpret(context) + self.right.interpret(context)

# Usage: (5 + 10)
expression = Add(Number(5), Number(10))
print(expression.interpret({}))`,
            javascript: `// Simple expression evaluator
class Constant {
  constructor(value) { this.value = value; }
  interpret() { return this.value; }
}

class Plus {
  constructor(l, r) { this.left = l; this.right = r; }
  interpret() { 
    return this.left.interpret() + this.right.interpret(); 
  }
}

// Represents 1 + 2
const sentence = new Plus(new Constant(1), new Constant(2));
console.log(sentence.interpret()); // 3`,
            java: `interface Expression {
    int interpret(Map<String, Integer> context);
}

class Variable implements Expression {
    private String name;
    public Variable(String name) { this.name = name; }
    public int interpret(Map<String, Integer> context) {
        return context.getOrDefault(name, 0);
    }
}

class Minus implements Expression {
    private Expression left, right;
    public Minus(Expression l, Expression r) { this.left = l; this.right = r; }
    public int interpret(Map<String, Integer> context) {
        return left.interpret(context) - right.interpret(context);
    }
}`
        }
    }, "iterator": {
        id: "iterator",
        name: "Iterator",
        category: "Behavioral",
        tagline: "Uniform traversal of collections.",
        description: "Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation (list, stack, tree, etc.).",
        diagram: `classDiagram
      class Iterable { <<interface>> +createIterator() Iterator }
      class Iterator { <<interface>> +getNext() +hasMore() }
      class ConcreteCollection { +createIterator() Iterator }
      class ConcreteIterator { -collection: ConcreteCollection -iterationState +getNext() +hasMore() }
      Iterable <|-- ConcreteCollection
      Iterator <|-- ConcreteIterator
      ConcreteCollection ..> ConcreteIterator
      ConcreteIterator o-- ConcreteCollection`,
        roles: [
            {
                title: "Iterator",
                description: "Interface defining the operations for traversing a collection: fetching the next element, checking if more exist, etc.",
                icon: ChevronRight
            },
            {
                title: "Concrete Iterator",
                description: "Implements the specific traversal algorithm for a collection and tracks the current progress.",
                icon: Fingerprint
            },
            {
                title: "Collection",
                description: "Interface that defines a method for creating an iterator compatible with the data structure.",
                icon: Layers
            },
            {
                title: "Concrete Collection",
                description: "Returns a new instance of a specific concrete iterator each time the client requests one.",
                icon: Box
            }
        ],
        code: {
            python: `class AlphabeticalOrderIterator:
    def __init__(self, words, reverse=False):
        self._words = words
        self._reverse = reverse
        self._position = -1 if reverse else 0

    def __next__(self):
        try:
            value = self._words[self._position]
            self._position += -1 if self._reverse else 1
        except IndexError:
            raise StopIteration()
        return value

    def __iter__(self):
        return self

# Usage
words = ["A", "B", "C"]
iterator = AlphabeticalOrderIterator(words)
for item in iterator:
    print(item)`,
            javascript: `// In JS, the iterable protocol is native via [Symbol.iterator]
const collection = {
  items: ["Post 1", "Post 2", "Post 3"],
  [Symbol.iterator]: function() {
    let index = 0;
    return {
      next: () => {
        if (index < this.items.length) {
          return { value: this.items[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (let item of collection) {
  console.log(item);
}`,
            java: `interface Iterator<T> {
    boolean hasNext();
    T next();
}

class NameRepository {
    public String names[] = {"Robert", "John", "Julie"};

    public Iterator getIterator() {
        return new NameIterator();
    }

    private class NameIterator implements Iterator {
        int index;
        public boolean hasNext() {
            return index < names.length;
        }
        public Object next() {
            return hasNext() ? names[index++] : null;
        }
    }
}`
        }
    }, "mediator": {
        id: "mediator",
        name: "Mediator",
        category: "Behavioral",
        tagline: "Centralized communication hub.",
        description: "Reduces coupling between components of a program by making them communicate indirectly, through a special mediator object.",
        diagram: `classDiagram
      class Mediator { <<interface>> +notify(sender, event) }
      class ConcreteMediator { -componentA -componentB +notify(sender, event) }
      class Component { -mediator: Mediator +setMediator(m) }
      class ComponentA { +doA() }
      class ComponentB { +doB() }
      Mediator <|-- ConcreteMediator
      Component <|-- ComponentA
      Component <|-- ComponentB
      ConcreteMediator o-- ComponentA
      ConcreteMediator o-- ComponentB`,
        roles: [
            {
                title: "Mediator",
                description: "Declares the interface for communication with components, usually containing a single notification method.",
                icon: Layers
            },
            {
                title: "Concrete Mediator",
                description: "Coordinates several components by keeping references to them and managing their interactions.",
                icon: Settings
            },
            {
                title: "Components",
                description: "Classes that contain business logic. They only know about the mediator and don't communicate with each other.",
                icon: Box
            }
        ],
        code: {
            python: `class Mediator:
    def notify(self, sender, event): pass

class AuthenticationDialog(Mediator):
    def __init__(self, login_button, user_input):
        self.login_button = login_button
        self.user_input = user_input
        self.login_button.set_mediator(self)

    def notify(self, sender, event):
        if event == "click":
            print(f"AuthDialog: Processing login for {self.user_input.text}")

class Button:
    def set_mediator(self, mediator):
        self.mediator = mediator
    def click(self):
        self.mediator.notify(self, "click")`,
            javascript: `class ChatRoomMediator {
  showMessage(user, message) {
    const time = new Date().toLocaleTimeString();
    console.log(\`[\${time}] \${user.getName()}: \${message}\`);
  }
}

class User {
  constructor(name, mediator) {
    this.name = name;
    this.mediator = mediator;
  }
  getName() { return this.name; }
  send(message) {
    this.mediator.showMessage(this, message);
  }
}

const chat = new ChatRoomMediator();
const john = new User("John", chat);
john.send("Hello everyone!");`,
            java: `interface Mediator {
    void sendMessage(String msg, Colleague user);
}

class ChatMediator implements Mediator {
    private List<Colleague> users = new ArrayList<>();
    public void sendMessage(String msg, Colleague user) {
        for (Colleague u : users) {
            if (u != user) u.receive(msg);
        }
    }
}

abstract class Colleague {
    protected Mediator mediator;
    public abstract void receive(String msg);
}`
        }
    }, "memento": {
        id: "memento",
        name: "Memento",
        category: "Behavioral",
        tagline: "Snapshot and restore functionality.",
        description: "Captures and externalizes an object's internal state so that the object can be restored to this state later, without violating encapsulation.",
        diagram: `classDiagram
      class Originator { -state +save() Memento +restore(m: Memento) }
      class Memento { -state +getState() }
      class Caretaker { -history: Memento[] +undo() }
      Originator ..> Memento
      Caretaker o-- Memento`,
        roles: [
            {
                title: "Originator",
                description: "The object that has a state. It can produce snapshots of itself and restore its state from them.",
                icon: Box
            },
            {
                title: "Memento",
                description: "A value object that acts as a snapshot of the originator's state. It is immutable.",
                icon: Database
            },
            {
                title: "Caretaker",
                description: "Keeps track of the originator's history by storing a stack of mementos. It doesn't modify them.",
                icon: History
            }
        ],
        code: {
            python: `class Memento:
    def __init__(self, state):
        self._state = state
    def get_state(self):
        return self._state

class Editor:
    """The Originator"""
    def __init__(self):
        self._text = ""
    def type(self, text):
        self._text += text
    def save(self):
        return Memento(self._text)
    def restore(self, memento):
        self._text = memento.get_state()

# Usage
editor = Editor()
history = []

editor.type("Hello ")
history.append(editor.save())
editor.type("World")
editor.restore(history.pop()) # Restores to "Hello "`,
            javascript: `class Memento {
  constructor(state) {
    this.state = JSON.stringify(state);
  }
  getState() { return JSON.parse(this.state); }
}

class GameCharacter {
  constructor() { this.level = 1; this.score = 0; }
  
  save() { return new Memento({ level: this.level, score: this.score }); }
  
  restore(memento) {
    const data = memento.getState();
    this.level = data.level;
    this.score = data.score;
  }
}

const player = new GameCharacter();
const savePoint = player.save();
player.level = 50; 
player.restore(savePoint); // Back to level 1`,
            java: `public class Memento {
    private final String state;
    public Memento(String state) { this.state = state; }
    public String getState() { return state; }
}

public class Originator {
    private String state;
    public void setState(String state) { this.state = state; }
    public Memento save() { return new Memento(state); }
    public void restore(Memento m) { state = m.getState(); }
}`
        }
    }, "observer": {
        id: "observer",
        name: "Observer",
        category: "Behavioral",
        tagline: "Event-driven state synchronization.",
        description: "Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.",
        diagram: `classDiagram
      class Subject { -observers: List~Observer~ +attach(o) +detach(o) +notify() }
      class Observer { <<interface>> +update(subject) }
      class ConcreteSubject { -state +getState() +setState() }
      class ConcreteObserver { +update(subject) }
      Subject <|-- ConcreteSubject
      Observer <|-- ConcreteObserver
      Subject o-- Observer`,
        roles: [
            {
                title: "Subject",
                description: "The object of interest. It maintains a list of observers and provides methods to attach or detach them.",
                icon: Database
            },
            {
                title: "Observer",
                description: "The interface for objects that should be notified of changes in a subject.",
                icon: UserCheck
            },
            {
                title: "Concrete Subject",
                description: "Stores the state of interest and sends a notification to its observers when the state changes.",
                icon: Box
            },
            {
                title: "Concrete Observer",
                description: "Registers with a concrete subject and implements the update interface to keep its state consistent with the subject's.",
                icon: Zap
            }
        ],
        code: {
            python: `class Subject:
    def __init__(self):
        self._observers = []

    def attach(self, observer):
        self._observers.append(observer)

    def notify(self, message):
        for observer in self._observers:
            observer.update(message)

class NewsAgency(Subject):
    def publish_news(self, text):
        self.notify(text)

class NewsChannel:
    def update(self, message):
        print(f"Channel received news: {message}")

# Usage
agency = NewsAgency()
cnn = NewsChannel()
agency.attach(cnn)
agency.publish_news("Design Patterns are awesome!")`,
            javascript: `class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(fn) {
    this.observers.push(fn);
  }
  unsubscribe(fn) {
    this.observers = this.observers.filter(item => item !== fn);
  }
  broadcast(data) {
    this.observers.forEach(fn => fn(data));
  }
}

const store = new Subject();
const logger = (data) => console.log(\`Logging: \${data}\`);
const toast = (data) => console.log(\`Showing Toast: \${data}\`);

store.subscribe(logger);
store.subscribe(toast);
store.broadcast("New Update Available!");`,
            java: `interface Observer {
    void update(String news);
}

class NewsAgency {
    private List<Observer> observers = new ArrayList<>();
    public void addObserver(Observer o) { observers.add(o); }
    public void setNews(String news) {
        for (Observer o : observers) o.update(news);
    }
}

class RadioStation implements Observer {
    public void update(String news) {
        System.out.println("Radio playing: " + news);
    }
}`
        }
    }, "state": {
        id: "state",
        name: "State",
        category: "Behavioral",
        tagline: "Behavioral changes based on internal status.",
        description: "Lets an object alter its behavior when its internal state changes. The object will appear to change its class.",
        diagram: `classDiagram
      class Context { -state: State +request() +transitionTo(s) }
      class State { <<interface>> +handle() }
      class ConcreteStateA { +handle() }
      class ConcreteStateB { +handle() }
      Context o-- State
      State <|-- ConcreteStateA
      State <|-- ConcreteStateB`,
        roles: [
            {
                title: "Context",
                description: "Defines the interface of interest to clients and maintains a reference to an instance of a ConcreteState subclass.",
                icon: Box
            },
            {
                title: "State",
                description: "Declares an interface for encapsulating the behavior associated with a particular state of the Context.",
                icon: Layers
            },
            {
                title: "Concrete States",
                description: "Each subclass implements a behavior associated with a state of the Context.",
                icon: Zap
            }
        ],
        code: {
            python: `class State:
    def handle(self): pass

class PublishedState(State):
    def handle(self):
        print("Document is public. No more edits allowed.")

class DraftState(State):
    def handle(self):
        print("Document is in draft. Sending to review...")

class Document:
    def __init__(self, state):
        self._state = state
    
    def transition_to(self, state):
        self._state = state
    
    def render(self):
        self._state.handle()

# Usage
doc = Document(DraftState())
doc.render() # Draft logic
doc.transition_to(PublishedState())
doc.render() # Published logic`,
            javascript: `class Order {
  constructor() {
    this.state = new PendingState();
  }
  next() {
    this.state.next(this);
  }
}

class PendingState {
  next(order) {
    console.log("Order processed. Moving to Shipped.");
    order.state = new ShippedState();
  }
}

class ShippedState {
  next(order) {
    console.log("Order delivered.");
    order.state = new DeliveredState();
  }
}

class DeliveredState {
  next(order) { console.log("Already delivered."); }
}

const myOrder = new Order();
myOrder.next(); // Moving to Shipped`,
            java: `interface State {
    void doAction(Context context);
}

class StartState implements State {
    public void doAction(Context context) {
        System.out.println("Player is in start state");
        context.setState(this);
    }
}

class Context {
    private State state;
    public void setState(State state) { this.state = state; }
    public State getState() { return state; }
}`
        }
    }, "strategy": {
        id: "strategy",
        name: "Strategy",
        category: "Behavioral",
        tagline: "Interchangeable algorithms at runtime.",
        description: "Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.",
        diagram: `classDiagram
      class Context { -strategy: Strategy +setStrategy(s) +execute() }
      class Strategy { <<interface>> +executeAlgorithm(data) }
      class ConcreteStrategyA { +executeAlgorithm(data) }
      class ConcreteStrategyB { +executeAlgorithm(data) }
      Context o-- Strategy
      Strategy <|-- ConcreteStrategyA
      Strategy <|-- ConcreteStrategyB`,
        roles: [
            {
                title: "Context",
                description: "Maintains a reference to one of the concrete strategies and communicates with it only via the strategy interface.",
                icon: Box
            },
            {
                title: "Strategy",
                description: "Common interface for all supported versions of some algorithm.",
                icon: Layers
            },
            {
                title: "Concrete Strategies",
                description: "Implement different variations of an algorithm the context uses.",
                icon: Zap
            }
        ],
        code: {
            python: `class RouteStrategy:
    def build_route(self, a, b): pass

class RoadStrategy(RouteStrategy):
    def build_route(self, a, b):
        return f"Fastest road route from {a} to {b}"

class WalkingStrategy(RouteStrategy):
    def build_route(self, a, b):
        return f"Scenic walking path from {a} to {b}"

class Navigator:
    def __init__(self, strategy: RouteStrategy):
        self._strategy = strategy
    
    def set_strategy(self, strategy: RouteStrategy):
        self._strategy = strategy

    def execute(self, a, b):
        return self._strategy.build_route(a, b)

# Usage
nav = Navigator(RoadStrategy())
print(nav.execute("Home", "Work"))
nav.set_strategy(WalkingStrategy())
print(nav.execute("Home", "Work"))`,
            javascript: `// Different payment strategies
const paypalPayment = (amount) => console.log(\`Paid \${amount} using PayPal\`);
const creditCardPayment = (amount) => console.log(\`Paid \${amount} using Credit Card\`);

class Checkout {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  process(amount) {
    this.strategy(amount);
  }
}

const cart = new Checkout(paypalPayment);
cart.process(100);
cart.strategy = creditCardPayment;
cart.process(100);`,
            java: `interface PaymentStrategy {
    void pay(int amount);
}

class CreditCardStrategy implements PaymentStrategy {
    public void pay(int amount) { /* Logic */ }
}

class ShoppingCart {
    private PaymentStrategy strategy;
    public void setPaymentMethod(PaymentStrategy s) { this.strategy = s; }
    public void checkout(int amount) { strategy.pay(amount); }
}`
        }
    }, "template-method": {
        id: "template-method",
        name: "Template Method",
        category: "Behavioral",
        tagline: "Skeleton of an algorithm with pluggable steps.",
        description: "Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.",
        diagram: `classDiagram
      class DataMiner { <<abstract>> +templateMethod() +openFile()* +extractData()* +closeFile() +hook() }
      class PDFMiner { +openFile() +extractData() }
      class CSVMiner { +openFile() +extractData() }
      DataMiner <|-- PDFMiner
      DataMiner <|-- CSVMiner`,
        roles: [
            {
                title: "Abstract Class",
                description: "Declares the template method and the abstract steps that subclasses must implement.",
                icon: Layers
            },
            {
                title: "Concrete Class",
                description: "Implements the specific steps of the algorithm defined in the abstract class.",
                icon: Zap
            },
            {
                title: "Template Method",
                description: "A method that defines the algorithm's structure by calling other steps in a specific order.",
                icon: Settings
            }
        ],
        code: {
            python: `class Miner:
    def parse_data(self):
        """The Template Method"""
        self.open_file()
        self.extract_data()
        self.close_file()
        self.hook()

    def open_file(self): pass
    def extract_data(self): pass
    def close_file(self):
        print("File closed.")
    def hook(self):
        """Optional step for subclasses"""
        pass

class PDFMiner(Miner):
    def open_file(self): print("Opening PDF...")
    def extract_data(self): print("Extracting PDF text...")

# Usage
miner = PDFMiner()
miner.parse_data()`,
            javascript: `class BuildScript {
  build() {
    this.compile();
    this.test();
    this.deploy();
  }

  compile() { console.log("Compiling source..."); }
  test() { console.log("Running default tests..."); }
  deploy() { throw new Error("Subclass must implement deploy"); }
}

class AndroidBuild extends BuildScript {
  deploy() { console.log("Deploying APK to Play Store."); }
}

const build = new AndroidBuild();
build.build();`,
            java: `abstract class Game {
    abstract void initialize();
    abstract void startPlay();
    abstract void endPlay();

    // Template method
    public final void play() {
        initialize();
        startPlay();
        endPlay();
    }
}

class Football extends Game {
    void initialize() { System.out.println("Football Game Initialized!"); }
    void startPlay() { System.out.println("Football Game Started!"); }
    void endPlay() { System.out.println("Football Game Finished!"); }
}`
        }
    },
    "visitor": {
        id: "visitor",
        name: "Visitor",
        category: "Behavioral",
        tagline: "Separate algorithms from object structures.",
        description: "Lets you define a new operation without changing the classes of the elements on which it operates.",
        diagram: `classDiagram
      class Visitor { <<interface>> +visitConcreteElementA(e) +visitConcreteElementB(e) }
      class ConcreteVisitor { +visitConcreteElementA(e) +visitConcreteElementB(e) }
      class Element { <<interface>> +accept(v: Visitor) }
      class ConcreteElementA { +accept(v: Visitor) }
      class ConcreteElementB { +accept(v: Visitor) }
      Element <|-- ConcreteElementA
      Element <|-- ConcreteElementB
      Visitor <|-- ConcreteVisitor
      ConcreteElementA ..> Visitor
      ConcreteElementB ..> Visitor`,
        roles: [
            {
                title: "Visitor",
                description: "Declares a set of visiting methods, one for each class of concrete elements in the structure.",
                icon: UserCheck
            },
            {
                title: "Concrete Visitor",
                description: "Implements several versions of the same algorithm, tailored for all corresponding classes of concrete elements.",
                icon: Zap
            },
            {
                title: "Element",
                description: "Declares a method for 'accepting' visitors. This method should take the visitor interface as an argument.",
                icon: Layers
            },
            {
                title: "Concrete Element",
                description: "Implements the acceptance method, which redirects the call to the visitor's method corresponding to the element's class.",
                icon: Box
            }
        ],
        code: {
            python: `class Shape:
    def accept(self, visitor): pass

class Dot(Shape):
    def accept(self, visitor):
        visitor.visit_dot(self)

class Circle(Shape):
    def accept(self, visitor):
        visitor.visit_circle(self)

class XMLExportVisitor:
    def visit_dot(self, dot):
        print("Exporting dot coordinates to XML...")
    def visit_circle(self, circle):
        print("Exporting circle radius and center to XML...")

# Usage
shapes = [Dot(), Circle()]
xml_visitor = XMLExportVisitor()
for s in shapes:
    s.accept(xml_visitor)`,
            javascript: `class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  accept(visitor) {
    visitor.visit(this);
  }
}

class SalaryVisitor {
  visit(employee) {
    employee.salary = employee.salary * 1.1;
    console.log(\`New salary for \${employee.name}: \${employee.salary}\`);
  }
}

const staff = [new Employee("Alice", 5000), new Employee("Bob", 6000)];
const bonus = new SalaryVisitor();
staff.forEach(e => e.accept(bonus));`,
            java: `interface Visitor {
    void visit(Book book);
    void visit(Fruit fruit);
}

class PriceVisitor implements Visitor {
    public void visit(Book book) { /* calculate book discount */ }
    public void visit(Fruit fruit) { /* calculate fruit weight price */ }
}

interface ItemElement {
    void accept(Visitor v);
}

class Book implements ItemElement {
    public void accept(Visitor v) { v.visit(this); }
}`
        }
    },

};