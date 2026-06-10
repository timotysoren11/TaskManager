import {
  ListTodo,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const TaskCard = ({ title, value }) => {
  const config = {
    "Total Tasks": {
      icon: <ListTodo size={22} />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      border: "border-blue-100",
      subtitle: "All created tasks",
    },

    Completed: {
      icon: <CheckCircle2 size={22} />,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      border: "border-emerald-100",
      subtitle: "Finished successfully",
    },

    Pending: {
      icon: <Clock3 size={22} />,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      border: "border-amber-100",
      subtitle: "Tasks remaining",
    },
  };

  const current = config[title];

  return (
    <div
      className={`
        bg-white
        rounded-2xl
        border
        ${current.border}
        p-6
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
      `}
    >
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {current.subtitle}
          </p>
        </div>

        <div
          className={`
            w-12 h-12
            rounded-xl
            flex items-center justify-center
            ${current.iconBg}
            ${current.iconColor}
          `}
        >
          {current.icon}
        </div>

      </div>
    </div>
  );
};

export default TaskCard;