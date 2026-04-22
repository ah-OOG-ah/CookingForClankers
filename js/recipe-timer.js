class RecipeTimer extends HTMLElement {
  constructor() {
    super();
    this.timeLeft = 0;
    this.interval = null;
    this.recipeId = null;
    this.audioContext = null;
    this.alarmInterval = null;
  }

  connectedCallback() {
    this.recipeId = this.getAttribute("recipe-id");
    this.loadState();
    this.render();
    this.attachListeners();
  }

  render() {
    this.innerHTML = /* html */ `
     <div class="timer-container d-flex align-items-center gap-1 p-1 border rounded-3 shadow-sm">
      <div class="timer-display fs-4 fw-bold font-monospace text-primary text-cetner px-3 py-1 rounded-3" style="min-width: 92px;">
        ${this.formatTime(this.timeLeft)}
      </div>

      
      <button class="btn btn-outline-primary btn-lg d-flex align-items-center justify-content-center timer-open-btn" style="width: 42px; height:42px; padding: 0;" title="Open timer controls">
          <i class="bi bi-hourglass-split fs-4"></i>
        </button>
      </div>

      <div class="modal fade" id="recipeTimerModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header" style="cursor: move;">
              <h5 class="modal-title">Clanker Timer</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-center">
              <div id="modal-display" class="display-1 fw-bold font-monospace mb-4 text-primary">
                ${this.formatTime(this.timeLeft)}
              </div>

              <div class="d-flex justify-content-center align-items-center gap-2 mx-auto" style="max-width: 280px;">
                <input type="number" id="minutes-input" class="form-control text-center" value="10" min="0" max="180" style="max-width: 80px;">
                <span class="input-group-text px-3">min</span>
                <input type="number" id="seconds-input" class="form-control text-center" value="0" min="0" max="59" stlye="max-width: 80px;">
                <span class="input-group-text px-3">sec</span>
              </div>

              <div class="d-flex flex-wrap gap-2 justify-content-center mt-4">
                <button id="modal-set-btn" class="btn btn-secondary px-4">Set Time</button>
                <button id="modal-start-btn" class="btn btn-success px-4"><i class="bi bi-play-fill"></i> Play</button>
                <button id="modal-pause-btn" class="btn btn-warning px-4 d-none"><i class="bi bi-pause-fill"></i> Pause</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  attachListeners() {
    const openBtn = this.querySelector(".timer-open-btn");
    const modalEl = this.querySelector("#recipeTimerModal");
    const modal = new bootstrap.Modal(modalEl);

    openBtn.addEventListener("click", () => {
      if (!this.audioContext) {
        this.audioContext = new (
          window.AudioContext || window.webkitAudioContext
        )();
      }
      if (this.audioContext.state === "suspended") this.audioContext.resume();
      this.updateModalDisplay();
      modal.show();
    });

    const setBtn = modalEl.querySelector("#modal-set-btn");
    const startBtn = modalEl.querySelector("#modal-start-btn");
    const pauseBtn = modalEl.querySelector("#modal-pause-btn");
    const minInput = modalEl.querySelector("#minutes-input");
    const secInput = modalEl.querySelector("#seconds-input");

    setBtn.addEventListener("click", () => {
      const mins = parseInt(minInput.value) || 0;
      const secs = parseInt(secInput.value) || 0;
      this.timeLeft = mins * 60 + secs;
      this.updateDisplay();
      this.updateModalDisplay();
      this.saveState();
    });

    startBtn.addEventListener("click", () => {
      if (this.timeLeft > 0) this.start();
      startBtn.classList.add("d-none");
      pauseBtn.classList.remove("d-none");
    });

    pauseBtn.addEventListener("click", () => {
      this.pause();
      startBtn.classList.remove("d-none");
      pauseBtn.classList.add("d-none");
    });

    modalEl.addEventListener("hidden.bs.modal", () => {});
  }

  updateDisplay() {
    const display = this.querySelector(".timer-display");
    if (display) display.textContent = this.formatTime(this.timeLeft);
  }

  updateModalDisplay() {
    const modalDisplay = this.querySelector("#modal-display");
    if (modalDisplay) modalDisplay.textContent = this.formatTime(this.timeLeft);
  }

  start() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateDisplay();
        this.updateModalDisplay();
        this.saveState();
      } else {
        this.stop();
        this.timerFinished();
      }
    }, 1000);
  }

  pause() {
    this.stop();
    this.saveState();
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  stopAlarm() {
    if (this.alarmInterval) {
      clearInterval(this.alarmInterval);
      this.alarmInterval = null;
    }
  }

  timerFinished() {
    alert("Your Timer has finished Clanker! Your Recipe is Ready!");
  }

  saveState() {
    const data = { timeLeft: this.timeLeft, timestamp: Date.now() };
    localStorage.setItem(`timer-${this.recipeId}`, JSON.stringify(data));
  }

  loadState() {
    const saved = localStorage.getItem(`timer-${this.recipeId}`);
    if (saved) this.timeLeft = JSON.parse(saved).timeLeft || 0;
  }
}

customElements.define("recipe-timer", RecipeTimer);
