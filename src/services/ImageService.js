export class ImageService {
  static getBackgroundImage = async (url, setUrl, setLoaded) => {
    await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": "SW52mhipmbYbLc+CwwdHtw==nK0PXUiVHxoL9Hvx",
        Accept: "image/jpg",
      },
    })
      .then((response) => response.body)
      .then((rs) => {
        const reader = rs.getReader();
        return new ReadableStream({
          async start(controller) {
            while (true) {
              const { done, value } = await reader.read();
              // When no more data needs to be consumed, break the reading
              if (done) {
                break;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
            }

            // Close the stream
            controller.close();
            reader.releaseLock();
          },
        });
      })
      .then((rs) => new Response(rs))
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        console.log(url);
        setUrl(url);
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
