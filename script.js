// ─────────────────────────────────────────────
//  Rajshri Loto Terminal — script.js
// ─────────────────────────────────────────────

import { getTimer, getBalance, logout, result, insertData, getAdvanceDrawTime, getLastDrawAmount, getBetHistory, getCurrentDrawBetHistory, getPrintDetails } from "./api.js";

//Api Call 


function el(id) {
  return document.getElementById(id);
}

// ─────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────
var FP_autobit = 0;
var odd_bit = 0;
var even_bit = 0;
var all_bit = 0;
var height_low = 0;
var point = 2;
var currentRangeStart = 0;
var currentTopIndex = 0;
var currentSidebarIndex = 0;
var allBets = {}; // Store all bets globally: { absNum: qty }
var gameData = { lpActive: false };

var family_list = {};
function initFamilyList() {
  family_list['00'] = ['00', '55', '05', '50'];
  family_list['01'] = ['01', '06', '56', '51', '10', '60', '65', '15'];
  family_list['02'] = ['02', '07', '57', '52', '20', '70', '75', '25'];
  family_list['03'] = ['03', '08', '58', '53', '30', '80', '85', '35'];
  family_list['04'] = ['04', '09', '59', '54', '40', '90', '95', '45'];
  family_list['05'] = ['00', '05', '50', '55'];
  family_list['06'] = ['01', '06', '56', '51', '10', '60', '65', '15'];
  family_list['07'] = ['02', '07', '57', '52', '20', '70', '75', '25'];
  family_list['08'] = ['03', '08', '58', '53', '30', '80', '85', '35'];
  family_list['09'] = ['04', '09', '59', '54', '40', '90', '95', '45'];
  family_list['10'] = ['10', '15', '60', '65', '01', '51', '06', '56'];
  family_list['11'] = ['11', '16', '61', '66'];
  family_list['12'] = ['12', '17', '62', '67', '21', '71', '26', '76'];
  family_list['13'] = ['13', '18', '63', '68', '31', '81', '36', '86'];
  family_list['14'] = ['14', '19', '64', '69', '41', '91', '46', '96'];
  family_list['15'] = ['15', '65', '10', '60', '51', '56', '01', '06'];
  family_list['16'] = ['11', '16', '61', '66'];
  family_list['17'] = ['12', '17', '62', '67', '21', '71', '26', '76'];
  family_list['18'] = ['13', '18', '63', '68', '31', '81', '36', '86'];
  family_list['19'] = ['14', '19', '64', '69', '41', '91', '46', '96'];
  family_list['20'] = ['20', '25', '70', '75', '02', '52', '07', '57'];
  family_list['21'] = ['21', '26', '71', '76', '12', '62', '17', '67'];
  family_list['22'] = ['22', '27', '72', '77'];
  family_list['23'] = ['23', '28', '73', '78', '32', '82', '37', '87'];
  family_list['24'] = ['24', '29', '74', '79', '42', '92', '47', '97'];
  family_list['25'] = ['20', '25', '70', '75', '02', '52', '07', '57'];
  family_list['26'] = ['21', '26', '71', '76', '12', '62', '17', '67'];
  family_list['27'] = ['22', '27', '72', '77'];
  family_list['28'] = ['23', '28', '73', '78', '32', '82', '37', '87'];
  family_list['29'] = ['24', '29', '74', '79', '42', '92', '47', '97'];
  family_list['30'] = ['30', '35', '80', '85', '03', '53', '08', '58'];
  family_list['31'] = ['31', '36', '81', '86', '13', '63', '18', '68'];
  family_list['32'] = ['32', '37', '82', '87', '23', '73', '28', '78'];
  family_list['33'] = ['33', '38', '83', '88'];
  family_list['34'] = ['34', '39', '84', '89', '43', '93', '48', '98'];
  family_list['35'] = ['30', '35', '80', '85', '03', '53', '08', '58'];
  family_list['36'] = ['31', '36', '81', '86', '13', '63', '18', '68'];
  family_list['37'] = ['32', '37', '82', '87', '23', '73', '28', '78'];
  family_list['38'] = ['33', '38', '83', '88'];
  family_list['39'] = ['34', '39', '84', '89', '43', '93', '48', '98'];
  family_list['40'] = ['40', '45', '90', '95', '04', '54', '09', '59'];
  family_list['41'] = ['41', '46', '91', '96', '14', '64', '19', '69'];
  family_list['42'] = ['42', '47', '92', '97', '24', '74', '29', '79'];
  family_list['43'] = ['43', '48', '93', '98', '34', '84', '39', '89'];
  family_list['44'] = ['44', '49', '94', '99'];
  family_list['45'] = ['40', '45', '90', '95', '04', '54', '09', '59'];
  family_list['46'] = ['41', '46', '91', '96', '14', '64', '19', '69'];
  family_list['47'] = ['42', '47', '92', '97', '24', '74', '29', '79'];
  family_list['48'] = ['48', '93', '98', '43', '34', '39', '84', '89'];
  family_list['49'] = ['44', '49', '94', '99'];
  family_list['50'] = ['00', '05', '55', '50'];
  family_list['51'] = ['51', '56', '01', '06', '15', '65', '10', '60'];
  family_list['52'] = ['52', '57', '02', '07', '25', '75', '20', '70'];
  family_list['53'] = ['53', '58', '03', '08', '35', '85', '30', '80'];
  family_list['54'] = ['54', '59', '04', '09', '45', '95', '40', '90'];
  family_list['55'] = ['55', '00', '05', '50'];
  family_list['56'] = ['51', '56', '01', '06', '15', '65', '10', '60'];
  family_list['57'] = ['52', '57', '02', '07', '25', '75', '20', '70'];
  family_list['58'] = ['53', '58', '03', '08', '35', '85', '30', '80'];
  family_list['59'] = ['54', '59', '04', '09', '45', '95', '40', '90'];
  family_list['60'] = ['60', '65', '15', '10', '06', '56', '51', '01'];
  family_list['61'] = ['61', '66', '16', '11'];
  family_list['62'] = ['12', '17', '62', '67', '21', '71', '26', '76'];
  family_list['63'] = ['13', '18', '63', '68', '31', '81', '36', '86'];
  family_list['64'] = ['14', '64', '19', '69', '41', '46', '91', '96'];
  family_list['65'] = ['60', '65', '10', '15', '06', '56', '01', '51'];
  family_list['66'] = ['61', '66', '16', '11'];
  family_list['67'] = ['12', '17', '62', '67', '21', '71', '26', '76'];
  family_list['68'] = ['13', '18', '63', '68', '31', '81', '36', '86'];
  family_list['69'] = ['14', '64', '19', '69', '41', '46', '91', '96'];
  family_list['70'] = ['20', '25', '70', '75', '02', '52', '07', '57'];
  family_list['71'] = ['71', '76', '21', '26', '17', '67', '12', '62'];
  family_list['72'] = ['72', '77', '22', '27'];
  family_list['73'] = ['73', '78', '23', '28', '37', '87', '32', '82'];
  family_list['74'] = ['74', '79', '24', '29', '47', '97', '42', '92'];
  family_list['75'] = ['75', '70', '25', '20', '57', '07', '52', '02'];
  family_list['76'] = ['76', '71', '26', '21', '67', '17', '62', '12'];
  family_list['77'] = ['77', '72', '27', '22'];
  family_list['78'] = ['78', '73', '28', '23', '87', '37', '82', '32'];
  family_list['79'] = ['79', '74', '29', '24', '97', '47', '92', '42'];
  family_list['80'] = ['80', '85', '30', '35', '08', '58', '03', '53'];
  family_list['81'] = ['81', '86', '31', '36', '18', '68', '13', '63'];
  family_list['82'] = ['82', '87', '32', '37', '28', '78', '23', '73'];
  family_list['83'] = ['83', '88', '33', '38'];
  family_list['84'] = ['84', '89', '34', '39', '48', '98', '43', '93'];
  family_list['85'] = ['85', '80', '35', '30', '58', '08', '53', '03'];
  family_list['86'] = ['86', '81', '36', '31', '68', '18', '63', '13'];
  family_list['87'] = ['82', '87', '32', '37', '28', '78', '23', '73'];
  family_list['88'] = ['83', '88', '33', '38'];
  family_list['89'] = ['84', '89', '34', '39', '48', '98', '43', '93'];
  family_list['90'] = ['90', '95', '40', '45', '09', '59', '04', '54'];
  family_list['91'] = ['91', '96', '41', '46', '19', '69', '14', '64'];
  family_list['92'] = ['92', '97', '42', '47', '29', '79', '24', '74'];
  family_list['93'] = ['93', '98', '43', '48', '39', '89', '34', '84'];
  family_list['94'] = ['94', '99', '44', '49'];
  family_list['95'] = ['95', '90', '45', '40', '59', '09', '54', '04'];
  family_list['96'] = ['96', '91', '41', '46', '69', '19', '14', '64'];
  family_list['97'] = ['97', '92', '42', '47', '79', '29', '24', '74'];
  family_list['98'] = ['98', '93', '43', '48', '89', '39', '34', '84'];
  family_list['99'] = ['99', '94', '44', '49'];
}

// ─────────────────────────────────────────────
//  CLOCK
// ─────────────────────────────────────────────
function startClock() {
  var clockEl = el("clock");
  if (!clockEl) return;
  function tick() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, "0");
    var m = String(now.getMinutes()).padStart(2, "0");
    var s = String(now.getSeconds()).padStart(2, "0");
    clockEl.textContent = "Current Time :" + h + ":" + m + ":" + s;
  }
  tick();
  setInterval(tick, 1000);
}
window.startClock = startClock;

// ─────────────────────────────────────────────
//  GRID LOGIC
// ─────────────────────────────────────────────
function setFP(obj, type) {
  const isChecked = obj.checked;
  // If checking All, Even, or Odd, uncheck others in this group
  if (isChecked && (type === 1 || type === 2 || type === 3)) {
    if (type !== 1) { let cb = el("odd-chk-top"); if (cb) { cb.checked = false; } odd_bit = 0; }
    if (type !== 2) { let cb = el("even-chk-top"); if (cb) { cb.checked = false; } even_bit = 0; }
    if (type !== 3) { let cb = el("all-chk-top"); if (cb) { cb.checked = false; } all_bit = 0; }
  }

  if (type == 0) FP_autobit = isChecked ? 1 : 0;
  else if (type == 1) odd_bit = isChecked ? 1 : 0;
  else if (type == 2) even_bit = isChecked ? 1 : 0;
  else if (type == 3) all_bit = isChecked ? 1 : 0;
}

function setPoint(val) {
  point = val;
  // Update Rs. labels in sidebar
  document.querySelectorAll(".rs-val").forEach(span => {
    span.textContent = "Rs." + val;
  });
  updateTotals();
}

function hightlowFun(val) {
  height_low = val;
  if (val == 1) {
    el("highBtn").style.opacity = "0.6";
    el("lowBtn").style.opacity = "1";
  } else {
    el("highBtn").style.opacity = "1";
    el("lowBtn").style.opacity = "0.6";
  }
  updateTotals();
}

function setNuFamily(pno, value) {
  if (family_list[pno]) {
    family_list[pno].forEach(id => {
      let input = document.getElementById(id);
      if (input) {
        input.value = value;
      }
    });
  }
}

function updateAllBetsFromInputs(replicateToCheckedSidebars) {
  // Build sidebar indices: always include currentSidebarIndex (what's displayed on screen)
  // Only replicate to other checked sidebars when user is actively typing (replicateToCheckedSidebars = true)
  let sidebarIndices = [currentSidebarIndex];
  if (replicateToCheckedSidebars) {
    document.querySelectorAll(".sidebar-chk").forEach((chk, i) => {
      if (chk.checked && !sidebarIndices.includes(i)) sidebarIndices.push(i);
    });
  }

  const checkedTopIndices = [];
  document.querySelectorAll('.series-ranges .range-box input[type="checkbox"]').forEach((chk, i) => {
    if (chk.checked) checkedTopIndices.push(i);
  });
  if (checkedTopIndices.length === 0) checkedTopIndices.push(currentTopIndex);

  document.querySelectorAll(".c_seriese").forEach(inp => {
    let relNum = parseInt(inp.id); // 00-99
    let val = parseInt(inp.value) || 0;

    checkedTopIndices.forEach(sIdx => {
      sidebarIndices.forEach(rIdx => {
        let absNum = sIdx * 1000 + rIdx * 100 + relNum;
        if (val > 0) allBets[absNum] = val;
        else delete allBets[absNum];
      });
    });
  });
}

function loadBetsToInputs() {
  document.querySelectorAll(".c_seriese").forEach(inp => {
    let absNum = currentTopIndex * 1000 + currentSidebarIndex * 100 + parseInt(inp.id);
    inp.value = allBets[absNum] || "";
  });
}

function luckyPlus() {
  let totalVal = parseInt(el("lp-val").value) || 10;

  // Clear current grid inputs
  document.querySelectorAll(".c_seriese").forEach(inp => inp.value = "");

  // 1. Pick exactly 10 unique random indices from 00 to 99
  let targets = [];
  while (targets.length < 10) {
    let r = Math.floor(Math.random() * 100);
    let id = String(r).padStart(2, "0");
    if (!targets.includes(id)) targets.push(id);
  }

  let distributedValues = {};
  targets.forEach(id => distributedValues[id] = 0);

  let remaining = totalVal;

  // 2. If total is at least 10, ensure each of the 10 boxes gets at least 1
  if (remaining >= 10) {
    targets.forEach(id => {
      distributedValues[id] = 1;
      remaining--;
    });
  }

  // 3. Distribute the remaining points across these 10 boxes in small chunks
  while (remaining > 0) {
    let randomTarget = targets[Math.floor(Math.random() * targets.length)];
    let chunk = Math.min(remaining, Math.floor(Math.random() * 3) + 1);

    distributedValues[randomTarget] += chunk;
    remaining -= chunk;
  }

  // Apply to UI
  for (let id in distributedValues) {
    let val = distributedValues[id];
    if (val > 0) {
      let inp = document.getElementById(id);
      if (inp) {
        inp.value = val;
        if (FP_autobit == 1) setNuFamily(id, val);
      }
    }
  }

  updateAllBetsFromInputs(true);
  updateTotals();
}

function updateTotals() {
  const highMultipliers = [2, 2, 4, 6, 10, 10, 20, 40, 50, 50];

  let seriesQty = new Array(10).fill(0);
  let seriesAmt = new Array(10).fill(0);

  // Get current Advance Draw slot count
  let slotInp = document.getElementById("noOfSlot");
  let numSlots = slotInp ? (parseInt(slotInp.value) || 1) : 1;

  // Calculate totals for each major series
  for (let absNum in allBets) {
    let qty = allBets[absNum];
    let num = parseInt(absNum);
    let sIdx = Math.floor(num / 1000); // 0-9
    let rIdx = Math.floor((num % 1000) / 100); // 0-9
    let rowIdxInsideRange = Math.floor((num % 100) / 10);

    let m = point;
    if (height_low == 1) {
      m = highMultipliers[rowIdxInsideRange] || point;
    }

    // Individual series totals sum all bets for that specific series
    if (sIdx >= 0 && sIdx < 10) {
      seriesQty[sIdx] += qty * numSlots;
      seriesAmt[sIdx] += qty * m * numSlots;
    }
  }

  // Calculate Cumulative Totals for summary boxes (only if checkboxes are used)
  let checkedTopIndices = [];
  document.querySelectorAll('.series-ranges .range-box input[type="checkbox"]').forEach((chk, i) => {
    if (chk.checked) checkedTopIndices.push(i);
  });

  let cumQty = [...seriesQty];
  let cumAmt = [...seriesAmt];

  // If multiple are checked, apply cumulative logic
  if (checkedTopIndices.length > 0) {
    let qSum = 0;
    let aSum = 0;
    for (let i = 9; i >= 0; i--) {
      let isChecked = checkedTopIndices.includes(i);
      if (isChecked) {
        qSum += seriesQty[i];
        aSum += seriesAmt[i];
        cumQty[i] = qSum;
        cumAmt[i] = aSum;
      } else {
        cumQty[i] = 0;
        cumAmt[i] = 0;
      }
    }
  }

  // Grand Total: ALWAYS show total of ALL bets entered across ALL series and sidebars
  let totalQty = 0;
  let totalAmt = 0;

  for (let absNum in allBets) {
    let qty = allBets[absNum];
    let num = parseInt(absNum);
    let rowIdxInsideRange = Math.floor((num % 100) / 10);

    let m = point;
    if (height_low == 1) {
      m = highMultipliers[rowIdxInsideRange] || point;
    }

    totalQty += qty * numSlots;
    totalAmt += qty * m * numSlots;
  }

  const rows = document.querySelectorAll(".data-row");
  rows.forEach((row, rowIndex) => {
    if (rowIndex < 10) {
      row.querySelector(".teal-box").textContent = cumQty[rowIndex];
      row.querySelector(".gold-box").textContent = cumAmt[rowIndex];
    }
  });

  const tQtyEl = el("totalQty");
  const tAmtEl = el("totalAmt");
  if (tQtyEl) tQtyEl.textContent = totalQty;
  if (tAmtEl) tAmtEl.textContent = totalAmt;
}


function createRow(rangeStart, r) {
  var tr = document.createElement("tr");
  tr.className = "data-row";

  var firstTd = document.createElement("td");
  var hInp = document.createElement("input");
  hInp.type = "text";
  hInp.className = "horizental";
  hInp.placeholder = "All";
  hInp.style.width = "66px";
  hInp.style.height = "26px";
  hInp.style.border = "2px solid black";
  hInp.style.textAlign = "center";
  hInp.oninput = function () {
    let val = this.value;
    tr.querySelectorAll(".c_seriese").forEach(inp => {
      let isEven = parseInt(inp.id) % 2 === 0;
      let shouldApply = true;
      if (even_bit == 1 && !isEven) shouldApply = false;
      if (odd_bit == 1 && isEven) shouldApply = false;

      if (shouldApply) {
        inp.value = val;
        if (FP_autobit == 1) setNuFamily(inp.id, val);
      }
    });
    updateAllBetsFromInputs(true);
    updateTotals();
  };
  firstTd.appendChild(hInp);
  tr.appendChild(firstTd);

  for (var c = 0; c < 10; c++) {
    var num = r * 10 + c;
    var id = String(num).padStart(2, "0");
    var labelNum = rangeStart + num;
    var label = String(labelNum).padStart(4, "0");

    var td = document.createElement("td");
    td.className = "c_seriese_td";
    var lbl = document.createElement("label");
    lbl.textContent = label;
    var inp = document.createElement("input");
    inp.type = "text";
    inp.className = "c_seriese v" + (c + 1);
    inp.id = id;
    inp.maxLength = 3;
    inp.oninput = function () {
      let val = this.value;
      if (FP_autobit == 1) setNuFamily(this.id, val);

      if (odd_bit == 1 || even_bit == 1 || all_bit == 1) {
        document.querySelectorAll(".c_seriese").forEach(other => {
          let otherIdNum = parseInt(other.id);
          let isEven = otherIdNum % 2 === 0;

          if (all_bit == 1) {
            other.value = val;
          } else if (even_bit == 1 && isEven) {
            other.value = val;
          } else if (odd_bit == 1 && !isEven) {
            other.value = val;
          }
        });
      }
      updateAllBetsFromInputs(true);
      updateTotals();
    };

    td.appendChild(lbl);
    td.appendChild(inp);
    tr.appendChild(td);
  }

  var qtyTd = document.createElement("td");
  var tealDiv = document.createElement("div");
  tealDiv.className = "teal-box";
  tealDiv.textContent = "0";
  qtyTd.appendChild(tealDiv);
  tr.appendChild(qtyTd);

  var amtTd = document.createElement("td");
  var goldDiv = document.createElement("div");
  goldDiv.className = "gold-box";
  goldDiv.textContent = "0";
  amtTd.appendChild(goldDiv);
  tr.appendChild(amtTd);

  return tr;
}

function buildGrid() {
  var tbody = el("gridBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  for (var r = 0; r < 10; r++) {
    tbody.appendChild(createRow(currentRangeStart, r));
  }
  loadBetsToInputs(); // Load stored values into new grid
  updateTotals();     // Refresh row totals (Qty and Amount) and global totals
}

function rebuildGridForRange(start) {
  currentRangeStart = start;
  buildGrid();
}

function clearAll() {
  location.reload();
}

function selectSidebarRange(index, skipSave) {
  if (!skipSave) updateAllBetsFromInputs(false); // Save current sidebar only, don't replicate
  currentSidebarIndex = index;
  let start = currentTopIndex * 1000 + currentSidebarIndex * 100;

  // Highlight the active range item for grid editing, but don't force-uncheck boxes
  let items = document.querySelectorAll(".range-item");
  items.forEach((item, i) => {
    if (i === index) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  rebuildGridForRange(start);
}

function setSubCatAll(obj) {
  let chks = document.querySelectorAll(".sidebar-chk");
  chks.forEach(chk => {
    chk.checked = obj.checked;
  });
  updateAllBetsFromInputs(true); // Sync data across all checked sidebars
  updateTotals();
}

function updateSidebarLabels() {
  let labels = document.querySelectorAll("#sidebarRangeList .range-label");
  labels.forEach((lbl, i) => {
    let base = currentTopIndex * 1000 + i * 100;
    lbl.textContent = String(base).padStart(4, "0") + "-" + String(base + 99).padStart(4, "0");
  });
}

function setTopSeriesSelection(type, isChecked) {
  const cbs = document.querySelectorAll('.series-ranges .range-box input[type="checkbox"]');
  cbs.forEach((cb, i) => {
    if (type === 'all') {
      cb.checked = isChecked;
    } else if (type === 'even') {
      if (i % 2 === 0) cb.checked = isChecked;
    } else if (type === 'odd') {
      if (i % 2 !== 0) cb.checked = isChecked;
    }
  });
  updateTotals();
}

function pageDown() {
  if (currentSidebarIndex < 9) {
    selectSidebarRange(currentSidebarIndex + 1);
  }
}

function pageUp() {
  if (currentSidebarIndex > 0) {
    selectSidebarRange(currentSidebarIndex - 1);
  }
}

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  updateWelcomeHeader();
  initFamilyList();
  
  const hasGrid = !!el("gridBody");
  if (hasGrid) {
    buildGrid();
    bindRangeCheckboxes();
    selectSidebarRange(0); 
  }

  startClock();

  if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').onclick = handleLogout;
  }

  // Bind vertical inputs
  document.querySelectorAll(".vertical").forEach(vInp => {
    vInp.oninput = function () {
      let vClass = this.getAttribute("data-id");
      let val = this.value;
      document.querySelectorAll("." + vClass).forEach(inp => {
        let isEven = parseInt(inp.id) % 2 === 0;
        let shouldApply = true;
        if (even_bit == 1 && !isEven) shouldApply = false;
        if (odd_bit == 1 && isEven) shouldApply = false;

        if (shouldApply) {
          inp.value = val;
          if (FP_autobit == 1) setNuFamily(inp.id, val);
        }
      });
      updateAllBetsFromInputs(true);
      updateTotals();
    };
  });

  // Global Keyboard Shortcuts
  window.addEventListener("keydown", function (e) {
    // F6 Key
    if (e.key === "F6" || e.code === "F6") {
      e.preventDefault();
      submitBet();
    }
    // F7 Key
    if (e.key === "F7" || e.code === "F7") {
      e.preventDefault();
      clearAll();
    }
    // PageUp Key
    if (e.key === "PageUp") {
      e.preventDefault();
      pageUp();
    }
    // PageDown Key
    if (e.key === "PageDown") {
      e.preventDefault();
      pageDown();
    }
  });

  // Bind barcode scanner input
  const scanInp = el("barcodeScan");
  if (scanInp) {
    scanInp.addEventListener("input", function (e) {
      let val = this.value.trim();
      if (val.length === 10) {
        this.value = ""; // Clear immediately to prevent double trigger
        handleBarcodeScan(val);
      }
    });
    scanInp.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        let val = this.value.trim();
        if (val) {
          this.value = ""; // Clear immediately
          handleBarcodeScan(val);
        }
      }
    });
  }

  // Bind sidebar checkboxes for sync
  document.querySelectorAll(".sidebar-chk").forEach(chk => {
    chk.addEventListener("change", function () {
      updateAllBetsFromInputs(true);
      updateTotals();
    });
  });

  // Scale app
  scaleApp();
  window.addEventListener("resize", function () {
    setTimeout(scaleApp, 200);
  });
});

var DESIGN_WIDTH = 1200;
var styleTag = null;
function scaleApp() {
  var vp = document.querySelector(".scale-viewport");
  if (!vp) return;
  var screenW = window.innerWidth || document.documentElement.clientWidth;
  if (styleTag && styleTag.parentNode) { styleTag.parentNode.removeChild(styleTag); }
  styleTag = document.createElement("style");
  if (screenW < DESIGN_WIDTH) {
    var scale = screenW / DESIGN_WIDTH;
    styleTag.textContent = [
      "html, body { margin: 0; padding: 0; width: " + screenW + "px; overflow-x: hidden; overflow-y: hidden; background: #222; }",
      ".scale-viewport { width: " + DESIGN_WIDTH + "px !important; transform: scale(" + scale + ") !important; transform-origin: top left !important; position: absolute !important; top: 0 !important; left: 0 !important; }",
      "#scale-wrapper { width: " + screenW + "px; overflow: hidden; position: relative; background: #222; }"
    ].join("\n");
    document.head.appendChild(styleTag);
    var wrapper = el("scale-wrapper");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.id = "scale-wrapper";
      vp.parentNode.insertBefore(wrapper, vp);
      wrapper.appendChild(vp);
    }
    function setWrapperHeight() {
      var naturalH = vp.offsetHeight;
      if (naturalH < 100) naturalH = vp.scrollHeight;
      wrapper.style.height = Math.ceil(naturalH * scale) + "px";
      document.body.style.height = Math.ceil(naturalH * scale) + "px";
    }
    setWrapperHeight();
    setTimeout(setWrapperHeight, 100);
  } else {
    styleTag.textContent = "html, body { margin:0; padding:0; overflow:auto; width:100%; height:auto; } .scale-viewport { width:100% !important; transform:none !important; position:static !important; }";
    document.head.appendChild(styleTag);
    var wrapper = el("scale-wrapper");
    if (wrapper) { wrapper.parentNode.insertBefore(vp, wrapper); wrapper.parentNode.removeChild(wrapper); }
  }
}

function bindRangeCheckboxes() {
  var labels = document.querySelectorAll('.series-ranges .range-box');
  labels.forEach(function (lbl, idx) {
    var cb = lbl.querySelector('input[type="checkbox"]');

    cb.addEventListener("change", function () {
      if (this.checked) {
        currentTopIndex = idx;
        updateSidebarLabels();
        selectSidebarRange(0, true); // Switch view to this series (matching label click behavior)
        syncResultApi(); // Update winning numbers for this series
      }
      updateAllBetsFromInputs(true); // Sync data across all checked series/sidebars
      updateTotals();
    });

    cb.addEventListener("click", function (e) {
      e.stopPropagation(); // Don't trigger label click (single-select logic)
    });

    lbl.addEventListener("click", function (e) {
      if (e.target === cb) return; // Ignore if actually clicked the checkbox directly
      e.preventDefault(); // Prevent browser from toggling checkbox automatically so we can force single-select

      updateAllBetsFromInputs(false); // Save current sidebar only before switching

      // Single selection: uncheck all others
      var allRangeCbs = document.querySelectorAll('.series-ranges .range-box input[type="checkbox"]');
      allRangeCbs.forEach(function (other) { other.checked = false; });
      cb.checked = true;

      currentTopIndex = idx;
      updateSidebarLabels();
      selectSidebarRange(0, true);
      syncResultApi(); // Update winning numbers for this series
      updateTotals();
    });
  });
}

function startCountdown() {
  var items = document.querySelectorAll(".stat-item");
  var drawValEl, drTimeEl;
  items.forEach(function (item) {
    var lbl = item.querySelector(".lbl");
    if (!lbl) return;
    if (lbl.textContent.trim() === "Time To Draw") drawValEl = item.querySelector(".val");
    if (lbl.textContent.trim() === "Dr. Time") drTimeEl = item.querySelector(".val");
  });
  if (!drawValEl || !drTimeEl) return;
  function updateCountdown() {
    var now = new Date();
    var match = drTimeEl.textContent.trim().match(/(\d+):(\d+)\s*(am|pm)/i);
    if (!match) return;
    var h = parseInt(match[1]), m = parseInt(match[2]);
    if (match[3].toLowerCase() === "pm" && h !== 12) h += 12;
    if (match[3].toLowerCase() === "am" && h === 12) h = 0;
    var drawDate = new Date(now);
    drawDate.setHours(h, m, 0, 0);
    var diff = Math.floor((drawDate - now) / 1000);
    if (diff < 0) diff = 0;
    drawValEl.textContent = Math.floor(diff / 60) + ":" + String(diff % 60).padStart(2, "0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// function setSubCatAll(obj) {
//   // Logic from snippet if needed
// }

async function submitBet() {
  const totalQty = parseInt(document.getElementById("totalQty").innerText) || 0;
  const totalAmt = parseInt(document.getElementById("totalAmt").innerText) || 0;
  const numSlots = parseInt(document.getElementById("noOfSlot").value) || 1;

  if (totalQty === 0) {
    alert("Please enter some points before buying!");
    return;
  }

  // Calculate row multipliers once (for High/Low mode)
  const highMultipliers = [2, 2, 4, 6, 10, 10, 20, 40, 50, 50];

  // 1. Collect all bets from global allBets object
  let all_datas12 = [];
  for (let absNum in allBets) {
    let val = allBets[absNum];
    if (val > 0) {
      all_datas12.push(`${String(absNum).padStart(4, "0")}X${val}`);
    }
  }

  // 2. Get Advanced Draw Slots
  let selectedSlots = [];
  document.querySelectorAll('.sloat-checkbox:checked').forEach(cb => selectedSlots.push(cb.value));

  // 3. Prepare Payload
  const payload = {
    username: currentUser ? currentUser.username : "guest",
    all_datas12: all_datas12.join(","),
    total_load_c_amount: totalAmt,
    total_load_c_qty: totalQty,
    advancr_draw_time: selectedSlots
  };

  console.log("Submitting Bet Payload:", payload);

  try {
    const response = await insertData(payload);
    if (response && (response.status === true || response.success === true)) {

      const printReceiptContainer = document.getElementById('printReceipt');
      printReceiptContainer.innerHTML = ""; // Clear existing template content
      printReceiptContainer.style.display = "block";

      const gameDate = document.getElementById('drawDateDisplay').innerText.replace(/:/g, "-");
      const ticketTime = new Date().toLocaleTimeString('en-GB');
      const retailerId = currentUser ? currentUser.username : "guest";
      
      const slotsToPrint = selectedSlots.length > 0 ? selectedSlots : [document.getElementById('drawTime').innerText];
      
      // We need print data for a SINGLE draw (not multiplied by numSlots)
      let perSlotPrintDatas = [];
      for (let absNum in allBets) {
        let val = allBets[absNum];
        if (val > 0) {
          let num = parseInt(absNum);
          let rowIdxInsideRange = Math.floor((num % 100) / 10);
          let m = point;
          if (height_low == 1) m = highMultipliers[rowIdxInsideRange] || point;
          perSlotPrintDatas.push({ num: String(absNum).padStart(4, "0"), qty: val * m });
        }
      }
      perSlotPrintDatas.sort((a, b) => parseInt(a.num) - parseInt(b.num));

      const perSlotPt = totalAmt / numSlots;
      const perSlotQty = totalQty / numSlots;

      slotsToPrint.forEach((slotTime, idx) => {
        const receiptDiv = document.createElement('div');
        receiptDiv.style.cssText = "text-align:center; font-family:'Courier New', Courier, monospace; width:72mm; margin:0 auto; padding:5px 12px; background:white; color:black; border:none; page-break-after: always;";
        
        let tableRows = "";
        for (let i = 0; i < perSlotPrintDatas.length; i += 3) {
          tableRows += `<tr>`;
          for (let j = 0; j < 3; j++) {
            const item = perSlotPrintDatas[i + j];
            if (item) {
              tableRows += `<td style="border:2px solid #000; padding:4px; text-align:center; font-weight:900;">${item.num}</td><td style="border:2px solid #000; padding:4px; text-align:center; font-weight:900;">${item.qty}</td>`;
            } else {
              tableRows += `<td style="border:2px solid #000; padding:4px;"></td><td style="border:2px solid #000; padding:4px;"></td>`;
            }
          }
          tableRows += `</tr>`;
        }

        receiptDiv.innerHTML = `
          <h2 style="margin:2px 0; font-size:17px; font-weight: 900;">Rajshri Lottery 4D Game</h2>
          <p style="font-size:11px; margin:0; font-weight: bold;">(Ticket valid for 10 days)</p>
          <div style="border-top:1px dashed #000; margin:6px 0;"></div>
          
          <div style="text-align:left; font-size:12px; line-height:1.5; font-weight:900;">
            <div>Game Date : ${gameDate}</div>
            <div>Draw Time : ${slotTime}</div>
            <div>Ticket Time : ${ticketTime}</div>
            <div>Retailer ID : ${retailerId}</div>
            <div>Total Point : ${perSlotPt}</div>
            <div>Total Qty : ${perSlotQty}</div>
          </div>

          <table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:13px; border:2px solid #000; font-weight:900;">
            <thead>
              <tr>
                <th style="border:2px solid #000; padding:4px;">Num</th><th style="border:2px solid #000; padding:4px;">Price</th>
                <th style="border:2px solid #000; padding:4px;">Num</th><th style="border:2px solid #000; padding:4px;">Price</th>
                <th style="border:2px solid #000; padding:4px;">Num</th><th style="border:2px solid #000; padding:4px;">Price</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>

          <div style="margin-top:12px; text-align:center;">
            <svg class="barcode-canvas"></svg>
          </div>
          <div style="border-top:1px dashed #000; margin:12px 0;"></div>
        `;

        printReceiptContainer.appendChild(receiptDiv);

        const bcode = (response.barcodes && response.barcodes[idx]) ? response.barcodes[idx] : (new Date().getTime().toString() + idx);
        const barcodeSvg = receiptDiv.querySelector('.barcode-canvas');
        JsBarcode(barcodeSvg, bcode, {
          format: "CODE128",
          lineColor: "#000",
          width: 2,
          height: 50,
          displayValue: true,
          fontSize: 14,
          fontOptions: "bold",
          margin: 0
        });
      });

      // 5. Trigger Print
      setTimeout(() => {
        window.print();
        clearAll();
        syncBalanceApi(currentUsername); // Refresh balance
        syncLastDrawAmount(); // Refresh last draw
      }, 500);

    } else {
      alert("Purchase Failed: " + (response.message || "Unknown Error"));
    }
  } catch (error) {
    console.error("Submit Bet Error:", error);
    alert("Error submitting bet. Please try again.");
  }
}

async function syncAdvanceDrawSlots() {
  try {
    const response = await getAdvanceDrawTime();
    const container = document.getElementById("slotContainer");
    if (container && response && response.status && response.slots) {
      container.innerHTML = ""; // Clear existing
      response.slots.forEach(slot => {
        const label = document.createElement("label");
        label.style.cssText = "display:flex; align-items:center; gap:5px; font-weight:bold; font-size:14px; color:#333;";
        label.innerHTML = `<input type="checkbox" class="sloat-checkbox" value="${slot}"> ${slot}`;
        container.appendChild(label);

        // Re-bind event listener for count update
        label.querySelector('input').onchange = function () {
          // This calls the global updateSloatCount defined in index.html
          if (window.updateSloatCount) window.updateSloatCount();
        };
      });
    }
  } catch (error) {
    console.error("Error syncing advance draw slots:", error);
  }
}



// ─────────────────────────────────────────────
//  API INTEGRATION (via api.js)
// ─────────────────────────────────────────────

var countdownInterval = null;

async function syncTimerWithAPI() {
  console.log("Attempting to sync timer with API...");
  try {
    const data = await getTimer();
    console.log("API Response Data:", data);

    if (data && data.success) {
      // 1. Update Draw Time (Dr. Time)
      const drawTimeEl = document.getElementById("drawTime");
      if (drawTimeEl) drawTimeEl.innerText = data.DrawTime;

      // 2. Update Draw Date (Dr.Date)
      const drawDateEl = document.getElementById("drawDateDisplay");
      if (drawDateEl) drawDateEl.innerText = data.CurrentDate.replace(/-/g, ":");

      // 3. Start Countdown
      startAPICountdown(data.time);

      console.log("Timer Synced successfully!");
    } else {
      console.warn("API returned success: false or empty data", data);
    }
  } catch (error) {
    console.error("Critical API Error (Timer):", error);
  }
}



async function syncBalanceApi(username) {
  console.log("Attempting to sync balance for:", username);
  try {
    const response = await getBalance(username);
    console.log("Balance API Response:", response);

    if (response && response.success && response.data) {
      const balanceEl = document.getElementById("balance");
      if (balanceEl) {
        // According to your screenshot, balance is inside the 'data' object
        balanceEl.innerText = response.data.balance;
      }
      console.log("Balance Synced successfully!");
    } else {
      console.warn("Balance API returned error or empty data", response);
    }
  } catch (error) {
    console.error("Critical API Error (Balance):", error);
  }
}

async function syncResultApi() {
  try {
    const response = await result();
    if (response && response.status) {
      const container = document.querySelector(".winning-numbers");
      if (container && response.previous_result) {
        const numbers = response.previous_result.split(",").map(n => n.trim());

        // Dynamic slicing based on selected series (0000, 1000, etc.)
        // Each series (currentTopIndex) represents 1000 numbers, which is 10 chunks of 100 in the result API.
        const startIndex = (currentTopIndex || 0) * 10;
        const currentSeriesResults = numbers.slice(startIndex, startIndex + 10);

        const boxes = container.querySelectorAll(".num-box");
        boxes.forEach((box, index) => {
          if (currentSeriesResults[index]) {
            box.innerText = currentSeriesResults[index];
          } else {
            box.innerText = "----";
          }
        });
      }
      console.log("Result API Synced for Series:", currentTopIndex);
    }
  } catch (error) {
    console.error("Result Sync Error :", error);
  }
}

// Function to get current user from localStorage
function getUserData() {
  const data = localStorage.getItem('rajsri_user');
  return data ? JSON.parse(data) : null;
}

const currentUser = getUserData();
var currentUsername = currentUser ? currentUser.username : "BADGMYTK";

// Update Welcome Message with Login Data
function updateWelcomeHeader() {
  const welcomeMsg = document.querySelector(".welcome-msg");
  if (welcomeMsg && currentUser) {
    welcomeMsg.innerText = `WELCOME ${currentUser.username.toUpperCase()}`;
  }
}
window.updateWelcomeHeader = updateWelcomeHeader;

async function syncLastDrawAmount() {
  console.log("Syncing Last Draw Amount for:", currentUsername);
  try {
    const response = await getLastDrawAmount(currentUsername);
    console.log("Last Draw Amount API Response:", response);
    if (response && (response.status === true || response.status === "true")) {
      const amountEl = document.getElementById("lastDrawAmount");
      if (amountEl) {
        // Handle both possible keys just in case
        const amt = response.last_bet_amount || response.amount || "0";
        amountEl.innerText = amt;
        console.log("Last Draw Amount updated to:", amt);
      }
    } else {
      console.warn("Last Draw Amount API failed or returned false status", response);
    }
  } catch (error) {
    console.error("Critical API Error (Last Draw Amount):", error);
  }
}

async function syncCurrentDrawHistory() {
  console.log("Syncing Current Draw History for:", currentUsername);
  try {
    const response = await getCurrentDrawBetHistory(currentUsername);
    console.log("Current Draw History API Response:", response);
    if (response && response.status === true || response.status === "true") {
      // Filter out cancelled bets keeping in sync with client-side cache
      let localCancelledIds = JSON.parse(sessionStorage.getItem('local_cancelled_ids') || "[]");
      let activeTickets = (response.tickets || []).filter(t => {
        const s = String(t.status || "").toLowerCase();
        const isLocallyCancelled = localCancelledIds.includes(String(t.id));
        return !isLocallyCancelled && s !== 'cancelled' && s !== 'cancel' && s !== '3' && t.is_cancelled != 1;
      });

      const amountEl = document.getElementById("lastDrawAmount");
      if (amountEl) {
        // Sum active ticket amounts - handling both possible keys
        let totalActiveAmt = activeTickets.reduce((sum, t) => sum + (parseInt(t.total_load_c_amount || t.amount) || 0), 0);
        amountEl.innerText = totalActiveAmt;
        console.log("Last Draw Amount (Active Only) updated to:", totalActiveAmt);
      }
    } else {
      console.warn("Last Draw Amount API failed or returned false status", response);
    }
  } catch (error) {
    console.error("Critical API Error (Last Draw Amount):", error);
  }
}

async function syncGetBetHistory() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await getBetHistory(currentUsername, today);
    console.log("Bet History Sync response:", response);
  } catch (error) {
    console.error("Bet History Sync error:", error);
  }
}

async function handleLogout() {
  if (!currentUser) return;
  const confirmLogout = confirm("Are you sure you want to Logout?");
  if (confirmLogout) {
    try {
      await logout(currentUser.id);
      localStorage.removeItem('rajsri_user');
      window.location.href = 'login.html';
    } catch (err) {
      console.error("Logout failed", err);
      // Fallback: clear local storage anyway
      localStorage.removeItem('rajsri_user');
      window.location.href = 'login.html';
    }
  }
}
let isBarcodeProcessing = false;
let lastScannedBarcode = "";
let lastScanTime = 0;

async function handleBarcodeScan(barcode) {
  if (!barcode || barcode.length < 5 || isBarcodeProcessing) return;
  
  const now = Date.now();
  if (barcode === lastScannedBarcode && (now - lastScanTime < 3000)) {
     return; // Skip repeated scan
  }
  lastScannedBarcode = barcode;
  lastScanTime = now;
  isBarcodeProcessing = true;
  
  const uData = getUserData();
  const activeUser = uData ? uData.username : currentUsername;
  const msgEl = document.querySelector(".bottom-bar .msg");
  
  const updateMsg = (text, color = "#fc9c0c") => {
    if (msgEl) {
      msgEl.innerText = text;
      msgEl.style.color = color;
    }
  };

  updateMsg(`Searching Barcode: ${barcode}...`);

  try {
    // 1. Search Logic
    let ticket = null;
    
    // Try Print Details first
    try {
      const res = await Promise.race([
        getPrintDetails(barcode, activeUser),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
      ]);
      if (res && res.status && res.tickets && res.tickets.length > 0) {
        ticket = res.tickets[0];
      }
    } catch (e) { console.warn("PrintDetails search failed or timed out:", e); }

    // If not found, check Today's History
    if (!ticket) {
      updateMsg("Checking History Records...");
      try {
        const today = new Date().toISOString().split('T')[0];
        const historyRes = await Promise.race([
          getBetHistory(activeUser, today),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]);
        if (historyRes && historyRes.status && historyRes.tickets) {
          ticket = historyRes.tickets.find(t => String(t.barcode) === String(barcode));
        }
      } catch (e) { console.warn("History search failed or timed out:", e); }
    }

    if (!ticket) {
      updateMsg("Ticket Not Found", "#ff3333");
      return;
    }

    // 2. Win Check
    updateMsg("Verifying Winnings...", "#00ff00");
    const winAmt = parseFloat(ticket.win_amt || ticket.win_amount || ticket.prize_amount || 0);
    const status = ticket.status || 'Active';
    const isClaimed = (status === 'Claimed' || status === 'Paid' || ticket.is_claimed == 1 || ticket.claim_status == 1 || ticket.claim_status === "1");

    if (winAmt <= 0) {
      updateMsg("Try Again! No Prize Won", "#cccccc");
      return;
    }

    if (isClaimed) {
      updateMsg(`Already Paid: Rs.${winAmt}`, "#00ff00");
      return;
    }

    // 3. Manual Claim Only
    // Removed automatic claim call to prevent "Auto-Claim" issues.
    // User must go to Claim page to process actual payout.
    updateMsg(`Winner Found! Rs.${winAmt}. Use CLAIM page to process payout.`, "#00ff00");
    alert(`Winner Record Found!\nBarcode: ${barcode}\nWin Amount: Rs.${winAmt}\n\nPlease go to the CLAIM page to process this ticket.`);

  } catch (err) {
    console.error("Barcode scan process error:", err);
    updateMsg("Scan Error - Try Again", "#ff3333");
  } finally {
    isBarcodeProcessing = false;
  }
}

// updateWelcomeHeader() removed from here, now inside DOMContentLoaded

function startAPICountdown(seconds) {
  if (countdownInterval) clearInterval(countdownInterval);

  let remaining = parseInt(seconds) || 0;
  const remTimeEl = document.getElementById("remaningTime");

  function updateDisplay() {
    if (remaining <= 0) {
      if (remTimeEl) remTimeEl.innerText = "0:00";
      clearInterval(countdownInterval);
      setTimeout(syncTimerWithAPI, 2000);
      return;
    }

    let m = Math.floor(remaining / 60);
    let s = remaining % 60;
    if (remTimeEl) {
      remTimeEl.innerText = m + ":" + String(s).padStart(2, "0");
    }
    remaining--;
  }

  updateDisplay();
  countdownInterval = setInterval(updateDisplay, 1000);
}

// Attach functions to window for HTML accessibility
window.setFP = setFP;
window.setPoint = setPoint;
window.hightlowFun = hightlowFun;
window.luckyPlus = luckyPlus;
window.pageUp = pageUp;
window.pageDown = pageDown;
window.clearAll = clearAll;
window.selectSidebarRange = selectSidebarRange;
window.setSubCatAll = setSubCatAll;
window.setTopSeriesSelection = setTopSeriesSelection;
window.submitBet = submitBet;
window.updateTotals = updateTotals;
window.updateWelcomeHeader = updateWelcomeHeader;
window.startClock = startClock;
window.initFamilyList = initFamilyList;
window.buildGrid = buildGrid;

// Start Sync
const initialUser = getUserData()?.username || "BADGMYTK";
syncTimerWithAPI();
syncResultApi();
syncBalanceApi(initialUser);
syncCurrentDrawHistory();
syncLastDrawAmount();
syncAdvanceDrawSlots();
syncGetBetHistory();
setInterval(syncTimerWithAPI, 30000);
setInterval(() => {
  const currentU = getUserData()?.username || initialUser;
  syncBalanceApi(currentU);
}, 30000);
setInterval(() => {
  const currentU = getUserData()?.username || initialUser;
  // If syncLastDrawAmount doesn't take username, ensure it uses global sync logic
  syncLastDrawAmount(); 
}, 30000);