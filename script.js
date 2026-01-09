function fmt(n, decimals=2){
  if(!isFinite(n)) return '—';
  return Number(n).toFixed(decimals);
}

function calculate(){
  const P = parseFloat(document.getElementById('marketPrice').value);
  const Ps = parseFloat(document.getElementById('subsidyPrice').value);
  const A = parseFloat(document.getElementById('amount').value);

  const amountOutEl = document.getElementById('amountOut');
  const litersNoEl = document.getElementById('litersNo');
  const litersYesEl = document.getElementById('litersYes');
  const litersExtraEl = document.getElementById('litersExtra');
  const rmBenefitEl = document.getElementById('rmBenefit');
  const percentDiffEl = document.getElementById('percentDiff');

  if(!(P>0) || !(Ps>0) || !(A>0)){
    amountOutEl.textContent = litersNoEl.textContent = litersYesEl.textContent = litersExtraEl.textContent = rmBenefitEl.textContent = percentDiffEl.textContent = '—';
    return;
  }

  const L_no = A / P;
  const L_yes = A / Ps;
  const L_extra = L_yes - L_no;
  const RM_benefit = L_extra * P;
  const percent = (L_extra / L_no) * 100;
  const totalWithBenefit = A + RM_benefit;

  amountOutEl.textContent = `RM ${fmt(totalWithBenefit)}`;
  litersNoEl.textContent = `${fmt(L_no)} L`;
  litersYesEl.textContent = `${fmt(L_yes)} L`;
  litersExtraEl.textContent = `${fmt(L_extra)} L`;
  rmBenefitEl.textContent = `RM ${fmt(RM_benefit)}`;
  percentDiffEl.textContent = `${fmt(percent)} %`;
}

document.getElementById('calcBtn').addEventListener('click', calculate);

// Reset hanya padam jumlah RM, harga pasaran & subsidi kekal
document.getElementById('resetBtn').addEventListener('click', ()=>{
  document.getElementById('amount').value = '';
  document.getElementById('amountOut').textContent =
  document.getElementById('litersNo').textContent =
  document.getElementById('litersYes').textContent =
  document.getElementById('litersExtra').textContent =
  document.getElementById('rmBenefit').textContent =
  document.getElementById('percentDiff').textContent = '—';
});

// Enter key triggers calculate
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    calculate();
  }
});