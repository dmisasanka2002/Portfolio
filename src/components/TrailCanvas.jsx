import { useEffect, useRef } from "react";

const TrailCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let trails = [];
    const config = {
      trails: 20,
      size: 50,
      friction: 0.5,
      dampening: 0.25,
      tension: 0.98,
    };

    class Oscillator {
      constructor({ phase = 0, offset = 0, frequency = 0.001, amplitude = 1 }) {
        this.phase = phase;
        this.offset = offset;
        this.frequency = frequency;
        this.amplitude = amplitude;
      }
      update() {
        this.phase += this.frequency;
        return this.offset + Math.sin(this.phase) * this.amplitude;
      }
    }

    class Node {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
      }
    }

    class Trail {
      constructor(spring) {
        this.spring = spring + (Math.random() * 0.1 - 0.02);
        this.friction = config.friction + (Math.random() * 0.02 - 0.002);
        this.nodes = Array.from({ length: config.size }, () => new Node(mouse.x, mouse.y));
      }

      update() {
        const spring = this.spring;
        let e = spring;
        const t = this.nodes[0];
        t.vx += (mouse.x - t.x) * e;
        t.vy += (mouse.y - t.y) * e;

        for (let i = 0; i < this.nodes.length; i++) {
          const node = this.nodes[i];
          if (i > 0) {
            const prev = this.nodes[i - 1];
            node.vx += (prev.x - node.x) * e;
            node.vy += (prev.y - node.y) * e;
            node.vx += prev.vx * config.dampening;
            node.vy += prev.vy * config.dampening;
          }
          node.vx *= this.friction;
          node.vy *= this.friction;
          node.x += node.vx;
          node.y += node.vy;
          e *= config.tension;
        }
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.nodes[0].x, this.nodes[0].y);
        for (let i = 1; i < this.nodes.length - 2; i++) {
          const current = this.nodes[i];
          const next = this.nodes[i + 1];
          const cx = 0.5 * (current.x + next.x);
          const cy = 0.5 * (current.y + next.y);
          ctx.quadraticCurveTo(current.x, current.y, cx, cy);
        }
        const penultimate = this.nodes[this.nodes.length - 2];
        const last = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    const hueOscillator = new Oscillator({
      phase: Math.random() * Math.PI * 2,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("resize", resizeCanvas);

    trails = [];
    for (let i = 0; i < config.trails; i++) {
      trails.push(new Trail(0.4 + (i / config.trails) * 0.025));
    }

    const animate = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `hsla(${Math.round(hueOscillator.update())}, 50%, 50%, 0.2)`;
      ctx.lineWidth = 1;

      trails.forEach((trail) => {
        trail.update();
        trail.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default TrailCanvas;
