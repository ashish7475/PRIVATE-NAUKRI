import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import styles from "./styles.module.css";

export default function Flip() {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className={styles.container1} onClick={() => set((state) => !state)}>
      <a.div
        className={`${styles.c} ${styles.back}`}
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          height: "300px",
          border: "4px solid white",
          borderRadius: "50%",
          width: "280px",
        }}
      />
      <a.div
        className={`${styles.c} ${styles.front}`}
        style={{
          opacity,
          transform,
          rotateX: "180deg",
          height: "300px",
          border: "4px solid white",
          borderRadius: "50%",
          width: "280px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ textAlign: "center", fontSize: "2rem", fontWeight: 800 }}>
          ASHISH KUMAR
        </p>
        <p style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: 600 }}>
          {" "}
          FULL STACK DEVELOPER
        </p>
      </a.div>
    </div>
  );
}
