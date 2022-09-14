const { app: baseApp } = require("./app");
const { WordsList } = require("./WordsList");
const { Component } = require("./Component");

describe("1. showWords method", () => {
  const app1 = {
    ...baseApp,
    state: {
      words: ["one", "two"]
    }
  };

  it("should be defined", () => {
    expect(baseApp.showWords).toBeInstanceOf(Function);
  });

  it("should return words joined with -", () => {
    expect(app1.showWords()).toBe("one-two");
  });

  it("should return current words, not the initial", () => {
    app1.state.words = ["red", "orange", "yellow", "green"];

    expect(app1.showWords()).toBe("red-orange-yellow-green");
  });

  it("should return an empty string if there is no words", () => {
    app1.state.words = [];

    expect(app1.showWords()).toBe("");
  });
});

describe("2-5. addWord method", () => {
  const app2 = {
    ...baseApp,
    state: {
      words: ["one", "two"]
    }
  };

  it("should be defined", () => {
    expect(baseApp.addWord).toBeInstanceOf(Function);
  });

  it("2. should add a word to app.state.words", () => {
    app2.addWord("three");

    expect(app2.showWords()).toBe("one-two-three");
  });

  it("2. should add another word to app.state.words", () => {
    app2.state.words = ["1", "2", "3"];
    app2.addWord("4");

    expect(app2.showWords()).toBe("1-2-3-4");
  });

  it("2. should add words multiple times word to app.state.words", () => {
    app2.state.words = ["10"];
    app2.addWord("20");
    app2.addWord("30");
    app2.addWord("40");

    expect(app2.showWords()).toBe("10-20-30-40");
  });

  it("3. should not change initialWords. DON’T mutate the state.words!", () => {
    const initialWords = ["A", "B", "C"];

    app2.state.words = initialWords;

    app2.addWord("D");
    app2.addWord("E");

    expect(initialWords).toEqual(["A", "B", "C"]);
  });

  it("4. should not change initialState. DON’T mutate the state object!", () => {
    const initialState = {
      words: ["X", "Y"]
    };

    app2.state = initialState;

    app2.addWord("Z");
    app2.addWord("A");

    expect(initialState).toEqual({ words: ["X", "Y"] });
  });

  it("5. should preserve a `title` in the state", () => {
    app2.state = {
      title: "Title 1",
      words: ["X", "Y"]
    };

    app2.addWord("Z");
    app2.addWord("A");

    expect(app2.state).toEqual({
      title: "Title 1",
      words: ["X", "Y", "Z", "A"]
    });
  });

  it("5. should preserve all the fields in the state (not only `title`)", () => {
    const randomName = Math.random();
    const randomValue = Math.random();

    app2.state = {
      title: "Title 1",
      [randomName]: randomValue,
      words: ["X", "Y"]
    };

    app2.addWord("Z");
    app2.addWord("A");

    expect(app2.state).toEqual({
      title: "Title 1",
      [randomName]: randomValue,
      words: ["X", "Y", "Z", "A"]
    });
  });
});

describe("6. setTitle method", () => {
  const app3 = {
    ...baseApp,
    state: {
      title: "Title 1",
      words: ["one", "two"]
    }
  };

  it("should be defined", () => {
    expect(baseApp.setTitle).toBeInstanceOf(Function);
  });

  it("should change the title", () => {
    app3.setTitle("New title");

    expect(app3.state.title).toBe("New title");
  });

  it("should not change the initialState", () => {
    const initialState = {
      title: "Initial title",
      words: ["one", "two"]
    };

    app3.state = initialState;

    app3.setTitle("New title");

    expect(initialState.title).toBe("Initial title");
  });

  it("should preserve all the fields in the state (not only `words`)", () => {
    const randomName = Math.random();
    const randomValue = Math.random();

    app3.state = {
      title: "Hello",
      [randomName]: randomValue,
      words: ["X", "Y"]
    };

    app3.setTitle("Goodbye");

    expect(app3.state).toEqual({
      title: "Goodbye",
      [randomName]: randomValue,
      words: ["X", "Y"]
    });
  });
});

describe("7. render method", () => {
  const app4 = {
    ...baseApp,
    state: {
      title: "Title 1",
      words: ["one", "two", "three", "four"]
    }
  };

  it("should be defined", () => {
    expect(baseApp.render).toBeInstanceOf(Function);
  });

  it("should return an initial markup", () => {
    const initialMarkup = `
      <div>
        <h1>Title 1</h1>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>four</li>
        </ul>
      </div>
    `;

    expect(app4.render().replace(/\s+/g, "")).toEqual(
      initialMarkup.replace(/\s+/g, "")
    );
  });

  it("should return an updated markup after changing the state", () => {
    const expectedMarkup = `
      <div>
        <h1>Hello, Mate</h1>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>four</li>
          <li>five</li>
        </ul>
      </div>
    `;

    app4.setTitle("Hello, Mate");
    app4.addWord("five");

    expect(app4.render().replace(/\s+/g, "")).toEqual(
      expectedMarkup.replace(/\s+/g, "")
    );
  });
});

describe("8. forceUpdate method", () => {
  const app5 = {
    ...baseApp,
    state: {
      title: "Hello",
      words: ["one", "two", "three", "four"]
    }
  };

  it("should be defined", () => {
    expect(baseApp.forceUpdate).toBeInstanceOf(Function);
  });

  it("should add the result of the render as document.body.innerHTML.", () => {
    const initialMarkup = `
      <div>
        <h1>Hello</h1>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>four</li>
        </ul>
      </div>
    `;

    app5.forceUpdate();

    expect(document.body.innerHTML.replace(/\s+/g, "")).toEqual(
      initialMarkup.replace(/\s+/g, "")
    );
  });

  it("should render a current state (not initial)", () => {
    const expectedMarkup = `
      <div>
        <h1>Hello, Mate</h1>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>four</li>
          <li>five</li>
        </ul>
      </div>
    `;

    app5.setTitle("Hello, Mate");
    app5.addWord("five");
    app5.forceUpdate();

    expect(document.body.innerHTML.replace(/\s+/g, "")).toEqual(
      expectedMarkup.replace(/\s+/g, "")
    );
  });
});

describe("9-10. setState method", () => {
  const app6 = {
    ...baseApp,
    state: {
      title: "Hello",
      words: ["one", "two", "three", "four"]
    }
  };

  it("should be defined", () => {
    expect(baseApp.setState).toBeInstanceOf(Function);
  });

  it("9. should update the state and render it on the page", () => {
    app6.setState({
      title: "Tom",
      words: ["Jane"]
    });

    expect(app6.state).toEqual({
      title: "Tom",
      words: ["Jane"]
    });

    const expectedMarkup = `
      <div>
        <h1>Tom</h1>
        <ul>
          <li>Jane</li>
        </ul>
      </div>
    `;

    expect(document.body.innerHTML.replace(/\s+/g, "")).toEqual(
      expectedMarkup.replace(/\s+/g, "")
    );
  });

  it("10. should call setState inside addWord", () => {
    jest.spyOn(app6, "setState");
    app6.addWord("five");

    expect(app6.setState).toHaveBeenCalled();

    app6.setState.mockRestore();
  });

  it("10. should call setState inside setTitle", () => {
    jest.spyOn(app6, "setState");
    app6.setTitle("Hello, Mate");

    expect(app6.setState).toHaveBeenCalled();

    app6.setState.mockRestore();
  });
});

describe("JS app with React-like state", () => {
  describe("11. WordsList", () => {
    beforeEach(() => {
      const rootDiv = document.querySelector("body > div#root");

      if (!rootDiv) {
        document.body.innerHTML = `<div id='root'></div>`;
      }
    });

    it("should create objects working the same way as the app before.", () => {
      const wordsList = new WordsList();

      const root = document.querySelector("#root");

      wordsList._root = root;

      wordsList.setState({
        tittle: "",
        words: []
      });

      wordsList.setTitle("Title 2");
      wordsList.addWord("name");

      expect(wordsList.state).toEqual(
        expect.objectContaining({
          title: "Title 2",
          words: ["name"]
        })
      );

      const title$ = root.querySelector("h1");
      const list$ = root.querySelector("ul");
      const items$ = [...list$.querySelectorAll("li")];

      expect(title$.textContent).toBe("Title 2");
      expect(items$.length).toBe(1);
      expect(items$.map(({ textContent }) => textContent)).toEqual(["name"]);
    });
  });

  describe("12. Component", () => {
    it("should have `setState`, `forceUpdate` methods", () => {
      expect(Component.prototype.setState).toBeInstanceOf(Function);
      expect(Component.prototype.forceUpdate).toBeInstanceOf(Function);
    });

    it("WordsList should not have `setState`, `forceUpdate` methods", () => {
      expect(new WordsList().hasOwnProperty("setState")).toBe(false);
      expect(new WordsList().hasOwnProperty("forceUpdate")).toBe(false);
    });

    it("WordsList should inherit `setState` and `forceUpdate` methods", () => {
      expect(WordsList.prototype.__proto__.setState).toBeInstanceOf(Function);
      expect(WordsList.prototype.__proto__.forceUpdate).toBeInstanceOf(
        Function
      );
    });

    it("WordsList should not have own `setState` and `forceUpdate` methods", () => {
      const oldProto = WordsList.prototype.__proto__;
      WordsList.prototype.__proto__ = null;

      expect(WordsList.prototype.forceUpdate).toBeUndefined();
      expect(WordsList.prototype.setState).toBeUndefined();

      WordsList.prototype.__proto__ = oldProto;
    });

    it("shoud be available to extend by Counter component", () => {
      const rootDiv = document.querySelector("body > div#counter");

      if (!rootDiv) {
        document.body.innerHTML = `<div id='counter'></div>`;
      }

      class Counter extends Component {
        constructor() {
          super();

          this.state = {
            count: 0
          };
        }

        increase() {
          this.setState({ count: this.state.count + 1 });
        }

        decrease() {
          this.setState({ count: this.state.count - 1 });
        }

        render() {
          return `Count: ${this.state.count}`;
        }
      }

      const counter = new Counter();

      const root = document.querySelector("#counter");

      counter._root = root;
      counter.forceUpdate();

      expect(root.textContent).toBe("Count: 0");

      counter.increase();

      expect(root.textContent).toBe("Count: 1");

      counter.increase();

      expect(root.textContent).toBe("Count: 2");

      counter.decrease();

      expect(root.textContent).toBe("Count: 1");
    });
  });
});
