// Define a function to execute and return the data
export async function fetchData(
  url: string,
  options: any,
  token: string = '',
  returnData: boolean = true
): Promise<any> {
  console.log("fetchData backend", url, options, token);

  const defaultHeaders: Record<string, string> = {
    Accept: "application/json",
  };

  if (token && token.length > 0) {
    defaultHeaders.Authorization = `token ${token}`;
  }

  const mergedHeaders = {
    ...defaultHeaders,
    ...options.headers,
  };

  const response = await fetch(`${process.env.BACKEND_URL}${url}`, {
    ...options,
    headers: mergedHeaders,
  });

  if (!response.ok) {
    console.log("fetchData error", response);
    throw new Error(`Error fetching data: ${response.statusText}`);
  } else {
    if (returnData) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const jsonData = await response.json();
        console.log("fetchData data", jsonData);

        return jsonData;
      } else {
        const textData = await response.json();
        console.log("fetchData textData", textData);
        return textData;
      }
      return;
    }
  }
}
