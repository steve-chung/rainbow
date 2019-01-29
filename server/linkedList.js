class Node{
  constructor(val){
      this.val = val;
      this.next = null;
  }
}

class SinglyLinkedList{
  constructor(){
      this.head = null;
      this.tail = null;
      this.length = 0;
  }
  push(val){
      var newNode = new Node(val);
      if(!this.head){
          this.head = newNode;
          this.tail = this.head;
      } else {
          this.tail.next = newNode;
          this.tail = newNode;
      }
      this.length++;
      return this;
  }
  getAll() {
    var arr = []
    var current = this.head
    while(current){
        arr.push(current.val)
        current = current.next
  }
    return arr
}

  get(index){
      if(index < 0 || index >= this.length) return null;
      var counter = 0;
      var current = this.head;
      while(counter !== index){
          current = current.next;
          counter++;
      }
      return current;
  }
  set(index, val){
      var foundNode = this.get(index);
      if(foundNode){
          foundNode.val = val;
          return true;
      }
      return false;
  }
  remove(index){
      if(index < 0 || index >= this.length) return undefined;
      if(index === 0) return this.shift();
      if(index === this.length - 1) return this.pop();
      var previousNode = this.get(index - 1);
      var removed = previousNode.next;
      previousNode.next = removed.next;
      this.length--;
      return removed;
  }
  print(){
      const arr = this.getAll()
      console.log(arr);
  }
}

module.exports = SinglyLinkedList










