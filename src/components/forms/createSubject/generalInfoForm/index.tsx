import { Controller, useFormContext } from "react-hook-form";
import Input from "../../input";
import Options from "../../options";
import { CreateSubjectFormData as FormData } from "../form";
import { COLOR_OPTIONS, ICON_OPTIONS } from "./constants";

export default function GeneralInfoForm() {
  const { control, formState: { errors }} = useFormContext<FormData>()
  return (
    <div className="border border-oxford/50 bg-white shadow-[5px_5px_0px_#0a0f29] rounded-sm max-w-2xl h-full w-full p-6 overflow-y-auto lg:overflow-y-auto scrollbar-thin scrollbar-thumb-oxford scrollbar-track-transparent flex flex-col gap-4">
      <h2 className="text-preset-3-bolder text-oxford">General Information</h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Controller
            name="generalInfo.name"
            control={control}
            render={({ field }) => (
              <Input 
                label="Subject Name"
                placeholder="Ex. Mathematics"
                error={errors.generalInfo?.name?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex-1">
          <Controller
            name="generalInfo.description"
            control={control}
            render={({ field }) => (
              <Input 
                label="Description"
                as="textarea"
                placeholder="Ex. This is a description of the subject"
                error={errors.generalInfo?.description?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mt-4">
        <div className="flex-1">
          <Controller
            name="generalInfo.icon"
            control={control}
            render={({ field }) => (
              <Options
                label="Pick an icon for this subject"
                options={ICON_OPTIONS}
                error={errors.generalInfo?.icon?.message}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="flex-1">
          <Controller
            name="generalInfo.color"
            control={control}
            render={({ field }) => (
              <Options
                label="Choose subject color"
                options={COLOR_OPTIONS}
                error={errors.generalInfo?.color?.message}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}