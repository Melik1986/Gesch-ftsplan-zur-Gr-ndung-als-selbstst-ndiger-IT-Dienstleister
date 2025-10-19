window.chartInitialized = false;

function initApp() {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  const totalSlidesEl = document.getElementById('totalSlides');
  const currentSlideEl = document.getElementById('currentSlide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const downloadBtn = document.querySelector('.download-btn');

  if (totalSlidesEl) totalSlidesEl.textContent = String(totalSlides);

  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    slides[n].classList.add('active');
    if (currentSlideEl) currentSlideEl.textContent = String(n + 1);
    if (prevBtn) prevBtn.disabled = n === 0;
    if (nextBtn) nextBtn.disabled = n === totalSlides - 1;

    if (n === 8 && !window.chartInitialized) {
      initGrowthChart();
      window.chartInitialized = true;
    }
  }

  function changeSlide(direction) {
    const nextIndex = currentSlide + direction;
    if (nextIndex >= 0 && nextIndex < totalSlides) {
      currentSlide = nextIndex;
      showSlide(currentSlide);
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
  });

  function initGrowthChart() {
    const canvas = document.getElementById('growthChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ChartLib = window.Chart || (typeof Chart !== 'undefined' ? Chart : null);
    if (!ChartLib) {
      console.warn('Chart.js не загружен.');
      return;
    }

    new ChartLib(ctx, {
      type: 'line',
      data: {
        labels: ['Monat 1-6', 'Monat 7-12', 'Jahr 2', 'Jahr 3+'],
        datasets: [{
          label: 'Monatlicher Umsatz (€)',
          data: [2000, 3500, 6000, 10000],
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 6,
          pointBackgroundColor: '#764ba2',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: { font: { size: 14 }, color: '#333' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 12000,
            ticks: {
              callback: (value) => '€' + Number(value).toLocaleString('de-DE'),
              font: { size: 12 }
            }
          }
        }
      }
    });
  }

  function downloadPresentation() {
    const assetUrl = 'assets/Gesch_ftsplan_zur_Gr_ndung_als_selbstst_ndiger_IT-Dienstleister.pdf';

    fetch(assetUrl)
      .then((resp) => {
        if (!resp.ok) throw new Error('Asset not found');
        return resp.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Geschaeftsplan_IT-Dienstleister.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      })
      .catch(() => {
        const html2pdf = window.html2pdf;
        if (!html2pdf) {
          console.warn('PDF из assets недоступен, и html2pdf не загружен.');
          return;
        }
        const element = document.querySelector('.presentation-container');
        if (!element) return;
        const opt = {
          margin: 10,
          filename: 'Geschaeftsplan_IT-Dienstleister_Oktober2025.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        };
        html2pdf().set(opt).from(element).save();
      });
  }

  prevBtn?.addEventListener('click', () => changeSlide(-1));
  nextBtn?.addEventListener('click', () => changeSlide(1));
  downloadBtn?.addEventListener('click', downloadPresentation);

  showSlide(0);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}