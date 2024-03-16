import styled from 'styled-components';
import './App.css'
import { CartesianCoordinates } from './cartesian_coordinates/cartesian_coordinates'
import { Vec2 } from './Vec2';
import { Point } from './cartesian_coordinates/point';


const RootDiv = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    align-items : center;
    flex-direction : column;
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: normal;
    font-style: normal;
    font-variation-settings:
      "slnt" 0;
      overflow-x : hidden;
`;

const InnerDiv = styled.div`
    max-width : 50rem;

`


const SvgDiv = styled.div`
    margin-bottom : 2rem;
    width : 800px;
    height : 400px;
`;

function dot(v1: Vec2, v2: Vec2): number {
  return v1[0] * v2[0] + v1[1] * v2[1]
}


function multiplyByConstant(v: Vec2, c : number): Vec2 {
  return [v[0] * c, v[1] * c];
}

export function add(v1: Vec2, v2: Vec2): Vec2 {
  return [v1[0] + v2[0], v1[1] + v2[1]];
}

export function subtract(v1: Vec2, v2: Vec2): Vec2 {
  return [v1[0] - v2[0], v1[1] - v2[1]];
}



export function normalize(v: Vec2): Vec2 {
  const magnitude = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  return [v[0] / magnitude, v[1] / magnitude];
}





function App() {
  return (<RootDiv>
    <InnerDiv>
      <SvgDiv>
        <CartesianCoordinates>
          <Point initialPos={[0,0]}/>
          <Point initialPos={[1,0]}/>
        </CartesianCoordinates>
      </SvgDiv>
    </InnerDiv>
  </RootDiv>)
}

export default App
