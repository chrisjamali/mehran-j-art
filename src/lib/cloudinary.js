export async function search(options = {}) {
    // fetch immediately from cloudinary api
    const params = {
      ...options
    }
    if(options.nextCursor) {
      params.next_cursor = options.nextCursor;
      delete params.nextCursor;
    }
    const paramString = Object.keys(params).map(key => `${key}=${encodeURIComponent( params[key])}`).join('&');
  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search?${paramString}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ':' +
            process.env.CLOUDINARY_API_SECRET
        ).toString('base64')}`,
      },
    }
  ).then((r) => r.json());
  return results;
}
// turn the results into an array of objects
export function mapImageResources(resources) {
  return resources.map((resources) => {
    const { public_id, width, height, format, url, secure_url } = resources;
    return {
      id: public_id,
      title: public_id,
      width,
      height,
      image: url,
      link: secure_url,
    };
  });
}

export async function getFolders(options = {}) {
  // // fetch immediately from cloudinary api
  // const params = {
  //   ...options,
  // };
  // if (options.nextCursor) {
  //   params.next_cursor = options.nextCursor;
  //   delete params.nextCursor;
  // }
  // const paramString = Object.keys(params)
  //   .map((key) => `${key}=${encodeURIComponent(params[key])}`)
  //   .join('&');
  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/folders/Mehran_Jamali_Art`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ':' +
            process.env.CLOUDINARY_API_SECRET
        ).toString('base64')}`,
      },
    }
  ).then((r) => r.json());
  console.log('cloudinary results', process.env.CLOUDINARY_CLOUD_NAME);
  console.log(results);
  return results;
}