export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    insertInBegin: (element: T) => void;
    insertAtEnd: (element: T) => void;
    appendByIndex: (element: T, position: number) => void;
    removeHead: () => void;
    removeTail: () => void;
    removeFrom: (position: number) => void;
    getSize: () => number;
    getArray: () => void;
    isEmpty: () => boolean;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertInBegin(element: T): void {
        const node = new Node(element);
        if (!this.head) {
            this.head = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    }

    insertAtEnd(element: T) {
        const node = new Node(element);
        let current;

        if (!this.head) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }
        this.size++;
    }

    appendByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node(element);

            // добавить элемент в начало списка
            if (index === 0) {
                node.next = this.head;
                this.head = node;

            } else {
                let curr = this.head;
                let currIndex = 0;

                while (currIndex < index) {
                    currIndex++;
                    if (curr?.next && currIndex !== index) {
                        curr = curr?.next;
                    }
                }

                if (curr) {
                    node.next = curr.next;
                    curr.next = node;
                }

            }
            this.size++;
        }
    }


    removeHead() {
        if(this.head) {
            this.head = this.head.next;
            this.size--;
        }
    }

    removeTail() {
        let current;
        if (!this.head?.next) {
            this.head = null;
        } else {
            current = this.head;
            while (current.next?.next) {
                current = current.next;
            }
            current.next = null;
        }
        this.size--;
    }

    removeFrom(index: number) {
        if (index < 0 || index > this.size) {
            console.log("Enter a valid index");
            return;
        } else {
            let current = this.head;
            if (index === 0) {
                if (this.head) this.head = this.head?.next;
            } else {
                let prev = null;
                let currIndex = 0;
                while (currIndex++ < index) {
                    prev = current;
                    if (current) {
                        current = current.next;
                    }
                }
                if (prev?.next) prev.next = current?.next ? current.next : null;
            }
        }
        this.size--;
    }

    getSize() {
        return this.size;
    }

    getArray() {
        let curr = this.head;
        let res: T[] = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res
    }

    isEmpty = () => this.size === 0;
}