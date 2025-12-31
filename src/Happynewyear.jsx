import { useEffect, useRef, useState } from "react";

const getTextFireworks = (text, startX, startY) => {
  const points = [];
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 200;
  
  ctx.fillStyle = "white";
  ctx.font = "bold 120px Arial";
  ctx.textAlign = "center";
  ctx.fillText(text, 200, 150);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 128) {
      const pixelIndex = i / 4;
      const x = pixelIndex % canvas.width;
      const y = Math.floor(pixelIndex / canvas.width);
      if (Math.random() > 0.3) {
        points.push({
          x: startX + (x - 200) * 1.5,
          y: startY + (y - 100) * 1.5
        });
      }
    }
  }
  return points;
};

export default function HappyNewYear() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isNewYear: false
  });
  const fireworksRef = useRef([]);
  const frameIdRef = useRef(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const newYear = new Date();  // Set to NOW to trigger celebration immediately
      const difference = newYear - now;
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isNewYear: true });
        return;
      }
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isNewYear: false
      });
    };
    
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor(x, y, color, shape) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.shape = shape;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 8 + 2;
        this.life = 100;
        this.gravity = 0.05;
        this.opacity = 1;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.life--;
        this.opacity -= 0.01;
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        if (this.shape === "heart") {
          ctx.beginPath();
          ctx.arc(this.x - 2, this.y, 3, 0, Math.PI * 2);
          ctx.arc(this.x + 2, this.y, 3, 0, Math.PI * 2);
          ctx.lineTo(this.x, this.y + 6);
          ctx.fill();
        } else if (this.shape === "star") {
          drawStar(ctx, this.x, this.y, 3, 2, 0);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      }
    }

    const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius) => {
      let rot = Math.PI / 2 * 3;
      let step = Math.PI / spikes;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    class Firework {
      constructor(x, y, isText = false) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || canvas.height;
        this.targetY = Math.random() * canvas.height * 0.4;
        this.color = `hsl(${Math.random() * 360},100%,60%)`;
        this.shapes = ["heart", "star", "circle"];
        this.shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
        this.exploded = false;
        this.particles = [];
        this.isText = isText;
      }

      explode(textPoints = null) {
        if (textPoints && textPoints.length > 0) {
          textPoints.forEach((point, idx) => {
            const delay = idx * 2;
            setTimeout(() => {
              for (let i = 0; i < 15; i++) {
                this.particles.push(
                  new Particle(point.x, point.y, this.color, this.shape)
                );
              }
            }, delay);
          });
        } else {
          for (let i = 0; i < 90; i++) {
            this.particles.push(
              new Particle(this.x, this.y, this.color, this.shape)
            );
          }
        }
        vibrate();
      }

      update() {
        if (!this.exploded) {
          this.y -= 10;
          if (this.y <= this.targetY) {
            this.exploded = true;
            this.explode();
          }
        } else {
          this.particles.forEach(p => p.update());
        }
      }

      draw() {
        if (!this.exploded) {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, 3, 3);
        } else {
          this.particles.forEach(p => p.life > 0 && p.draw());
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.15) {
        fireworksRef.current.push(new Firework());
      }

      fireworksRef.current.forEach((fw, i) => {
        fw.update();
        fw.draw();
        if (fw.exploded && fw.particles.every(p => p.life <= 0)) {
          fireworksRef.current.splice(i, 1);
        }
      });

      frameIdRef.current = requestAnimationFrame(animate);
    };

    const handleClick = (e) => {
      const fw = new Firework(e.clientX, e.clientY);
      fw.exploded = true;
      fw.explode();
      fireworksRef.current.push(fw);
    };

    canvas.addEventListener("click", handleClick);
    frameIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  }, [timeLeft]);

  // Launch "2026" text fireworks at midnight
  useEffect(() => {
    if (timeLeft.isNewYear && canvasRef.current) {
      setTimeout(() => {
        const textPoints = getTextFireworks("2026", canvasRef.current.width / 2, canvasRef.current.height / 2);
        
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            const fw = new (class Firework {
              constructor(x, y) {
                this.x = x;
                this.y = y;
                this.color = `hsl(${i * 120},100%,60%)`;
                this.exploded = true;
                this.particles = [];
              }
              
              explode(textPoints) {
                textPoints.forEach((point, idx) => {
                  const delay = idx * 2;
                  setTimeout(() => {
                    for (let j = 0; j < 15; j++) {
                      this.particles.push({
                        x: point.x,
                        y: point.y,
                        color: this.color,
                        shape: ["heart", "star", "circle"][Math.floor(Math.random() * 3)],
                        angle: Math.random() * Math.PI * 2,
                        speed: Math.random() * 8 + 2,
                        life: 100,
                        gravity: 0.05,
                        opacity: 1
                      });
                    }
                  }, delay);
                });
              }
              
              update() {
                this.particles.forEach(p => {
                  p.x += Math.cos(p.angle) * p.speed;
                  p.y += Math.sin(p.angle) * p.speed + p.gravity;
                  p.life--;
                  p.opacity -= 0.01;
                });
              }
              
              draw() {}
            })(canvasRef.current.width / 2, canvasRef.current.height / 2);
            
            fw.explode(textPoints);
            fireworksRef.current.push(fw);
          }, i * 1000);
        }
      }, 500);
    }
  }, [timeLeft.isNewYear]);

  const start = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
    }
  };

  const formatTime = (num) => String(num).padStart(2, '0');

  return (
    <div className="container">
      <canvas ref={canvasRef} />
      <audio ref={audioRef} src="/music.mp3" loop />

      <div className="message">
        <h1 className="new-year-text">🎉 Happy New Year 2026 🎉</h1>
        <p className="subtext">Wishing you joy, success & happiness ✨</p>
        <p className="name">— Dhruv Jae</p>
        <p className="click-hint">💡 Click anywhere for fireworks!</p>
      </div>
    </div>
  );
}
