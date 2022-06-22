let leads = [];
const inputEl = document.getElementById("input-el");
const inputButton = document.getElementById("button-el");
const ulEl = document.getElementById("ul-el");
const myLeads = JSON.parse(localStorage.getItem("leads"));
const inputBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("save-btn");

if (myLeads) {
  leads = myLeads;
  render(leads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    leads.push(tabs[0].url);
    localStorage.setItem("leads", JSON.stringify(leads));
    render(leads);
  });
});

inputBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  leads = [];
  ulEl.textContent = "";
});

inputButton.addEventListener("click", function () {
  leads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("leads", JSON.stringify(leads));

  render(leads);
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
      <a href='${leads[i]}' target='_blank'>
      ${leads[i]}
      </a>
    </li>
   `;
  }
  ulEl.innerHTML = listItems;
}
