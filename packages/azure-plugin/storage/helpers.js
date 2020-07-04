function checkParams() {
  if (
    !process.env.AZURE_STORAGE_ACCESS_KEY ||
    !process.env.AZURE_STORAGE_CONNECTION_STRING ||
    !process.env.AZURE_STORAGE_ACCOUNT
  ) {
    throw new Error(
      "Please provide storage access key and storage connection string"
    );
  }
}

module.exports = checkParams;
