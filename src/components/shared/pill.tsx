function Pill({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "to-do":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-primary-light text-primary";
    }
  };

  return (
    <span
      className={`inline-block rounded-xs py-1 px-2 text-xs font-semibold ${getStatusColor(
        title
      )} ${className}`}
    >
      {title}
    </span>
  );
}

export default Pill;
