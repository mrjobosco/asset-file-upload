import { FormProvider } from "react-hook-form"
import { useAssetsForm } from "./useAssetsForm";
import { Button, Input } from "@/components";

interface UploadAssetFormProps {
  onFormSuccessfullySubmitted: () => void
}
export function UploadAssetForm(props: UploadAssetFormProps): React.ReactElement {

  const { onFormSuccessfullySubmitted } = props;

  const { methods, onSubmit, resetForm, error } = useAssetsForm({
    onFormSuccessfullySubmitted
  });

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          onReset={resetForm}
          className="flex flex-col gap-2 min-w-[300px] max-w-[500px]"
        >
          <Input
            placeholder="Company ID"
            label="Company ID"
            {...methods.register("companyId", { required: "Company ID is required" })}
            error={methods.formState.errors.companyId?.message}
          />

          <Input
            type="file"
            label="Upload Asset File"
            multiple={false}
            {...methods.register("assetFile", { required: "Asset file is required" })}
            error={methods.formState.errors.assetFile?.message}
          />

          <div className=" text-sm text-gray-500 flex relative gap-3">
            <Button type="submit" className="!bg-blue-600 hover:!bg-blue-700">Upload</Button>
            <Button type="reset" className="!bg-gray-300 hover:!bg-gray-400 !text-black">Reset</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}