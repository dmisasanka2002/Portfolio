import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  "Python", "JavaScript", "TypeScript", "Dart", "HTML", "CSS",
  "Django", "Flutter", "ReactJS", "NextJS", "NodeJS",
  "ExpressJS", "ThreeJS", "Redux"
];

const getRandomPosition = (radius) => {
  const angle = Math.random() * Math.PI * 2;
  const z = (Math.random() * 2 - 1) * radius;
  const sqrtRadius = Math.sqrt(radius ** 2 - z ** 2);
  const x = Math.cos(angle) * sqrtRadius;
  const y = Math.sin(angle) * sqrtRadius;
  return [x, y, z];
};

const SkillBall = ({ position, skill, color }) => {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.003;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color={color} />
      <textSprite
        text={skill}
        fontSize={0.2}
        position={[0, 0, 0.5]}
        color="white"
      />
    </mesh>
  );
};

const SkillsBallVisualization = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <OrbitControls enablePan={false} enableZoom={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />
      <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        {skills.map((skill, index) => (
          <SkillBall key={index} position={getRandomPosition(3)} skill={skill} color={index % 2 === 0 ? "#FAFF81" : "#E06D06"} />
        ))}
      </group>
    </Canvas>
  );
};

export default SkillsBallVisualization;