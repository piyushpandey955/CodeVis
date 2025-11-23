// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import VisualizerLayout from '../../components/visualizer/Shared/VisualizerLayout';
import LinkedListVisualization from '../../components/visualizer/LinkedList/LinkedListVisualization';
import LinkedListControls from '../../components/visualizer/LinkedList/LinkedListControls';
import CodePanel from '../../components/visualizer/Shared/CodePanel';
import OperationHistory from '../../components/visualizer/Shared/OperationHistory';
import useLinkedListStore from '../../store/linkedListStore';

const LinkedListVisualizer = () => {
  const history = useLinkedListStore((state) => state.history);
  const clearHistory = useLinkedListStore((state) => state.clearHistory);

  const linkedListCodeExamples = {
    python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert_at_head(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    def insert_at_tail(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def delete_at_head(self):
        if not self.head:
            return None
        
        deleted_value = self.head.data
        self.head = self.head.next
        return deleted_value
    
    def search(self, value):
        current = self.head
        position = 0
        
        while current:
            if current.data == value:
                return position
            current = current.next
            position += 1
        
        return -1  # Not found`,
    
    javascript: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
    
    insertAtHead(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }
    
    insertAtTail(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
    
    deleteAtHead() {
        if (!this.head) return null;
        
        const deletedValue = this.head.data;
        this.head = this.head.next;
        return deletedValue;
    }
    
    search(value) {
        let current = this.head;
        let position = 0;
        
        while (current) {
            if (current.data === value) {
                return position;
            }
            current = current.next;
            position++;
        }
        
        return -1; // Not found
    }
}`,
    
    java: `class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    Node head;
    
    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }
    
    public void insertAtTail(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        
        Node current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;
    }
    
    public Integer deleteAtHead() {
        if (head == null) return null;
        
        int deletedValue = head.data;
        head = head.next;
        return deletedValue;
    }
    
    public int search(int value) {
        Node current = head;
        int position = 0;
        
        while (current != null) {
            if (current.data == value) {
                return position;
            }
            current = current.next;
            position++;
        }
        
        return -1; // Not found
    }
}`,
    
    cpp: `struct Node {
    int data;
    Node* next;
    
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;
    
public:
    LinkedList() : head(nullptr) {}
    
    void insertAtHead(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
    }
    
    void insertAtTail(int data) {
        Node* newNode = new Node(data);
        if (!head) {
            head = newNode;
            return;
        }
        
        Node* current = head;
        while (current->next) {
            current = current->next;
        }
        current->next = newNode;
    }
    
    int deleteAtHead() {
        if (!head) return -1;
        
        int deletedValue = head->data;
        Node* temp = head;
        head = head->next;
        delete temp;
        return deletedValue;
    }
    
    int search(int value) {
        Node* current = head;
        int position = 0;
        
        while (current) {
            if (current->data == value) {
                return position;
            }
            current = current->next;
            position++;
        }
        
        return -1; // Not found
    }
    
    ~LinkedList() {
        while (head) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
};`
  };

  const linkedListComplexity = {
    'Insert at Head': 'O(1)',
    'Insert at Tail': 'O(n)',
    'Delete at Head': 'O(1)',
    'Delete at Tail': 'O(n)',
    'Search': 'O(n)',
    'Space Complexity': 'O(n)',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full"
    >
      <VisualizerLayout
        title="Linked List Visualizer"
        description="Visualize singly linked list operations with insertions, deletions, and searches"
        controlPanel={<LinkedListControls />}
        codePanel={
          <CodePanel 
            codeExamples={linkedListCodeExamples}
            complexity={linkedListComplexity}
          />
        }
        operationHistory={
          <OperationHistory 
            operations={history}
            onClear={clearHistory}
          />
        }
      >
        <LinkedListVisualization />
      </VisualizerLayout>
    </motion.div>
  );
};

export default LinkedListVisualizer;
