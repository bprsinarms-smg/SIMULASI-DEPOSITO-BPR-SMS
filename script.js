/* Konfigurasi: ganti URL di bawah setelah link formulir resmi tersedia. */
const DEPOSITO_FORM_URL = "https://forms.gle/Yt8jibDknMoKqgTx7";

const $ = (id) => document.getElementById(id);
const homeScreen = $("homeScreen");
const simScreen = $("simScreen");
const sheet = $("confirmSheet");
const backdrop = $("sheetBackdrop");
let latestCalculation = null;

const rupiah = (value) => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0
}).format(Math.round(value || 0));

const getNominal = () => {
  const digits = $("principal").value.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
};

function calculate() {
  const principal = getNominal();
  const rate = Number($("rate").value);
  const tenor = Number(document.querySelector('input[name="tenor"]:checked')?.value || 1);
  const days = 30 * tenor;
  const grossInterest = principal * (rate / 100) / 365 * days;
  const tax = grossInterest * 0.20;
  const netInterest = grossInterest - tax;
  // Cashback 1% hanya berlaku untuk penempatan minimal Rp100.000.000.
  const cashback = principal >= 100000000 ? principal * 0.01 : 0;
  const total = principal + netInterest + cashback;
  latestCalculation = { principal, rate, tenor, days, grossInterest, tax, netInterest, cashback, total };
  $("cashbackPreview").textContent = rupiah(cashback);
  $("interestPreview").textContent = rupiah(netInterest);
  $("totalPreview").textContent = rupiah(total);
  return latestCalculation;
}

function showToast(message) {
  const toast = $("notice");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function openSheet() {
  const c = calculate();
  $("confirmName").textContent = $("customerName").value.trim();
  $("confirmPrincipal").textContent = rupiah(c.principal);
  $("confirmTenor").textContent = `${c.tenor} Bulan`;
  $("confirmRate").textContent = `${c.rate}% per tahun`;
  $("confirmTax").textContent = rupiah(c.tax);
  $("confirmCashback").textContent = rupiah(c.cashback);
  $("confirmInterest").textContent = rupiah(c.netInterest);
  $("confirmTotal").textContent = rupiah(c.total);
  sheet.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  $("closeSheet").focus();
}

function closeSheet() {
  sheet.classList.add("hidden");
  backdrop.classList.add("hidden");
  document.body.style.overflow = "";
}

$("openDeposit").addEventListener("click", () => {
  homeScreen.classList.add("hidden");
  simScreen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
$("backHome").addEventListener("click", () => {
  closeSheet();
  simScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
$("principal").addEventListener("input", (event) => {
  const digits = event.target.value.replace(/\D/g, "");
  event.target.value = digits ? new Intl.NumberFormat("id-ID").format(Number(digits)) : "";
  calculate();
});
$("rate").addEventListener("input", calculate);
document.querySelectorAll('input[name="tenor"]').forEach(el => el.addEventListener("change", calculate));

$("depositForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("customerName").value.trim();
  const principal = getNominal();
  const rateText = $("rate").value.trim();
  const rate = Number(rateText);
  const error = $("formError");
  error.textContent = "";
  if (!name) error.textContent = "Nama lengkap wajib diisi.";
  else if (!principal || principal <= 0) error.textContent = "Masukkan nominal deposito yang lebih besar dari Rp0.";
  else if (rateText === "" || !Number.isFinite(rate) || rate < 0 || rate > 100) error.textContent = "Masukkan bunga tahunan antara 0 sampai 100%.";
  if (error.textContent) return;
  openSheet();
});

$("closeSheet").addEventListener("click", closeSheet);
backdrop.addEventListener("click", closeSheet);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !sheet.classList.contains("hidden")) closeSheet();
});
$("confirmButton").addEventListener("click", () => {
  if (!DEPOSITO_FORM_URL.trim()) {
    showToast("Link formulir pembukaan deposito belum dimasukkan. Silakan hubungi BPR SMS.");
    return;
  }
  try {
    const url = new URL(DEPOSITO_FORM_URL, window.location.href);
    if (!["https:", "http:"].includes(url.protocol)) throw new Error("URL tidak valid");
    window.location.href = url.href;
  } catch {
    showToast("Link formulir belum valid. Periksa konfigurasi aplikasi.");
  }
});
$("resetForm").addEventListener("click", () => {
  $("depositForm").reset();
  $("principal").value = "";
  $("rate").value = "";
  $("formError").textContent = "";
  calculate();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
$("year").textContent = new Date().getFullYear();
calculate();
