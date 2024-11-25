// Component
interface MenuComponent {
    getName(): string;
    getPrice(): number;
    display(indent?: string): void;
  }
  
  // Leaf
  class MenuItem implements MenuComponent {
    constructor(private name: string, private price: number) {}
  
    getName(): string {
      return this.name;
    }
  
    getPrice(): number {
      return this.price;
    }
  
    display(indent: string = ""): void {
      console.log(`${indent}${this.getName()} - $${this.getPrice().toFixed(2)}`);
    }
  }
  
  // Composite
  class Menu implements MenuComponent {
    private items: MenuComponent[] = [];
  
    constructor(private name: string) {}
  
    getName(): string {
      return this.name;
    }
  
    getPrice(): number {
      // Aggregates the price of all child components
      return this.items.reduce((total, item) => total + item.getPrice(), 0);
    }
  
    add(item: MenuComponent): void {
      this.items.push(item);
    }
  
    remove(item: MenuComponent): void {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
  
    display(indent: string = ""): void {
      console.log(`${indent}${this.getName()} - Total: $${this.getPrice().toFixed(2)}`);
      this.items.forEach(item => item.display(indent + "  "));
    }
  }
  
  // Client code
  const mainMenu = new Menu("Main Menu");
  
  const breakfastMenu = new Menu("Breakfast Menu");
  breakfastMenu.add(new MenuItem("Pancakes", 5.99));
  breakfastMenu.add(new MenuItem("Coffee", 2.99));
  
  const lunchMenu = new Menu("Lunch Menu");
  lunchMenu.add(new MenuItem("Burger", 8.99));
  lunchMenu.add(new MenuItem("Fries", 3.49));
  
  mainMenu.add(breakfastMenu);
  mainMenu.add(lunchMenu);
  mainMenu.add(new MenuItem("Dessert", 4.99));
  
  // Display the entire menu structure
  mainMenu.display();
  