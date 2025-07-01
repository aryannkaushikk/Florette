import { useForm } from "react-hook-form";
import { usePeriodInsertLogs } from "../hooks/usePeriodInsertLogs";

export default function PeriodForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isError, error } = usePeriodInsertLogs();

  const onSubmit = ({ start_date, end_date }) => {
    if (!start_date || !end_date) return;
    mutate({ start_date, end_date }, { onSuccess: () => reset() });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold text-rose-800">Log Period Dates</h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          {...register("start_date", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
        {errors.start_date && (
          <p className="text-sm text-red-500 mt-1">Start date is required.</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          type="date"
          {...register("end_date", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
        {errors.end_date && (
          <p className="text-sm text-red-500 mt-1">End date is required.</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-500 transition disabled:opacity-50"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>

      {isError && <p className="text-sm text-red-600 mt-2">{error.message}</p>}
    </form>
  );
}
