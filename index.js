class Node
{
  constructor(parent, data) {
    this.parent = parent;
    this.children = [];
    this.data = data;
  }

  appendChild(data) {
    this.children.push(new Node(this, data));
  }

  serialize() {
    return {
      data: this.data,
      children: this.children.map(child => child.serialize())
    };
  }
}

const root = new Node(null, 1);
let currentNode = root;

currentNode.appendChild(2);

currentNode = currentNode.children[0];
currentNode.appendChild(3);

currentNode = currentNode.children[0];
currentNode.appendChild(4);
currentNode.appendChild(5);

currentNode = currentNode.parent;
currentNode.appendChild(6);

currentNode = currentNode.children[1];
currentNode.appendChild(7);
currentNode.appendChild(8);

currentNode = currentNode.parent;
currentNode = currentNode.parent;
currentNode.appendChild(9);

currentNode = currentNode.children[1];
currentNode.appendChild(10);

currentNode = currentNode.children[0];
currentNode.appendChild(11);

currentNode = currentNode.parent;
currentNode.appendChild(12);

//Tree Traversal Depth First

function traverseDepthFirstA(node) {
  let currentNode = node;
  const stack = [];
  
  console.log(currentNode.data);

  while(true) {
    if(currentNode.children.length !== 0) {
      currentNode = currentNode.children[0];
      stack.push(0);
      console.log(currentNode.data);
    }
    else {
      const isRoot = currentNode.parent === null;
      if(isRoot) {
        return;
      }

      currentNode = currentNode.parent;
      while(stack[stack.length - 1] + 1 >= currentNode.children.length) {
        currentNode = currentNode.parent;
        stack.pop();

        if(currentNode === null) {
          return;
        }
      }

      currentNode = currentNode.children[stack[stack.length - 1] + 1];
      stack[stack.length - 1]++;
      console.log(currentNode.data);
    }
  }
}

function traverseDepthFirstB(node) {
  let currentNode = node;
  const stack = [0];

  console.log(currentNode.data);

  while(stack.length !== 0) {
    const stackTop = stack[stack.length - 1];
    if(stackTop < currentNode.children.length) {
      currentNode = currentNode.children[stackTop];
      console.log(currentNode.data);
      stack.push(0);
    }
    else {
      currentNode = currentNode.parent;
      stack.pop();
      stack[stack.length - 1]++;
    }
  }
}

function traverseDepthFirstC(node) {
  console.log(node.data);
  for(const child of node.children) {
    traverseDepthFirstC(child);
  }
}


// Tree Traversal Breadth First

function traverseBreadthFirst(node) {
  const queue = [node];

  while(queue.length !== 0) {
    const currentNode = queue.shift();
    console.log(currentNode.data);
    for(const child of currentNode.children) {
      queue.push(child);
    }
  }
}

traverseBreadthFirst(root);

