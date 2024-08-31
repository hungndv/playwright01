export default function loggedMethod(originalMethod: any, context: any) {
  const methodName = String(context.name);
  function replacementMethod(this: any, ...args: any[]) {
    console.log(`${methodName} - ${JSON.stringify(args)}`)
    const result = originalMethod.call(this, ...args);
    return result;
  }

  return replacementMethod;
}