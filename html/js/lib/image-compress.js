(function () {
  async function compressImageToMax(file, maxBytes) {
    if (!file) return null;
    const target = Number(maxBytes || 500 * 1024);
    if (file.size <= target) return file;
    const img = await fileToImage(file);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let scale = 1;
    let quality = 0.85;
    let blob = null;
    for (let i = 0; i < 8; i += 1) {
      canvas.width = Math.max(320, Math.round(img.width * scale));
      canvas.height = Math.max(240, Math.round(img.height * scale));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
      if (blob && blob.size <= target) break;
      quality = Math.max(0.45, quality - 0.07);
      scale = Math.max(0.55, scale - 0.08);
    }
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" });
  }

  function fileToImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = function (err) {
        URL.revokeObjectURL(url);
        reject(err);
      };
      img.src = url;
    });
  }

  window.BAGOImageCompress = { compressImageToMax: compressImageToMax };
})();
