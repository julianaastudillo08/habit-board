const KEY = "habit-board-v1";
const tbody = document.getElementById("tbody");
const form = document.getElementById("addForm");
const input = document.getElementById("habitInput");

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}
function save(habits) {
  localStorage.setItem(KEY, JSON.stringify(habits));
}

function render() {
  const habits = load();
  tbody.innerHTML = "";
  habits.forEach((h, hi) => {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    name.textContent = h.name;
    tr.appendChild(name);
    for (let d = 0; d < 7; d++) {
      const td = document.createElement("td");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cell" + (h.days[d] ? " on" : "");
      btn.setAttribute("aria-label", `Día ${d + 1}`);
      btn.addEventListener("click", () => {
        const data = load();
        data[hi].days[d] = !data[hi].days[d];
        save(data);
        render();
      });
      td.appendChild(btn);
      tr.appendChild(td);
    }
    const actions = document.createElement("td");
    const del = document.createElement("button");
    del.type = "button";
    del.className = "del";
    del.textContent = "Quitar";
    del.addEventListener("click", () => {
      const data = load().filter((_, i) => i !== hi);
      save(data);
      render();
    });
    actions.appendChild(del);
    tr.appendChild(actions);
    tbody.appendChild(tr);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = input.value.trim();
  if (!name) return;
  const habits = load();
  habits.push({ name, days: [false, false, false, false, false, false, false] });
  save(habits);
  input.value = "";
  render();
});

if (!load().length) {
  save([
    { name: "Código / GitHub", days: [true, true, false, true, false, false, false] },
    { name: "Inglés 20 min", days: [false, true, true, false, true, false, false] },
  ]);
}
render();
