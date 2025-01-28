export const getErrorMessage = (response: any) => {
  console.log("getErrorMessage", response);
  if (response.message) {
    if (Array.isArray(response.message)) {
      // return formatErrorMessage(response.message[0]);
      return response.message[0];
    }
    // return formatErrorMessage(response.message);
    return response.message;
  }
  return;
};

const formatErrorMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};
