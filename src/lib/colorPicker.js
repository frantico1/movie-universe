export const calculateBackgroundColor = async (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, img.width, img.height);
      //   context.drawImage(img, 0, img.height, img.width, -img.height);

      const pixelData = context.getImageData(0, 0, 1, 1).data;

      const defaultBackgroundColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

      resolve(defaultBackgroundColor);
    };

    img.onerror = function () {
      reject(new Error("Resim yüklenirken bir hata oluştu."));
    };

    img.src = imageUrl;
  });
};
