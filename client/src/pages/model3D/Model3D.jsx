import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useParams } from "react-router-dom";
import {
  useGLTF,
  OrbitControls,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Model({ url, ...props }) {
  const { scene } = useGLTF(url);
  console.log(scene);
  return <primitive object={scene} {...props} />;
}

function Model3D() {
  const params = useParams();

  console.log(params);
  return (
    <Canvas>
      <ambientLight />
      <OrbitControls maxPolarAngle={Math.PI / 2.1} />
      <pointLight position={[10, 10, 10]} />
      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}
      <mesh>
        <Model
          url={`http://localhost:5000/api/detail/download?detailId=${params.detailId}`}
          // scale={[0.1, 0.1, 0.1]}
          position={[0, -2, 0]}
        />
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* <AdaptiveDpr pixelated />
      <AdaptiveEvents /> */}
    </Canvas>
  );
}

export default Model3D;
