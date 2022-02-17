import lerp from "./index";

const PRINT_TRAILERS = false;

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("demo");
  root.style.position = "relative";
  root.style.overflow = "hidden";

  const container = document.createElement("div");
  container.innerHTML = `${lerp(0, 10, 0.5)}`;
  container.style.position = "absolute";
  container.style.left = "0px";
  container.style.top = "0px";
  container.style.pointerEvents = "none";
  root.appendChild(container);
  container.style.fontSize = "18px";
  container.style.fontFamily = "sans";

  const trailerCanvas = document.createElement("canvas");
  trailerCanvas.style.position = "absolute";
  trailerCanvas.style.left = "0px";
  trailerCanvas.style.right = "0px";
  trailerCanvas.style.top = "0px";
  trailerCanvas.style.bottom = "0px";
  trailerCanvas.style.zIndex = "0";
  const trailerCtx = trailerCanvas.getContext("2d");
  root.appendChild(trailerCanvas);

  const interval = 6000;
  type Trailer = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    duration: number;
    size: number;
    color: string;
    startTime: Date;
    inUse: boolean;
  };

  const trailers: Trailer[] = [];

  const makeTrailer = (
    startX: number,
    startY: number,
    color: string
  ): Trailer => {
    const startTime = new Date();
    const duration = Math.random() * (interval - 1000);
    const size = Math.floor(1 + 50 * Math.random());
    const endX = Math.random() * root.clientWidth;
    const endY = Math.random() * root.clientHeight;
    for (let i = 0; i < trailers.length; ++i) {
      const trailer = trailers[i];
      if (trailer.inUse) {
        continue;
      }
      trailer.inUse = true;
      trailer.startTime = startTime;
      trailer.duration = duration;
      trailer.color = color;
      trailer.size = size;
      trailer.endX = endX;
      trailer.endY = endY;
      trailer.startX = startX;
      trailer.startY = startY;
      return;
    }
    trailers.push({
      inUse: true,
      startX,
      startY,
      color,
      startTime,
      duration,
      size,
      endX,
      endY,
    });
  };

  let playing: Date = null;
  let lastPos: [number, number, string] = [0, 0, "rgb(255, 255, 255)"];

  const trailerDecay = 1.2;

  const moveContainer = () => {
    const cleanTrailers = () => {
      trailers.forEach((trailer) => {
        if (
          Date.now() - trailer.startTime.getTime() >
          trailerDecay * trailer.duration
        ) {
          trailer.inUse = false;
        }
      });
    };
    playing = new Date();
    if (trailerCanvas.width !== root.clientWidth) {
      trailerCanvas.width = root.clientWidth;
    }
    if (trailerCanvas.height !== root.clientHeight) {
      trailerCanvas.height = root.clientHeight;
    }
    const rand = () => Math.floor(Math.random() * 255);
    document.body.style.backgroundColor = `rgb(${rand()}, ${rand()}, ${rand()})`;
    container.style.color = `rgb(${rand()}, ${rand()}, ${rand()})`;

    const x = Math.random() * root.clientWidth;
    const y = Math.random() * root.clientHeight;
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    container.style.zIndex = "2";

    const minTrailers = 100;
    const numTrailers = Math.floor(minTrailers * Math.random());
    const bg = document.body.style.backgroundColor;
    if (lastPos) {
      for (let i = 0; i < minTrailers + numTrailers; ++i) {
        makeTrailer(...lastPos);
      }
    }
    lastPos = [x, y, bg];
    const animate = () => {
      if (!playing) {
        return;
      }
      trailerCtx.clearRect(0, 0, trailerCanvas.width, trailerCanvas.height);
      cleanTrailers();
      let needsUpdate = false;
      trailers.forEach((trailer) => {
        if (!trailer.inUse) {
          return;
        }
        const { duration, size, startX, startY, endX, endY, color, startTime } =
          trailer;
        const elapsed = Math.min(
          trailerDecay * duration,
          Date.now() - startTime.getTime()
        );
        const pct = Math.min(1, elapsed / (trailerDecay * duration));
        trailerCtx.fillStyle = color;
        trailerCtx.beginPath();
        trailerCtx.arc(
          lerp(startX, endX, pct),
          lerp(startY, endY, pct),
          lerp(lerp(1, size, Math.min(1, pct * 5)), 1, pct),
          0,
          2 * Math.PI
        );
        trailerCtx.fill();
        needsUpdate = pct < 1 || needsUpdate;
      });
      const pct = Math.min(interval, Date.now() - playing.getTime()) / interval;
      if (needsUpdate || pct < 1) {
        requestAnimationFrame(animate);
      }

      if (PRINT_TRAILERS) {
        trailerCtx.strokeStyle = "white";
        trailerCtx.fillStyle = "black";
        trailerCtx.textBaseline = "bottom";
        trailerCtx.textAlign = "right";
        trailerCtx.fillText(
          `trailers: ${trailers.length}`,
          trailerCanvas.width,
          trailerCanvas.height
        );
      }
    };
    requestAnimationFrame(animate);
  };

  const dot = document.createElement("div");
  dot.style.position = "absolute";
  dot.style.right = "8px";
  dot.style.top = "8px";
  dot.style.width = "16px";
  dot.style.height = "16px";
  dot.style.borderRadius = "8px";
  dot.style.transition = "background-color 400ms";
  dot.style.backgroundColor = "#222";
  root.appendChild(dot);

  container.style.transition = `color ${interval - 1000}ms, left ${
    interval - 1000
  }ms, top ${interval - 1000}ms`;
  document.body.style.transition = `background-color ${interval - 1000}ms`;
  let timer: any = null;
  let dotTimer: any = null;
  let dotIndex = 0;
  const dotState = ["#f00", "#c00"];
  const refreshDot = () => {
    dotIndex = (dotIndex + 1) % dotState.length;
    dot.style.backgroundColor = dotState[dotIndex];
  };
  const dotInterval = 500;
  root.addEventListener("click", () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
      clearInterval(dotTimer);
      dotTimer = null;
      dot.style.transition = "background-color 3s";
      dot.style.backgroundColor = "#222";
    } else {
      playing = new Date();
      trailerCanvas.width = root.clientWidth;
      trailerCanvas.height = root.clientHeight;
      moveContainer();
      dot.style.transition = "background-color 400ms";
      refreshDot();
      timer = setInterval(moveContainer, interval);
      dotTimer = setInterval(refreshDot, dotInterval);
    }
  });
});
