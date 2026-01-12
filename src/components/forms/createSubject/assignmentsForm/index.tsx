import Button from "@/components/ui/button";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FaCalendar } from "react-icons/fa";
import DatePicker from "@/components/forms/datePicker";
import Input from "@/components/forms/input";
import Select from "@/components/forms/select";
import { CreateSubjectFormData as FormData } from "@/components/forms/createSubject/form";
import { STATUS_OPTIONS, TYPE_OPTIONS } from "./constants";

export default function AssignmentsForm() {
  const { control, formState: { errors }, watch, setValue, trigger } = useFormContext<FormData>();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "assignments",
  });

  const currentTitle = watch("assignment.title");
  const currentDate = watch("assignment.date");
  const currentStatus = watch("assignment.status");
  const currentType = watch("assignment.type");

  const handleAddAssignment = async () => {
    const titleValid = await trigger("assignment.title");
    const dateValid = await trigger("assignment.date");
    const statusValid = await trigger("assignment.status");
    const typeValid = await trigger("assignment.type");
    
    if (!titleValid || !dateValid || !statusValid || !typeValid) {
      return;
    }

    append({
      title: currentTitle,
      date: currentDate,
      status: currentStatus,
      type: currentType,
    });

    setValue("assignment.title", "");
    setValue("assignment.date", null);
    setValue("assignment.status", null);
    setValue("assignment.type", null);
  };

  return (
    <div className="flex flex-col gap-4 border border-oxford/50 bg-white shadow-[5px_5px_0px_#0a0f29] rounded-sm max-w-2xl h-full w-full p-6 overflow-y-auto lg:overflow-y-auto custom-scrollbar">
      <h2 className="text-preset-3-bolder text-oxford">Assignments, Tests and Tasks</h2>
      <section className="flex flex-col gap-4 p-4 border border-oxford/30 rounded-md bg-white">
        <div className={"flex flex-col lg:flex-row gap-4"}>
          <div className="flex-1">
            <Controller
              name="assignment.title"
              control={control}
              render={({ field }) => (
                <Input
                  label="Assignment Title"
                  placeholder="Ex. First Math Test"
                  error={errors.assignment?.title?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="assignment.date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Assignment Date"
                  error={errors.assignment?.date?.message}
                  {...field}
                  selected={field.value}
                />
              )}
            />
          </div>
        </div>
        <div className={"flex flex-col lg:flex-row gap-4"}>
          <div className="flex-1">
            <Controller
              name="assignment.status"
              control={control}
              render={({ field }) => (
                <Select
                  label="Status"
                  name={field.name}
                  value={field.value}
                  onChange={(opt) => field.onChange(opt || null)}
                  options={STATUS_OPTIONS}
                  placeholder="Select status"
                  error={errors.assignment?.status?.message}
                />
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="assignment.type"
              control={control}
              render={({ field }) => (
                <Select
                  label="Type"
                  name={field.name}
                  value={field.value}
                  onChange={(opt) => field.onChange(opt || null)}
                  options={TYPE_OPTIONS}
                  placeholder="Select type"
                  error={errors.assignment?.type?.message}
                />
              )}
            />
          </div>
        </div>
        <Button
          style="secondary"
          onClick={handleAddAssignment}
          type="button"
        >
          Add Assignment
        </Button>
      </section>
      {errors.assignments?.message && (
        <p className="text-red-500 text-sm text-center">
          {errors.assignments.message}
        </p>
      )}
      {fields.length > 0 ? (
        <div className="flex flex-col gap-2 max-h-32 overflow-y-auto custom-scrollbar pr-2">
          {fields.map((field, index) => (
            <section
              key={field.id}
              className="flex items-center justify-between p-2 border border-oxford/20 rounded-md bg-jasmine shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-center gap-2 text-preset-4 text-oxford">
                <p className="text-preset-4-bolder text-oxford bg-rose px-2 py-1 rounded border border-oxford/20 capitalize w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                  {field.title}
                </p>
                {field.date && (
                  <span className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-oxford/20">
                    <FaCalendar className="text-oxford" size={14} />
                    {new Date(field.date).toLocaleDateString("en-US", { 
                      year: "numeric", 
                      month: "short", 
                      day: "numeric" 
                    })}
                  </span>
                )}
                {field.status?.label && (
                  <span className="px-2 py-1 rounded bg-oxford border border-oxford text-white capitalize">
                    {field.status.label}
                  </span>
                )}
                {field.type?.label && (
                  <span className="px-2 py-1 rounded bg-oxford border border-oxford text-white capitalize">
                    {field.type.label}
                  </span>
                )}
              </div>
              <Button
                style="ghost"
                onClick={() => remove(index)}
                type="button"
              >
                <span className="text-vermilion text-preset-4-bolder">X</span>
              </Button>
            </section>
          ))}
        </div>
      ) : (
        <p className="text-oxford text-center text-preset-4-bolder py-4">
          No assignments added yet
        </p>
      )}
    </div>
  );
}