export const sleep = async (time = 2000) =>
  await new Promise((resolve) => setTimeout(() => resolve(''), time));
