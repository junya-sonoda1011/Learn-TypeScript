class Person {
  // // 明示的に書かなくてもデフォルトでpublic になっている
  // public name: string;

  // // private をつけるとclass の外からアクセスすることができなくなる
  // private age: number;

  // constructor(initName: string, initAge: number) {
  //   this.name = initName;
  //   this.age = initAge;

  // readonly をつけると値の書き換えができなくなる
  readonly id: number = 31;

  // // class の初期化部分は省略できる
  // constructor(public readonly name: string, private age: number) {
  //   // constructor メソッドの中だと書き換えはできる
  //   this.id = 32;
  // }

  // private 修飾子の場合、継承先のclass でも値を参照できなくなるが、protected なら参照可能
  constructor(public readonly name: string, protected age: number) {
    // constructor メソッドの中だと書き換えはできる
    this.id = 32;
  }

  // this: を設定することで、greeting を呼び出したobject にname がるか確認できる
  // greeting(this: { name: string }) {
  //   console.log(`Hello! My name is ${this.name} !!`);
  // }

  incrementAge() {
    this.age += 1;
  }

  greeting(this: Person) {
    console.log(`Hello! My name is ${this.name} . I am ${this.age} years old`);
  }
}

const junya = new Person("Junya", 27);

console.log("junya", junya);
junya.incrementAge();
junya.greeting();

// const niseJunya = {
//   // this は呼び出される場所で参照先が変わる。ここでname を定義しないとniseJunya Object の中を参照しているのでundefined になる
//   name: "niseJunya",
//   anotherGreeting: junya.greeting,
// };
// niseJunya.anotherGreeting();

// const niseJunya = {
//   // this の方をPersonにしたので中身の構造を親クラスに合わせる
//   name: "niseJunya",
//   greeting: junya.greeting,
// };
// niseJunya.greeting();

class Teacher extends Person {
  get subject() {
    if (!this._subject) {
      throw new Error("There is no subject.");
    }
    return this._subject;
  }

  set subject(value) {
    if (!this._subject) {
      throw new Error("There is no subject.");
    }
    this._subject = value;
  }
  constructor(name: string, age: number, private _subject: string) {
    super(name, age);
  }

  greeting(this: Teacher) {
    console.log(
      `Hello! My name is ${this.name} . I am ${this.age} years old. I teach ${this.subject}`
    );
  }
}

const teacher = new Teacher("Jun", 38, "Math");
console.log("teacher.subject", teacher.subject);
teacher.subject = "Music";
console.log("teacher.subject", teacher.subject);
teacher.greeting();
