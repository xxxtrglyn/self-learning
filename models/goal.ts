interface todo {
  id: number;
  label: string;
  isCompleted: boolean;
}

class Goal {
  id: number;
  title: string;
  completed: number;
  total: number;
  list: todo[];

  constructor(title: string) {
    this.title = title;
    this.completed = 0;
    this.total = 0;
    this.id = 1;
    this.list = new Array<todo>();
  }
}

export default Goal;
