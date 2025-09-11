import { useRef } from "react";

// HOC
function withLogger(WrappedComponent) {
  return function EnhancedComponent(props) {
    console.log("Props passed:", props);
    return <WrappedComponent {...props} />;
  };
}

// Normal component
function Hello({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Enhanced component
const HelloWithLogger = withLogger(Hello);

// Usage
<HelloWithLogger name="Pratik" />;





/**
 * Shallow comparison for props
 */
function shallowEqual(objA, objB) {
  if (objA === objB) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
    if (objA[key] !== objB[key]) return false; // shallow check
  }
  return true;
}

/**
 * Polyfill for React.memo
 * Works only with FUNCTIONAL components
 */
function memoPolyfill(Component) {

  function MemoizedComponent(props) {
    const lastProps = useRef(null);
    const lastRendered = useRef(null);

    if (lastProps.current && shallowEqual(lastProps.current, props)) {
      // props considered equal → return last rendered output
      return lastRendered.current;
    }

    // props changed → render again
    lastProps.current = props;
    lastRendered.current = <Component {...props} />;
    return lastRendered.current;
  }


  return MemoizedComponent;
}


function Greeting({ name }) {
  console.log("Rendering Greeting");
  return <h1>Hello {name}</h1>;
}

// memoized version
const MemoGreeting = memoPolyfill(Greeting);

export default function App() {
  return (
    <div>
      <MemoGreeting name="Pratik" />
      <MemoGreeting name="Pratik" /> {/* Won’t re-render */}
    </div>
  );
}

