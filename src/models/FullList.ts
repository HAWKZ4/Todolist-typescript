import ListItem from "./ListItem";

interface List {
  // Property
  list: ListItem[];

  // Methods
  load(): void;
  save(): void;
  clearItems(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  // Singleton
  // static: This keyword means that instance is a class-level property, not an instance-level property.
  // It belongs to the class itself (in this case, FullList), rather than to any individual object created from that class.
  // This is crucial for implementing a singleton pattern because it ensures that there's only one instance of the class.

  static instance: FullList = new FullList();
  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("myList");

    if (typeof storedList !== "string") return;

    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );

      // BTW you could use: this.addItem(newListItem) but the second one is better for more explicit (Singleton)
      FullList.instance.addItem(newListItem);
    });
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearItems(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
