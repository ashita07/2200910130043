async function Log(stack, level, pkg, message) {
  const stacks = ["frontend", "backend"];
  const levels = ["debug", "info", "warn", "error"];
  const packages = ["api"]; //i just took for frontend
  if (
    !stacks.includes(stack) ||
    !levels.includes(level) ||
    !packages.includes(pkg)
  )
    return;
  await fetch("http://20.244.56.244/evaluation-service/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stack, level, package: pkg, message }),
  });
  console.log(
    `[${stack.toUpperCase()}][${level.toUpperCase()}][${pkg}] ${message}`
  );
}
