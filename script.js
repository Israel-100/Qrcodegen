const form = document.getElementById('qr-form');
const input = document.getElementById('qr-input');
const canvas = document.getElementById('qr-canvas');
const statusText = document.getElementById('status');
const downloadBtn = document.getElementById('download-btn');
const submitBtn = form.querySelector('button[type="submit"]');

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  downloadBtn.disabled = isLoading;
  submitBtn.classList.toggle('loading', isLoading);
  submitBtn.textContent = isLoading ? 'Generating...' : 'Generate QR Code';
  statusText.textContent = isLoading ? 'Generating QR code...' : 'Ready';
}

function generateQRCode(value) {
  const text = value.trim();

  if (!text) {
    statusText.textContent = 'Please enter a URL or text first.';
    return;
  }

  setLoading(true);

  QRCode.toCanvas(
    canvas,
    text,
    {
      width: 240,
      margin: 2,
      color: {
        dark: '#111827',
        light: '#ffffff'
      }
    },
    (error) => {
      if (error) {
        statusText.textContent = 'There was a problem creating the QR code.';
        console.error(error);
        setLoading(false);
        return;
      }

      statusText.textContent = 'QR code ready.';
      downloadBtn.disabled = false;
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.textContent = 'Generate QR Code';
    }
  );
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  generateQRCode(input.value);
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'qrcode.png';
  link.click();
});

generateQRCode(input.value);
