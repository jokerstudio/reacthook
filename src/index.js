import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import { Grid, Row, Col } from "react-flexbox-grid";

const LeftContext = React.createContext();
const RightContext = React.createContext();

function App() {
  return (
    <Grid>
      <Row>
        <Col>
          <LeftContextProvider>
            <div>
              <LeftComponent name="first" />
              <LeftComponent name="second" />
            </div>
          </LeftContextProvider>
        </Col>
        <Col>
          <RightContextProvider>
            <div>
              <RightComponent name="first" />
              <RightComponent name="second" />
            </div>
          </RightContextProvider>
        </Col>
      </Row>
    </Grid>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function LeftContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <LeftContext.Provider value={{ state, dispatch }}>
      {children}
    </LeftContext.Provider>
  );
}

function RightContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <RightContext.Provider value={{ state, dispatch }}>
      {children}
    </RightContext.Provider>
  );
}

function LeftComponent({ name }) {
  const context = useContext(LeftContext);
  return (
    <div>
      <span>
        {name} The answer is {context.state.count}
      </span>
      <div>
        <button onClick={() => context.dispatch({ type: "increment" })}>
          Click
        </button>
      </div>
    </div>
  );
}

function RightComponent({ name }) {
  const context = useContext(RightContext);
  return (
    <div>
      <span>
        {name} The answer is {context.state.count}
      </span>
      <div>
        <button onClick={() => context.dispatch({ type: "increment" })}>
          Click
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("container"));
