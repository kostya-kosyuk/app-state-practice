# JS app with React-like state

> Don't use React implementing the tasks!!! It is just Javascript.

You have an object `app`. Please implement all the tasks, so the next one does not break the requirements for all previous.

Initially you have an object

```javascript
const initialWords = ["one", "two"];

const initialState = {
  title: "Title 1",
  words: initialWords
};

export const app = {
  state: initialState

  // add methods here
};
```

1. Create `showWords` method returns all the `state.words` joined with `-`
   ```javascript
   app.showWords(); //`one-two`
   ```
2. Create `addWord` method to add new words to the `state.words`
   ```javascript
   app.showWords(); // one-two
   app.addWord("three");
   app.addWord("four");
   app.showWords(); // one-two-three-four
   ```
3. Change `addWord` method, so it does not change the `initialWords`. DON'T mutate the `state.words`

   ```javascript
   const initialWords = ["one", "two"];

   const app = {
     state: {
       words: initialWords
     },
     // you can not modify the code above this line

     showWords() {},
     addWord(word) {}
   };

   app.showWords(); // one-two
   app.addWord("three");
   app.addWord("four");
   app.showWords(); // one-two-three-four

   console.log(app.state.words); // ['one', 'two', 'three', 'four']
   console.log(initialWords); // ['one', 'two']
   ```

4. Change `addWord` method, so it does not change the `initialState`. DON'T mutate the `state` object when adding new words.

   ```javascript
   const initialState = {
     words: ["one", "two"]
   };

   const app = {
     state: initialState,
     // you can not modify the code above this line

     showWords() {},
     addWord(word) {}
   };

   app.showWords(); // one-two
   app.addWord("three");

   initialState.title = "Title 1";

   app.addWord("four");
   app.showWords(); // one-two-three-four

   console.log(app.state); // { words: ['one', 'two', 'three', 'four'] }
   console.log(initialState); // { words: ['one', 'two'], title: 'Title 1' }
   ```

5. Change `addWord` method so it preserves all the fields in the state
   (it should work for any other field not only `title`)

   ```javascript
   const initialState = {
     title: "Title 1",
     words: ["one", "two"]

     // there could be more fields here, all of them should exist in the `app.state` after all the changes
   };

   const app = {
     state: initialState,
     // you can not modify the code above this line

     showWords() {},
     addWord(word) {}
   };

   app.showWords(); // one-two
   app.addWord("three");

   initialState.title = "Title 2";

   app.addWord("four");
   app.showWords(); // one-two-three-four

   console.log(app.state.title); // 'Title 1'
   console.log(initialState.title); // 'Title 2'
   ```

6. Add `setTitle` method changing the `title` in the state to a given value

   ```javascript
   const initialState = {
     title: "Title 1",
     words: ["one", "two"]
   };

   const app = {
     state: initialState,
     // you can not modify the code above this line

     showWords() {},
     addWord(word) {},
     setTitle(title) {}
   };

   console.log(app.state.title); // 'Title 1'
   app.setTitle("222");
   console.log(app.state.title); // '222'
   app.showWords(); // one-two

   // As usually the `initialState` should not be changed
   console.log(initialState); // { title: 'Title 1', words: ['one', 'two'] }
   ```

7. Create a `render` method. It should return a `string` containing a `div` with the markup representind a current `app.state`.
   ```html
   <div>
     <h1>Title 1</h1>
     <ul>
       <li>one</li>
       <li>two</li>
       ...
     </ul>
   </div>
   ```
   - Use the actual `app.state.title` in the `h1` (not just `Title 1`).
   - The list should contain all the `app.state.words` (not just `one`, `two`).
   - There should not be an extra comma between the list items.
8. Create a `forceUpdate` method adding the result of the `render` as `document.body.innerHTML`.
   - If you are getting an error check if your script has a `defer` attribute in the `index.html` (to wait for the page to load)
   - Each `app.forceUpdate()` call should rerender the `app` on the page with the actual data.
9. Create `setState` method accepting an object as a first argument and saving all its fields to the state.

   - It should also call the `forceUpdate` to rerender the app.

     ```javascript
     const app = {
       state: {
         title: 'Title 1',
         words: ['one', 'two'],
       },

       addWord() {...},
       setTitle() {...},
       render() {...},
       forceUpdate() {...},
       setState() {...},
     };

     app.forceUpdate(); // the initial state is rendered

     setTimeout(() => {
       app.setState({ title: '333' }); // the title should be updated
     }, 5000);

     setTimeout(() => {
       app.setState({ words: [4, 5, 6, 7, 8] }); // The words should be updated
     }, 10000);
     ```

10. Update `addWord` and `setTitle` so they use the `setState` instead of changing the `state` directly

```javascript
app.setTitle("newTitle"); // the title should be updated on the page
app.addWord("five"); // the list now contains `one`, `two` five`
app.addWord("six"); // the list now contains `one`, `two`, `five`, `six`
```

11. Create a class `WordsList`. It should create objects working the same way as the `app` before.

- A `div` with `id="root"` will be added to `app._root` (see the code below)
- Use an `app._root` property as an element for rendering the markup(instead of `document.body`)

  ```javascript
  const app = new WordsList(); // app should work the same as before

  app._root = document.querySelector("#root"); // an element to be used for rendering
  app.forceUpdate(); // renders the initial markup inside the given element

  app.setTitle("newTitle"); // the title should be updated on the page
  app.addWord("five"); // the list now contains `one`, `two` five`
  app.addWord("six"); // the list now contains `one`, `two`, `five`, `six`
  ```

12. Create a base class `Component` and move there everything that can be reused in other components.(`setState`, `forceUpdate`)

- `Component` should not have any specific logic of the `app` but only the logic that can be reused for many components (like `React.Component`)
- The `WordsList` should extend `Component` and work as before. (It should not contain the moved methods anymore)
- `Counter` component extending the `Component` should work the next way(Do not need to create `Counter` component. It will be created in test.)

  ```javascript
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

  counter._root = document.querySelector("#counter"); // the element should exist
  counter.forceUpdate(); // shows `Count: 0` on the page

  counter.increase();
  counter.increase(); // shows `Count: 2`

  counter.decrease(); // shows `Count: 1`
  ```

## There are no tests for the next tasks. They are optional.

1. (\*) Update the component so if you add a `componentDidMount` method to the `WordsList` or the `Counter`

   - It should be called once immediately after the component appears on the page.
   - This logic should be implemented inside the `Component` not the `WordsList` or the `Counter`.
   - (\*) Check if you code works if I call `setState` in `componentDidMount`.

2. (\*) Change `setState` to accept a callback as an argument.
   - The callback receives the `state` as an argument.
   - The returned object is merged with the current state.
   - It should possible to use `setState` both ways (with an object or a callback)
   - The `Counter` `increase` method should have now the next code and work correctly:
     ```javascript
     increase() {
       this.setState(state => {
         return { count: state.count + 1 };
       });
     }
     ```
3. (\*) Implement `shouldComponentUpdate` method receiving a full new state as an argument to give an ability to skip rerendering.
   - `this.state` should contain a link to the prev state when `shouldComponentUpdate` is called.
   - The `state` should be updated regardless of the result.
   - The HTML should be updated only if `shouldComponentUpdate` returns a value equivalent to `true`.
