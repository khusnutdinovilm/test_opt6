function resize(el) {
  // console.log("resize");
  const nodeName = el.nodeName;

  if (["TABLE", "THEAD"].indexOf(nodeName) < 0) return;

  // const table = nodeName === "TABLE" ? el : el.parentElement;
  const table = nodeName === "TABLE" ? el : el.parentElement;
  const thead = table.querySelector("thead");
  const ths = thead.querySelectorAll("th");
  const barHeight =
    nodeName === "TABLE" ? table.offsetHeight : thead.offsetHeight;

  const resizeContainer = document.createElement("div");
  table.style.position = "relative";
  resizeContainer.style.position = "absolute";
  resizeContainer.style.width = table.offsetWidth + "px";
  resizeContainer.style.height = table.offsetHeight + "px";
  resizeContainer.className = "vue-columns-resizable";
  table.parentElement.insertBefore(resizeContainer, table);

  let moving = false;
  let movingIndex = 0;
  let initCursorPos = null;

  ths.forEach((th, index) => {
    th.style.width = th.offsetWidth + "px";

    if (index + 1 >= ths.length) return;

    const nextTh = ths[index + 1];
    const bar = document.createElement("div");

    bar.style.position = "absolute";

    bar.style.left = nextTh.offsetLeft - 1 + "px";
    bar.style.top = 0;
    bar.style.height = barHeight + "px";
    bar.style.cursor = "col-resize";
    // bar.style.zIndex = 11;
    bar.className = "col-resize";

    const grip = document.createElement("div");
    grip.className = "col-resize__grip";
    bar.appendChild(grip);

    bar.addEventListener("mousedown", (e) => {
      moving = true;
      movingIndex = index;
      initCursorPos = e.x;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      // debugger
    });

    resizeContainer.appendChild(bar);
  });

  const bars = resizeContainer.querySelectorAll(".col-resize");

  document.addEventListener("mouseup", (e) => {
    if (!moving) return;

    moving = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";

    bars.forEach((bar, index) => {
      const th = ths[index];
      const nextTh = ths[index + 1];
      th.style.width = th.offsetWidth + "px";
      bar.style.left = nextTh.offsetLeft - 1 + "px";
      if (bar.classList.contains("col-resize_moved"))
        bar.classList.remove("col-resize_moved");
    });
  });

  const cutPx = (str) => +str.replace("px", "");

  const handleResize = (e) => {
    if (moving) {
      const th = ths[movingIndex];
      // const nextTh =
      //   e.x > initCursorPos
      //     ? ths[movingIndex].nextSibling
      //     : ths[movingIndex].previousSibling;
      const nextTh = ths[movingIndex].nextSibling;
      const bar = bars[movingIndex];

      // console.log(th);
      // console.log(nextTh);
      // console.log();

      th.style.width = cutPx(th.style.width) + e.movementX + "px";
      nextTh.style.width = cutPx(nextTh.style.width) - e.movementX + "px";
      bar.classList.toggle("col-resize_moved");
      bar.style.left = nextTh.offsetLeft - 1 + e.movementX + "px";
      // debugger
    }
  };

  resizeContainer.addEventListener("mousemove", handleResize);
  table.addEventListener("mousemove", handleResize);
}

export default {
  // TODO
  mounted(el) {
    // console.log("mounted");
    resize(el);
  },
  beforeUpdate(el) {
    // console.log("beforeUpdate", el);
    resize(el);
  },
};
